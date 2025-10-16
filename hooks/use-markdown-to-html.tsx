import { useEffect, useState } from "react";
import { marked } from "marked";

export const useMarkdownToHtml = (markdown: string) => {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    if (!markdown) {
      setHtml("");
      return;
    }

    const convert = async () => {
      const parsed = await marked.parse(markdown);
      setHtml(parsed);
    };

    convert();
  }, [markdown]);

  return html;
};
