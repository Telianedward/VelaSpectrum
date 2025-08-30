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
export type ColorRole =
  | 'accent'         // Основной акцент (кнопки, иконки)
  | 'success'        // Успех (зелёный)
  | 'danger'         // Ошибка (красный)
  | 'warning'        // Предупреждение (жёлтый)
  | 'info'           // Информация (синий)
  | 'fg'             // Цвет текста
  | 'canvas'         // Фон редактора
  | 'border'         // Цвет границ и разделителей
  | 'neutral'        // Нейтральные серые (hover, subtle)
  | 'ansi'           // ANSI-цвета для терминала
  | 'sponsors'       // Цвета для платных функций
  | 'done'           // Выполненные задачи
  | 'closed'         // Закрытые элементы
  | 'open'           // Открытые элементы
  ;

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
  [key: string]: string | { [subKey: string]: string };
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
export const defaultPalette: DetailedPalette = {
  light: {
    canvas: {
      inset: 'frostWhite',
      overlay: 'mistGray'
    },
    fg: {
      default: 'neutrals',
      muted: 'slateInk',
      subtle: 'slateInk'
    },
    accent: {
      fg: 'blues',
      emphasis: 'blues',
      muted: 'mistGray'
    },
    success: {
      fg: 'greens',
      emphasis: 'greens',
      muted: 'mints'
    },
    danger: {
      fg: 'reds',
      emphasis: 'reds',
      muted: 'corals'
    },
    warning: {
      fg: 'yellows',
      emphasis: 'yellows',
      muted: 'yellows'
    },
    info: {
      fg: 'cerulean',
      emphasis: 'cerulean',
      muted: 'lavender'
    },
    sponsors: {
      fg: 'pinks',
      muted: 'pinks'
    },
    done: {
      fg: 'greens',
      emphasis: 'greens',
      muted: 'mints'
    },
    closed: {
      fg: 'reds'
    },
    open: {
      fg: 'blues',
      emphasis: 'blues'
    },
    ansi: {
      black: 'blacks',
      red: 'reds',
      green: 'greens',
      yellow: 'yellows',
      blue: 'blues',
      magenta: 'pinks',
      cyan: 'cerulean',
      white: 'frostWhite',
      blackBright: 'charcoalGray',
      redBright: 'reds',
      greenBright: 'greens',
      yellowBright: 'yellows',
      blueBright: 'blues',
      magentaBright: 'pinks',
      cyanBright: 'cerulean',
      whiteBright: 'frostWhite'
    },
    neutral: {
      muted: 'mistGray',
      emphasis: 'steelSlate',
      emphasisPlus: 'charcoalGray'
    },
    border: {
      muted: 'mistGray'
    },
     syntax: {
      // === Типы и структуры ===
      type: 'blues',           // class, interface, type
      enum: 'pinks',           // enum
      interface: 'blues',      // interface
      class: 'pinks',          // class
      struct: 'blues',         // struct (C++, Rust)

      // === Переменные и параметры ===
      variable: 'mints',           // обычные переменные
      parameter: 'greens',         // параметры функций
      property: 'blues',           // свойства объектов
      field: 'greens',             // поля классов
      constant: 'mints',           // константы (const, readonly)
      local: 'frostWhite',           // локальные переменные

      // === Функции и методы ===
      function: 'blues',           // обычные функции
      method: 'blues',             // методы
      arrowFunction: 'blues',      // стрелочные функции
      constructor: 'pinks',        // конструкторы

      // === Модули и пространства имён ===
      module: 'cerulean',          // модули, namespaces
      namespace: 'cerulean',

      // === Литералы ===
      string: 'darkcyan',          // строки
      number: 'red',               // числа
      boolean: 'yellows',          // boolean
      null: 'corals',              // null
      regexp: 'blues',             // регулярные выражения
      templateString: 'greens',    // шаблонные строки

      // === Ключевые слова ===
      keyword: 'blueviolet',       // ключевые слова
      operator: 'blues',           // операторы
      modifier: 'yellows',         // public, private, static, async
      decorator: 'pinks',          // @decorator
      comment: 'steelSlate',       // комментарии

      // === Ошибки и предупреждения ===
      error: 'reds',               // ошибки
      warning: 'yellows',          // предупреждения
      info: 'cerulean',            // информация

      // === Дополнительные синтаксические роли ===
      tag: 'blues',                // теги (HTML, JSX)
      support: 'greens',           // support-функции
      punctuation: 'steelSlate',   // пунктуация
      heading: 'blues',            // заголовки (markdown)
      quote: 'blues',              // цитаты
      embedded: 'reds',            // встроенные выражения
      inserted: 'greens',          // вставленный текст
      deleted: 'reds',             // удалённый текст
      changed: 'yellows',          // изменённый текст
      ignored: 'steelSlate',       // игнорируемый текст
      range: 'greens',             // диапазоны
      header: 'blues',             // заголовки
      separator: 'blues',          // разделители
      output: 'blues',             // вывод
      link: 'blues',               // ссылки
      inline: 'blues',             // inline-код
      emphasis: 'yellows',         // акцент (курсив)
      strong: 'yellows'            // сильное выделение (жирный)
    }

  },
  dark: {
    canvas: {
      inset: 'githubDarkBg',
      overlay: 'deepAbyss'
    },
    fg: {
      default: 'frostWhite',
      muted: 'steelSlate',
      subtle: 'steelSlate'
    },
    accent: {
      fg: 'blues',
      emphasis: 'blues',
      muted: 'slateInk'
    },
    success: {
      fg: 'greens',
      emphasis: 'greens',
      muted: 'mints'
    },
    danger: {
      fg: 'reds',
      emphasis: 'reds',
      muted: 'corals'
    },
    warning: {
      fg: 'yellows',
      emphasis: 'yellows',
      muted: 'yellows'
    },
    info: {
      fg: 'cerulean',
      emphasis: 'cerulean',
      muted: 'lavender'
    },
    sponsors: {
      fg: 'pinks',
      muted: 'pinks'
    },
    done: {
      fg: 'greens',
      emphasis: 'greens',
      muted: 'mints'
    },
    closed: {
      fg: 'reds'
    },
    open: {
      fg: 'blues',
      emphasis: 'blues'
    },
    ansi: {
      black: 'jetblack',
      red: 'reds',
      green: 'greens',
      yellow: 'yellows',
      blue: 'blues',
      magenta: 'pinks',
      cyan: 'cerulean',
      white: 'frostWhite',
      blackBright: 'charcoalGray',
      redBright: 'reds',
      greenBright: 'greens',
      yellowBright: 'yellows',
      blueBright: 'blues',
      magentaBright: 'pinks',
      cyanBright: 'cerulean',
      whiteBright: 'frostWhite'
    },
    neutral: {
      muted: 'charcoalGray',
      emphasis: 'slateInk',
      emphasisPlus: 'charcoalGray'
    },
    border: {
      muted: 'charcoalGray'
    },
    syntax: {
      // === Типы и структуры ===
      type: 'blues',
      enum: 'pinks',
      interface: 'blues',
      class: 'pinks',
      struct: 'blues',

      // === Переменные и параметры ===
      variable: 'mints',
      parameter: 'greens',
      property: 'blues',
      field: 'greens',
      constant: 'mints',
      local: 'githubDarkBg',

      // === Функции и методы ===
      function: 'blues',
      method: 'blues',
      arrowFunction: 'blues',
      constructor: 'pinks',

      // === Модули и пространства имён ===
      module: 'cerulean',
      namespace: 'cerulean',

      // === Литералы ===
      string: 'steelSlate',
      number: 'red',
      boolean: 'yellows',
      null: 'corals',
      regexp: 'blues',
      templateString: 'greens',

      // === Ключевые слова и операторы ===
      keyword: 'blueviolet',
      operator: 'blues',
      modifier: 'yellows',
      decorator: 'pinks',
      comment: 'steelSlate',

      // === Ошибки и предупреждения ===
      error: 'reds',
      warning: 'yellows',
      info: 'cerulean',

      // === Дополнительные синтаксические роли ===
      tag: 'blues',
      support: 'greens',
      punctuation: 'steelSlate',
      heading: 'blues',
      quote: 'blues',
      embedded: 'reds',
      inserted: 'greens',
      deleted: 'reds',
      changed: 'yellows',
      ignored: 'steelSlate',
      range: 'greens',
      header: 'blues',
      separator: 'blues',
      output: 'blues',
      link: 'blues',
      inline: 'blues',
      emphasis: 'yellows',
      strong: 'yellows'
    }
  }
};

/**
 * Все доступные пресеты.
 *
 * Используется в `ThemeGenerator` для выбора палитры.
 *
 * @example
 * palettes.default → defaultPalette
 * palettes.blue → bluePalette
 */
export const palettes = {
  default: defaultPalette
};