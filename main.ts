// BREAKOUT — ai-excited-01 entrypoint.
// Copies entry.png next to this file into MAKEFUN_OUTPUT_DIR.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const target = join(outputDir, "entry.png");

if (!existsSync(source)) {
  console.error("entry.png not found next to main.ts");
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, target);
console.log(`copied entry.png -> ${target}`);
