import { getResume } from "@/lib/db/get-resume";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(
  req: Request,
  context: { params: Promise<{ resumeId: string }> }
) {
  try {
    const { resumeId } = await context.params;
    const resume = await getResume(resumeId);

    const body = await req.json();
    const { url, tone, length } = body;

    if (!url) {
      return NextResponse.json({ error: "Missing job URL" }, { status: 400 });
    }

    if (!tone) {
      return NextResponse.json(
        { error: "Missing behaviour tone" },
        { status: 400 }
      );
    }

    if (!length) {
      return NextResponse.json(
        { error: "Missing behaviour length" },
        { status: 400 }
      );
    }

    const lengthGuidelines: Record<string, string> = {
      short:
        "Write around 180-250 words, approximately 3 well-structured paragraphs (introduction, motivation/skills, closing).",
      medium:
        "Write around 300-400 words, approximately 4 paragraphs (introduction, key experience, motivation, and closing).",
      detailed:
        "Write around 450-600 words, approximately 5 paragraphs with full motivation, achievements, and reasoning for fit.",
    };

    const lengthInstruction =
      lengthGuidelines[length] || lengthGuidelines.medium;

    const pageResponse = await fetch(url);
    const html = await pageResponse.text();

    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\s+/g, " ")
      .trim()

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
              You are an AI career assistant that writes personalized motivation letters.

              You will receive:
              1. The user's resume data ---> ${JSON.stringify(resume?.data)}
              2. The text content of a job posting (from the provided URL) ---> ${text}

              Your task:
              - Analyze the job posting and extract the most relevant requirements.
              - Compare them with the user's resume.
              - Write a concise, professional motivation letter that highlights how the user's experience and skills align with the job.
              - The tone should be confident, natural, and personalized — not generic or robotic.
              - If the data does not exist, do not place it in the motivation letter.

              IMPORTANT:
              - DO NOT MAKE ASSUMPTIONS
              - ONLY WORK WITH WHAT YOU HAVE !
              - DO NOT REFER TO PROFILE OR PORTFOLIO SITES !
              - DO NOT INCLUDE THE DATE OF THE DAY THIS LETTER IS WRITTEN !
              - DO NOT USE PLACEHOLDERS LIKE [Your Name] etc... Use real data taken from the user's resume data like name, email, address, etc...
              - YOUR TEXT IS PROCESSED BY MARKDOWN SO USE NICE SPACING

              TONE:
              - ${tone}

              LENGTH:
              - ${length} - ${lengthInstruction}
            `,
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const analysis = completion.choices[0]?.message?.content;

    return NextResponse.json(
      {
        analysis: analysis,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in analyze-job:", error);
    return NextResponse.json(
      { error: "Something went wrong while analyzing the job" },
      { status: 500 }
    );
  }
}
