import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(
  req: Request,
  { params }: { params: { resumeId: string } }
) {
  const { resumeId } = await params;
  return NextResponse.json({
    resumeId,
  });
  // const body = await req.json();
  // const { url } = body;

  // if (!url) {
  //   return NextResponse.json({ error: "Missing job URL" }, { status: 400 });
  // }

  // const pageResponse = await fetch(url);
  // const html = await pageResponse.text();

  // const text = html
  //   .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
  //   .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
  //   .replace(/<\/?[^>]+(>|$)/g, "")
  //   .replace(/\s+/g, " ")
  //   .trim()
  //   .slice(0, 8000);

  // const completion = await openai.chat.completions.create({
  //   model: "gpt-4o-mini",
  //   response_format: { type: "json_object" },
  //   messages: [
  //     {
  //       role: "system",
  //       content:
  //         "You are a job posting analyzer. Extract and summarize the following fields: title, company, responsibilities, requirements, and skills. Respond in JSON only.",
  //     },
  //     {
  //       role: "user",
  //       content: text,
  //     },
  //   ],
  // });

  // const analysis = completion.choices[0]?.message?.content;

  //   return NextResponse.json({
  //     message: "Job analyzed successfully",
  //     url,
  //     // analysis: JSON.parse(analysis || "{}"),
  //   });
  // } catch (error) {
  //   console.error("Error in analyze-job:", error);
  //   return NextResponse.json(
  //     { error: "Something went wrong while analyzing the job" },
  //     { status: 500 }
  //   );
  // }
}
