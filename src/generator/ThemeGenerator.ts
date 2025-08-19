// src/generator/ThemeGenerator.ts

import { themeConfigs } from '../themes/config.js';
import { ThemeColors } from '../colors/ThemeColors.js';
import { palettes } from '../themes/colorPalettePresets.js';
import { ThemeElementNAme } from '../colors/ThemeElementName.js';
import { applyAlpha } from '../utils/color.js';

/**
 * Генерирует все темы на основе конфигураций и пресетов.
 * @returns Массив объектов { config, theme }
 */
export function generateAllThemes() {
  return themeConfigs.map(config => {
    // Используем пресет (можно сделать параметром)
    const palette = palettes.default;

    // Генерируем цвета на основе пресета и режима
    const colors = ThemeColors.generate(palette, config.mode);

    // Формируем тему
    const theme = {
      name: config.name,
      type: config.type,
      colors: {} as Record<string, string>,
      tokenColors: [
        {
          scope: ["comment", "string.comment"],
          settings: {
            foreground: applyAlpha(colors.fg.muted, 5),
            fontStyle: "italic"
          }
        },
        {
          scope: "string",
          settings: {
            foreground: applyAlpha(colors.success.emphasis, 10)
          }
        },
        {
          scope: "keyword",
          settings: {
            foreground: applyAlpha(colors.accent.emphasis, 10)
          }
        }
      ]
    };

    // Заполняем все UI-цвета
    for (const item of ThemeElementNAme) {
      const oklch = item.color(colors);
      theme.colors[item.name] = applyAlpha(oklch, item.Alpha);
    }

    return { config, theme };
  });
}