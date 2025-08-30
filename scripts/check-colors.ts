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

    // Регулярное выражение для поиска цветов: 'blues', 'reds', 'frostWhite' и т.д.
    // Ищем все значения после `:` или `=` в формате: role: 'colorName'
    const colorMatches = [...paletteTsContent.matchAll(/['"]([a-zA-Z0-9]+)['"]\s*[:=]\s*['"]([a-zA-Z0-9]+)['"]/g)];

    // Собираем все используемые цвета (вторая группа — значение)
    const usedColors = new Set<string>();
    for (const match of colorMatches) {
      const value = match[2];
      // Фильтруем ключи, которые не являются цветами (например, 'accent', 'fg', 'canvas')
      if (!/^(light|dark|canvas|fg|accent|success|danger|warning|info|sponsors|done|closed|open|ansi|neutral|border|syntax|inset|overlay|muted|subtle|default|emphasis|emphasisPlus|inserted|deleted|changed|ignored|range|header|separator|output|link|inline|emphasis|strong)$/i.test(value)) {
        usedColors.add(value);
      }
    }

    // ✅ Исправлено: добавлено `const`
    const missingColors = [...usedColors].filter(color => !availableColors.has(color));

    // Выводим результат
    if (missingColors.length === 0) {
      console.log('✅ Все цвета на месте. Можно запускать сборку.');
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

// Запускаем проверку
checkColors();