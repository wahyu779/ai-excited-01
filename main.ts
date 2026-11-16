// BREAKOUT — ai-excited-01 entry
// The image is the artwork. This entrypoint simply delivers it:
// copy entry.png (next to this file) into the output directory
// expected by the make.fun kit, so the judge sees the piece.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

if (!existsSync(source)) {
  console.error(`entry.png not found next to main.ts (${source})`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const destination = join(resolve(outDir), "entry.png");
copyFileSync(source, destination);
console.log(`BREAKOUT entry copied to ${destination}`);
