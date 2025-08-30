/**
 * src/generator/ThemeGenerator.ts
 *
 * Центральный генератор тем для Vela Spectrum.
 *
 * Этот модуль отвечает за **создание всех тем** в формате VS Code (`themes/*.json`).
 * Он объединяет:
 * - Цветовые пресеты (например, 'default', 'green', 'pastel')
 * - Режимы отображения (normal, highContrast, colorblind и др.)
 * - Семантические роли (из `ThemeElementName`)
 * - Подсветку синтаксиса (tokenColors)
 *
 * ### Процесс генерации:
 * 1. Загружается цветовой пресет
 * 2. Для каждой конфигурации темы:
 *    - Определяется тип (светлая/тёмная)
 *    - Генерируется семантическая палитра через `ThemeColors.generate`
 *    - Применяются прозрачности из `ThemeElementName`
 *    - Формируется объект `colors` и `tokenColors`
 * 3. Результат: массив тем, готовых к экспорту
 *
 * Все цвета используют современное **перцептуально равномерное пространство OKLCH**,
 * что обеспечивает:
 * - Визуально равномерные переходы
 * - Высокую читаемость
 * - Поддержку цветовых режимов (дальтонизм, высокий контраст)
 *
 * @module ThemeGenerator
 * @author telianedward (https://github.com/telianedward )
 * @license MIT
 * @see https://github.com/telianedward/VelaSpectrum  – Официальный репозиторий
 * @see https://code.visualstudio.com/api/references/theme-color  – Документация по цветам VS Code
 * @see https://bottosson.github.io/posts/oklab/  – OKLAB и OKLCH
 */
import { themeConfigs } from '../themes/config.js';
import { ThemeColors } from '../colors/ThemeColors.js';
import { palettes } from '../themes/colorPalettePresets.js';
import { ThemeElementName } from '../colors/ThemeElementName.js';
import { applyAlpha } from '../utils/color.js';
import { type PaletteName } from '../types/index.js';

// ✅ Исправлено: используем `with` вместо `assert`
import tokenColorsConfig from './tokenColors.json' with { type: 'json' };

// Тип для правил tokenColors
interface TokenColorRule {
  scope: string | string[];
  settings: {
    foreground?: string;
    background?: string;
    fontStyle?: string;
  };
}

/**
 * Генерирует все темы на основе заданного цветового пресета.
 *
 * Создаёт полный набор тем (светлые, тёмные, high contrast и др.) для одного цветового пресета.
 * Каждая тема содержит:
 * - `name`: имя темы
 * - `type`: тип (vs, vs-dark, hc-black)
 * - `semanticHighlighting`: включена ли семантическая подсветка
 * - `colors`: объект с цветами UI-элементов (кнопки, панели, вкладки)
 * - `tokenColors`: правила подсветки синтаксиса (ключевые слова, строки, комментарии)
 *
 * @function generateAllThemes
 * @param {PaletteName} [paletteName='default'] - Название пресета: 'default', 'green', 'pastel', 'contrast'
 * @returns {Array<{ config: object, theme: object }>} Массив объектов, каждый из которых содержит:
 * - `config`: исходная конфигурация темы
 * - `theme`: готовый объект темы для VS Code
 *
 * @example
 * const themes = generateAllThemes('green');
 * themes.forEach(({ config, theme }) => {
 *   fs.writeFileSync(`themes/${config.name}.json`, JSON.stringify(theme, null, 2));
 * });
 *
 * @see {@link ThemeColors.generate} – генерация семантической палитры
 * @see {@link ThemeElementName} – список всех цветовых ролей VS Code
 * @see {@link applyAlpha} – применение прозрачности
 */
export function generateAllThemes(paletteName: PaletteName = 'default') {
  //console.log('🚀 Запуск generateAllThemes:', paletteName);
  // Загружаем пресет цветов по имени
  const palette = palettes[paletteName as PaletteName] ?? palettes.default;

  //console.log('🎨 Пресет:', palette ? 'найден' : 'не найден');
  // Проверка: если пресет не найден — используем 'default' и выводим предупреждение
  if (!palette) {
    console.warn(`Пресет "${paletteName}" не найден. Используется "default".`);
    return generateAllThemes('default');
  }
 // console.log('📋 Конфигураций тем:', themeConfigs.length);

  // Генерируем тему для каждой конфигурации (темная, светлая, high contrast и т.д.)
  return themeConfigs.map(config => {
    //console.log(`\n🔄 Генерация для: ${config.name} (type: ${config.type}, mode: ${config.mode})`);
    // Определяем, является ли тема тёмной
    const isDark = config.type === 'vs-dark' || config.type === 'hc-black';
    //console.log('🌙 isDark:', isDark);

    // 🔍 Отладка: что за palette передаётся?
    const getNested = (obj: any, path: string): string | undefined => {
      const keys = path.split('.');
      let current = obj;
      for (const key of keys) {
        if (current == null || typeof current !== 'object' || !(key in current)) {
          return undefined;
        }
        current = current[key];
      }
      return current;
    };

    // console.log('🧩 palette structure:', {
    //   hasDark: !!palette.dark,
    //   hasLight: !!palette.light,
    //   canvasInsetDark: getNested(palette.dark, 'canvas.inset'),
    //   canvasInsetLight: getNested(palette.light, 'canvas.inset'),
    //   fgDefaultDark: getNested(palette.dark, 'fg.default'),
    //   accentFgDark: getNested(palette.dark, 'accent.fg')
    // });

    // Генерируем семантическую палитру на основе пресета и режима
    const colors = ThemeColors.generate(palette, config.mode, isDark);
   // console.log('✅ ThemeColors.generate завершён');

    // 🔍 Проверка: есть ли canvas.inset?
    if (!colors.canvas) {
      console.error('❌ colors.canvas — undefined!');
      console.log('📋 Структура colors:', Object.keys(colors || {}));
      throw new Error('colors.canvas is undefined');
    }

    if (!colors.canvas.inset) {
      console.error('❌ colors.canvas.inset — undefined!');
     // console.log('📋 Структура colors.canvas:', Object.keys(colors.canvas || {}));
      throw new Error('colors.canvas.inset is undefined');
    }

  //  console.log('🟢 colors.canvas.inset существует:', typeof colors.canvas.inset);

    // Формируем tokenColors из JSON с подстановкой цветов
    const tokenColors = (tokenColorsConfig as unknown as TokenColorRule[]).map(rule => {
      const settings = { ...rule.settings };

      // Обрабатываем foreground и background
      (['foreground', 'background'] as const).forEach(key => {
        const value = settings[key];
        if (typeof value === 'string' && value.startsWith('{{')) {
         // console.log(`🔧 Шаблон найден: ${value}`);
          const match = value.match(/{{(.+?)}}(\d+)/);
          if (match) {
            const path = match[1]; // например, "syntax.inline"
            const alpha = parseInt(match[2], 10); // 10
         //   console.log(`🎯 Разобрано: path="${path}", alpha=${alpha}`);
            const [a, b] = path.split('.');
            const colorValue = (colors as any)[a]?.[b];
            if (colorValue) {
           //   console.log(`🎨 Цвет найден: ${path} → OKLCH`, colorValue);
              settings[key] = applyAlpha(colorValue, alpha);
          //    console.log(`✅ Применён HEX: ${settings[key]}`);
            } else {
              console.warn(`🟡 Цвет не найден для пути: ${path}`);
            }
          } else {
            console.warn(`❌ Не удалось разобрать шаблон: ${value}`);
          }
        }
      });

      return { ...rule, settings };
    });

    // Проверка на дубликаты scope
    const seenScopes = new Set<string>();
    const duplicates = new Set<string>();

    for (const rule of tokenColors) {
      const scopes = Array.isArray(rule.scope) ? rule.scope : [rule.scope];
      for (const scope of scopes) {
        if (seenScopes.has(scope)) {
          duplicates.add(scope);
        }
        seenScopes.add(scope);
      }
    }

    if (duplicates.size > 0) {
      console.warn(`[ThemeGenerator] Duplicate scopes: ${[...duplicates].join(', ')}`);
    }

    // Формируем объект темы в формате VS Code
    const theme = {
      name: config.name,
      type: config.type,
      semanticHighlighting: true,
      colors: {} as Record<string, string>,
      tokenColors
    };

    // Применяем цвета из ThemeElementName к теме
    for (const item of ThemeElementName) {
      try {
        const oklch = item.color(colors);
        theme.colors[item.name] = applyAlpha(oklch, item.Alpha);
      } catch (error) {
        console.error(`❌ Ошибка в item.color для "${item.name}":`, error);
        console.log('📋 item:', item);
        console.log('📋 colors structure:', Object.keys(colors));
        console.log('📋 colors.canvas?.inset:', !!colors.canvas?.inset);
        throw error;
      }
    }

    // Возвращаем конфигурацию и готовую тему
    return { config, theme };
  });
}