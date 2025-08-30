// src/main.ts
import { generateAllThemes } from './generator/ThemeGenerator.js';
import * as fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// === Обработка аргументов ===
const args = process.argv.slice(2);
let paletteName = 'default';
for (let i = 0; i < args.length; i++) {
    if (args[i] === '--palette' && args[i + 1]) {
        paletteName = args[i + 1];
    }
}
// === Путь к папке ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUTPUT_DIR = join(__dirname, '../themes');
async function build() {
    try {
        await fs.mkdir(OUTPUT_DIR, { recursive: true });
        // ✅ Приведение к PaletteName
        const themes = generateAllThemes(paletteName);
        for (const { config, theme } of themes) {
            // ✅ Формат: {palette}-{key}.json
            const filename = `${paletteName}-${config.key}.json`;
            const filepath = join(OUTPUT_DIR, filename);
            await fs.writeFile(filepath, JSON.stringify(theme, null, 2));
            console.log(`✅ ${filename}`);
        }
    }
    catch (err) {
        console.error('Ошибка генерации:', err);
    }
}
build();
//# sourceMappingURL=main.js.map