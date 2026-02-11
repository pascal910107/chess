import sharp from "sharp";
import { mkdir } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

const outputDir = join(projectRoot, "public", "icons");

const icons = [
  { name: "icon-192x192.png", size: 192 },
  { name: "icon-512x512.png", size: 512 },
  { name: "icon-maskable-192x192.png", size: 192, maskable: true },
  { name: "icon-maskable-512x512.png", size: 512, maskable: true },
  { name: "apple-touch-icon.png", size: 180 },
];

// Create SVG icon with chess king piece
function createChessIconSvg(size, maskable = false) {
  const padding = maskable ? size * 0.15 : size * 0.1;
  const innerSize = size - padding * 2;
  const scale = innerSize / 100;

  // Chess king piece path (simplified)
  const kingPath = `
    M 50 10
    L 50 20
    M 40 15 L 60 15
    M 35 25
    C 35 22, 40 20, 50 20
    C 60 20, 65 22, 65 25
    L 70 40
    C 72 45, 70 50, 65 55
    L 68 75
    C 68 82, 60 88, 50 88
    C 40 88, 32 82, 32 75
    L 35 55
    C 30 50, 28 45, 30 40
    L 35 25 Z
  `;

  return `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="#fbf7f1"/>
      <g transform="translate(${padding}, ${padding}) scale(${scale})">
        <path d="${kingPath}" fill="#b08d55" stroke="#8b6914" stroke-width="2"/>
        <line x1="50" y1="10" x2="50" y2="20" stroke="#b08d55" stroke-width="4" stroke-linecap="round"/>
        <line x1="40" y1="15" x2="60" y2="15" stroke="#b08d55" stroke-width="4" stroke-linecap="round"/>
      </g>
    </svg>
  `;
}

async function generateIcons() {
  await mkdir(outputDir, { recursive: true });

  for (const icon of icons) {
    const outputPath = join(outputDir, icon.name);
    const svg = createChessIconSvg(icon.size, icon.maskable);

    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);

    console.log(`Generated: ${icon.name}`);
  }

  console.log("\nAll icons generated successfully!");
}

generateIcons().catch(console.error);
