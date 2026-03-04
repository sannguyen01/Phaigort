/**
 * Generate brand assets from the logo PNG.
 * Run: node scripts/generate-assets.mjs
 *
 * Produces:
 *   public/og-image.jpg    — 1200x630 OG social preview
 *   public/icon-192.png    — PWA icon (192x192)
 *   public/icon-512.png    — PWA icon (512x512)
 *   public/favicon.ico     — 48x48 ICO for browser tabs
 */
import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOGO = "C:\\Users\\DELL\\OneDrive\\Desktop\\Vision Conundrum\\Phaigort\\Phaigort - Logo.png";
const PUBLIC = join(__dirname, "..", "public");

const NAVY = { r: 26, g: 40, b: 81 };

async function generateOGImage() {
  const logoBuffer = await sharp(LOGO)
    .resize({ width: 600, height: 300, fit: "inside" })
    .toBuffer();

  const logoMeta = await sharp(logoBuffer).metadata();

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: NAVY,
    },
  })
    .composite([
      {
        input: logoBuffer,
        left: Math.round((1200 - logoMeta.width) / 2),
        top: Math.round((630 - logoMeta.height) / 2),
      },
    ])
    .jpeg({ quality: 90 })
    .toFile(join(PUBLIC, "og-image.jpg"));

  console.log("  og-image.jpg (1200x630)");
}

async function generatePWAIcon(size) {
  const logoSize = Math.round(size * 0.6);
  const logoBuffer = await sharp(LOGO)
    .resize({ width: logoSize, height: logoSize, fit: "inside" })
    .toBuffer();

  const logoMeta = await sharp(logoBuffer).metadata();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { ...NAVY, alpha: 1 },
    },
  })
    .composite([
      {
        input: logoBuffer,
        left: Math.round((size - logoMeta.width) / 2),
        top: Math.round((size - logoMeta.height) / 2),
      },
    ])
    .png()
    .toFile(join(PUBLIC, `icon-${size}.png`));

  console.log(`  icon-${size}.png`);
}

async function generateFavicon() {
  const logoBuffer = await sharp(LOGO)
    .resize({ width: 32, height: 32, fit: "inside" })
    .toBuffer();

  const logoMeta = await sharp(logoBuffer).metadata();

  // Generate a 48x48 PNG (browsers accept PNG as favicon)
  await sharp({
    create: {
      width: 48,
      height: 48,
      channels: 4,
      background: { ...NAVY, alpha: 1 },
    },
  })
    .composite([
      {
        input: logoBuffer,
        left: Math.round((48 - logoMeta.width) / 2),
        top: Math.round((48 - logoMeta.height) / 2),
      },
    ])
    .png()
    .toFile(join(PUBLIC, "favicon.png"));

  console.log("  favicon.png (48x48)");
}

console.log("Generating brand assets...");
await generateOGImage();
await generatePWAIcon(192);
await generatePWAIcon(512);
await generateFavicon();
console.log("Done!");
