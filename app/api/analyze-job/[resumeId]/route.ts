import { getResume } from "@/lib/db/get-resume";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(
  req: Request,
  { params }: { params: { resumeId: string } }
) {
  try {
    const { resumeId } = await params;
    const resume = await getResume(resumeId);

    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "Missing job URL" }, { status: 400 });
    }

    const pageResponse = await fetch(url);
    const html = await pageResponse.text();

    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 8000);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `
            You are an expert career writer. 
            Your task is to write a short, personalized motivation letter for a job application. 

            You will receive:
            - The candidate's resume data -> ${resume}.
            - The job posting text or description.

            Use the resume to highlight the candidate's most relevant experience, skills, and qualities that fit the job.
            Keep the tone professional, confident, and natural.
            Avoid generic phrases; make it sound human and tailored to the position.

            Respond with the complete motivation letter in plain text — no JSON or markdown.
          `,
        },

        {
          role: "user",
          content: text,
        },
      ],
    });

    const analysis = completion.choices[0]?.message?.content;

    return NextResponse.json({
      message: "Job analyzed successfully",
      resumeId,
      url,
      analysis: JSON.parse(analysis || "{}"),
    });
  } catch (error) {
    console.error("Error in analyze-job:", error);
    return NextResponse.json(
      { error: "Something went wrong while analyzing the job" },
      { status: 500 }
    );
  }
}
