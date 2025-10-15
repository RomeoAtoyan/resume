import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getBrowser } from "@/lib/helpers/get-browser";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { html } = await req.json();
    if (!html) {
      return NextResponse.json({ error: "Missing HTML" }, { status: 400 });
    }

    const doc = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            @page { margin: 20mm; }
            body {
              font-family: system-ui, sans-serif;
              background: #fff;
              color: #111;
              line-height: 1.6;
            }
            article { margin: 0; }
          </style>
        </head>
        <body>${html}</body>
      </html>
    `;

    const browser = await getBrowser();
    const page = await browser.newPage();

    await page.setContent(doc, { waitUntil: "networkidle0" });
    await page.emulateMediaType("screen");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    await browser.close();

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="motivation-letter.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    console.error("PDF generation failed:", err);
    return NextResponse.json(
      { error: err?.message || "PDF generation error" },
      { status: 500 }
    );
  }
}
