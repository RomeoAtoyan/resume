import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ resumeId: string }> }
) {
  try {
    const { resumeId } = await context.params;
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
        motivationLetter: {
          letter: analysis,
          date: new Date(),
        },
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

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ resumeId: string }> }
) {
  try {
    const { resumeId } = await context.params;

    if (!resumeId) {
      return NextResponse.json({ error: "Missing resumeId" }, { status: 400 });
    }

    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { motivationLetter: true },
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        motivationLetter: {
          letter: "",
          date: new Date(),
        },
      },
    });

    return NextResponse.json({ deleted: true });
  } catch (error) {
    console.error("Error in DELETE /motivation:", error);
    return NextResponse.json(
      { error: "Failed to delete motivation letter" },
      { status: 500 }
    );
  }
}
