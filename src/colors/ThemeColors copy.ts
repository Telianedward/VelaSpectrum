// /**
//  * 
//  * src/colors/ThemeColors.ts
//  * 
//  * Генератор семантических цветов для Vela Spectrum.
//  * 
//  * Этот класс преобразует базовые цвета из `colorPalettePresets` в полную палитру,
//  * организованную по ролям (accent, success, danger и т.д.), с учётом режима (colorblind, highContrast и др.).
//  * 
//  * Все цвета возвращаются в формате OKLCH (l, c, h), где:
//  * - l: светлота [0..1]
//  * - c: насыщенность
//  * - h: тон (градусы)
//  * 
//  * Используется в ThemeGenerator для заполнения ThemeElementName.
//  * 
//  * @class ThemeColors
//  * 
//  */
// import OKLCHColorGenerator from './ColorConverter.js';

// // Импортируем типы
// import { type  DetailedPalette } from '../themes/colorPalettePresets.js';

// type ThemeMode = 'normal' | 'dimmed' | 'highContrast' | 'colorblind' | 'tritanopia';

// export class ThemeColors {
//   /**
//    * Генерирует полную палитру цветов на основе детализированного пресета и режима отображения.
//    * 
//    * @param {DetailedPalette} palette - Пресет с отдельными настройками для light/dark
//    * @param {ThemeMode} mode - Режим: normal, dimmed, highContrast, colorblind, tritanopia
//    * @param {boolean} isDark - Является ли тема тёмной
//    * @returns {Object} Объект с семантическими группами цветов (canvas, fg, accent и т.д.)
//    */
//   static generate(palette: DetailedPalette, mode: ThemeMode, isDark: boolean) {
//     // Выбираем нужную палитру по типу темы
//     const role = isDark ? palette.dark : palette.light;

//     // Вспомогательная функция для безопасного получения цвета
//     const getColor = (key: string): { l: number; c: number; h: number } => {
//       const colorName = ThemeColors.getNestedValue(role, key);
//       if (!colorName) {
//         console.warn(`Цвет для ключа "${key}" не найден`);
//         return { l: 0.5, c: 0.1, h: 220 }; // fallback
//       }
//       return this.getOklch(colorName);
//     };

//     // Получаем базовые цвета для коррекции
//     const accentBase = getColor('accent.fg');
//     const successBase = getColor('success.fg');
//     const dangerBase = getColor('danger.fg');
//     const warningBase = getColor('warning.fg');
//     const infoBase = getColor('info.fg');

//     // Коррекция для режимов
//     const hAccent = this.adjustHue(accentBase.h, mode);
//     const cAccent = this.adjustChroma(accentBase.c, mode);
//     const cSuccess = this.adjustChroma(successBase.c, mode);
//     const cDanger = this.adjustChroma(dangerBase.c, mode);
//     const cWarning = this.adjustChroma(warningBase.c, mode);
//     const cInfo = this.adjustChroma(infoBase.c, mode);

//     return {
//       /**
//        * Цвета фона и "холста" интерфейса.
//        * Используются для:
//        * - Фона редактора
//        * - Фона боковых панелей
//        * - Фона модальных окон
//        * 
//        * @example
//        * "editor.background": canvas.inset
//        * "sideBar.background": canvas.inset
//        */
//       canvas: {
//         inset: getColor('canvas.inset'),
//         overlay: getColor('canvas.overlay')
//       },

//       /**
//        * Цвета текста и иконок.
//        * Определяют читаемость и контраст.
//        * 
//        * @example
//        * "foreground": fg.default
//        * "sideBar.foreground": fg.default
//        */
//       fg: {
//         default: getColor('fg.default'),
//         muted: getColor('fg.muted'),
//         subtle: getColor('fg.subtle')
//       },

//       /**
//        * Акцентный цвет.
//        * Основной фирменный цвет темы (например, синий, фиолетовый).
//        * Используется для выделения активных элементов.
//        * 
//        * @example
//        * "activityBar.foreground": accent.fg
//        * "focusBorder": accent.emphasis
//        */
//       accent: {
//         fg: { l: 0.8, c: cAccent, h: hAccent },
//         emphasis: { l: 0.7, c: cAccent * 1.1, h: hAccent },
//         muted: { l: 0.6, c: cAccent * 0.8, h: hAccent }
//       },

//       /**
//        * Цвета для успешных действий (зелёные).
//        * Используются в Git (добавленные файлы), прогрессе, уведомлениях.
//        * 
//        * @example
//        * "gitDecoration.addedResourceForeground": success.emphasis
//        * "problems.errorForeground": success.fg
//        */
//       success: {
//         fg: { l: 0.7, c: cSuccess, h: successBase.h },
//         emphasis: { l: 0.6, c: cSuccess * 1.2, h: successBase.h },
//         muted: { l: 0.6, c: cSuccess * 0.8, h: getColor('success.muted').h }
//       },

//       /**
//        * Цвета для ошибок и критических ситуаций (красные).
//        * Используются в Git (удалённые файлы), ошибках, предупреждениях.
//        * 
//        * @example
//        * "gitDecoration.deletedResourceForeground": danger.muted
//        * "editorError.foreground": danger.fg
//        */
//       danger: {
//         fg: { l: 0.7, c: cDanger, h: dangerBase.h },
//         emphasis: { l: 0.6, c: cDanger * 1.2, h: dangerBase.h },
//         muted: { l: 0.6, c: cDanger * 0.8, h: getColor('danger.muted').h }
//       },

//       /**
//        * Цвета для предупреждений (жёлтые).
//        * В VS Code называется "severe", но по смыслу — это warning.
//        * 
//        * @example
//        * "editorWarning.foreground": severe.fg
//        */
//       severe: {
//         fg: { l: 0.8, c: cWarning, h: warningBase.h },
//         emphasis: { l: 0.7, c: cWarning * 0.9, h: warningBase.h },
//         muted: { l: 0.6, c: cWarning * 0.7, h: getColor('warning.muted').h }
//       },

//       /**
//        * Цвета для информационных сообщений (синие).
//        * Используются для подсказок, информации, вопросов.
//        * 
//        * @example
//        * "editorInfo.foreground": attention.fg
//        */
//       attention: {
//         fg: { l: 0.8, c: cInfo, h: infoBase.h },
//         emphasis: { l: 0.7, c: cInfo * 1.1, h: infoBase.h }
//       },

//       /**
//        * Цвета для спонсоров, платных функций, "поддержи проект".
//        * Обычно фиолетовые или розовые.
//        * 
//        * @example
//        * "sash.hoverBorder": sponsors.fg
//        */
//       sponsors: {
//         fg: { l: 0.75, c: cAccent * 0.9, h: getColor('sponsors.fg').h },
//         muted: { l: 0.6, c: cAccent * 0.7, h: getColor('sponsors.muted').h }
//       },

//       /**
//        * Цвета для "сделано", "выполнено".
//        * Часто используется в списках задач, прогрессе.
//        * 
//        * @example
//        * "list.completedTaskIcon.foreground": done.fg
//        */
//       done: {
//         fg: { l: 0.7, c: cSuccess * 0.9, h: getColor('done.fg').h },
//         emphasis: { l: 0.6, c: cSuccess * 1.1, h: getColor('done.emphasis').h },
//         muted: { l: 0.6, c: cSuccess * 0.6, h: getColor('done.muted').h }
//       },

//       /**
//        * Цвета для "закрыто".
//        * Используется в вкладках, задачах, тикетах.
//        * 
//        * @example
//        * "tab.inactiveModifiedBorder": closed.fg
//        */
//       closed: {
//         fg: { l: 0.6, c: cDanger * 0.9, h: getColor('closed.fg').h },
//             /**
//          * Более насыщенный акцент для выделения.
//          */
//         emphasis: { l: 0.6, c: cDanger * 1.2, h: getColor('closed.fg').h },
//         /**
//          * Приглушённая версия.
//          */
//         muted: { l: 0.6, c: cDanger * 0.8, h: getColor('closed.fg').h }
//       },

//       /**
//        * Цвета для "открыто".
//        * Используется в активных вкладках, задачах, файлах.
//        * 
//        * @example
//        * "tab.activeBorder": open.emphasis
//        */
//       open: {
//         fg: { l: 0.7, c: cSuccess * 0.8, h: getColor('open.fg').h },
//         emphasis: { l: 0.6, c: cSuccess * 1.0, h: getColor('open.emphasis').h }
//       },

//       /**
//        * ANSI-цвета для терминала.
//        * Полная 16-цветная палитра.
//        * 
//        * @example
//        * "terminal.ansiRed": ansi.red
//        * "terminal.ansiGreenBright": ansi.greenBright
//        */
//       ansi: {
//         black: getColor('ansi.black'),
//         red: getColor('ansi.red'),
//         green: getColor('ansi.green'),
//         yellow: getColor('ansi.yellow'),
//         blue: getColor('ansi.blue'),
//         magenta: getColor('ansi.magenta'),
//         cyan: getColor('ansi.cyan'),
//         white: getColor('ansi.white'),
//         blackBright: getColor('ansi.blackBright'),
//         redBright: getColor('ansi.redBright'),
//         greenBright: getColor('ansi.greenBright'),
//         yellowBright: getColor('ansi.yellowBright'),
//         blueBright: getColor('ansi.blueBright'),
//         magentaBright: getColor('ansi.magentaBright'),
//         cyanBright: getColor('ansi.cyanBright'),
//         whiteBright: getColor('ansi.whiteBright')
//       },

//       /**
//        * Нейтральные цвета (серые).
//        * Используются для границ, разделителей, фонов.
//        * 
//        * @example
//        * "border.muted": neutral.muted
//        * "list.hoverBackground": neutral.emphasis
//        */
//       neutral: {
//         muted: getColor('neutral.muted'),
//         emphasis: getColor('neutral.emphasis'),
//         emphasisPlus: getColor('neutral.emphasisPlus')
//       },

//       /**
//        * Цвета границ.
//        * Обычно приглушённые версии других цветов.
//        * 
//        * @example
//        * "editorGutter.addedBackground": border.muted
//        */
//       border: {
//         muted: getColor('border.muted')
//       },
//       /**
//        * Цвета для синтаксической и семантической подсветки кода.
//        * Используются в tokenColors для точной раскраски переменных, типов, функций и т.д.
//        */
//       syntax: {
//         // === Типы и структуры ===
//         type: getColor('syntax.type'),
//         enum: getColor('syntax.enum'),
//         interface: getColor('syntax.interface'),
//         class: getColor('syntax.class'),
//         struct: getColor('syntax.struct'),

//         // === Переменные и параметры ===
//         variable: getColor('syntax.variable'),
//         parameter: getColor('syntax.parameter'),
//         property: getColor('syntax.property'),
//         field: getColor('syntax.field'),
//         constant: getColor('syntax.constant'),
//         local: getColor('syntax.local'),

//         // === Функции и методы ===
//         function: getColor('syntax.function'),
//         method: getColor('syntax.method'),
//         arrowFunction: getColor('syntax.arrowFunction'),
//         constructor: getColor('syntax.constructor'),

//         // === Модули и пространства имён ===
//         module: getColor('syntax.module'),
//         namespace: getColor('syntax.namespace'),

//         // === Литералы ===
//         string: getColor('syntax.string'),
//         number: getColor('syntax.number'),
//         boolean: getColor('syntax.boolean'),
//         null: getColor('syntax.null'),
//         regexp: getColor('syntax.regexp'),
//         templateString: getColor('syntax.templateString'),

//         // === Ключевые слова и операторы ===
//         keyword: getColor('syntax.keyword'),
//         operator: getColor('syntax.operator'),
//         modifier: getColor('syntax.modifier'),
//         decorator: getColor('syntax.decorator'),
//         comment: getColor('syntax.comment'),

//         // === Ошибки и предупреждения ===
//         error: getColor('syntax.error'),
//         warning: getColor('syntax.warning'),
//         info: getColor('syntax.info'),
//         tag: getColor('blues'),
//         support: getColor('greens'),
//         punctuation: getColor('fg.muted'),
//         heading: getColor('accent.fg'),
//         quote: getColor('open.emphasis'),
//         embedded: getColor('closed.emphasis'),
//         inserted: getColor('done.emphasis'),
//         deleted: getColor('closed.emphasis'),
//         changed: getColor('severe.emphasis'),
//         ignored: getColor('neutral.emphasis'),
//         range: getColor('done.fg'),
//         header: getColor('accent.emphasis'),
//         separator: getColor('accent.emphasis'),
//         output: getColor('accent.emphasis'),
//         link: getColor('accent.fg'),
//         inline: getColor('accent.emphasis'),
//         emphasis: getColor('severe.emphasis'),
//         strong: getColor('severe.emphasis'),
//       },
//     };
//   }

//   /**
//    * Вспомогательная функция для получения вложенного значения
//    * Пример: getNestedValue(obj, 'canvas.inset') → obj.canvas.inset
//    */
//   private static getNestedValue(obj: any, path: string): string | undefined {
//     return path.split('.').reduce((current, key) => {
//       return current && current[key] !== undefined ? current[key] : undefined;
//     }, obj);
//   }

//   private static getOklch(colorName: string) {
//     const colorEntry = OKLCHColorGenerator.getColorRgb(colorName);
//     if (!colorEntry) throw new Error(`Цвет "${colorName}" не найден`);

//     const rgbColor = {
//       mode: 'rgb' as const,
//       r: colorEntry.rgb.r,
//       g: colorEntry.rgb.g,
//       b: colorEntry.rgb.b,
//       alpha: 1
//     };

//     return OKLCHColorGenerator.rgbToOKLCH(rgbColor);
//   }

//   private static adjustHue(h: number, mode: ThemeMode): number {
//     if (mode === 'colorblind') return h > 200 && h < 300 ? 250 : h;
//     if (mode === 'tritanopia') return h > 200 && h < 300 ? 200 : h;
//     return h;
//   }

//   private static adjustChroma(c: number, mode: ThemeMode): number {
//     if (mode === 'dimmed') return c * 0.7;
//     if (mode === 'highContrast') return Math.min(c * 1.3, 0.4);
//     return c;
//   }
// }