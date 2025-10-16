import { getBrowser } from "@/lib/helpers/get-browser";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { html } = await req.json();
    if (!html) {
      return NextResponse.json({ error: "Missing HTML" }, { status: 400 });
    }

    // 🧾 Wrap the HTML into a proper A4 print document
    const doc = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            @page {
              size: A4;
              margin: 15mm;
            }
            body {
              font-family: system-ui, -apple-system, sans-serif;
              background: #fff;
              color: #111;
              line-height: 1.6;
            }
            .resume-container {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: flex-start;
            }
            h1, h2, h3, h4 {
              margin: 0;
              padding: 0;
            }
            p {
              margin: 4px 0;
            }
          </style>
        </head>
        <body>
          <article class="resume-container">${html}</article>
        </body>
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
        "Content-Disposition": 'attachment; filename="resume.pdf"',
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
