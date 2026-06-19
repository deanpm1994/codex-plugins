import { access, mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { spawn } from "node:child_process";

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} exited with code ${code}`));
      }
    });
  });
}

export async function writeSvgFile(svgPath, svgMarkup) {
  await mkdir(dirname(svgPath), { recursive: true });
  await writeFile(svgPath, svgMarkup, "utf8");
  return svgPath;
}

export async function rasterizeSvgToPng(svgPath, pngPath = `${svgPath}.png`) {
  await run("/opt/homebrew/bin/magick", [svgPath, pngPath]);
  await access(pngPath);
  return pngPath;
}

export function assetPathFor(slideId, filename) {
  return join("assets", slideId, filename);
}
