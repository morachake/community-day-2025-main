import fs from "node:fs";
import path from "node:path";
import parse from "html-react-parser";

/** Renders preserved HTML markup from extracted static fragments (100% fidelity with original DOM). */
export default function SectionHtml({ file }: { file: string }) {
  const fullPath = path.join(process.cwd(), "content/sections", file);
  const html = fs.readFileSync(fullPath, "utf8");
  return <>{parse(html.trim())}</>;
}
