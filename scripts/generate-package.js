import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Правильный путь: на уровень выше
const TEMPLATE_PATH = path.join(__dirname, '..', 'package.json.template');
const OUTPUT_PATH = path.join(__dirname, '..', 'package.json'); // тоже в корень
const THEMES_DIR = path.join(__dirname, '..', 'themes'); // тоже в корень

// Карта для преобразования ключей в названия
const LABEL_MAP = {
  'd': 'Dark+',
  'l': 'Light+',
  'dd': 'Dimmed',
  'dhc': 'High Contrast',
  'dc': 'Colorblind',
  'dt': 'Tritanopia',
  'lhc': 'High Contrast Light',
  'lc': 'Colorblind Light',
  'lt': 'Tritanopia Light',
  'ld': 'Dimmed Light'
};

// Карта для uiTheme
const UI_THEME_MAP = {
  'd': 'vs-dark',
  'dd': 'vs-dark',
  'dhc': 'hc-black',
  'dc': 'vs-dark',
  'dt': 'hc-black',
  'l': 'vs',
  'lhc': 'hc-light',
  'lc': 'vs',
  'lt': 'hc-light',
   'ld': 'vs'
};

async function generatePackage() {
  try {
    // Читаем шаблон
    const template = JSON.parse(await fs.readFile(TEMPLATE_PATH, 'utf-8'));

    // Читаем файлы из /themes
    const files = await fs.readdir(THEMES_DIR);
    const themeFiles = files.filter(f => f.endsWith('.json'));

    // Генерируем массив тем
    const themes = themeFiles.map(file => {
      const key = file.replace('.json', '');
      const paletteKey = key.split('-')[0]; // 'default', 'github', 'light'
      const configKey = key.split('-')[1];  // 'd', 'l', 'dc'

      return {
        label: `Vela Spectrum ${LABEL_MAP[configKey] || configKey}`,
        uiTheme: UI_THEME_MAP[configKey] || 'vs-dark',
        path: `./themes/${file}`
      };
    });

    // Записываем в package.json
    template.contributes.themes = themes;
    await fs.writeFile(OUTPUT_PATH, JSON.stringify(template, null, 2), 'utf-8');
    console.log('✅ package.json успешно обновлён с актуальными темами');
  } catch (err) {
    console.error('❌ Ошибка при генерации package.json:', err.message);
    process.exit(1);
  }
}

generatePackage();