// scripts/check-colors.ts

import * as fs from 'fs/promises';
import { dirname, join } from 'path';

// Получаем __dirname в ES-модуле
const __filename = new URL(import.meta.url).pathname;
const __dirname = dirname(__filename);

// Пути к файлам
const COLORS_JSON_PATH = join(__dirname, '../src/colors/colors.json');
const PALETTE_TS_PATH = join(__dirname, '../src/themes/colorPalettePresets.ts');

async function checkColors() {
  try {
    // Читаем colors.json
    const colorsJsonContent = await fs.readFile(COLORS_JSON_PATH, 'utf-8');
    const colorsJson = JSON.parse(colorsJsonContent);

    // Извлекаем все ключи из colors.json
    const availableColors = new Set(Object.keys(colorsJson));

    // Читаем colorPalettePresets.ts как строку
    const paletteTsContent = await fs.readFile(PALETTE_TS_PATH, 'utf-8');

    // Пресет использует неквотированные ключи: type: 'blues'
    // (старый regex требовал 'type': 'blues' и ничего не находил)
    const colorMatches = [
      ...paletteTsContent.matchAll(
        /(?:^|[,{]\s*|^\s*)([a-zA-Z][a-zA-Z0-9]*)\s*:\s*['"]([a-zA-Z][a-zA-Z0-9]*)['"]/gm
      ),
    ];

    const semanticKeys = new Set([
      'light', 'dark', 'canvas', 'fg', 'accent', 'success', 'danger', 'warning', 'info',
      'sponsors', 'done', 'closed', 'open', 'ansi', 'neutral', 'border', 'syntax',
      'inset', 'overlay', 'muted', 'subtle', 'default', 'emphasis', 'emphasisPlus',
      'inserted', 'deleted', 'changed', 'ignored', 'range', 'header', 'separator',
      'output', 'link', 'inline', 'strong', 'black', 'red', 'green', 'yellow', 'blue',
      'magenta', 'cyan', 'white', 'blackBright', 'redBright', 'greenBright',
      'yellowBright', 'blueBright', 'magentaBright', 'cyanBright', 'whiteBright',
      'type', 'enum', 'interface', 'class', 'struct', 'variable', 'parameter',
      'property', 'field', 'constant', 'local', 'function', 'method', 'arrowFunction',
      'constructor', 'module', 'namespace', 'string', 'number', 'boolean', 'null',
      'regexp', 'templateString', 'keyword', 'operator', 'modifier', 'decorator',
      'comment', 'error', 'tag', 'support', 'punctuation', 'heading', 'quote',
      'embedded', 'emphasis'
    ]);

    const usedColors = new Set<string>();
    for (const match of colorMatches) {
      const key = match[1];
      const value = match[2];
      // Берём только значения цветовых ролей (не сами ключи семантики)
      if (semanticKeys.has(key) && !semanticKeys.has(value)) {
        usedColors.add(value);
      } else if (!semanticKeys.has(value) && /^[a-z][a-zA-Z0-9]*$/.test(value)) {
        // Фоллбек: любое строковое значение, похожее на имя цвета
        if (!['true', 'false', 'null', 'undefined'].includes(value)) {
          usedColors.add(value);
        }
      }
    }

    const missingColors = [...usedColors].filter(color => !availableColors.has(color));

    if (missingColors.length === 0) {
      console.log(`✅ Все цвета на месте (${usedColors.size} ссылок). Можно запускать сборку.`);
      process.exit(0);
    } else {
      console.error('❌ Не хватает цветов в colors.json:');
      missingColors.forEach(color => console.error(`  - ${color}`));
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Ошибка при проверке цветов:', error);
    process.exit(1);
  }
}

checkColors();
