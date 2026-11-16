import { closeSync, copyFileSync, existsSync, mkdirSync, openSync, readSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(repoRoot, 'entry.png');
const rawOutputDir = process.env.MAKEFUN_OUTPUT_DIR;
const outputDir = rawOutputDir ? resolve(rawOutputDir) : join(repoRoot, 'out');
const outputPath = join(outputDir, 'entry.png');
if (!existsSync(sourcePath)) {
  console.error(`Missing input: ${sourcePath} does not exist.`);
  process.exit(1);
}

const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const handle = openSync(sourcePath, 'r');
const header = Buffer.alloc(8);
const headerBytes = readSync(handle, header, 0, 8, 0);
closeSync(handle);
if (headerBytes !== 8 || !header.equals(pngSignature)) {
  console.error(`Invalid input: ${sourcePath} is not a PNG file (bad magic bytes).`);
  process.exit(1);
}
mkdirSync(outputDir, { recursive: true });
const before = statSync(sourcePath);
copyFileSync(sourcePath, outputPath);
const after = statSync(outputPath);
if (after.size !== before.size) {
  console.error(`Copy incomplete: source ${before.size} bytes, output ${after.size} bytes.`);
  process.exit(1);
}
console.log(`Copied ${sourcePath} (${before.size} bytes) -> ${outputPath} (${after.size} bytes)`);
console.log('Done.');
