export const handleDownloadPDF = async (html: string) => {
  const res = await fetch("/api/pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ html }),
  });

  if (!res.ok) {
    const { error } = await res.json().catch(() => ({ error: "Failed" }));
    console.error(error);
    return;
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "motivation-letter.pdf";
  a.click();
  URL.revokeObjectURL(url);
};
