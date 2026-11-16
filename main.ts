// BREAKOUT — ai-excited-01 entry.
// Ships the entry artwork (entry.png, sitting next to this file) into the
// output folder the make.fun runner provides, so the judge can see it.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY_FILE = "entry.png";

const entryPath = join(dirname(fileURLToPath(import.meta.url)), ENTRY_FILE);

if (!existsSync(entryPath)) {
  console.error(`error: ${ENTRY_FILE} not found at ${entryPath}`);
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

const destination = join(outputDir, ENTRY_FILE);
copyFileSync(entryPath, destination);
console.log(`delivered ${ENTRY_FILE} to ${destination}`);
