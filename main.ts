// BREAKOUT — ai-excited-01 entry (make.fun).
// Ships the entry artwork (entry.png, sitting next to this file) into the
// output folder the make.fun runner provides, so the judge can see it.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY_FILE = "entry.png";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, ENTRY_FILE);

if (!existsSync(source)) {
  console.error(`error: ${ENTRY_FILE} not found next to main.ts`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const dest = join(outDir, ENTRY_FILE);
copyFileSync(source, dest);
const size = statSync(dest).size;
console.log(`delivered ${ENTRY_FILE} (${size} bytes) to ${dest}`);
