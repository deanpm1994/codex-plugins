import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

export async function writePresentation(outputPath, html) {
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
  return outputPath;
}

export async function writePresentationBundle(outputDir, presentation) {
  const htmlPath = `${outputDir}/index.html`;
  await writePresentation(htmlPath, presentation.html);
  return {
    htmlPath,
    assets: presentation.assets || [],
  };
}
