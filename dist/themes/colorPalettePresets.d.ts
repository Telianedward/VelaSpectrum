/**
 * Пресеты цветовых палитр для Vela Spectrum.
 *
 * Этот файл определяет **цветовые схемы (пресеты)**, которые используются
 * для генерации тем VS Code. Каждый пресет указывает, какие базовые цвета
 * из `colors.json` использовать для каждой **семантической роли**.
 *
 * ## Зачем это нужно?
 *
 * Вместо жёсткой привязки к конкретным HEX-кодам, мы используем **абстракцию**:
 * - `accent` → основной акцентный цвет
 * - `success` → цвет для успеха
 * - `canvas` → фон редактора
 *
 * Это позволяет:
 * - ✅ Генерировать множество тем из одного шаблона
 * - ✅ Легко переключаться между цветовыми стилями
 * - ✅ Поддерживать согласованность цветов
 * - ✅ Создавать темы вроде "зелёная", "пастельная", "GitHub Dark" — одной строкой
 *
 * ## Как использовать?
 *
 * 1. Определи пресет (например, `bluePalette`)
 * 2. Передай его в `ThemeColors.generate(palette, mode)`
 * 3. Система автоматически создаст все оттенки (fg, accent.emphasis и т.д.)
 *
 * ## Как добавить новый пресет?
 *
 * 1. Добавь цвет в `colors.json` (если нужно)
 * 2. Создай новый `ColorPalette` (например, `solarizedPalette`)
 * 3. Добавь его в `palettes`
 * 4. Используй в `main.ts` через `--palette solarized`
 *
 * @module colorPalettePresets
 */
/**
 * Семантические роли, которые определяет каждый пресет.
 *
 * Каждая роль соответствует логической части интерфейса.
 *
 * @example
 * accent: 'blues' — основной акцентный цвет
 * canvas: 'githubDarkBg' — фон редактора
 * border: 'mistGray' — цвет границ
 */
export type ColorRole = 'accent' | 'success' | 'danger' | 'warning' | 'info' | 'fg' | 'canvas' | 'border' | 'neutral' | 'ansi' | 'sponsors' | 'done' | 'closed' | 'open';
/**
 * Цветовая палитра.
 *
 * Определяет, какой базовый цвет из `colors.json` использовать для каждой роли.
 *
 * Ключ — роль, значение — **ключ цвета** из `colors.json` (например, 'blues', 'greens').
 *
 * @example
 * {
 *   accent: 'blues',
 *   canvas: 'githubDarkBg'
 * }
 */
export type ColorPalette = {
    [key in ColorRole]: string;
};
/**
 * Вложенная структура для детализированных цветов.
 * Позволяет задавать цвета для подролей: accent.fg, fg.muted и т.д.
 */
export type DetailedColorGroup = {
    [key: string]: string | {
        [subKey: string]: string;
    };
};
/**
 * Полный пресет с отдельными настройками для светлой и тёмной темы.
 * Поддерживает детализированные группы: canvas, fg, accent и т.д.
 */
export type DetailedPalette = {
    light: DetailedColorGroup;
    dark: DetailedColorGroup;
};
/**
 * Пресет: Тема по умолчанию с детализацией для light и dark.
 *
 * Позволяет задавать отдельные цвета для светлой и тёмной версий,
 * включая вложенные роли (canvas.inset, fg.muted и т.д.).
 *
 * Это даёт полный контроль над внешним видом темы.
 */
export declare const defaultPalette: DetailedPalette;
/**
 * Все доступные пресеты.
 *
 * Используется в `ThemeGenerator` для выбора палитры.
 *
 * @example
 * palettes.default → defaultPalette
 * palettes.blue → bluePalette
 */
export declare const palettes: {
    default: DetailedPalette;
};
//# sourceMappingURL=colorPalettePresets.d.ts.map