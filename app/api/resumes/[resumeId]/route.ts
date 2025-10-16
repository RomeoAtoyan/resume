import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionServer } from "@/lib/auth/get-session-server";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ resumeId: string }> }
) {
  try {
    const session = await getSessionServer();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { resumeId } = await context.params;
    const { title, template, data } = await req.json();

    const updated = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        title: title || "Untitled Resume",
        template: template || "default",
        data,
        lastSaved: new Date(),
      },
    });

    return NextResponse.json({ message: "Resume updated", resume: updated });
  } catch (error: any) {
    console.error("Error autosaving resume:", error);
    return NextResponse.json(
      { error: error.message || "Failed to autosave" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ resumeId: string }> }
) {
  try {
    const session = await getSessionServer();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { resumeId } = await context.params;
    const resumeToRemove = await prisma.resume.findUnique({
      where: {
        id: resumeId,
      },
    });

    if (!resumeToRemove) {
      return NextResponse.json(
        { message: "Resume not found" },
        { status: 404 }
      );
    }

    await prisma.resume.delete({
      where: {
        id: resumeId,
      },
    });

    return NextResponse.json({ message: "Resume removed" }, { status: 200 });
  } catch (error: any) {
    console.error("Error removing resume:", error);
    return NextResponse.json(
      { error: error.message || "Failed to remove resume" },
      { status: 500 }
    );
  }
}
