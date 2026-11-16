// Entrypoint for the ai-excited-01 submission: it ships the finished
// artwork (entry.png, sitting next to this file) into the output folder
// the make.fun runner provides, so the judge can see it.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const entryName = "entry.png";
const here = dirname(new URL(import.meta.url).pathname);
const sourcePath = join(here, entryName);

if (!existsSync(sourcePath)) {
  console.error(`Missing ${entryName} next to main.ts — nothing to deliver.`);
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

const targetPath = join(outputDir, entryName);
copyFileSync(sourcePath, targetPath);
console.log(`Delivered ${entryName} to ${targetPath}`);
