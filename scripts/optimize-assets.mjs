#!/usr/bin/env node
/**
 * Converts site images to optimized WebP and compresses the villa tour video.
 * Run: node scripts/optimize-assets.mjs
 */

import { mkdir, readdir, unlink, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const imageDir = join(root, 'public', 'image');

const IMAGE_JOBS = [
  { source: 'outdoor-bbq-seating.jpg', output: 'outdoor-bbq-seating.webp', maxWidth: 1920 },
  { source: 'outdoor-garden-seating.jpg', output: 'outdoor-garden-seating.webp', maxWidth: 1920 },
  { source: 'outdoor-ping-pong-pergola.jpg', output: 'outdoor-ping-pong-pergola.webp', maxWidth: 1920 },
  { source: 'WhatsApp Image 2025-04-09 at 09.25.29.jpeg', output: 'pool-private.webp', maxWidth: 1920 },
  { source: 'WhatsApp Image 2025-04-09 at 09.27.31.jpeg', output: 'villa-front.webp', maxWidth: 1920 },
  { source: 'WhatsApp Image 2025-04-09 at 09.27.13.jpeg', output: 'kitchen-equipped.webp', maxWidth: 1400 },
  { source: 'WhatsApp Image 2025-04-13 at 06.43.28.jpeg', output: 'dining-corner.webp', maxWidth: 1400 },
  { source: 'WhatsApp Image 2025-04-09 at 09.27.21.jpeg', output: 'spacious-room.webp', maxWidth: 1400 },
  { source: 'WhatsApp Image 2025-04-09 at 09.25.30 (2).jpeg', output: 'bedrooms-luxury.webp', maxWidth: 1400 },
  { source: 'WhatsApp Image 2025-04-09 at 09.25.31 (2).jpeg', output: 'lounge-rest.webp', maxWidth: 1200 },
  { source: 'WhatsApp Image 2025-04-09 at 09.25.32 (1).jpeg', output: 'design-corner.webp', maxWidth: 1200 },
  { source: 'WhatsApp Image 2025-04-09 at 09.25.33 (1).jpeg', output: 'guest-unit.webp', maxWidth: 1400 },
  { source: 'WhatsApp Image 2025-04-09 at 09.26.57 (1).jpeg', output: 'spacious-hall.webp', maxWidth: 1200 },
  { source: 'WhatsApp Image 2025-04-09 at 09.26.58.jpeg', output: 'rest-area.webp', maxWidth: 1200 },
  { source: 'WhatsApp Image 2025-04-09 at 09.27.01.jpeg', output: 'seating-area.webp', maxWidth: 1200 },
  { source: 'WhatsApp Image 2025-04-09 at 09.27.19 (1).jpeg', output: 'shared-area.webp', maxWidth: 1200 },
  { source: 'WhatsApp Image 2025-04-13 at 06.43.27.jpeg', output: 'villa-entrance.webp', maxWidth: 1200 },
  { source: 'WhatsApp Image 2025-04-09 at 09.27.27.jpeg', output: 'villa-landscape.webp', maxWidth: 1200 },
  { source: 'WhatsApp Image 2025-04-09 at 09.27.41 (1).jpeg', output: 'villa-video-poster.webp', maxWidth: 1280 },
];

const KEEP_FILES = new Set([
  ...IMAGE_JOBS.map((j) => j.output),
  'villa-tour.mp4',
]);

const VIDEO_SOURCE = 'WhatsApp Video 2025-04-09 at 09.27.42.mp4';
const VIDEO_OUTPUT = 'villa-tour.mp4';

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function optimizeImages(sharp) {
  await mkdir(imageDir, { recursive: true });
  let totalIn = 0;
  let totalOut = 0;

  for (const job of IMAGE_JOBS) {
    const inputPath = join(imageDir, job.source);
    const outputPath = join(imageDir, job.output);

    try {
      const inputStat = await stat(inputPath);
      totalIn += inputStat.size;

      await sharp(inputPath)
        .rotate()
        .resize({ width: job.maxWidth, withoutEnlargement: true })
        .webp({ quality: 78, effort: 4 })
        .toFile(outputPath);

      const outputStat = await stat(outputPath);
      totalOut += outputStat.size;
      console.log(`✓ ${job.output}  ${formatBytes(inputStat.size)} → ${formatBytes(outputStat.size)}`);
    } catch (err) {
      console.error(`✗ ${job.source}: ${err.message}`);
      process.exitCode = 1;
    }
  }

  console.log(`\nImages: ${formatBytes(totalIn)} → ${formatBytes(totalOut)}`);
}

async function optimizeVideo() {
  const inputPath = join(imageDir, VIDEO_SOURCE);
  const outputPath = join(imageDir, VIDEO_OUTPUT);

  try {
    const inputStat = await stat(inputPath);
    await execFileAsync('ffmpeg', [
      '-y',
      '-i', inputPath,
      '-c:v', 'libx264',
      '-preset', 'medium',
      '-crf', '28',
      '-movflags', '+faststart',
      '-c:a', 'aac',
      '-b:a', '96k',
      '-vf', 'scale=min(1280\\,iw):-2',
      outputPath,
    ], { stdio: 'pipe' });

    const outputStat = await stat(outputPath);
    console.log(`✓ ${VIDEO_OUTPUT}  ${formatBytes(inputStat.size)} → ${formatBytes(outputStat.size)}`);
  } catch (err) {
    console.error(`✗ video: ${err.stderr?.toString() || err.message}`);
    process.exitCode = 1;
  }
}

async function removeUnusedAssets() {
  const files = await readdir(imageDir);
  let removed = 0;

  for (const file of files) {
    if (KEEP_FILES.has(file)) continue;
    await unlink(join(imageDir, file));
    removed += 1;
  }

  console.log(`\nRemoved ${removed} unused files from public/image/`);
}

async function main() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.error('Install sharp first: npm install --save-dev sharp');
    process.exit(1);
  }

  console.log('Optimizing images...\n');
  await optimizeImages(sharp);
  console.log('\nOptimizing video...\n');
  await optimizeVideo();
  console.log('\nCleaning unused assets...\n');
  await removeUnusedAssets();

  const { stdout } = await execFileAsync('du', ['-sh', imageDir]);
  console.log(`Final size: ${stdout.trim()}`);
}

main();
