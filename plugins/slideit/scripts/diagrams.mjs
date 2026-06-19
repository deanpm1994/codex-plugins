import { rasterizeSvgToPng, writeSvgFile, assetPathFor } from "./images.mjs";

export async function exportDiagramToSvg(diagram, outputDir = ".") {
  const slideId = diagram.slideId || "diagram";
  const svgPath = `${outputDir}/${assetPathFor(slideId, `${diagram.name || "diagram"}.svg`)}`;
  const svgMarkup = diagram.svgMarkup || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="40" y="60">${diagram.title || "Diagram"}</text></svg>`;
  await writeSvgFile(svgPath, svgMarkup);
  return svgPath;
}

export async function exportDiagramToPng(diagram, outputDir = ".") {
  const svgPath = await exportDiagramToSvg(diagram, outputDir);
  return rasterizeSvgToPng(svgPath, `${svgPath}.png`);
}

export function attachDiagramAssets(slide, assets) {
  return {
    ...slide,
    assets: [...(slide.assets || []), ...assets],
  };
}
