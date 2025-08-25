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

// === Типы ===

/**
 * Режим отображения темы.
 * 
 * Определяет, как цвета адаптируются под особенности восприятия.
 * 
 * @example
 * 'normal' — стандартный режим
 * 'colorblind' — коррекция для Protanopia/Deuteranopia
 * 'tritanopia' — коррекция для сине-фиолетовой слепоты
 * 'dimmed' — затемнённые акценты
 * 'highContrast' — увеличенный контраст
 */
export type ThemeMode = 'normal' | 'dimmed' | 'highContrast' | 'colorblind' | 'tritanopia';

/**
 * Тип UI-темы в VS Code.
 * 
 * Определяет базовую цветовую семантику редактора и используется для выбора
 * фонового режима (светлый, тёмный, высокий контраст).
 * 
 * @example
 * 'vs' — светлая тема
 * 'vs-dark' — тёмная тема
 * 'hc-black' — высокий контраст (чёрный фон)
 * 'hc-light' — высокий контраст (светлый фон)
 */
export type ThemeType = 'vs' | 'vs-dark' | 'hc-black' | 'hc-light';

/**
 * Конфигурация одной темы.
 * 
 * Определяет все параметры, необходимые для генерации темы VS Code.
 * 
 * @property {string} key - Уникальный ключ темы (используется в имени файла: `my-${key}.json`)
 * @property {string} name - Отображаемое имя темы в VS Code Marketplace
 * @property {ThemeType} type - Тип UI-темы (определяет базовый фон и контраст)
 * @property {string} accentColorName - Название акцентного цвета из `colors.json` (например, 'blues', 'yellows')
 * @property {ThemeMode} mode - Режим отображения (цветослепота, высокий контраст и т.д.)
 * @property {boolean} isDark - Определяет, является ли тема тёмной (`vs-dark`, `hc-black`) или светлой (`vs`, `hc-light`)
 * @property {Record<string, number>} [alphaOverrides] - Позволяет переопределить прозрачность для конкретных цветов
 * 
 * @example
 * {
 *   key: 'd',
 *   name: 'Vela Spectrum Dark+',
 *   type: 'vs-dark',
 *   accentColorName: 'blues',
 *   mode: 'normal'
 * }
 */
export type ThemeConfig = {
  /**
   * Краткий ключ темы, используется для генерации имени файла.
   * @example 'd' → my-d.json, 'dhc' → my-dhc.json
   */
  key: string;

  /**
   * Полное имя темы, отображаемое в VS Code.
   * @example 'Vela Spectrum Dark+'
   */
  name: string;

  /**
   * Тип UI-темы. Определяет базовую цветовую схему редактора.
   */
  type: ThemeType;

  /**
   * Название цвета из `src/colors/colors.json`, который будет использоваться как акцентный.
   * @example 'blues', 'yellows', 'reds', 'greens'
   */
  accentColorName: string;

  /**
   * Режим отображения темы (для доступности и восприятия).
   */
  mode: ThemeMode;
 /**
   * Определяет, является ли тема тёмной.
   * Используется для корректного расчёта светлоты (l) фона, текста и других элементов.
   * 
   * @example
   * true → 'vs-dark' или 'hc-black'
   * false → 'vs' или 'hc-light'
   */
  isDark: boolean;
  /**
   * Необязательное: переопределение прозрачности для конкретных цветов.
   * Ключ — имя цвета VS Code, значение — Alpha от 0 до 10 (где 10 = 100%).
   * @example { "editor.background": 8, "badge.background": 10 }
   */
  alphaOverrides?: Record<string, number>;

};

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
export const themeConfigs: ThemeConfig[] = [
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