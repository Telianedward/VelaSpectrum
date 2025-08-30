/**
 * Конфигурация тем Vela Spectrum.
 *
 * Этот файл определяет все доступные темы, их параметры и поведение.
 * Поддерживает: стандартные, высокий контраст, цветослепоту (Protanopia, Deuteranopia, Tritanopia),
 * затемнённые и светлые режимы.
 *
 * Темы генерируются динамически на основе базового цвета и режима отображения.
 *
 * @see {@link themeConfigs} — массив всех конфигураций тем
 * @module themes/config
 */
// === Конфигурации тем ===
/**
 * Массив всех конфигураций тем Vela Spectrum.
 *
 * Каждая тема — это комбинация:
 * - Типа (светлая/тёмная/высокий контраст)
 * - Акцентного цвета (из `colors.json`)
 * - Режима (нормальный, цветослепота, затемнённый)
 *
 * При генерации, каждый объект используется для создания `.json` файла в папке `/themes`.
 *
 * @constant {ThemeConfig[]}
 * @example
 * [
 *   { key: 'd', name: 'Vela Spectrum Dark+', type: 'vs-dark', accentColorName: 'blues', mode: 'normal' },
 *   { key: 'l', name: 'Vela Spectrum Light+', type: 'vs', accentColorName: 'blues', mode: 'normal' }
 * ]
 */
export const themeConfigs = [
    {
        key: 'd',
        name: 'Vela Spectrum Dark+',
        type: 'vs-dark',
        accentColorName: 'blues',
        mode: 'normal',
        isDark: true
    },
    {
        key: 'dd',
        name: 'Vela Spectrum Dark+ Dimmed',
        type: 'vs-dark',
        accentColorName: 'blues',
        mode: 'dimmed',
        isDark: true
    },
    {
        key: 'dhc',
        name: 'Vela Spectrum High Contrast',
        type: 'hc-black',
        accentColorName: 'blues',
        mode: 'highContrast',
        isDark: true
    },
    {
        key: 'dc',
        name: 'Vela Spectrum Dark+ Colorblind',
        type: 'vs-dark',
        accentColorName: 'blues',
        mode: 'colorblind',
        isDark: true
    },
    {
        key: 'dt',
        name: 'Vela Spectrum Dark+ Tritanopia',
        type: 'hc-black',
        accentColorName: 'blues',
        mode: 'tritanopia',
        isDark: true
    },
    {
        key: 'l',
        name: 'Vela Spectrum Light+',
        type: 'vs',
        accentColorName: 'blues',
        mode: 'normal',
        isDark: false
    },
    {
        key: 'lhc',
        name: 'Vela Spectrum High Contrast Light',
        type: 'hc-light',
        accentColorName: 'blues',
        mode: 'highContrast',
        isDark: false
    },
    {
        key: 'lc',
        name: 'Vela Spectrum Colorblind Light',
        type: 'vs',
        accentColorName: 'blues',
        mode: 'colorblind',
        isDark: false
    },
    {
        key: 'lt',
        name: 'Vela Spectrum Light+ Tritanopia',
        type: 'hc-light',
        accentColorName: 'blues',
        mode: 'tritanopia',
        isDark: false
    }
];
/**
 * @summary
 * Эта конфигурация позволяет:
 * - Легко добавлять новые темы (просто добавь объект в массив)
 * - Менять акцентный цвет (например, на 'yellows' или 'reds')
 * - Поддерживать доступность (colorblind, tritanopia)
 * - Генерировать темы автоматически
 *
 * @description
 * Все темы генерируются через `ThemeGenerator`, который:
 * 1. Берёт цвет из `colors.json`
 * 2. Конвертирует в OKLCH
 * 3. Применяет коррекции (для цветослепоты, контраста)
 * 4. Генерирует `.json` для VS Code
 *
 * Это обеспечивает **максимальную точность, согласованность и доступность**.
 */ 
//# sourceMappingURL=config.js.map