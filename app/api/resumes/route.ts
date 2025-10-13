import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionServer } from "@/lib/auth/get-session-server"; // adjust path based on your NextAuth setup

export async function POST(req: Request) {
  try {
    const session = await getSessionServer();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, template, data } = await req.json().catch(() => ({}));

    const newResume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        title: title || "Untitled Resume",
        template: template || "default",
        data: data || {},
      },
    });

    return NextResponse.json({
      message: "Resume created successfully",
      resume: newResume,
    });
  } catch (error: any) {
    console.error("Error creating resume:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create resume" },
      { status: 500 }
    );
  }
}
