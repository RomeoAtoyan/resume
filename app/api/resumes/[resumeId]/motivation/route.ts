import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { resumeId: string } }
) {
  try {
    const { resumeId } = await params;
    const { analysis } = await req.json();

    if (!resumeId) {
      return NextResponse.json({ error: "Missing resumeId" }, { status: 400 });
    }

    if (!analysis) {
      return NextResponse.json({ error: "Missing analysis" }, { status: 400 });
    }

    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { motivationLetter: true },
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    if (resume.motivationLetter === analysis) {
      return NextResponse.json({ updated: false, reason: "no_change" });
    }

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        motivationLetter: analysis,
        motivationLetterDate: new Date(),
      },
    });

    return NextResponse.json({ updated: true });
  } catch (error) {
    console.error("Error in PATCH /motivation:", error);
    return NextResponse.json(
      { error: "Failed to save motivation letter" },
      { status: 500 }
    );
  }
}
