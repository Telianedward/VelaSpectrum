// src/main.ts
import { generateAllThemes } from './generator/ThemeGenerator.js';
import * as fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUTPUT_DIR = join(__dirname, '../themes');

async function build() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const themes = generateAllThemes();

  for (const { config, theme } of themes) {
    const filename = `my-${config.key}.json`;
    const filepath = join(OUTPUT_DIR, filename);
    await fs.writeFile(filepath, JSON.stringify(theme, null, 2));
    console.log(`✅ ${filename}`);
  }
}

build().catch(console.error);