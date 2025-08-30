// //canvas.inset
// //fg.default
// //success.emphasis
// //border.muted
// //fg.muted
// //accent.muted
// //accent.fg
// //success.fg
// //danger.muted
// //danger.fg
// //severe.muted
// //severe.fg
// //attention.fg
// //attention.emphasis
// //sponsors.fg
// //done.emphasis
// //closed.fg
// //done.fg
// //severe.emphasis
// //sponsors.muted
// //ansi.black
// //ansi.red
// //ansi.green
// //ansi.yellow
// //ansi.blue
// //ansi.magenta
// //ansi.cyan
// //ansi.white
// //ansi.blackBright
// //ansi.redBright
// //ansi.greenBright
// //ansi.yellowBright
// //ansi.blueBright
// //ansi.magentaBright
// //ansi.cyanBright
// //ansi.whiteBright
// //neutral.emphasis
// //neutral.emphasisPlus
// //neutral.muted
// //success.muted
// //danger.emphasis
// //open.fg
// //open.emphasis
// //fg.subtle
// //accent.fg
export {};
// //To see the editor indent guides, set "editor.guides.indentation": true and "editor.guides.highlightActiveIndentation": true.
// type ThemeColorValue = string;
// interface ThemeColors {
//   canvas: { inset: ThemeColorValue };
//   fg: { default: ThemeColorValue; muted: ThemeColorValue; subtle: ThemeColorValue };
//   success: { emphasis: ThemeColorValue; fg: ThemeColorValue; muted: ThemeColorValue };
//   border: { muted: ThemeColorValue };
//   accent: { muted: ThemeColorValue; fg: ThemeColorValue };
//   danger: { muted: ThemeColorValue; fg: ThemeColorValue; emphasis: ThemeColorValue };
//   severe: { muted: ThemeColorValue; fg: ThemeColorValue; emphasis: ThemeColorValue };
//   attention: { fg: ThemeColorValue; emphasis: ThemeColorValue };
//   sponsors: { fg: ThemeColorValue; muted: ThemeColorValue };
//   done: { muted: ThemeColorValue; emphasis: ThemeColorValue; fg: ThemeColorValue };
//   closed: { fg: ThemeColorValue };
//   open: { fg: ThemeColorValue; emphasis: ThemeColorValue };
//   ansi: {
//     black: ThemeColorValue;
//     red: ThemeColorValue;
//     green: ThemeColorValue;
//     yellow: ThemeColorValue;
//     blue: ThemeColorValue;
//     magenta: ThemeColorValue;
//     cyan: ThemeColorValue;
//     white: ThemeColorValue;
//     blackBright: ThemeColorValue;
//     redBright: ThemeColorValue;
//     greenBright: ThemeColorValue;
//     yellowBright: ThemeColorValue;
//     blueBright: ThemeColorValue;
//     magentaBright: ThemeColorValue;
//     cyanBright: ThemeColorValue;
//     whiteBright: ThemeColorValue;
//   };
//   neutral: { emphasis: ThemeColorValue; emphasisPlus: ThemeColorValue; muted: ThemeColorValue };
// }
// const ThemeColors: ThemeColors = {
//   canvas: { inset: "canvas.inset" },
//   fg: {
//     default: "fg.default",
//     muted: "fg.muted",
//     subtle: "fg.subtle"
//   },
//   success: {
//     emphasis: "success.emphasis",
//     fg: "success.fg",
//     muted: "success.muted"
//   },
//   border: { muted: "border.muted" },
//   accent: {
//     muted: "accent.muted",
//     fg: "accent.fg"
//   },
//   danger: {
//     muted: "danger.muted",
//     fg: "danger.fg",
//     emphasis: "danger.emphasis"
//   },
//   severe: {
//     muted: "severe.muted",
//     fg: "severe.fg",
//     emphasis: "severe.emphasis"
//   },
//   attention: {
//     fg: "attention.fg",
//     emphasis: "attention.emphasis"
//   },
//   sponsors: {
//     fg: "sponsors.fg",
//     muted: "sponsors.muted"
//   },
//   done: {
//     muted: "done.muted",
//     emphasis: "done.emphasis",
//     fg: "done.fg"
//   },
//   closed: { fg: "closed.fg" },
//   open: {
//     fg: "open.fg",
//     emphasis: "open.emphasis"
//   },
//   ansi: {
//     black: "ansi.black",
//     red: "ansi.red",
//     green: "ansi.green",
//     yellow: "ansi.yellow",
//     blue: "ansi.blue",
//     magenta: "ansi.magenta",
//     cyan: "ansi.cyan",
//     white: "ansi.white",
//     blackBright: "ansi.blackBright",
//     redBright: "ansi.redBright",
//     greenBright: "ansi.greenBright",
//     yellowBright: "ansi.yellowBright",
//     blueBright: "ansi.blueBright",
//     magentaBright: "ansi.magentaBright",
//     cyanBright: "ansi.cyanBright",
//     whiteBright: "ansi.whiteBright"
//   },
//   neutral: {
//     emphasis: "neutral.emphasis",
//     emphasisPlus: "neutral.emphasisPlus",
//     muted: "neutral.muted"
//   }
// };
// export const ThemeElementNAme = [
//   /**
//  * Contrast Colors
//  *
//  * Цвета контрастности, которые используются в темах высокой контрастности (HC).
//  * Добавляют дополнительные границы для улучшения различимости элементов интерфейса.
//  *
//  * @see https://code.visualstudio.com/api/references/theme-color#contrast-colors
//  */
//   {
//     "name": "contrastBorder",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Дополнительная граница вокруг элементов, чтобы отделить их от других для большего контраста."
//   },
//   {
//     "name": "contrastActiveBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Дополнительная граница вокруг активных элементов для повышения контраста."
//   },
//   /**
//    * Base Colors
//    *
//    * Базовые цвета темы, используемые по умолчанию, если компонент не переопределяет их.
//    * Служат фундаментом для всех остальных цветовых определений.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#base-colors
//    */
//   {
//     "name": "foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 5,
//     "description": "Общий цвет текста. Используется, если компонент не задаёт свой."
//   },
//   {
//     "name": "disabledForeground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Цвет текста для отключённых элементов интерфейса."
//   },
//   {
//     "name": "focusBorder",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 5,
//     "description": "Общая граница вокруг сфокусированных элементов. Используется, если компонент не задаёт свою."
//   },
//   {
//     "name": "widget.border",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Цвет границы виджетов, таких как поиск/замена в редакторе."
//   },
//   {
//     "name": "widget.shadow",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Тень виджетов, например, диалогов поиска."
//   },
//   {
//     "name": "selection.background",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон выделенного текста в полях ввода (не в редакторе или терминале)."
//   },
//   {
//     "name": "descriptionForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста описания, например, подсказки к метке."
//   },
//   {
//     "name": "errorForeground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Общий цвет текста ошибок, если не переопределён компонентом."
//   },
//   {
//     "name": "icon.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 5,
//     "description": "Цвет по умолчанию для иконок в интерфейсе."
//   },
//   {
//     "name": "sash.hoverBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет границы разделителя (sash) при наведении."
//   },
//   /**
//  * Window Border
//  *
//  * Цвета границы окна VS Code.
//  * Поддерживаются только на macOS и Linux при кастомной строке заголовка.
//  * Не работают на Windows.
//  *
//  * @see https://code.visualstudio.com/api/references/theme-color#window-border
//  * 
//  * Цвета границ окна поддерживаются только на MacOS и Linux (не Windows) и только тогда, когда включен настраиваемая строка заголовка ("window.titlebarstyle": "Custom").
//  * 
//  */
//   {
//     "name": "window.activeBorder",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет границы активного (сфокусированного) окна."
//   },
//   {
//     "name": "window.inactiveBorder",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет границы неактивного окна."
//   },
//   // Примечание: window.titleBarStyle — это настройка, а не цвет. Не включается в theme.json.
//   /**
//   * Text Colors
//   *
//   * Цвета, используемые внутри текстовых документов, например, на приветственной странице или в Markdown.
//   * Включают стилизацию цитат, ссылок, выделений и других элементов текста.
//   *
//   * @see https://code.visualstudio.com/api/references/theme-color#text-colors
//   */
//   {
//     "name": "textBlockQuote.background",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Фон блок-цитат в тексте."
//   },
//   {
//     "name": "textBlockQuote.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы блок-цитат в тексте."
//   },
//   {
//     "name": "textCodeBlock.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон кодовых блоков в тексте (например, в Markdown)."
//   },
//   {
//     "name": "textLink.foreground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет ссылок в тексте."
//   },
//   {
//     "name": "textLink.activeForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет ссылок при наведении и клике."
//   },
//   {
//     "name": "textPreformat.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста в предварительно отформатированных блоках (preformatted text)."
//   },
//   {
//     "name": "textPreformat.background",
//     "color": ThemeColors.fg.default,
//     "Alpha": 3,
//     "description": "Фон предварительно отформатированных текстовых сегментов."
//   },
//   {
//     "name": "textSeparator.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет разделителей в тексте."
//   },
//   /**
//    * Action Colors
//    *
//    * Набор цветов для управления взаимодействиями с действиями по всему рабочему столу (workbench).
//    * Включает цвета для панелей инструментов, списков действий и других интерактивных элементов.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#action-colors
//    */
//   {
//     "name": "toolbar.activeBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон панели инструментов при удерживании курсора над действиями."
//   },
//   {
//     "name": "toolbar.hoverBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон панели инструментов при наведении курсора на действия."
//   },
//   {
//     "name": "toolbar.hoverOutline",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Цвет обводки на панели инструментов при наведении курсора на действия."
//   },
//   {
//     "name": "editorActionList.background",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Цвет фона списка действий в редакторе."
//   },
//   {
//     "name": "editorActionList.foreground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Цвет текста в списке действий в редакторе."
//   },
//   {
//     "name": "editorActionList.focusForeground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Цвет текста выбранного элемента в списке действий редактора."
//   },
//   {
//     "name": "editorActionList.focusBackground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Цвет фона выбранного элемента в списке действий редактора."
//   },
//   /**
//    * Button Control
//    *
//    * Набор цветов для виджетов кнопок, таких как кнопка «Открыть папку» в обозревателе нового окна.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#button-control
//    */
//   // === Кнопки ===
//   {
//     "name": "button.background",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет фона кнопки."
//   },
//   {
//     "name": "button.border",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Цвет рамки кнопки."
//   },
//   {
//     "name": "button.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста кнопки."
//   },
//   {
//     "name": "button.hoverBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Цвет фона кнопки при наведении курсора."
//   },
//   {
//     "name": "button.secondaryBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет фона второстепенной кнопки."
//   },
//   {
//     "name": "button.secondaryforeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста второстепенной кнопки."
//   },
//   {
//     "name": "button.secondaryHoverBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Цвет фона второстепенной кнопки при наведении."
//   },
//   {
//     "name": "button.separator",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Цвет разделителя между кнопками."
//   },
//   // === Чекбоксы ===
//   {
//     "name": "checkbox.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Цвет фона виджета чекбокса."
//   },
//   {
//     "name": "checkbox.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет рамки чекбокса."
//   },
//   {
//     "name": "checkbox.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет переднего плана (иконки/галочки) чекбокса."
//   },
//   {
//     "name": "checkbox.disabled.background",
//     "color": ThemeColors.fg.default,
//     "Alpha": 3,
//     "description": "Фон чекбокса в отключенном состоянии."
//   },
//   {
//     "name": "checkbox.disabled.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 5,
//     "description": "Цвет переднего плана чекбокса в отключенном состоянии."
//   },
//   {
//     "name": "checkbox.selectBackground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет фона чекбокса, когда элемент, в котором он находится, выбран."
//   },
//   {
//     "name": "checkbox.selectBorder",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет рамки чекбокса, когда элемент, в котором он находится, выбран."
//   },
//   // === Радио-кнопки ===
//   {
//     "name": "radio.activeForeground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Цвет переднего плана активной радио-опции."
//   },
//   {
//     "name": "radio.activeBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Цвет фона активной радио-опции."
//   },
//   {
//     "name": "radio.activeBorder",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Цвет рамки активной радио-опции."
//   },
//   {
//     "name": "radio.inactiveForeground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Цвет переднего плана неактивной радио-опции."
//   },
//   {
//     "name": "radio.inactiveBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Цвет фона неактивной радио-опции."
//   },
//   {
//     "name": "radio.inactiveBorder",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Цвет рамки неактивной радио-опции."
//   },
//   {
//     "name": "radio.inactiveHoverBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Цвет фона неактивной радио-опции при наведении курсора."
//   },
//   /**
//    * Dropdown Control
//    *
//    * Набор цветов для всех раскрывающихся виджетов, таких как в интегрированном терминале или на панели вывода.
//    * Обратите внимание, что раскрывающийся элемент не используется в macOS в настоящее время.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#dropdown-control
//    */
//   {
//     "name": "dropdown.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Цвет фона выпадающего списка."
//   },
//   {
//     "name": "dropdown.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет рамки выпадающего списка."
//   },
//   {
//     "name": "dropdown.foreground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет текста в выпадающем списке."
//   },
//   {
//     "name": "dropdown.listBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет фона списка внутри выпадающего элемента."
//   },
//   /**
//   * Input Control
//   *
//   * Цвета для элементов управления вводом, таких как поля ввода в панели поиска, диалоге «Найти и заменить»,
//   * а также в других интерфейсных элементах (например, выпадающие списки, input-поля).
//   *
//   * @see https://code.visualstudio.com/api/references/theme-color#input-control
//   */
//   {
//     "name": "input.background",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Цвет фона поля ввода."
//   },
//   {
//     "name": "input.border",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 4,
//     "description": "Цвет рамки поля ввода."
//   },
//   {
//     "name": "input.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста в поле ввода."
//   },
//   {
//     "name": "input.placeholderForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста-заполнителя (placeholder) в поле ввода."
//   },
//   {
//     "name": "inputOption.activeBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет фона активированного варианта выбора в полях ввода (например, в выпадающих опциях)."
//   },
//   {
//     "name": "inputOption.activeBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет рамки активированного варианта выбора в полях ввода."
//   },
//   {
//     "name": "inputOption.activeForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста активированного варианта выбора в полях ввода."
//   },
//   {
//     "name": "inputOption.hoverBackground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 3,
//     "description": "Цвет фона при наведении на активированный вариант выбора в поле ввода."
//   },
//   {
//     "name": "inputValidation.errorBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 5,
//     "description": "Цвет фона поля ввода при валидации с уровнем ошибки."
//   },
//   {
//     "name": "inputValidation.errorBorder",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 5,
//     "description": "Цвет рамки поля ввода при валидации с уровнем ошибки."
//   },
//   {
//     "name": "inputValidation.errorForeground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 5,
//     "description": "Цвет текста в поле ввода при валидации с уровнем ошибки."
//   },
//   {
//     "name": "inputValidation.infoBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 5,
//     "description": "Цвет фона поля ввода при валидации с информационным уровнем."
//   },
//   {
//     "name": "inputValidation.infoBorder",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет рамки поля ввода при валидации с информационным уровнем."
//   },
//   {
//     "name": "inputValidation.infoForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет текста в поле ввода при валидации с информационным уровнем."
//   },
//   {
//     "name": "inputValidation.warningBackground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет фона поля ввода при валидации с уровнем предупреждения."
//   },
//   {
//     "name": "inputValidation.warningBorder",
//     "color": ThemeColors.danger.fg,
//     "Alpha": 5,
//     "description": "Цвет рамки поля ввода при валидации с уровнем предупреждения."
//   },
//   {
//     "name": "inputValidation.warningForeground",
//     "color": ThemeColors.danger.fg,
//     "Alpha": 5,
//     "description": "Цвет текста в поле ввода при валидации с уровнем предупреждения."
//   },
//   /**
//    * Scrollbar Control
//    *
//    * Цвета для элементов управления полосы прокрутки: фон, тень, состояния наведения и активного выбора.
//    * Используются в редакторе, панелях и виджетах с прокруткой.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#scrollbar-control
//    */
//   {
//     "name": "scrollbar.shadow",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Тень ползунка прокрутки, указывает, что представление прокручивается."
//   },
//   {
//     "name": "scrollbarSlider.activeBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет фона ползунка прокрутки при активном нажатии."
//   },
//   {
//     "name": "scrollbarSlider.background",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет фона ползунка прокрутки в обычном состоянии."
//   },
//   {
//     "name": "scrollbarSlider.hoverBackground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет фона ползунка прокрутки при наведении курсора."
//   },
//   /**
//    * Badge
//    *
//    * Цвета для бейджей — небольших информационных меток, например, счётчика найденных результатов в поиске.
//    * Используются в панели активности, заголовках панелей, поиске и других элементах интерфейса.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#badge
//    */
//   {
//     "name": "badge.background",
//     "color": ThemeColors.accent.muted,
//     "Alpha": 7,
//     "description": "Цвет фона бейджа."
//   },
//   {
//     "name": "badge.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста бейджа."
//   },
//   /**
//    * Progress Bar
//    *
//    * Цвет фона индикатора прогресса, отображаемого при выполнении длительных операций
//    * (например, загрузка расширений, запуск задач, инициализация окна).
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#progress-bar
//    */
//   {
//     "name": "progressBar.background",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет фона индикатора прогресса при выполнении длительных операций."
//   },
//   /**
//    * Lists and Trees
//    *
//    * Цвета для списков и деревьев (например, Обозреватель файлов).
//    * Активный список/дерево имеет фокус клавиатуры, неактивный — нет.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#lists-and-trees
//    */
//   {
//     "name": "list.activeSelectionBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет фона выбранного элемента в списке/дереве, когда оно активно (имеет фокус)."
//   },
//   {
//     "name": "list.activeSelectionForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста выбранного элемента в списке/дереве, когда оно активно."
//   },
//   {
//     "name": "list.activeSelectionIconForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет иконки выбранного элемента в списке/дереве, когда оно активно."
//   },
//   {
//     "name": "list.deemphasizedForeground",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 10,
//     "description": "Цвет текста элементов в списке/дереве, которые приглушены (например, скрытые файлы)."
//   },
//   {
//     "name": "list.dropBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет фона при перетаскивании элементов в списке/дереве."
//   },
//   {
//     "name": "list.errorForeground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет текста элементов списка, содержащих ошибки (например, недоступные папки)."
//   },
//   {
//     "name": "list.filterMatchBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 4,
//     "description": "Цвет фона подсветки совпадений при поиске в списке/дереве."
//   },
//   {
//     "name": "list.filterMatchBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 6,
//     "description": "Цвет рамки вокруг подсвеченных совпадений при поиске в списке/дереве."
//   },
//   {
//     "name": "list.focusAndSelectionOutline",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет обводки вокруг элемента, который выбран и в фокусе, в активном списке/дереве."
//   },
//   {
//     "name": "list.focusBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет фона элемента, находящегося в фокусе (но не обязательно выбранного) в активном списке/дереве."
//   },
//   {
//     "name": "list.focusForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 5,
//     "description": "Цвет текста элемента в фокусе в активном списке/дереве."
//   },
//   {
//     "name": "list.focusHighlightForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет текста подсвеченных совпадений на активно фокусируемом элементе при поиске."
//   },
//   {
//     "name": "list.focusOutline",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет обводки вокруг элемента в фокусе в активном списке/дереве."
//   },
//   {
//     "name": "list.highlightForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста подсвеченных совпадений при поиске в списке/дереве."
//   },
//   {
//     "name": "list.hoverBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Цвет фона при наведении курсора на элемент списка/дерева."
//   },
//   {
//     "name": "list.hoverForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста при наведении курсора на элемент списка/дерева."
//   },
//   {
//     "name": "list.inactiveFocusBackground",
//     "color": ThemeColors.neutral.emphasis,
//     "Alpha": 5,
//     "description": "Цвет фона элемента в фокусе, когда список неактивен (нет фокуса клавиатуры)."
//   },
//   {
//     "name": "list.inactiveFocusOutline",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 9,
//     "description": "Цвет обводки вокруг элемента в фокусе, когда список неактивен."
//   },
//   {
//     "name": "list.inactiveSelectionBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Цвет фона выбранного элемента, когда список/дерево неактивно."
//   },
//   {
//     "name": "list.inactiveSelectionForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста выбранного элемента, когда список/дерево неактивно."
//   },
//   {
//     "name": "list.inactiveSelectionIconForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет иконки выбранного элемента, когда список/дерево неактивно."
//   },
//   {
//     "name": "list.invalidItemForeground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 4,
//     "description": "Цвет текста недопустимых элементов в списке (например, неразрешённый корень)."
//   },
//   {
//     "name": "list.warningForeground",
//     "color": ThemeColors.severe.muted,
//     "Alpha": 10,
//     "description": "Цвет текста элементов списка, содержащих предупреждения."
//   },
//   {
//     "name": "listFilterWidget.background",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет фона виджета фильтрации при поиске в списке/дереве."
//   },
//   {
//     "name": "listFilterWidget.noMatchesOutline",
//     "color": ThemeColors.neutral.emphasis,
//     "Alpha": 5,
//     "description": "Цвет обводки виджета фильтрации, если совпадений не найдено."
//   },
//   {
//     "name": "listFilterWidget.outline",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 4,
//     "description": "Цвет обводки виджета фильтрации при вводе текста поиска."
//   },
//   {
//     "name": "listFilterWidget.shadow",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет тени виджета фильтрации в списках и деревьях."
//   },
//   {
//     "name": "tree.indentGuidesStroke",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет линий отступов в дереве (guides для вложенности)."
//   },
//   {
//     "name": "tree.tableColumnsBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет рамки между столбцами в табличном представлении дерева."
//   },
//   {
//     "name": "tree.tableOddRowsBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет фона для нечётных строк в табличном представлении дерева."
//   },
//   {
//     "name": "list.dropBetweenBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 5,
//     "description": "Цвет границы при перетаскивании элемента между другими элементами в списке или дереве."
//   },
//   {
//     "name": "tree.inactiveIndentGuidesStroke",
//     "color": ThemeColors.border.muted,
//     "Alpha": 5,
//     "description": "Цвет линий отступов в дереве, когда оно неактивно (не имеет фокуса)."
//   },
//   {
//     "name": "list.focusAndSelectionBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет фона элемента, который одновременно выбран и находится в фокусе в активном списке/дереве."
//   },
//   /**
//    * Activity Bar
//    *
//    * Цвета для панели активности — вертикальной панели слева/справа, содержащей иконки для переключения между панелями (например, Обозреватель, Поиск, Git).
//    * Поддерживает верхнее/нижнее положение (в этом случае используются .Top-цвета).
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#activity-bar
//    */
//   {
//     "name": "activityBar.activeBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фоновый цвет активного элемента в панели активности."
//   },
//   {
//     "name": "activityBar.activeBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет границы (индикатора) активного элемента в панели активности."
//   },
//   {
//     "name": "activityBar.activeFocusBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет обводки фокуса для активного элемента в панели активности."
//   },
//   {
//     "name": "activityBar.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фоновый цвет панели активности (по бокам)."
//   },
//   {
//     "name": "activityBar.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы между панелью активности и боковой панелью."
//   },
//   {
//     "name": "activityBar.dropBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет обратной связи при перетаскивании элементов на панель активности."
//   },
//   {
//     "name": "activityBar.foreground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 8,
//     "description": "Цвет иконок в панели активности (активных)."
//   },
//   {
//     "name": "activityBar.inactiveForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 5,
//     "description": "Цвет иконок в панели активности, когда они неактивны."
//   },
//   {
//     "name": "activityBarBadge.background",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Фон уведомительного бейджа на иконке панели активности."
//   },
//   {
//     "name": "activityBarBadge.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста уведомительного бейджа на иконке панели активности."
//   },
//   {
//     "name": "activityBarTop.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фоновый цвет панели активности, когда она расположена сверху/снизу."
//   },
//   {
//     "name": "activityBarTop.foreground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 8,
//     "description": "Цвет активной иконки в панели активности при положении сверху."
//   },
//   {
//     "name": "activityBarTop.inactiveForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 5,
//     "description": "Цвет неактивных иконок в панели активности при положении сверху."
//   },
//   {
//     "name": "activityBarTop.activeBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон активного элемента в панели активности при положении сверху."
//   },
//   {
//     "name": "activityBarTop.activeBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет границы активного элемента в панели активности при положении сверху."
//   },
//   {
//     "name": "activityBarTop.dropBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет при перетаскивании элемента на панель активности в режиме «сверху»."
//   },
//   {
//     "name": "activityWarningBadge.foreground",
//     "color": ThemeColors.severe.fg,
//     "Alpha": 10,
//     "description": "Цвет текста бейджа с предупреждением в панели активности."
//   },
//   {
//     "name": "activityWarningBadge.background",
//     "color": ThemeColors.severe.muted,
//     "Alpha": 10,
//     "description": "Цвет фона бейджа с предупреждением в панели активности."
//   },
//   {
//     "name": "activityErrorBadge.foreground",
//     "color": ThemeColors.danger.fg,
//     "Alpha": 10,
//     "description": "Цвет текста бейджа с ошибкой в панели активности."
//   },
//   {
//     "name": "activityErrorBadge.background",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет фона бейджа с ошибкой в панели активности."
//   },
//   /**
//    * Profiles
//    *
//    * Цвета для элементов управления профилями, включая бейдж профиля в панели активности и границы разделителей в редакторе профилей.
//    * Бейдж профиля отображается поверх значка настроек в панели активности.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#profiles
//    */
//   {
//     "name": "profileBadge.background",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет фона бейджа профиля, отображаемого над значком настроек в панели активности."
//   },
//   {
//     "name": "profileBadge.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста или иконки в бейдже профиля."
//   },
//   {
//     "name": "profiles.sashBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы (разделителя) в редакторе профилей при изменении размера панелей."
//   },
//   /**
//    * Side Bar
//    *
//    * Цвета для боковой панели, которая содержит представления, такие как Обозреватель, Поиск, Git и другие.
//    * Включает стили заголовка, секций, границ и эффектов при перетаскивании.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#side-bar
//    */
//   {
//     "name": "sideBar.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Цвет фона боковой панели."
//   },
//   {
//     "name": "sideBar.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 5,
//     "description": "Цвет текста по умолчанию в боковой панели."
//   },
//   {
//     "name": "sideBar.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы между боковой панелью и редактором."
//   },
//   {
//     "name": "sideBar.dropBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет подсказки при перетаскивании элементов в боковую панель. Должен быть полупрозрачным, чтобы содержимое панели было видно."
//   },
//   {
//     "name": "sideBarSectionHeader.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Цвет фона заголовка секции в боковой панели (например, «Приложения», «Настройки»)."
//   },
//   {
//     "name": "sideBarSectionHeader.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 7,
//     "description": "Цвет текста заголовка секции в боковой панели."
//   },
//   {
//     "name": "sideBarSectionHeader.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы у заголовка секции в боковой панели."
//   },
//   {
//     "name": "sideBarTitle.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 5,
//     "description": "Цвет текста заголовка боковой панели (например, «Обозреватель»)."
//   },
//   {
//     "name": "sideBarTitle.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Цвет фона заголовка боковой панели."
//   },
//   {
//     "name": "sideBarTitle.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет нижней границы заголовка боковой панели, отделяющей его от содержимого."
//   },
//   {
//     "name": "sideBarActivityBarTop.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы между панелью активности (в режиме сверху/снизу) и боковыми панелями."
//   },
//   {
//     "name": "sideBarStickyScroll.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Цвет фона «липкой» прокрутки в боковой панели."
//   },
//   {
//     "name": "sideBarStickyScroll.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы «липкой» прокрутки в боковой панели."
//   },
//   {
//     "name": "sideBarStickyScroll.shadow",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет тени «липкой» прокрутки, указывающей на прокрутку содержимого."
//   },
//   /**
//    * Minimap
//    *
//    * Мини-карта отображает уменьшенную версию текущего файла.
//    * Цвета используются для подсветки поиска, выделений, ошибок, предупреждений и других элементов.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#minimap
//    */
//   {
//     "name": "minimap.background",
//     "color": ThemeColors.border.muted,
//     "Alpha": 3,
//     "description": "Цвет фона мини-карты."
//   },
//   {
//     "name": "minimap.findMatchHighlight",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет подсветки совпадений при поиске в файлах."
//   },
//   {
//     "name": "minimap.selectionHighlight",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет подсветки текущего выделения редактора на мини-карте."
//   },
//   {
//     "name": "minimap.errorHighlight",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет подсветки ошибок на мини-карте."
//   },
//   {
//     "name": "minimap.warningHighlight",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет подсветки предупреждений на мини-карте."
//   },
//   {
//     "name": "minimap.infoHighlight",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет маркера для информационных элементов на мини-карте."
//   },
//   {
//     "name": "minimap.selectionOccurrenceHighlight",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 8,
//     "description": "Цвет маркера повторяющихся выделений на мини-карте."
//   },
//   {
//     "name": "minimap.foregroundOpacity",
//     "color": "#000000c0",
//     "Alpha": 10,
//     "description": "Прозрачность элементов переднего плана на мини-карте. Например, '#000000c0' — 75% непрозрачности."
//   },
//   {
//     "name": "minimap.chatEditHighlight",
//     "color": ThemeColors.attention.emphasis,
//     "Alpha": 10,
//     "description": "Цвет области ожидаемого редактирования (pending edits) на мини-карте."
//   },
//   {
//     "name": "minimapSlider.background",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Цвет фона ползунка мини-карты."
//   },
//   {
//     "name": "minimapSlider.hoverBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет фона ползунка мини-карты при наведении."
//   },
//   {
//     "name": "minimapSlider.activeBackground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет фона ползунка мини-карты при активном нажатии."
//   },
//   {
//     "name": "minimapGutter.addedBackground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 7,
//     "description": "Цвет в полосе мини-карты для добавленного содержимого."
//   },
//   {
//     "name": "minimapGutter.modifiedBackground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет в полосе мини-карты для изменённого содержимого."
//   },
//   {
//     "name": "minimapGutter.deletedBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет в полосе мини-карты для удалённого содержимого."
//   },
//   {
//     "name": "editorMinimap.inlineChatInserted",
//     "color": ThemeColors.sponsors.fg,
//     "Alpha": 10,
//     "description": "Цвет маркера для вставленного контента встроенного чата на мини-карте."
//   },
//   /**
//    * Editor Groups & Tabs
//    *
//    * Цвета для групп редакторов и вкладок.
//    * Группы редакторов — это контейнеры для вкладок. Вкладка — это контейнер для открытого редактора.
//    * Поддерживает режимы с несколькими группами, плавающими вкладками и многое другое.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#editor-groups-tabs
//    */
//   {
//     "name": "editorGroup.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы между несколькими группами редакторов."
//   },
//   {
//     "name": "editorGroup.dropBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон при перетаскивании редакторов между группами."
//   },
//   {
//     "name": "editorGroup.emptyBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Цвет фона пустой группы редакторов."
//   },
//   {
//     "name": "editorGroup.focusedEmptyBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет границы пустой группы редакторов, когда она в фокусе."
//   },
//   {
//     "name": "editorGroup.dropIntoPromptBackground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Фон текста-подсказки при перетаскивании файла в редактор (например, «Отпустите, чтобы открыть»)."
//   },
//   {
//     "name": "editorGroup.dropIntoPromptForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста подсказки при перетаскивании файла в редактор."
//   },
//   {
//     "name": "editorGroup.dropIntoPromptBorder",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет границы подсказки при перетаскивании файла в редактор."
//   },
//   {
//     "name": "editorGroupHeader.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы между заголовком группы редакторов и редактором (под хлебными крошками, если включены)."
//   },
//   {
//     "name": "editorGroupHeader.noTabsBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Цвет фона заголовка группы редакторов, когда используется один таб (workbench.editor.showTabs: 'single')."
//   },
//   {
//     "name": "editorGroupHeader.tabsBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Цвет фона контейнера вкладок."
//   },
//   {
//     "name": "editorGroupHeader.tabsBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы под панелью вкладок, когда они включены."
//   },
//   {
//     "name": "tab.activeBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 2,
//     "description": "Цвет фона активной вкладки в активной группе редакторов."
//   },
//   {
//     "name": "tab.activeForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет текста активной вкладки в активной группе редакторов."
//   },
//   {
//     "name": "tab.activeBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Нижняя граница активной вкладки."
//   },
//   {
//     "name": "tab.activeBorderTop",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Верхняя граница активной вкладки."
//   },
//   {
//     "name": "tab.activeModifiedBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Граница сверху у изменённой («грязной») активной вкладки в активной группе."
//   },
//   {
//     "name": "tab.border",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Граница между вкладками."
//   },
//   {
//     "name": "tab.hoverBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Цвет фона вкладки при наведении курсора."
//   },
//   {
//     "name": "tab.hoverForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 8,
//     "description": "Цвет текста вкладки при наведении курсора."
//   },
//   {
//     "name": "tab.hoverBorder",
//     "color": ThemeColors.attention.emphasis,
//     "Alpha": 5,
//     "description": "Цвет границы вкладки при наведении курсора."
//   },
//   {
//     "name": "tab.inactiveBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 5,
//     "description": "Цвет фона неактивной вкладки в активной группе."
//   },
//   {
//     "name": "tab.inactiveForeground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 5,
//     "description": "Цвет текста неактивной вкладки в активной группе."
//   },
//   {
//     "name": "tab.inactiveModifiedBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Граница сверху у изменённой («грязной») неактивной вкладки в активной группе."
//   },
//   {
//     "name": "tab.lastPinnedBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Граница справа от последней закреплённой вкладки, отделяющая её от незакреплённых."
//   },
//   {
//     "name": "tab.unfocusedActiveBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 2,
//     "description": "Цвет фона активной вкладки в неактивной (не в фокусе) группе редакторов."
//   },
//   {
//     "name": "tab.unfocusedActiveForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет текста активной вкладки в неактивной группе редакторов."
//   },
//   {
//     "name": "tab.unfocusedActiveBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Нижняя граница активной вкладки в неактивной группе."
//   },
//   {
//     "name": "tab.unfocusedActiveBorderTop",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Верхняя граница активной вкладки в неактивной группе."
//   },
//   {
//     "name": "tab.unfocusedActiveModifiedBorder",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Граница сверху у изменённой активной вкладки в неактивной группе."
//   },
//   {
//     "name": "tab.unfocusedHoverBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет фона вкладки при наведении в неактивной группе."
//   },
//   {
//     "name": "tab.unfocusedHoverForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 8,
//     "description": "Цвет текста вкладки при наведении в неактивной группе."
//   },
//   {
//     "name": "tab.unfocusedHoverBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет границы вкладки при наведении в неактивной группе."
//   },
//   {
//     "name": "tab.unfocusedInactiveBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Цвет фона неактивной вкладки в неактивной группе редакторов."
//   },
//   {
//     "name": "tab.unfocusedInactiveForeground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 5,
//     "description": "Цвет текста неактивной вкладки в неактивной группе редакторов."
//   },
//   {
//     "name": "tab.unfocusedInactiveModifiedBorder",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Граница сверху у изменённой неактивной вкладки в неактивной группе."
//   },
//   {
//     "name": "tab.dragAndDropBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Граница между вкладками, показывающая, что вкладку можно вставить между ними."
//   },
//   {
//     "name": "tab.selectedBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Фон выбранной вкладки (альтернативное состояние)."
//   },
//   {
//     "name": "tab.selectedForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста выбранной вкладки."
//   },
//   {
//     "name": "sideBySideEditor.horizontalBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Горизонтальная граница между двумя редакторами, расположенными один над другим."
//   },
//   {
//     "name": "sideBySideEditor.verticalBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Вертикальная граница между двумя редакторами, расположенными рядом."
//   },
//   {
//     "name": "editorPane.background",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Фон панели редактора, видимый слева и справа при центрированном макете."
//   },
//   /**
//    * Editor colors
//    *
//    * Цвета для групп редакторов и вкладок.
//    * Группы редакторов — это контейнеры для вкладок. Вкладка — это контейнер для открытого редактора.
//    * Поддерживает режимы с несколькими группами, плавающими вкладками и многое другое.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#editor-groups-tabs
//    */
//   /////////////////////////.  Все остальные цвета редактора перечислены здесь://////////////////
//   {
//     "name": "editor.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон редактора."
//   },
//   {
//     "name": "editor.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста по умолчанию в редакторе."
//   },
//   {
//     "name": "editorLineNumber.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 5,
//     "description": "Цвет номеров строк в редакторе."
//   },
//   {
//     "name": "editorLineNumber.activeForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет номера активной строки."
//   },
//   {
//     "name": "editorLineNumber.dimmedForeground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 5,
//     "description": "Цвет последней строки, когда editor.renderFinalNewline установлен в 'dimmed'."
//   },
//   {
//     "name": "editorCursor.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон курсора (для блочного курсора)."
//   },
//   {
//     "name": "editorCursor.foreground",
//     "color": ThemeColors.success.fg,
//     "Alpha": 10,
//     "description": "Цвет курсора в редакторе."
//   },
//   {
//     "name": "editorMultiCursor.primary.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет основного курсора при наличии нескольких курсоров."
//   },
//   {
//     "name": "editorMultiCursor.primary.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон основного курсора при наличии нескольких курсоров."
//   },
//   {
//     "name": "editorMultiCursor.secondary.foreground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Цвет вторичных курсоров при наличии нескольких."
//   },
//   {
//     "name": "editorMultiCursor.secondary.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон вторичных курсоров при наличии нескольких."
//   },
//   {
//     "name": "editor.placeholder.foreground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 5,
//     "description": "Цвет текста-заполнителя в редакторе."
//   },
//   {
//     "name": "editor.compositionBorder",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет границы при вводе текста через IME."
//   },
//   /////////////////////////.  Цвета выбора видны при выборе одного или нескольких символов. В дополнение к выбору также выделены все регионы с одним и тем же контентом. //////////////////
//   {
//     "name": "editor.selectionBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет фона выделенного текста."
//   },
//   {
//     "name": "editor.selectionForeground",
//     "color": ThemeColors.accent.muted,
//     "Alpha": 5,
//     "description": "Цвет текста при выделении (для высокой контрастности)."
//   },
//   {
//     "name": "editor.inactiveSelectionBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет фона выделения в неактивном редакторе."
//   },
//   {
//     "name": "editor.selectionHighlightBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Цвет фона областей с тем же содержимым, что и выделение."
//   },
//   {
//     "name": "editor.selectionHighlightBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы областей с тем же содержимым, что и выделение."
//   },
//   {
//     "name": "editor.wordHighlightBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон символа при чтении (например, переменной)."
//   },
//   {
//     "name": "editor.wordHighlightBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Граница символа при чтении."
//   },
//   {
//     "name": "editor.wordHighlightStrongBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 2,
//     "description": "Фон символа при записи (например, присвоение переменной)."
//   },
//   {
//     "name": "editor.wordHighlightStrongBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Граница символа при записи."
//   },
//   {
//     "name": "editor.wordHighlightTextBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Фон текстового вхождения символа."
//   },
//   {
//     "name": "editor.wordHighlightTextBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Граница текстового вхождения символа."
//   },
//   /////////////////// Найти цвета зависят от текущей строки поиска в диалоговом окне «Найти/заменить»///////////////
//   {
//     "name": "editor.findMatchBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 2,
//     "description": "Фон текущего совпадения при поиске."
//   },
//   {
//     "name": "editor.findMatchForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста текущего совпадения при поиске."
//   },
//   {
//     "name": "editor.findMatchHighlightBackground",
//     "color": ThemeColors.attention.emphasis,
//     "Alpha": 2,
//     "description": "Фон других совпадений при поиске."
//   },
//   {
//     "name": "editor.findMatchHighlightForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста других совпадений при поиске."
//   },
//   {
//     "name": "editor.findMatchHighlightBorder",
//     "color": ThemeColors.attention.emphasis,
//     "Alpha": 2,
//     "description": "Граница других совпадений при поиске."
//   },
//   {
//     "name": "editor.findMatchBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 4,
//     "description": "Граница текущего совпадения при поиске."
//   },
//   {
//     "name": "editor.findRangeHighlightBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 7,
//     "description": "Фон диапазона поиска (включено 'Найти в выделении')."
//   },
//   {
//     "name": "editor.findRangeHighlightBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 7,
//     "description": "Граница диапазона поиска."
//   },
//   ////////////////////////////////   Цвета поиска используются в результатах глобального поиска поиска.   ////////////////////////////////////
//   {
//     "name": "search.resultsInfoForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста в виджете поиска, например, в сообщении вида «{x} результатов в {y} файлах»."
//   },
//   ///////////////////////   Редактор поиска выделяет результаты в редакторе поиска. Это может быть настроено отдельно от других совпадений находки, чтобы лучше дифференцировать различные классы совпадения в одном и том же редакторе.    /////////////////
//   {
//     "name": "searchEditor.findMatchBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Фон совпадений в редакторе поиска."
//   },
//   {
//     "name": "searchEditor.findMatchBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Граница совпадений в редакторе поиска."
//   },
//   {
//     "name": "searchEditor.textInputBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Граница поля ввода в редакторе поиска."
//   },
//   ////////////////////.    Выделение наклона отображается за символом, для которого показан падение.        /////////////////////////
//   {
//     "name": "editor.hoverHighlightBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 4,
//     "description": "Подсветка под словом, для которого показывается всплывающая подсказка."
//   },
//   ///////////////////////////.  Текущая линия обычно отображается как выделение фоновых или границу (не оба).///////////// 
//   {
//     "name": "editor.lineHighlightBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 2,
//     "description": "Фон активной строки (где курсор)."
//   },
//   {
//     "name": "editor.lineHighlightBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 2,
//     "description": "Граница вокруг активной строки."
//   },
//   //////////////////////////     Цвет для редактора водяного знака.     ///////////// 
//   {
//     "name": "editorWatermark.foreground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 5,
//     "description": "Цвет текста водяных знаков в редакторе (например, советы по клавишам)."
//   },
//   ///////////////////////////     Цвет для выделения Unicode.         //////////// 
//   {
//     "name": "editorUnicodeHighlight.border",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Граница, выделяющая непечатаемые Unicode-символы."
//   },
//   {
//     "name": "editorUnicodeHighlight.background",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон, выделяющий непечатаемые Unicode-символы."
//   },
//   ///////////////////////. Цвет ссылки виден при нажатии на ссылку.       //////////////
//   {
//     "name": "editorLink.activeForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет активных ссылок в редакторе."
//   },
//   ///////////////////////.   При выборе результата поиска видны дальности.    ////////////////
//   {
//     "name": "editor.rangeHighlightBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Фон выделенных диапазонов (например, Quick Open, Go to Symbol)."
//   },
//   {
//     "name": "editor.rangeHighlightBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Граница выделенных диапазонов."
//   },
//   ///////////////////////////.      Основной момент символа видна при навигации по символу по команде, такой как определение.     //////////
//   {
//     "name": "editor.symbolHighlightBackground",
//     "color": ThemeColors.done.emphasis,
//     "Alpha": 5,
//     "description": "Фон выделенного символа (например, при переходе к определению)."
//   },
//   {
//     "name": "editor.symbolHighlightBorder",
//     "color": ThemeColors.done.emphasis,
//     "Alpha": 4,
//     "description": "Граница выделенного символа."
//   },
//   {
//     "name": "editorWhitespace.foreground",
//     "color": ThemeColors.sponsors.muted,
//     "Alpha": 10,
//     "description": "Цвет отображения пробелов в редакторе."
//   },
//   // Чтобы увидеть белые пространства редактора, включите переключение рендеринга.
//   //editorwhitespace.foreground: цвет персонажей пробелов в редакторе.
//   //Чтобы увидеть Руководство по поводу редактора, установите «editor.guides.indentation»: true и «editor.guides.highlightactiveIndentation»: true.
//   {
//     "name": "editorIndentGuide.background",
//     "color": ThemeColors.fg.default,
//     "Alpha": 0,
//     "description": "Цвет направляющих отступов в редакторе."
//   },
//   {
//     "name": "editorIndentGuide.background1",
//     "color": ThemeColors.fg.default,
//     "Alpha": 0,
//     "description": "Цвет направляющих отступов (уровень 1)."
//   },
//   {
//     "name": "editorIndentGuide.background2",
//     "color": ThemeColors.fg.default,
//     "Alpha": 0,
//     "description": "Цвет направляющих отступов (уровень 2)."
//   },
//   {
//     "name": "editorIndentGuide.background3",
//     "color": ThemeColors.fg.default,
//     "Alpha": 0,
//     "description": "Цвет направляющих отступов (уровень 3)."
//   },
//   {
//     "name": "editorIndentGuide.background4",
//     "color": ThemeColors.fg.default,
//     "Alpha": 0,
//     "description": "Цвет направляющих отступов (уровень 4)."
//   },
//   {
//     "name": "editorIndentGuide.background5",
//     "color": ThemeColors.fg.default,
//     "Alpha": 0,
//     "description": "Цвет направляющих отступов (уровень 5)."
//   },
//   {
//     "name": "editorIndentGuide.background6",
//     "color": ThemeColors.fg.default,
//     "Alpha": 0,
//     "description": "Цвет направляющих отступов (уровень 6)."
//   },
//   {
//     "name": "editorIndentGuide.activeBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 9,
//     "description": "Цвет активного направляющего отступа."
//   },
//   {
//     "name": "editorIndentGuide.activeBackground1",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 9,
//     "description": "Цвет активного направляющего отступа (уровень 1)."
//   },
//   {
//     "name": "editorIndentGuide.activeBackground2",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 9,
//     "description": "Цвет активного направляющего отступа (уровень 2)."
//   },
//   {
//     "name": "editorIndentGuide.activeBackground3",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 9,
//     "description": "Цвет активного направляющего отступа (уровень 3)."
//   },
//   {
//     "name": "editorIndentGuide.activeBackground4",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 9,
//     "description": "Цвет активного направляющего отступа (уровень 4)."
//   },
//   {
//     "name": "editorIndentGuide.activeBackground5",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 9,
//     "description": "Цвет активного направляющего отступа (уровень 5)."
//   },
//   {
//     "name": "editorIndentGuide.activeBackground6",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 9,
//     "description": "Цвет активного направляющего отступа (уровень 6)."
//   },
//   /**
//    * 
//    * Чтобы увидеть встроенные подсказки редактора, установите «editor.inlinesuggest.enabled»: true
//    * 
//    * @param true
//    */
//   {
//     "name": "editorInlayHint.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон встроенных подсказок."
//   },
//   {
//     "name": "editorInlayHint.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 4,
//     "description": "Цвет текста встроенных подсказок."
//   },
//   {
//     "name": "editorInlayHint.typeForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет текста подсказок типов."
//   },
//   {
//     "name": "editorInlayHint.typeBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 5,
//     "description": "Фон подсказок типов."
//   },
//   {
//     "name": "editorInlayHint.parameterForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет текста подсказок параметров."
//   },
//   {
//     "name": "editorInlayHint.parameterBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 5,
//     "description": "Фон подсказок параметров."
//   },
//   /**
//    * 
//    * Чтобы увидеть правителей редактора, определите их местоположение с помощью
//    * 
//    * @param  "editor.rulers"
//    */
//   {
//     "name": "editorRuler.foreground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет линеек в редакторе (вертикальных направляющих)."
//   },
//   {
//     "name": "editor.linkedEditingBackground",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 2,
//     "description": "Фон при включённом связанном редактировании."
//   },
//   /**
//    * 
//    * Коделенс:
//    * 
//    */
//   {
//     "name": "editorCodeLens.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста CodeLens (например, ссылки на референсы)."
//   },
//   /**
//    * Лампочка:
//    */
//   {
//     "name": "editorLightBulb.foreground",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки лампочки действий."
//   },
//   {
//     "name": "editorLightBulbAutoFix.foreground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет иконки автозамены."
//   },
//   {
//     "name": "editorLightBulbAi.foreground",
//     "color": ThemeColors.sponsors.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки AI-действий."
//   },
//   /**
//    * 
//    * Bracket matches:
//    * 
//    * Матчи кронштейна:
//    * 
//    */
//   {
//     "name": "editorBracketMatch.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон за совпадающими скобками."
//   },
//   {
//     "name": "editorBracketMatch.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет рамки вокруг совпадающих скобок."
//   },
//   /**
//    * Bracket pair colorization:   Окрашение пары кронштейнов: 
//    */
//   {
//     "name": "editorBracketHighlight.foreground1",
//     "color": ThemeColors.sponsors.fg,
//     "Alpha": 10,
//     "description": "Цвет скобок (1) при включённой раскраске пар."
//   },
//   {
//     "name": "editorBracketHighlight.foreground2",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет скобок (2) при включённой раскраске пар."
//   },
//   {
//     "name": "editorBracketHighlight.foreground3",
//     "color": ThemeColors.sponsors.fg,
//     "Alpha": 10,
//     "description": "Цвет скобок (3) при включённой раскраске пар."
//   },
//   {
//     "name": "editorBracketHighlight.foreground4",
//     "color": ThemeColors.closed.fg,
//     "Alpha": 10,
//     "description": "Цвет скобок (4) при включённой раскраске пар."
//   },
//   {
//     "name": "editorBracketHighlight.foreground5",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 10,
//     "description": "Цвет скобок (5) при включённой раскраске пар."
//   },
//   {
//     "name": "editorBracketHighlight.foreground6",
//     "color": ThemeColors.severe.fg,
//     "Alpha": 10,
//     "description": "Цвет скобок (6) при включённой раскраске пар."
//   },
//   {
//     "name": "editorBracketHighlight.unexpectedBracket.foreground",
//     "color": ThemeColors.sponsors.muted,
//     "Alpha": 10,
//     "description": "Цвет неожиданных скобок."
//   },
//   /// Руководства пары кронштейнов:
//   {
//     "name": "editorBracketPairGuide.activeBackground1",
//     "color": ThemeColors.sponsors.fg,
//     "Alpha": 7,
//     "description": "Фон активной направляющей пары скобок (1)."
//   },
//   {
//     "name": "editorBracketPairGuide.activeBackground2",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон активной направляющей пары скобок (2)."
//   },
//   {
//     "name": "editorBracketPairGuide.activeBackground3",
//     "color": ThemeColors.sponsors.fg,
//     "Alpha": 7,
//     "description": "Фон активной направляющей пары скобок (3)."
//   },
//   {
//     "name": "editorBracketPairGuide.activeBackground4",
//     "color": ThemeColors.closed.fg,
//     "Alpha": 7,
//     "description": "Фон активной направляющей пары скобок (4)."
//   },
//   {
//     "name": "editorBracketPairGuide.activeBackground5",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 7,
//     "description": "Фон активной направляющей пары скобок (5)."
//   },
//   {
//     "name": "editorBracketPairGuide.activeBackground6",
//     "color": ThemeColors.severe.fg,
//     "Alpha": 7,
//     "description": "Фон активной направляющей пары скобок (6)."
//   },
//   {
//     "name": "editorBracketPairGuide.background1",
//     "color": ThemeColors.sponsors.fg,
//     "Alpha": 7,
//     "description": "Фон направляющей пары скобок (1), неактивной."
//   },
//   {
//     "name": "editorBracketPairGuide.background2",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон направляющей пары скобок (2), неактивной."
//   },
//   {
//     "name": "editorBracketPairGuide.background3",
//     "color": ThemeColors.sponsors.fg,
//     "Alpha": 7,
//     "description": "Фон направляющей пары скобок (3), неактивной."
//   },
//   {
//     "name": "editorBracketPairGuide.background4",
//     "color": ThemeColors.closed.fg,
//     "Alpha": 7,
//     "description": "Фон направляющей пары скобок (4), неактивной."
//   },
//   {
//     "name": "editorBracketPairGuide.background5",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 7,
//     "description": "Фон направляющей пары скобок (5), неактивной."
//   },
//   {
//     "name": "editorBracketPairGuide.background6",
//     "color": ThemeColors.severe.fg,
//     "Alpha": 7,
//     "description": "Фон направляющей пары скобок (6), неактивной."
//   },
//   //////////////////////     Складывание        //////////////////////
//   {
//     "name": "editor.foldBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Фон свёрнутых блоков кода."
//   },
//   {
//     "name": "editor.foldPlaceholderForeground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Цвет текста в свёрнутом блоке."
//   },
//   /**
//    * 
//    *   //////////////////////////     Обзор линейка:   //////////////////////
//    * 
//    * Этот правитель расположен под стержнем прокрутки на правом краю редактора и дает обзор украшений в редакторе.
//    * 
//    */
//   {
//     "name": "editorOverviewRuler.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон линейки обзора (справа от скролла)."
//   },
//   {
//     "name": "editorOverviewRuler.border",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Граница линейки обзора."
//   },
//   {
//     "name": "editorOverviewRuler.findMatchForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет совпадений поиска на линейке обзора."
//   },
//   {
//     "name": "editorOverviewRuler.rangeHighlightForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 2,
//     "description": "Цвет выделенных диапазонов на линейке обзора."
//   },
//   {
//     "name": "editorOverviewRuler.selectionHighlightForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет выделения на линейке обзора."
//   },
//   {
//     "name": "editorOverviewRuler.wordHighlightForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет выделения слов на линейке обзора."
//   },
//   {
//     "name": "editorOverviewRuler.wordHighlightStrongForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет выделения при записи на линейке обзора."
//   },
//   {
//     "name": "editorOverviewRuler.wordHighlightTextForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет маркера на линейке обзора для текстовых вхождений символа. Цвет не должен быть непрозрачным, чтобы не скрывать лежащие ниже декорации."
//   },
//   {
//     "name": "editorOverviewRuler.modifiedForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет изменённых строк на линейке обзора."
//   },
//   {
//     "name": "editorOverviewRuler.addedForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет добавленных строк на линейке обзора."
//   },
//   {
//     "name": "editorOverviewRuler.deletedForeground",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 5,
//     "description": "Цвет удалённых строк на линейке обзора."
//   },
//   {
//     "name": "editorOverviewRuler.errorForeground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 5,
//     "description": "Цвет ошибок на линейке обзора."
//   },
//   {
//     "name": "editorOverviewRuler.warningForeground",
//     "color": ThemeColors.severe.muted,
//     "Alpha": 5,
//     "description": "Цвет предупреждений на линейке обзора."
//   },
//   {
//     "name": "editorOverviewRuler.infoForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет информационных сообщений на линейке обзора."
//   },
//   {
//     "name": "editorOverviewRuler.bracketMatchForeground",
//     "color": ThemeColors.sponsors.muted,
//     "Alpha": 5,
//     "description": "Цвет совпадающих скобок на линейке обзора."
//   },
//   {
//     "name": "editorOverviewRuler.inlineChatInserted",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет вставленного контента встроенного чата на линейке обзора."
//   },
//   {
//     "name": "editorOverviewRuler.inlineChatRemoved",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет удалённого контента встроенного чата на линейке обзора."
//   },
//   /**
//    * 
//    * Errors and warnings:
//    * 
//    *  //////////////////////////    Ошибки и предупреждения:  //////////////////////
//    * 
//    * 
//    * 
//    */
//   {
//     "name": "editorError.foreground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 7,
//     "description": "Цвет подчёркивания ошибок."
//   },
//   {
//     "name": "editorError.border",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Граница вокруг ошибок."
//   },
//   {
//     "name": "editorError.background",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 7,
//     "description": "Фон текста с ошибками."
//   },
//   {
//     "name": "editorWarning.foreground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет подчёркивания предупреждений."
//   },
//   {
//     "name": "editorWarning.border",
//     "color": ThemeColors.severe.muted,
//     "Alpha": 8,
//     "description": "Граница вокруг предупреждений."
//   },
//   {
//     "name": "editorWarning.background",
//     "color": ThemeColors.severe.muted,
//     "Alpha": 0,
//     "description": "Фон текста с предупреждениями."
//   },
//   {
//     "name": "editorInfo.foreground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет подчёркивания информационных сообщений."
//   },
//   {
//     "name": "editorInfo.border",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 3,
//     "description": "Граница вокруг информационных сообщений."
//   },
//   {
//     "name": "editorInfo.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон текста с информацией."
//   },
//   {
//     "name": "editorHint.foreground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет подсказок в редакторе."
//   },
//   {
//     "name": "editorHint.border",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Граница вокруг подсказок."
//   },
//   {
//     "name": "problemsErrorIcon.foreground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 4,
//     "description": "Цвет иконки ошибки в панели проблем."
//   },
//   {
//     "name": "problemsWarningIcon.foreground",
//     "color": ThemeColors.severe.muted,
//     "Alpha": 5,
//     "description": "Цвет иконки предупреждения в панели проблем."
//   },
//   {
//     "name": "problemsInfoIcon.foreground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет иконки информации в панели проблем."
//   },
//   /**
//    * 
//    * Unused source code:
//    * 
//    * //////////////////////////    Неиспользованный исходный код:  //////////////////////
//    * 
//    * 
//    * 
//    */
//   {
//     "name": "editorUnnecessaryCode.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Граница неиспользуемого кода."
//   },
//   {
//     "name": "editorUnnecessaryCode.opacity",
//     "color": "#0000004d",
//     "Alpha": 3,
//     "description": "Прозрачность неиспользуемого кода (например, '#000000c0' — 75% непрозрачности)."
//   },
//   //////////////////////////    Т6 содержит поля глифа и номера линий: //////////////////////
//   {
//     "name": "editorGutter.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон поля редактора (где номера строк и глифы)."
//   },
//   {
//     "name": "editorGutter.modifiedBackground",
//     "color": ThemeColors.success.fg,
//     "Alpha": 10,
//     "description": "Фон изменённых строк в поле редактора."
//   },
//   {
//     "name": "editorGutter.modifiedSecondaryBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Вторичный цвет фона в поле редактора для строк, которые были изменены."
//   },
//   {
//     "name": "editorGutter.addedBackground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Фон добавленных строк в поле редактора."
//   },
//   {
//     "name": "editorGutter.addedSecondaryBackground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 3,
//     "description": "Вторичный цвет фона в поле редактора для строк, которые были добавлены."
//   },
//   {
//     "name": "editorGutter.deletedBackground",
//     "color": ThemeColors.danger.fg,
//     "Alpha": 5,
//     "description": "Фон удалённых строк в поле редактора."
//   },
//   {
//     "name": "editorGutter.commentRangeForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет разметки диапазонов комментариев в поле редактора."
//   },
//   {
//     "name": "editorGutter.commentGlyphForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет глифа комментариев."
//   },
//   {
//     "name": "editorGutter.commentUnresolvedGlyphForeground",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 10,
//     "description": "Цвет глифа неразрешённых комментариев."
//   },
//   {
//     "name": "editorGutter.foldingControlForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет элемента свёртывания в поле редактора."
//   },
//   {
//     "name": "editorGutter.itemGlyphForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет глифов (иконок) в поле редактора, например, для обозначения точек останова, логов или других декораций."
//   },
//   {
//     "name": "editorGutter.itemBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Цвет фона элемента в поле редактора. Должен быть непрозрачным, чтобы не создавать визуальных артефактов."
//   },
//   /**
//    * 
//    * The editor comments widget can be seen when reviewing pull requests:
//    * 
//    * //////////////////////////    Виджет редактора можно увидеть при рассмотрении запросов на притяжение:  //////////////////////
//    * 
//    * 
//    * 
//    */
//   {
//     "name": "editorCommentsWidget.rangeBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Фон диапазона комментариев."
//   },
//   {
//     "name": "editorCommentsWidget.rangeActiveBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Фон активного диапазона комментариев."
//   },
//   {
//     "name": "editorCommentsWidget.resolvedBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы и стрелки для решённых комментариев."
//   },
//   {
//     "name": "editorCommentsWidget.unresolvedBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы и стрелки для нерешённых комментариев."
//   },
//   {
//     "name": "editorCommentsWidget.replyInputBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон поля ввода ответа на комментарий."
//   },
//   /**
//    * 
//    * Editor inline edits can be seen when using Copilot to suggest the next change to make:
//    * 
//    * //////////////////////////    Редактор встроенных изменений можно увидеть при использовании Copilot, чтобы предложить следующее изменение, чтобы внести:  //////////////////////
//    * 
//    * 
//    * 
//    */
//   {
//     "name": "inlineEdit.gutterIndicator.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон индикатора встроенного редактирования в поле редактора."
//   },
//   {
//     "name": "inlineEdit.gutterIndicator.primaryBackground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Фон первичного индикатора встроенного редактирования в поле редактора."
//   },
//   {
//     "name": "inlineEdit.gutterIndicator.primaryBorder",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет границы первичного индикатора встроенного редактирования."
//   },
//   {
//     "name": "inlineEdit.gutterIndicator.primaryForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет переднего плана (иконки/текста) первичного индикатора встроенного редактирования."
//   },
//   {
//     "name": "inlineEdit.gutterIndicator.secondaryBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 5,
//     "description": "Фон вторичного индикатора встроенного редактирования в поле редактора."
//   },
//   {
//     "name": "inlineEdit.gutterIndicator.secondaryBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы вторичного индикатора встроенного редактирования."
//   },
//   {
//     "name": "inlineEdit.gutterIndicator.secondaryForeground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Цвет переднего плана вторичного индикатора встроенного редактирования."
//   },
//   {
//     "name": "inlineEdit.gutterIndicator.successfulBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Фон успешного индикатора встроенного редактирования (например, принятого предложения)."
//   },
//   {
//     "name": "inlineEdit.gutterIndicator.successfulBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет границы успешного индикатора встроенного редактирования."
//   },
//   {
//     "name": "inlineEdit.gutterIndicator.successfulForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет переднего плана успешного индикатора встроенного редактирования."
//   },
//   {
//     "name": "inlineEdit.originalBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 3,
//     "description": "Фон оригинального текста в предложении встроенного редактирования."
//   },
//   {
//     "name": "inlineEdit.originalBorder",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 5,
//     "description": "Граница оригинального текста в предложении встроенного редактирования."
//   },
//   {
//     "name": "inlineEdit.originalChangedLineBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 3,
//     "description": "Фон строки с изменениями в оригинальном тексте при встроенном редактировании."
//   },
//   {
//     "name": "inlineEdit.originalChangedTextBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 6,
//     "description": "Наложение цвета на изменённый текст в оригинальной версии."
//   },
//   {
//     "name": "inlineEdit.modifiedBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон изменённого (предлагаемого) текста в встроенном редактировании."
//   },
//   {
//     "name": "inlineEdit.modifiedBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Граница изменённого (предлагаемого) текста в встроенном редактировании."
//   },
//   {
//     "name": "inlineEdit.modifiedChangedLineBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон строки с изменениями в предлагаемой версии текста."
//   },
//   {
//     "name": "inlineEdit.modifiedChangedTextBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 7,
//     "description": "Наложение цвета на изменённый текст в предлагаемой версии."
//   },
//   {
//     "name": "inlineEdit.tabWillAcceptOriginalBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 8,
//     "description": "Цвет границы оригинального текста, когда Tab примет изменение."
//   },
//   {
//     "name": "inlineEdit.tabWillAcceptModifiedBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет границы изменённого текста, когда Tab примет предложение."
//   },
//   /**
//    * Diff Editor
//    *
//    * Цвета для редактора сравнения (diff). Используются при просмотре изменений между файлами,
//    * в Git, при сравнении версий и в многофайловом сравнении.
//    * Для подсветки вставок и удалений используйте либо фон, либо границу — не оба сразу.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#diff-editor-colors
//    */
//   {
//     "name": "diffEditor.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы между двумя редакторами в режиме сравнения."
//   },
//   {
//     "name": "diffEditor.diagonalFill",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет диагональной заливки в режиме сравнения 'side-by-side'."
//   },
//   {
//     "name": "diffEditor.insertedLineBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон строк, которые были вставлены. Не должен быть непрозрачным, чтобы не скрывать декорации."
//   },
//   {
//     "name": "diffEditor.insertedTextBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон текста, который был вставлен. Не должен быть непрозрачным."
//   },
//   {
//     "name": "diffEditor.insertedTextBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Граница вокруг вставленного текста."
//   },
//   {
//     "name": "diffEditor.removedLineBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 9,
//     "description": "Фон строк, которые были удалены. Не должен быть непрозрачным."
//   },
//   {
//     "name": "diffEditor.removedTextBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 7,
//     "description": "Фон текста, который был удалён. Не должен быть непрозрачным."
//   },
//   {
//     "name": "diffEditor.removedTextBorder",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 7,
//     "description": "Граница вокруг удалённого текста."
//   },
//   {
//     "name": "diffEditorGutter.insertedLineBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон поля (гуттера) для строк, которые были вставлены."
//   },
//   {
//     "name": "diffEditorGutter.removedLineBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 9,
//     "description": "Фон поля (гуттера) для строк, которые были удалены."
//   },
//   {
//     "name": "diffEditorOverview.insertedForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет маркера на линейке обзора для вставленного содержимого."
//   },
//   {
//     "name": "diffEditorOverview.removedForeground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 9,
//     "description": "Цвет маркера на линейке обзора для удалённого содержимого."
//   },
//   {
//     "name": "diffEditor.unchangedRegionBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Цвет фона неизменённых блоков в редакторе сравнения."
//   },
//   {
//     "name": "diffEditor.unchangedRegionForeground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Цвет текста в неизменённых блоках редактора сравнения."
//   },
//   {
//     "name": "diffEditor.unchangedRegionShadow",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет тени вокруг виджетов неизменённых областей."
//   },
//   {
//     "name": "diffEditor.unchangedCodeBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон неизменённого кода в редакторе сравнения."
//   },
//   {
//     "name": "diffEditor.move.border",
//     "color": ThemeColors.attention.emphasis,
//     "Alpha": 5,
//     "description": "Цвет границы для перемещённого текста в редакторе сравнения."
//   },
//   {
//     "name": "diffEditor.moveActive.border",
//     "color": ThemeColors.attention.emphasis,
//     "Alpha": 10,
//     "description": "Цвет активной границы для перемещённого текста в редакторе сравнения."
//   },
//   {
//     "name": "multiDiffEditor.headerBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон заголовка в многофайловом редакторе сравнения."
//   },
//   {
//     "name": "multiDiffEditor.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон многофайлового редактора сравнения."
//   },
//   {
//     "name": "multiDiffEditor.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы многофайлового редактора сравнения."
//   },
//   /**
//    * Chat Colors
//    *
//    * Цвета для интерфейса чата (например, Copilot Chat).
//    * Включают цвета запросов, аватаров, команд, изменений в коде и элементов интерфейса.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#chat-colors
//    */
//   {
//     "name": "chat.requestBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы запроса в чате."
//   },
//   {
//     "name": "chat.requestBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон запроса в чате."
//   },
//   {
//     "name": "chat.slashCommandBackground",
//     "color": ThemeColors.accent.muted,
//     "Alpha": 7,
//     "description": "Фон команды-слеша (например, /explain) в чате."
//   },
//   {
//     "name": "chat.slashCommandForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет текста команды-слеша в чате."
//   },
//   {
//     "name": "chat.avatarBackground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Фон аватара пользователя или ассистента в чате."
//   },
//   {
//     "name": "chat.avatarForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет иконки или текста в аватаре чата."
//   },
//   {
//     "name": "chat.editedFileForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста изменённого файла в списке изменений чата."
//   },
//   {
//     "name": "chat.linesAddedForeground",
//     "color": ThemeColors.success.fg,
//     "Alpha": 10,
//     "description": "Цвет строк, добавленных в блоке кода чата."
//   },
//   {
//     "name": "chat.linesRemovedForeground",
//     "color": ThemeColors.danger.fg,
//     "Alpha": 10,
//     "description": "Цвет строк, удалённых в блоке кода чата."
//   },
//   {
//     "name": "chat.requestCodeBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы блоков кода внутри запроса чата."
//   },
//   {
//     "name": "chat.requestBubbleBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон пузыря запроса в чате."
//   },
//   {
//     "name": "chat.requestBubbleHoverBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Фон пузыря запроса в чате при наведении курсора."
//   },
//   {
//     "name": "chat.checkpointSeparator",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет разделителя чекпоинтов в чате."
//   },
//   /**
//    * Inline Chat
//    *
//    * Цвета для интерактивного виджета встроенного чата (например, Copilot в редакторе).
//    * Включает фон, границы, тени, поля ввода и подсветку изменений.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#inline-chat-colors
//    */
//   {
//     "name": "inlineChat.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон виджета встроенного чата (интерактивного редактора)."
//   },
//   {
//     "name": "inlineChat.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста в виджете встроенного чата."
//   },
//   {
//     "name": "inlineChat.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы виджета встроенного чата."
//   },
//   {
//     "name": "inlineChat.shadow",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет тени виджета встроенного чата."
//   },
//   {
//     "name": "inlineChatInput.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон поля ввода в виджете встроенного чата."
//   },
//   {
//     "name": "inlineChatInput.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы поля ввода в виджете встроенного чата."
//   },
//   {
//     "name": "inlineChatInput.focusBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет границы поля ввода в виджете встроенного чата при фокусе."
//   },
//   {
//     "name": "inlineChatInput.placeholderForeground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Цвет текста-заполнителя в поле ввода встроенного чата."
//   },
//   {
//     "name": "inlineChatDiff.inserted",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон вставленного текста в поле ввода встроенного чата."
//   },
//   {
//     "name": "inlineChatDiff.removed",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 7,
//     "description": "Фон удалённого текста в поле ввода встроенного чата."
//   },
//   /**
//    * Panel Chat
//    *
//    * Цвета для интерактивных элементов чата в панели (например, Copilot в Notebook или интерактивном окне).
//    * Включает цвета границ активных и неактивных блоков кода.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#panel-chat-colors
//    */
//   {
//     "name": "interactive.activeCodeBorder",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 7,
//     "description": "Цвет границы текущей интерактивной ячейки кода, когда редактор находится в фокусе."
//   },
//   {
//     "name": "interactive.inactiveCodeBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Цвет границы текущей интерактивной ячейки кода, когда редактор не находится в фокусе."
//   },
//   /**
//    * Editor widget colors
//    *
//    * Цвета для всплывающих виджетов редактора: поиск, подсказки, ховеры, навигация по ошибкам и т.д.
//    * Виджеты отображаются поверх содержимого редактора.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#editor-widget-colors
//    */
//   {
//     "name": "editorWidget.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста виджетов редактора, например, диалога поиска и замены."
//   },
//   {
//     "name": "editorWidget.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон виджетов редактора, таких как поиск и замена."
//   },
//   {
//     "name": "editorWidget.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы виджета редактора, если он не определяет собственную границу."
//   },
//   {
//     "name": "editorWidget.resizeBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет границы полосы изменения размера виджетов редактора."
//   },
//   {
//     "name": "editorSuggestWidget.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон виджета предложений (автодополнения)."
//   },
//   {
//     "name": "editorSuggestWidget.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы виджета предложений."
//   },
//   {
//     "name": "editorSuggestWidget.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста в виджете предложений."
//   },
//   {
//     "name": "editorSuggestWidget.focusHighlightForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет подсветки совпадений в виджете предложений при фокусе на элементе."
//   },
//   {
//     "name": "editorSuggestWidget.highlightForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет подсветки совпадений в виджете предложений."
//   },
//   {
//     "name": "editorSuggestWidget.selectedBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Фон выбранного элемента в виджете предложений."
//   },
//   {
//     "name": "editorSuggestWidget.selectedForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста выбранного элемента в виджете предложений."
//   },
//   {
//     "name": "editorSuggestWidget.selectedIconForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет иконки выбранного элемента в виджете предложений."
//   },
//   {
//     "name": "editorSuggestWidgetStatus.foreground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет текста статуса в виджете предложений (например, количество результатов)."
//   },
//   {
//     "name": "editorHoverWidget.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 5,
//     "description": "Цвет текста во всплывающей подсказке редактора."
//   },
//   {
//     "name": "editorHoverWidget.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон всплывающей подсказки редактора."
//   },
//   {
//     "name": "editorHoverWidget.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы всплывающей подсказки редактора."
//   },
//   {
//     "name": "editorHoverWidget.highlightForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет текста активного элемента в подсказке параметров."
//   },
//   {
//     "name": "editorHoverWidget.statusBarBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 9,
//     "description": "Фон строки состояния во всплывающей подсказке редактора."
//   },
//   {
//     "name": "editorGhostText.background",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 7,
//     "description": "Фон текста-подсказки (ghost text), предлагаемого автозавершением."
//   },
//   {
//     "name": "editorGhostText.border",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Граница текста-подсказки (ghost text), предлагаемого автозавершением."
//   },
//   {
//     "name": "editorGhostText.foreground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет текста-подсказки (ghost text), предлагаемого автозавершением."
//   },
//   {
//     "name": "editorStickyScroll.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон «липкой» прокрутки в редакторе."
//   },
//   {
//     "name": "editorStickyScroll.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы «липкой» прокрутки в редакторе."
//   },
//   {
//     "name": "editorStickyScroll.shadow",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет тени «липкой» прокрутки в редакторе."
//   },
//   {
//     "name": "editorStickyScrollGutter.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон гуттера (поля) в «липкой» прокрутке редактора."
//   },
//   {
//     "name": "editorStickyScrollHover.background",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Фон «липкой» прокрутки при наведении курсора."
//   },
//   /**
//    * The Debug Exception widget is a peek view that shows in the editor when debug stops at an exception.
//    *
//    * Виджет исключений отладки - это представление PEEK, которое показывает в редакторе, когда отладка останавливается на исключении.
//    * 
//    */
//   {
//     "name": "debugExceptionWidget.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон виджета исключения при отладке."
//   },
//   {
//     "name": "debugExceptionWidget.border",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет границы виджета исключения при отладке."
//   },
//   /**
//    * The editor marker view shows when navigating to errors and warnings in the editor (Go to Next Error or Warning command).
//    *
//    * Вид маркера редактора показывает при навигации по ошибкам и предупреждениям в редакторе (перейдите к следующей ошибке или предупреждению).
//    * 
//    */
//   {
//     "name": "editorMarkerNavigation.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон виджета навигации по маркерам (ошибкам, предупреждениям)."
//   },
//   {
//     "name": "editorMarkerNavigationError.background",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 5,
//     "description": "Фон ошибки в виджете навигации по маркерам."
//   },
//   {
//     "name": "editorMarkerNavigationWarning.background",
//     "color": ThemeColors.severe.muted,
//     "Alpha": 5,
//     "description": "Фон предупреждения в виджете навигации по маркерам."
//   },
//   {
//     "name": "editorMarkerNavigationInfo.background",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Фон информационного сообщения в виджете навигации по маркерам."
//   },
//   {
//     "name": "editorMarkerNavigationError.headerBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Фон заголовка ошибки в виджете навигации по маркерам."
//   },
//   {
//     "name": "editorMarkerNavigationWarning.headerBackground",
//     "color": ThemeColors.severe.muted,
//     "Alpha": 5,
//     "description": "Фон заголовка предупреждения в виджете навигации по маркерам."
//   },
//   {
//     "name": "editorMarkerNavigationInfo.headerBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон заголовка информационного сообщения в виджете навигации по маркерам."
//   },
//   /**
//    * Peek View
//    *
//    * Цвета для всплывающих окон просмотра (peek views), используемых для отображения ссылок,
//    * определений, объявлений и результатов поиска прямо внутри редактора.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#peek-view-colors
//    */
//   {
//     "name": "peekView.border",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 7,
//     "description": "Цвет границы и стрелки всплывающего окна просмотра (peek view)."
//   },
//   {
//     "name": "peekViewEditor.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон редактора внутри всплывающего окна просмотра."
//   },
//   {
//     "name": "peekViewEditorGutter.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон поля (гуттера) редактора в всплывающем окне просмотра."
//   },
//   {
//     "name": "peekViewEditor.matchHighlightBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 4,
//     "description": "Фон подсветки совпадений в редакторе всплывающего окна."
//   },
//   {
//     "name": "peekViewEditor.matchHighlightBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 4,
//     "description": "Граница подсветки совпадений в редакторе всплывающего окна."
//   },
//   {
//     "name": "peekViewResult.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон списка результатов в всплывающем окне просмотра."
//   },
//   {
//     "name": "peekViewResult.fileForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста узлов файлов в списке результатов всплывающего окна."
//   },
//   {
//     "name": "peekViewResult.lineForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста узлов строк в списке результатов всплывающего окна."
//   },
//   {
//     "name": "peekViewResult.matchHighlightBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 4,
//     "description": "Цвет подсветки совпадений в списке результатов всплывающего окна."
//   },
//   {
//     "name": "peekViewResult.selectionBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 4,
//     "description": "Фон выбранной записи в списке результатов всплывающего окна."
//   },
//   {
//     "name": "peekViewResult.selectionForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет текста выбранной записи в списке результатов всплывающего окна."
//   },
//   {
//     "name": "peekViewTitle.background",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон области заголовка всплывающего окна просмотра."
//   },
//   {
//     "name": "peekViewTitleLabel.foreground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет текста заголовка всплывающего окна просмотра."
//   },
//   {
//     "name": "peekViewTitleDescription.foreground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет текста описания (информации) в заголовке всплывающего окна."
//   },
//   {
//     "name": "peekViewEditorStickyScroll.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон «липкой» прокрутки в редакторе всплывающего окна."
//   },
//   {
//     "name": "peekViewEditorStickyScrollGutter.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон гуттера (поля) «липкой» прокрутки в редакторе всплывающего окна."
//   },
//   /**
//    * Merge conflicts colors
//    *
//    * Цвета для визуализации конфликтов слияния в редакторе.
//    * Используются при разрешении merge-конфликтов в Git: подсветка текущих, входящих и общих изменений.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#merge-conflicts-colors
//    */
//   {
//     "name": "merge.currentHeaderBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 8,
//     "description": "Фон заголовка текущей ветки в конфликте слияния. Не должен быть непрозрачным."
//   },
//   {
//     "name": "merge.currentContentBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 6,
//     "description": "Фон содержимого текущей ветки в конфликте слияния. Не должен быть непрозрачным."
//   },
//   {
//     "name": "merge.incomingHeaderBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон заголовка входящей ветки в конфликте слияния. Не должен быть непрозрачным."
//   },
//   {
//     "name": "merge.incomingContentBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон содержимого входящей ветки в конфликте слияния. Не должен быть непрозрачным."
//   },
//   {
//     "name": "merge.commonHeaderBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон заголовка общей родительской версии в конфликте слияния. Не должен быть непрозрачным."
//   },
//   {
//     "name": "merge.commonContentBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон содержимого общей родительской версии в конфликте слияния. Не должен быть непрозрачным."
//   },
//   {
//     "name": "merge.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы заголовков и разделителя в конфликтах слияния."
//   },
//   {
//     "name": "editorOverviewRuler.currentContentForeground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 5,
//     "description": "Цвет маркера на линейке обзора для текущего содержимого в конфликте слияния."
//   },
//   {
//     "name": "editorOverviewRuler.incomingContentForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет маркера на линейке обзора для входящего содержимого в конфликте слияния."
//   },
//   {
//     "name": "editorOverviewRuler.commonContentForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет маркера на линейке обзора для общего (родительского) содержимого в конфликте слияния."
//   },
//   {
//     "name": "editorOverviewRuler.commentForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет декорации на линейке обзора для разрешённых комментариев. Должен быть непрозрачным."
//   },
//   {
//     "name": "editorOverviewRuler.commentUnresolvedForeground",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 10,
//     "description": "Цвет декорации на линейке обзора для неразрешённых комментариев. Должен быть непрозрачным."
//   },
//   {
//     "name": "mergeEditor.change.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон изменений в редакторе слияния."
//   },
//   {
//     "name": "mergeEditor.change.word.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон выделения слов при различии на уровне слов в редакторе слияния."
//   },
//   {
//     "name": "mergeEditor.changeBase.background",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Фон изменений по сравнению с базовой версией в редакторе слияния."
//   },
//   {
//     "name": "mergeEditor.changeBase.word.background",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Фон выделения слов при различии с базовой версией на уровне слов."
//   },
//   {
//     "name": "mergeEditor.conflict.input1.background",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 3,
//     "description": "Фон декораций в первом входе (input 1) конфликта слияния."
//   },
//   {
//     "name": "mergeEditor.conflict.input2.background",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Фон декораций во втором входе (input 2) конфликта слияния."
//   },
//   {
//     "name": "mergeEditor.conflict.unhandledFocused.border",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 5,
//     "description": "Граница неразрешённого конфликта, когда он в фокусе."
//   },
//   {
//     "name": "mergeEditor.conflict.unhandledUnfocused.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Граница неразрешённого конфликта, когда он не в фокусе."
//   },
//   {
//     "name": "mergeEditor.conflict.handledFocused.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Граница разрешённого конфликта, когда он в фокусе."
//   },
//   {
//     "name": "mergeEditor.conflict.handledUnfocused.border",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Граница разрешённого конфликта, когда он не в фокусе."
//   },
//   {
//     "name": "mergeEditor.conflict.handled.minimapOverviewRuler",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет маркера на мини-карте для разрешённого конфликта (input 1)."
//   },
//   {
//     "name": "mergeEditor.conflict.unhandled.minimapOverviewRuler",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет маркера на мини-карте для неразрешённого конфликта (input 2)."
//   },
//   {
//     "name": "mergeEditor.conflictingLines.background",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 3,
//     "description": "Фон текста «Conflicting Lines» в редакторе слияния."
//   },
//   {
//     "name": "mergeEditor.conflict.handled.minimapOverViewRuler",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет маркера на мини-карте для разрешённых конфликтов (вход 1)."
//   },
//   {
//     "name": "mergeEditor.conflict.unhandled.minimapOverViewRuler",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет маркера на мини-карте для неразрешённых конфликтов (вход 2)."
//   },
//   /**
//    * Panel colors
//    *
//    * Цвета для панели, расположенной под областью редактора.
//    * Содержит представления: вывод (Output), интегрированный терминал, отладка и другие.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#panel-colors
//    */
//   {
//     "name": "panel.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон панели, расположенной под редактором."
//   },
//   {
//     "name": "panel.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы панели, отделяющей её от редактора."
//   },
//   {
//     "name": "panel.dropBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет обратной связи при перетаскивании элементов на заголовки панели."
//   },
//   {
//     "name": "panelTitle.activeBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет границы активного заголовка панели."
//   },
//   {
//     "name": "panelTitle.activeForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста активного заголовка панели."
//   },
//   {
//     "name": "panelTitle.inactiveForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста неактивного заголовка панели."
//   },
//   {
//     "name": "panelTitle.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет нижней границы заголовка панели, отделяющей его от содержимого."
//   },
//   {
//     "name": "panelTitleBadge.background",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Фон бейджа заголовка панели (например, количество сообщений)."
//   },
//   {
//     "name": "panelTitleBadge.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста бейджа заголовка панели."
//   },
//   {
//     "name": "panelInput.border",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет границы поля ввода в панели."
//   },
//   {
//     "name": "panelSection.border",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет границы между секциями панели при горизонтальном расположении."
//   },
//   {
//     "name": "panelSection.dropBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон при перетаскивании между секциями панели. Должен быть полупрозрачным."
//   },
//   {
//     "name": "panelSectionHeader.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон заголовка секции в панели."
//   },
//   {
//     "name": "panelSectionHeader.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста заголовка секции в панели."
//   },
//   {
//     "name": "panelSectionHeader.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы заголовка секции в панели при вертикальном расположении."
//   },
//   {
//     "name": "panelStickyScroll.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон «липкой» прокрутки в панели."
//   },
//   {
//     "name": "panelStickyScroll.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы «липкой» прокрутки в панели."
//   },
//   {
//     "name": "panelStickyScroll.shadow",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет тени «липкой» прокрутки в панели."
//   },
//   {
//     "name": "outputView.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон представления вывода (Output)."
//   },
//   {
//     "name": "outputViewStickyScroll.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон «липкой» прокрутки в представлении вывода."
//   },
//   /**
//    * Status Bar colors
//    *
//    * Цвета строки состояния, расположенной внизу рабочей области.
//    * Отображает информацию о текущем режиме, подключении, ошибках и других важных состояниях.
//    * 
//    * Выдающиеся элементы выделяются среди других записей строки статуса, чтобы указать важность. Одним из примеров является ключ Toggle Tab, перемещает индикатор режима изменения команды Focus.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#status-bar-colors
//    */
//   {
//     "name": "statusBar.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Стандартный фон строки состояния."
//   },
//   {
//     "name": "statusBar.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста в строке состояния."
//   },
//   {
//     "name": "statusBar.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы между строкой состояния и редактором."
//   },
//   {
//     "name": "statusBar.debuggingBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 6,
//     "description": "Фон строки состояния при отладке программы."
//   },
//   {
//     "name": "statusBar.debuggingForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста в строке состояния при отладке."
//   },
//   {
//     "name": "statusBar.debuggingBorder",
//     "color": ThemeColors.sponsors.muted,
//     "Alpha": 10,
//     "description": "Цвет границы строки состояния при отладке."
//   },
//   {
//     "name": "statusBar.noFolderBackground",
//     "color": ThemeColors.severe.muted,
//     "Alpha": 5,
//     "description": "Фон строки состояния, когда папка не открыта."
//   },
//   {
//     "name": "statusBar.noFolderForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста в строке состояния, когда папка не открыта."
//   },
//   {
//     "name": "statusBar.noFolderBorder",
//     "color": ThemeColors.severe.muted,
//     "Alpha": 5,
//     "description": "Цвет границы строки состояния, когда папка не открыта."
//   },
//   {
//     "name": "statusBar.focusBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы строки состояния при фокусе через клавиатуру."
//   },
//   {
//     "name": "statusBarItem.activeBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон элемента строки состояния при нажатии."
//   },
//   {
//     "name": "statusBarItem.hoverBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон элемента строки состояния при наведении курсора."
//   },
//   {
//     "name": "statusBarItem.hoverForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста элемента строки состояния при наведении."
//   },
//   {
//     "name": "statusBarItem.focusBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы элемента строки состояния при фокусе через клавиатуру."
//   },
//   {
//     "name": "statusBarItem.prominentBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон выделенных (важных) элементов строки состояния."
//   },
//   {
//     "name": "statusBarItem.prominentForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет текста выделенных (важных) элементов строки состояния."
//   },
//   {
//     "name": "statusBarItem.prominentHoverBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон выделенного элемента строки состояния при наведении."
//   },
//   {
//     "name": "statusBarItem.prominentHoverForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста выделенного элемента строки состояния при наведении."
//   },
//   {
//     "name": "statusBarItem.remoteBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон индикатора удалённого подключения в строке состояния."
//   },
//   {
//     "name": "statusBarItem.remoteForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста индикатора удалённого подключения."
//   },
//   {
//     "name": "statusBarItem.remoteHoverBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Фон индикатора удалённого подключения при наведении."
//   },
//   {
//     "name": "statusBarItem.remoteHoverForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста индикатора удалённого подключения при наведении."
//   },
//   {
//     "name": "statusBarItem.errorBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 5,
//     "description": "Фон элементов строки состояния, указывающих на ошибку."
//   },
//   {
//     "name": "statusBarItem.errorForeground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 5,
//     "description": "Цвет текста элементов строки состояния, указывающих на ошибку."
//   },
//   {
//     "name": "statusBarItem.errorHoverBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Фон элемента строки состояния с ошибкой при наведении."
//   },
//   {
//     "name": "statusBarItem.errorHoverForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста элемента строки состояния с ошибкой при наведении."
//   },
//   {
//     "name": "statusBarItem.warningBackground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Фон элементов строки состояния, указывающих на предупреждение."
//   },
//   {
//     "name": "statusBarItem.warningForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет текста элементов строки состояния, указывающих на предупреждение."
//   },
//   {
//     "name": "statusBarItem.warningHoverBackground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Фон элемента строки состояния с предупреждением при наведении."
//   },
//   {
//     "name": "statusBarItem.warningHoverForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста элемента строки состояния с предупреждением при наведении."
//   },
//   {
//     "name": "statusBarItem.compactHoverBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон элемента строки состояния при наведении, если он содержит два состояния (компактный режим)."
//   },
//   {
//     "name": "statusBarItem.offlineBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 5,
//     "description": "Фон элемента строки состояния, когда рабочая область находится в автономном режиме."
//   },
//   {
//     "name": "statusBarItem.offlineForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста элемента строки состояния в автономном режиме."
//   },
//   {
//     "name": "statusBarItem.offlineHoverBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Фон элемента строки состояния в автономном режиме при наведении."
//   },
//   {
//     "name": "statusBarItem.offlineHoverForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста элемента строки состояния в автономном режиме при наведении."
//   },
//   {
//     "name": "statusBarItem.settingsProfilesBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон элемента профилей настроек в строке состояния."
//   },
//   {
//     "name": "statusBarItem.settingsProfilesForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста элемента профилей настроек в строке состояния."
//   },
//   /**
//    * Title Bar
//    *
//    * Цвета заголовочной строки окна редактора.
//    * Отображаются только в режиме пользовательского заголовка (custom title bar).
//    * 
//    * ⚠️ Эти цвета работают только при включённом пользовательском заголовке:
//    * 
//    * 
//    * "window.titleBarStyle": "custom"
//    *
//    * 
//    * При "window.titleBarStyle": "native" они игнорируются. 
//    * 
//    * 
//    * @see https://code.visualstudio.com/api/references/theme-color#title-bar-colors
//    */
//   {
//     "name": "titleBar.activeBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон заголовочной строки, когда окно активно."
//   },
//   {
//     "name": "titleBar.activeForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста в заголовочной строке, когда окно активно."
//   },
//   {
//     "name": "titleBar.inactiveBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон заголовочной строки, когда окно неактивно."
//   },
//   {
//     "name": "titleBar.inactiveForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста в заголовочной строке, когда окно неактивно."
//   },
//   {
//     "name": "titleBar.border",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет границы заголовочной строки."
//   },
//   /**
//    * Menu Bar
//    *
//    * Цвета для строки меню (в верхней части окна).
//    * Включают цвета пунктов меню, выделения, разделителей и границ.
//    * Отображаются только при включённом пользовательском заголовке (custom title bar).
//    *
//    * ⚠️ Эти цвета работают только при включённом пользовательском заголовке:
//    * 
//    * "window.titleBarStyle": "custom"
//    * 
//    * При "window.titleBarStyle": "native" они игнорируются. 
//    * 
//    * @see https://code.visualstudio.com/api/references/theme-color#menu-bar-colors
//    */
//   {
//     "name": "menubar.selectionForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста выбранного пункта меню в строке меню."
//   },
//   {
//     "name": "menubar.selectionBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон выбранного пункта меню в строке меню."
//   },
//   {
//     "name": "menubar.selectionBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет границы выбранного пункта меню в строке меню."
//   },
//   {
//     "name": "menu.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста пунктов меню."
//   },
//   {
//     "name": "menu.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон меню."
//   },
//   {
//     "name": "menu.selectionForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста выбранного пункта в выпадающем меню."
//   },
//   {
//     "name": "menu.selectionBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон выбранного пункта в выпадающем меню."
//   },
//   {
//     "name": "menu.selectionBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет границы выбранного пункта в выпадающем меню."
//   },
//   {
//     "name": "menu.separatorBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет разделителя между пунктами меню."
//   },
//   {
//     "name": "menu.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы вокруг меню."
//   },
//   /**
//    * Notification
//    *
//    * Цвета для всплывающих уведомлений (Notification Toasts) и центра уведомлений.
//    * Уведомления появляются в правом нижнем углу и могут быть открыты в центре уведомлений.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#notification-colors
//    */
//   {
//     "name": "notificationCenter.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы центра уведомлений."
//   },
//   {
//     "name": "notificationCenterHeader.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон заголовка центра уведомлений."
//   },
//   {
//     "name": "notificationCenterHeader.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста заголовка центра уведомлений."
//   },
//   {
//     "name": "notificationToast.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы всплывающего уведомления (toast)."
//   },
//   {
//     "name": "notifications.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста уведомлений."
//   },
//   {
//     "name": "notifications.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон уведомлений."
//   },
//   {
//     "name": "notifications.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы между уведомлениями в центре уведомлений."
//   },
//   {
//     "name": "notificationLink.foreground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет ссылок в уведомлениях."
//   },
//   {
//     "name": "notificationsErrorIcon.foreground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 5,
//     "description": "Цвет иконки ошибки в уведомлениях."
//   },
//   {
//     "name": "notificationsWarningIcon.foreground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки предупреждения в уведомлениях."
//   },
//   {
//     "name": "notificationsInfoIcon.foreground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки информационного сообщения в уведомлениях."
//   },
//   /**
//    * Banner color
//    *
//    * Цвета для баннера — полосы, отображаемой под заголовком окна.
//    * Используется для важных уведомлений, например, о режиме доступности или лицензии.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#banner-colors
//    */
//   {
//     "name": "banner.background",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон баннера, отображаемого под заголовочной строкой."
//   },
//   {
//     "name": "banner.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста в баннере."
//   },
//   {
//     "name": "banner.iconForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет иконки перед текстом в баннере."
//   },
//   /**
//    * Extensions
//    *
//    * Цвета для элементов управления в представлении расширений.
//    * Включают кнопки, значки рейтинга, верификации, приватности и удалённые метки.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#extensions-colors
//    */
//   {
//     "name": "extensionButton.prominentBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон prominent-кнопки в представлении расширений (например, кнопка «Установить»)."
//   },
//   {
//     "name": "extensionButton.prominentForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста prominent-кнопки в представлении расширений."
//   },
//   {
//     "name": "extensionButton.prominentHoverBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 6,
//     "description": "Фон prominent-кнопки при наведении в представлении расширений."
//   },
//   {
//     "name": "extensionButton.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон кнопки действий с расширением (например, «Отключить»)."
//   },
//   {
//     "name": "extensionButton.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста кнопки действий с расширением."
//   },
//   {
//     "name": "extensionButton.hoverBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Фон кнопки действий с расширением при наведении."
//   },
//   {
//     "name": "extensionButton.separator",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет разделителя между кнопками действий с расширением."
//   },
//   {
//     "name": "extensionBadge.remoteBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон удалённой метки (remote badge) в представлении расширений."
//   },
//   {
//     "name": "extensionBadge.remoteForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста удалённой метки в представлении расширений."
//   },
//   {
//     "name": "extensionIcon.starForeground",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки рейтинга (звезда) для расширения."
//   },
//   {
//     "name": "extensionIcon.verifiedForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки верифицированного издателя расширения."
//   },
//   {
//     "name": "extensionIcon.preReleaseForeground",
//     "color": ThemeColors.severe.muted,
//     "Alpha": 10,
//     "description": "Цвет иконки предварительного релиза (pre-release) расширения."
//   },
//   {
//     "name": "extensionIcon.sponsorForeground",
//     "color": ThemeColors.sponsors.muted,
//     "Alpha": 10,
//     "description": "Цвет иконки спонсорства расширения."
//   },
//   {
//     "name": "extensionIcon.privateForeground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Цвет иконки приватного (приватного) расширения."
//   },
//   /**
//    * Quick Picker colors
//    *
//    * Цвета для быстрого выбора (Quick Picker), включая Command Palette, Quick Open и другие виджеты ввода.
//    * Используются для группировки, фокуса, заголовков и иконок.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#quick-picker-colors
//    */
//   {
//     "name": "pickerGroup.border",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет границы для групп в быстром выборе (Quick Picker)."
//   },
//   {
//     "name": "pickerGroup.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста заголовков групп в быстром выборе."
//   },
//   {
//     "name": "quickInput.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон виджета быстрого ввода (например, выбор темы или команды)."
//   },
//   {
//     "name": "quickInput.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста в виджете быстрого ввода."
//   },
//   {
//     "name": "quickInputList.focusBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон выбранного элемента в списке быстрого выбора."
//   },
//   {
//     "name": "quickInputList.focusForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста выбранного элемента в списке быстрого выбора."
//   },
//   {
//     "name": "quickInputList.focusIconForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет иконки выбранного элемента в списке быстрого выбора."
//   },
//   {
//     "name": "quickInputTitle.background",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Фон заголовка в виджете быстрого выбора."
//   },
//   /**
//    * Keybinding Label & Keyboard Shortcut Table
//    *
//    * Цвета для меток сочетаний клавиш (keybinding labels) и таблицы горячих клавиш.
//    * Метки отображаются в Command Palette, редакторе сочетаний клавиш и на странице расширений.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#keybinding-label-colors
//    * @see https://code.visualstudio.com/api/references/theme-color#keyboard-shortcut-table-colors
//    */
//   {
//     "name": "keybindingLabel.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон метки сочетания клавиш (например, в Command Palette)."
//   },
//   {
//     "name": "keybindingLabel.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста метки сочетания клавиш."
//   },
//   {
//     "name": "keybindingLabel.border",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет границы метки сочетания клавиш."
//   },
//   {
//     "name": "keybindingLabel.bottomBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет нижней границы метки сочетания клавиш."
//   },
//   {
//     "name": "keybindingTable.headerBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 2,
//     "description": "Фон заголовка таблицы сочетаний клавиш."
//   },
//   {
//     "name": "keybindingTable.rowsBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 3,
//     "description": "Фон чередующихся строк в таблице сочетаний клавиш."
//   },
//   /**
//    * Integrated Terminal
//    *
//    * Цвета для встроенного терминала VS Code.
//    * Включают ANSI-цвета, фон, выделение, курсор, подсветку поиска и декорации команд.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#integrated-terminal-colors
//    */
//   {
//     "name": "terminal.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон области просмотра встроенного терминала."
//   },
//   {
//     "name": "terminal.foreground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 3,
//     "description": "Цвет текста по умолчанию во встроенном терминале."
//   },
//   {
//     "name": "terminal.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы между панелями терминала. По умолчанию совпадает с panel.border."
//   },
//   {
//     "name": "terminal.ansiBlack",
//     "color": ThemeColors.ansi.black,
//     "Alpha": 9,
//     "description": "Цвет 'Black' (чёрный) в ANSI-палитре терминала."
//   },
//   {
//     "name": "terminal.ansiRed",
//     "color": ThemeColors.ansi.red,
//     "Alpha": 10,
//     "description": "Цвет 'Red' (красный) в ANSI-палитре терминала."
//   },
//   {
//     "name": "terminal.ansiGreen",
//     "color": ThemeColors.ansi.green,
//     "Alpha": 10,
//     "description": "Цвет 'Green' (зелёный) в ANSI-палитре терминала."
//   },
//   {
//     "name": "terminal.ansiYellow",
//     "color": ThemeColors.ansi.yellow,
//     "Alpha": 10,
//     "description": "Цвет 'Yellow' (жёлтый) в ANSI-палитре терминала."
//   },
//   {
//     "name": "terminal.ansiBlue",
//     "color": ThemeColors.ansi.blue,
//     "Alpha": 10,
//     "description": "Цвет 'Blue' (синий) в ANSI-палитре терминала."
//   },
//   {
//     "name": "terminal.ansiMagenta",
//     "color": ThemeColors.ansi.magenta,
//     "Alpha": 10,
//     "description": "Цвет 'Magenta' (пурпурный) в ANSI-палитре терминала."
//   },
//   {
//     "name": "terminal.ansiCyan",
//     "color": ThemeColors.ansi.cyan,
//     "Alpha": 10,
//     "description": "Цвет 'Cyan' (голубой) в ANSI-палитре терминала."
//   },
//   {
//     "name": "terminal.ansiWhite",
//     "color": ThemeColors.ansi.white,
//     "Alpha": 10,
//     "description": "Цвет 'White' (белый) в ANSI-палитре терминала."
//   },
//   {
//     "name": "terminal.ansiBrightBlack",
//     "color": ThemeColors.ansi.blackBright,
//     "Alpha": 10,
//     "description": "Цвет 'BrightBlack' (светло-чёрный) в ANSI-палитре терминала."
//   },
//   {
//     "name": "terminal.ansiBrightRed",
//     "color": ThemeColors.ansi.redBright,
//     "Alpha": 10,
//     "description": "Цвет 'BrightRed' (ярко-красный) в ANSI-палитре терминала."
//   },
//   {
//     "name": "terminal.ansiBrightGreen",
//     "color": ThemeColors.ansi.greenBright,
//     "Alpha": 10,
//     "description": "Цвет 'BrightGreen' (ярко-зелёный) в ANSI-палитре терминала."
//   },
//   {
//     "name": "terminal.ansiBrightYellow",
//     "color": ThemeColors.ansi.yellowBright,
//     "Alpha": 10,
//     "description": "Цвет 'BrightYellow' (ярко-жёлтый) в ANSI-палитре терминала."
//   },
//   {
//     "name": "terminal.ansiBrightBlue",
//     "color": ThemeColors.ansi.blueBright,
//     "Alpha": 10,
//     "description": "Цвет 'BrightBlue' (ярко-синий) в ANSI-палитре терминала."
//   },
//   {
//     "name": "terminal.ansiBrightMagenta",
//     "color": ThemeColors.ansi.magentaBright,
//     "Alpha": 10,
//     "description": "Цвет 'BrightMagenta' (ярко-пурпурный) в ANSI-палитре терминала."
//   },
//   {
//     "name": "terminal.ansiBrightCyan",
//     "color": ThemeColors.ansi.cyanBright,
//     "Alpha": 10,
//     "description": "Цвет 'BrightCyan' (ярко-голубой) в ANSI-палитре терминала."
//   },
//   {
//     "name": "terminal.ansiBrightWhite",
//     "color": ThemeColors.ansi.whiteBright,
//     "Alpha": 10,
//     "description": "Цвет 'BrightWhite' (ярко-белый) в ANSI-палитре терминала."
//   },
//   {
//     "name": "terminal.selectionBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон выделенного текста в терминале."
//   },
//   {
//     "name": "terminal.selectionForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста при выделении в терминале. Если null — сохраняется оригинальный цвет."
//   },
//   {
//     "name": "terminal.inactiveSelectionBackground",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 3,
//     "description": "Фон выделения в терминале, когда он не в фокусе."
//   },
//   {
//     "name": "terminal.findMatchBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Фон текущего совпадения при поиске в терминале. Не должен быть непрозрачным."
//   },
//   {
//     "name": "terminal.findMatchBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Граница текущего совпадения при поиске в терминале."
//   },
//   {
//     "name": "terminal.findMatchHighlightBackground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 2,
//     "description": "Фон других совпадений при поиске в терминале. Не должен быть непрозрачным."
//   },
//   {
//     "name": "terminal.findMatchHighlightBorder",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 2,
//     "description": "Граница других совпадений при поиске в терминале."
//   },
//   {
//     "name": "terminal.hoverHighlightBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Фон при наведении на ссылку в терминале."
//   },
//   {
//     "name": "terminalCursor.foreground",
//     "color": ThemeColors.success.fg,
//     "Alpha": 10,
//     "description": "Цвет курсора в терминале."
//   },
//   {
//     "name": "terminalCursor.background",
//     "color": ThemeColors.success.fg,
//     "Alpha": 2,
//     "description": "Фон курсора (для блочного курсора). Позволяет настроить цвет символа под курсором."
//   },
//   {
//     "name": "terminal.dropBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Фон при перетаскивании файлов на терминал. Должен быть полупрозрачным."
//   },
//   {
//     "name": "terminal.tab.activeBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет границы активной вкладки терминала. По умолчанию совпадает с tab.activeBorder."
//   },
//   {
//     "name": "terminalCommandDecoration.defaultBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Фон декорации команды по умолчанию в терминале."
//   },
//   {
//     "name": "terminalCommandDecoration.successBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон декорации успешной команды в терминале."
//   },
//   {
//     "name": "terminalCommandDecoration.errorBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 5,
//     "description": "Фон декорации команды с ошибкой в терминале."
//   },
//   {
//     "name": "terminalOverviewRuler.cursorForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет маркера курсора на линейке обзора терминала."
//   },
//   {
//     "name": "terminalOverviewRuler.findMatchForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет маркера совпадений поиска на линейке обзора терминала."
//   },
//   {
//     "name": "terminalStickyScroll.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон «липкой» прокрутки в терминале."
//   },
//   {
//     "name": "terminalStickyScroll.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Граница «липкой» прокрутки в терминале."
//   },
//   {
//     "name": "terminalStickyScrollHover.background",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Фон «липкой» прокрутки в терминале при наведении."
//   },
//   {
//     "name": "terminal.initialHintForeground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Цвет текста начальной подсказки в терминале."
//   },
//   {
//     "name": "terminalOverviewRuler.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет левой границы линейки обзора терминала."
//   },
//   {
//     "name": "terminalCommandGuide.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста руководства по командам, появляющегося слева от команды при наведении."
//   },
//   {
//     "name": "terminalSymbolIcon.aliasForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки псевдонима (alias) в виджете подсказок терминала."
//   },
//   {
//     "name": "terminalSymbolIcon.flagForeground",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки флага в виджете подсказок терминала."
//   },
//   {
//     "name": "terminalSymbolIcon.optionForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет иконки опции в виджете подсказок терминала."
//   },
//   {
//     "name": "terminalSymbolIcon.optionValueForeground",
//     "color": ThemeColors.sponsors.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки значения опции (enum) в виджете подсказок терминала."
//   },
//   {
//     "name": "terminalSymbolIcon.methodForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет иконки метода в виджете подсказок терминала."
//   },
//   {
//     "name": "terminalSymbolIcon.argumentForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет иконки аргумента в виджете подсказок терминала."
//   },
//   {
//     "name": "terminalSymbolIcon.inlineSuggestionForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки встроенной подсказки в виджете подсказок терминала."
//   },
//   {
//     "name": "terminalSymbolIcon.fileForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет иконки файла в виджете подсказок терминала."
//   },
//   {
//     "name": "terminalSymbolIcon.folderForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет иконки папки в виджете подсказок терминала."
//   },
//   {
//     "name": "terminalSymbolIcon.symbolicLinkFileForeground",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки символической ссылки на файл в виджете подсказок терминала."
//   },
//   {
//     "name": "terminalSymbolIcon.symbolicLinkFolderForeground",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки символической ссылки на папку в виджете подсказок терминала."
//   },
//   /**
//    * Debug
//    *
//    * Цвета для отладчика: панель инструментов, подсветка стека вызовов, встроенные значения,
//    * метки в CALL STACK, токены в Variables/Watch и другие элементы отладки.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#debug-colors
//    */
//   {
//     "name": "debugToolBar.background",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 5,
//     "description": "Фон панели инструментов отладки."
//   },
//   {
//     "name": "debugToolBar.border",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 5,
//     "description": "Цвет границы панели инструментов отладки."
//   },
//   {
//     "name": "editor.stackFrameHighlightBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон подсветки верхнего кадра стека в редакторе."
//   },
//   {
//     "name": "editor.focusedStackFrameHighlightBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон подсветки сфокусированного кадра стека в редакторе."
//   },
//   {
//     "name": "editor.inlineValuesBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон встроенного текста значений переменных при отладке."
//   },
//   {
//     "name": "editor.inlineValuesForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста встроенных значений переменных при отладке."
//   },
//   {
//     "name": "debugExceptionWidget.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон виджета исключения при остановке отладки."
//   },
//   {
//     "name": "debugExceptionWidget.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы виджета исключения при отладке."
//   },
//   {
//     "name": "debugView.exceptionLabelForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста метки исключения в представлении CALL STACK."
//   },
//   {
//     "name": "debugView.exceptionLabelBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Фон метки исключения в представлении CALL STACK."
//   },
//   {
//     "name": "debugView.stateLabelForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста метки состояния (например, 'Paused') в CALL STACK."
//   },
//   {
//     "name": "debugView.stateLabelBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Фон метки состояния в представлении CALL STACK."
//   },
//   {
//     "name": "debugView.valueChangedHighlight",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет подсветки изменённых значений в представлениях отладки (например, Variables)."
//   },
//   {
//     "name": "debugTokenExpression.name",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет имён токенов (переменных, свойств) в представлениях отладки."
//   },
//   {
//     "name": "debugTokenExpression.value",
//     "color": ThemeColors.sponsors.fg,
//     "Alpha": 5,
//     "description": "Цвет значений токенов в представлениях отладки."
//   },
//   {
//     "name": "debugTokenExpression.string",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 5,
//     "description": "Цвет строковых значений в представлениях отладки."
//   },
//   {
//     "name": "debugTokenExpression.boolean",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 5,
//     "description": "Цвет булевых значений (true/false) в представлениях отладки."
//   },
//   {
//     "name": "debugTokenExpression.number",
//     "color": ThemeColors.severe.fg,
//     "Alpha": 5,
//     "description": "Цвет числовых значений в представлениях отладки."
//   },
//   {
//     "name": "debugTokenExpression.error",
//     "color": ThemeColors.danger.fg,
//     "Alpha": 5,
//     "description": "Цвет ошибок выражений в представлениях отладки."
//   },
//   {
//     "name": "debugTokenExpression.type",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 5,
//     "description": "Цвет типов (например, 'string', 'number') в представлениях отладки."
//   },
//   /**
//    * Testing
//    *
//    * Цвета для системы тестирования: иконки статуса, подсветка покрытого кода,
//    * встроенные сообщения об ошибках и инлайн-подсказки.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#testing-colors
//    */
//   {
//     "name": "testing.runAction",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет иконок 'запуска' тестов в редакторе (например, зелёный треугольник)."
//   },
//   {
//     "name": "testing.iconErrored",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет иконки 'Errored' (ошибка) в обозревателе тестов."
//   },
//   {
//     "name": "testing.iconFailed",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет иконки 'Failed' (неудача) в обозревателе тестов."
//   },
//   {
//     "name": "testing.iconPassed",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет иконки 'Passed' (успешно) в обозревателе тестов."
//   },
//   {
//     "name": "testing.iconQueued",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки 'Queued' (в очереди) в обозревателе тестов."
//   },
//   {
//     "name": "testing.iconUnset",
//     "color": ThemeColors.severe.muted,
//     "Alpha": 10,
//     "description": "Цвет иконки 'Unset' (не установлено) в обозревателе тестов."
//   },
//   {
//     "name": "testing.iconSkipped",
//     "color": ThemeColors.severe.muted,
//     "Alpha": 10,
//     "description": "Цвет иконки 'Skipped' (пропущено) в обозревателе тестов."
//   },
//   {
//     "name": "testing.iconErrored.retired",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Устаревший цвет иконки 'Errored' (ошибка) в обозревателе тестов. Используется для обратной совместимости."
//   },
//   {
//     "name": "testing.iconFailed.retired",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Устаревший цвет иконки 'Failed' (неудача) в обозревателе тестов. Используется для обратной совместимости."
//   },
//   {
//     "name": "testing.iconPassed.retired",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Устаревший цвет иконки 'Passed' (успешно) в обозревателе тестов. Используется для обратной совместимости."
//   },
//   {
//     "name": "testing.iconQueued.retired",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 10,
//     "description": "Устаревший цвет иконки 'Queued' (в очереди) в обозревателе тестов. Используется для обратной совместимости."
//   },
//   {
//     "name": "testing.iconUnset.retired",
//     "color": ThemeColors.severe.muted,
//     "Alpha": 10,
//     "description": "Устаревший цвет иконки 'Unset' (не установлено) в обозревателе тестов. Используется для обратной совместимости."
//   },
//   {
//     "name": "testing.iconSkipped.retired",
//     "color": ThemeColors.severe.muted,
//     "Alpha": 10,
//     "description": "Устаревший цвет иконки 'Skipped' (пропущено) в обозревателе тестов. Используется для обратной совместимости."
//   },
//   {
//     "name": "testing.peekBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы и стрелки всплывающего окна (peek) при просмотре теста."
//   },
//   {
//     "name": "testing.peekHeaderBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Фон заголовка всплывающего окна (peek) при просмотре теста."
//   },
//   {
//     "name": "testing.message.error.lineBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 5,
//     "description": "Цвет фона в поле редактора рядом с сообщениями об ошибках в тестах."
//   },
//   {
//     "name": "testing.message.error.decorationForeground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет текста сообщения об ошибке в тесте, отображаемого в редакторе."
//   },
//   {
//     "name": "testing.message.info.lineBackground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет фона в поле редактора рядом с информационными сообщениями тестов."
//   },
//   {
//     "name": "testing.message.info.decorationForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет текста информационных сообщений тестов, отображаемых в редакторе."
//   },
//   {
//     "name": "testing.messagePeekBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы всплывающего окна при просмотре логированного сообщения теста."
//   },
//   {
//     "name": "testing.messagePeekHeaderBackground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Фон заголовка всплывающего окна при просмотре логированного сообщения теста."
//   },
//   {
//     "name": "testing.coveredBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Фон текста, который был покрыт тестами."
//   },
//   {
//     "name": "testing.coveredBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Граница текста, покрытого тестами."
//   },
//   {
//     "name": "testing.coveredGutterBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет фона в поле редактора для строк, покрытых тестами."
//   },
//   {
//     "name": "testing.uncoveredBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 3,
//     "description": "Фон текста, который не был покрыт тестами."
//   },
//   {
//     "name": "testing.uncoveredBorder",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 5,
//     "description": "Граница текста, не покрытого тестами."
//   },
//   {
//     "name": "testing.uncoveredGutterBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 5,
//     "description": "Цвет фона в поле редактора для строк, не покрытых тестами."
//   },
//   {
//     "name": "testing.uncoveredBranchBackground",
//     "color": ThemeColors.severe.muted,
//     "Alpha": 5,
//     "description": "Фон виджета, показывающего непокрытую ветвь кода."
//   },
//   {
//     "name": "testing.coverCountBadgeBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Фон бейджа, показывающего количество выполнений теста."
//   },
//   {
//     "name": "testing.coverCountBadgeForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста бейджа, показывающего количество выполнений теста."
//   },
//   {
//     "name": "testing.message.error.badgeBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Фон бейджа ошибки теста, отображаемого в редакторе."
//   },
//   {
//     "name": "testing.message.error.badgeBorder",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет границы бейджа ошибки теста в редакторе."
//   },
//   {
//     "name": "testing.message.error.badgeForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста бейджа ошибки теста в редакторе."
//   },
//   /**
//    * Welcome Page
//    *
//    * Цвета для приветственной страницы (Welcome Page) и интерактивных руководств (walkthrough).
//    * Включают фоны, границы, прогресс-бары и заголовки шагов.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#welcome-page-colors
//    */
//   {
//     "name": "welcomePage.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон приветственной страницы."
//   },
//   {
//     "name": "welcomePage.progress.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон прогресс-бара на приветственной странице."
//   },
//   {
//     "name": "welcomePage.progress.foreground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет полосы прогресса на приветственной странице."
//   },
//   {
//     "name": "welcomePage.tileBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Фон плиток (tiles) на приветственной странице."
//   },
//   {
//     "name": "welcomePage.tileHoverBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон плитки при наведении курсора."
//   },
//   {
//     "name": "welcomePage.tileBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы плиток на приветственной странице."
//   },
//   {
//     "name": "welcomePage.tileShadow",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Цвет тени плиток на приветственной странице."
//   },
//   {
//     "name": "walkThrough.embeddedEditorBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Фон встроенного редактора в интерактивных руководствах (Interactive Playground)."
//   },
//   {
//     "name": "walkthrough.stepTitle.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет заголовка каждого шага в руководстве (walkthrough)."
//   },
//   /**
//    * Git
//    *
//    * Цвета для отображения состояния файлов в Git: добавленные, изменённые, удалённые,
//    * staged, untracked, конфликтующие и другие состояния.
//    * Используются в обозревателе файлов (SCM), на панели активности и в редакторе.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#git-colors
//    */
//   {
//     "name": "gitDecoration.addedResourceForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет добавленных Git-ресурсов. Используется для меток файлов и в SCM-обозревателе."
//   },
//   {
//     "name": "gitDecoration.modifiedResourceForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет изменённых Git-ресурсов. Используется для меток файлов и в SCM-обозревателе."
//   },
//   {
//     "name": "gitDecoration.deletedResourceForeground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет удалённых Git-ресурсов. Используется для меток файлов и в SCM-обозревателе."
//   },
//   {
//     "name": "gitDecoration.renamedResourceForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет переименованных или скопированных Git-ресурсов. Используется для меток файлов и в SCM-обозревателе."
//   },
//   {
//     "name": "gitDecoration.stageModifiedResourceForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет изменений, добавленных в индекс (staged modifications). Используется в метках файлов и SCM-обозревателе."
//   },
//   {
//     "name": "gitDecoration.stageDeletedResourceForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет удалений, добавленных в индекс (staged deletions). Используется в метках файлов и SCM-обозревателе."
//   },
//   {
//     "name": "gitDecoration.untrackedResourceForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет неотслеживаемых Git-ресурсов. Используется для меток файлов и в SCM-обозревателе."
//   },
//   {
//     "name": "gitDecoration.ignoredResourceForeground",
//     "color": ThemeColors.severe.muted,
//     "Alpha": 5,
//     "description": "Цвет игнорируемых Git-ресурсов. Используется для меток файлов и в SCM-обозревателе."
//   },
//   {
//     "name": "gitDecoration.conflictingResourceForeground",
//     "color": ThemeColors.severe.emphasis,
//     "Alpha": 10,
//     "description": "Цвет конфликтующих Git-ресурсов. Используется для меток файлов и в SCM-обозревателе."
//   },
//   {
//     "name": "gitDecoration.submoduleResourceForeground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Цвет ресурсов субмодуля Git."
//   },
//   {
//     "name": "git.blame.editorDecorationForeground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Цвет декорации blame в редакторе (показывает автора последнего изменения строки)."
//   },
//   /**
//    * Source Control Graph colors
//    *
//    * Цвета для визуализации графа системы контроля версий (например, Git).
//    * Используются в представлении истории коммитов, при наведении, для веток и меток.
//    *
//    * @see ttps://code.visualstudio.com/api/references/theme-color#source-control-graph-colors
//    */
//   {
//     "name": "scmGraph.foreground1",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет графа контроля версий (уровень 1). Используется для основных веток."
//   },
//   {
//     "name": "scmGraph.foreground2",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет графа контроля версий (уровень 2). Используется для дополнительных веток."
//   },
//   {
//     "name": "scmGraph.foreground3",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 10,
//     "description": "Цвет графа контроля версий (уровень 3)."
//   },
//   {
//     "name": "scmGraph.foreground4",
//     "color": ThemeColors.severe.fg,
//     "Alpha": 10,
//     "description": "Цвет графа контроля версий (уровень 4)."
//   },
//   {
//     "name": "scmGraph.foreground5",
//     "color": ThemeColors.danger.fg,
//     "Alpha": 10,
//     "description": "Цвет графа контроля версий (уровень 5)."
//   },
//   {
//     "name": "scmGraph.historyItemHoverLabelForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста метки при наведении на элемент истории."
//   },
//   {
//     "name": "scmGraph.historyItemHoverDefaultLabelForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста стандартной метки при наведении на элемент истории."
//   },
//   {
//     "name": "scmGraph.historyItemHoverDefaultLabelBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон стандартной метки при наведении на элемент истории."
//   },
//   {
//     "name": "scmGraph.historyItemHoverAdditionsForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет добавлений при наведении на элемент истории."
//   },
//   {
//     "name": "scmGraph.historyItemHoverDeletionsForeground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет удалений при наведении на элемент истории."
//   },
//   {
//     "name": "scmGraph.historyItemRefColor",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет локальной ветки (reference) в истории."
//   },
//   {
//     "name": "scmGraph.historyItemRemoteRefColor",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет удалённой ветки (remote reference) в истории."
//   },
//   {
//     "name": "scmGraph.historyItemBaseRefColor",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 10,
//     "description": "Цвет базовой ветки (base reference) при слиянии."
//   },
//   /**
//    * Settings Editor
//    *
//    * Цвета для графического редактора настроек (GUI), открываемого через "Preferences: Open Settings (UI)".
//    * Включают цвета заголовков, полей ввода, чекбоксов, выпадающих списков и элементов навигации.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#settings-editor-colors
//    */
//   {
//     "name": "settings.headerForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет текста заголовка раздела или активного заголовка в редакторе настроек."
//   },
//   {
//     "name": "settings.modifiedItemIndicator",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Линия, указывающая, что настройка была изменена."
//   },
//   {
//     "name": "settings.dropdownBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Фон выпадающего списка в редакторе настроек."
//   },
//   {
//     "name": "settings.dropdownForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 5,
//     "description": "Цвет текста в выпадающем списке."
//   },
//   {
//     "name": "settings.dropdownBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы выпадающего списка."
//   },
//   {
//     "name": "settings.dropdownListBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы списка в выпадающем меню."
//   },
//   {
//     "name": "settings.checkboxBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Фон чекбокса в редакторе настроек."
//   },
//   {
//     "name": "settings.checkboxForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 5,
//     "description": "Цвет иконки (галочки) в чекбоксе."
//   },
//   {
//     "name": "settings.checkboxBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы чекбокса."
//   },
//   {
//     "name": "settings.rowHoverBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Фон строки настройки при наведении курсора."
//   },
//   {
//     "name": "settings.textInputBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон текстового поля ввода."
//   },
//   {
//     "name": "settings.textInputForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 5,
//     "description": "Цвет текста в текстовом поле ввода."
//   },
//   {
//     "name": "settings.textInputBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы текстового поля ввода."
//   },
//   {
//     "name": "settings.numberInputBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон поля ввода числа."
//   },
//   {
//     "name": "settings.numberInputForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста в поле ввода числа."
//   },
//   {
//     "name": "settings.numberInputBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы поля ввода числа."
//   },
//   {
//     "name": "settings.focusedRowBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 2,
//     "description": "Фон строки настройки, когда она в фокусе."
//   },
//   {
//     "name": "settings.focusedRowBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Цвет верхней и нижней границ строки настройки при фокусе."
//   },
//   {
//     "name": "settings.headerBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы контейнера заголовка в редакторе настроек."
//   },
//   {
//     "name": "settings.sashBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы разделителя (sash) в редакторе настроек."
//   },
//   {
//     "name": "settings.settingsHeaderHoverForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста заголовка раздела при наведении."
//   },
//   /**
//    * Breadcrumbs
//    *
//    * Цвета для навигации хлебных крошек (breadcrumbs) — отображаются в верхней части редактора.
//    * Используются для навигации по символам и файлам.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#breadcrumbs-colors
//    */
//   {
//     "name": "breadcrumb.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 5,
//     "description": "Цвет элементов хлебных крошек (навигационных ссылок)."
//   },
//   {
//     "name": "breadcrumb.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон области хлебных крошек."
//   },
//   {
//     "name": "breadcrumb.focusForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет элемента хлебных крошек при фокусе."
//   },
//   {
//     "name": "breadcrumb.activeSelectionForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет выбранного элемента в хлебных крошках."
//   },
//   {
//     "name": "breadcrumbPicker.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон пикера (выбора) элементов в хлебных крошках."
//   },
//   /**
//    * Snippets
//    *
//    * Цвета для подсветки табстопов во фрагментах кода (snippets).
//    * Используются при вставке сниппетов для выделения полей ввода (например, $1, $2).
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#snippets-colors
//    */
//   {
//     "name": "editor.snippetTabstopHighlightBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Фон подсветки табстопа (например, $1, $2) во фрагменте кода."
//   },
//   {
//     "name": "editor.snippetTabstopHighlightBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы подсветки табстопа во фрагменте кода."
//   },
//   {
//     "name": "editor.snippetFinalTabstopHighlightBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон подсветки последнего табстопа ($0) во фрагменте кода."
//   },
//   {
//     "name": "editor.snippetFinalTabstopHighlightBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы последнего табстопа ($0) во фрагменте кода."
//   },
//   /**
//    * Symbol Icons
//    *
//    * Цвета иконок символов, отображаемых в Outline (структуре), хлебных крошках,
//    * автодополнении и других элементах интерфейса.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#symbol-icons-colors
//    */
//   {
//     "name": "symbolIcon.arrayForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки массива."
//   },
//   {
//     "name": "symbolIcon.booleanForeground",
//     "color": ThemeColors.sponsors.muted,
//     "Alpha": 10,
//     "description": "Цвет иконки булевого значения."
//   },
//   {
//     "name": "symbolIcon.classForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет иконки класса."
//   },
//   {
//     "name": "symbolIcon.colorForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет иконки цвета."
//   },
//   {
//     "name": "symbolIcon.constantForeground",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки константы."
//   },
//   {
//     "name": "symbolIcon.constructorForeground",
//     "color": ThemeColors.sponsors.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки конструктора."
//   },
//   {
//     "name": "symbolIcon.enumeratorForeground",
//     "color": ThemeColors.open.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки перечисления (enum)."
//   },
//   {
//     "name": "symbolIcon.enumeratorMemberForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет иконки элемента перечисления (enum member)."
//   },
//   {
//     "name": "symbolIcon.eventForeground",
//     "color": ThemeColors.sponsors.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки события."
//   },
//   {
//     "name": "symbolIcon.fieldForeground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет иконки поля."
//   },
//   {
//     "name": "symbolIcon.fileForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки файла."
//   },
//   {
//     "name": "symbolIcon.folderForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет иконки папки."
//   },
//   {
//     "name": "symbolIcon.functionForeground",
//     "color": ThemeColors.sponsors.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки функции."
//   },
//   {
//     "name": "symbolIcon.interfaceForeground",
//     "color": ThemeColors.danger.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки интерфейса."
//   },
//   {
//     "name": "symbolIcon.keyForeground",
//     "color": ThemeColors.open.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки ключа."
//   },
//   {
//     "name": "symbolIcon.keywordForeground",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки ключевого слова."
//   },
//   {
//     "name": "symbolIcon.methodForeground",
//     "color": ThemeColors.sponsors.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки метода."
//   },
//   {
//     "name": "symbolIcon.moduleForeground",
//     "color": ThemeColors.open.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки модуля."
//   },
//   {
//     "name": "symbolIcon.namespaceForeground",
//     "color": ThemeColors.attention.emphasis,
//     "Alpha": 10,
//     "description": "Цвет иконки пространства имён."
//   },
//   {
//     "name": "symbolIcon.nullForeground",
//     "color": ThemeColors.neutral.emphasisPlus,
//     "Alpha": 10,
//     "description": "Цвет иконки null."
//   },
//   {
//     "name": "symbolIcon.numberForeground",
//     "color": ThemeColors.severe.emphasis,
//     "Alpha": 10,
//     "description": "Цвет иконки числа."
//   },
//   {
//     "name": "symbolIcon.objectForeground",
//     "color": ThemeColors.open.emphasis,
//     "Alpha": 10,
//     "description": "Цвет иконки объекта."
//   },
//   {
//     "name": "symbolIcon.operatorForeground",
//     "color": ThemeColors.done.emphasis,
//     "Alpha": 10,
//     "description": "Цвет иконки оператора."
//   },
//   {
//     "name": "symbolIcon.packageForeground",
//     "color": ThemeColors.attention.emphasis,
//     "Alpha": 10,
//     "description": "Цвет иконки пакета."
//   },
//   {
//     "name": "symbolIcon.propertyForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет иконки свойства."
//   },
//   {
//     "name": "symbolIcon.referenceForeground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Цвет иконки ссылки."
//   },
//   {
//     "name": "symbolIcon.snippetForeground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет иконки сниппета."
//   },
//   {
//     "name": "symbolIcon.stringForeground",
//     "color": ThemeColors.neutral.muted,
//     "Alpha": 10,
//     "description": "Цвет иконки строки."
//   },
//   {
//     "name": "symbolIcon.structForeground",
//     "color": ThemeColors.accent.muted,
//     "Alpha": 10,
//     "description": "Цвет иконки структуры."
//   },
//   {
//     "name": "symbolIcon.textForeground",
//     "color": ThemeColors.success.muted,
//     "Alpha": 10,
//     "description": "Цвет иконки текста."
//   },
//   {
//     "name": "symbolIcon.typeParameterForeground",
//     "color": ThemeColors.danger.emphasis,
//     "Alpha": 10,
//     "description": "Цвет иконки параметра типа."
//   },
//   {
//     "name": "symbolIcon.unitForeground",
//     "color": ThemeColors.sponsors.muted,
//     "Alpha": 10,
//     "description": "Цвет иконки единицы измерения."
//   },
//   {
//     "name": "symbolIcon.variableForeground",
//     "color": ThemeColors.sponsors.muted,
//     "Alpha": 10,
//     "description": "Цвет иконки переменной."
//   },
//   /**
//    * Debug Icons
//    *
//    * Цвета иконок отладки: точки останова, кнопки управления (старт, пауза, шаг и т.д.),
//    * а также цвета сообщений в консоли отладки (REPL).
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#debug-icons-colors
//    */
//   {
//     "name": "debugIcon.breakpointForeground",
//     "color": ThemeColors.severe.emphasis,
//     "Alpha": 10,
//     "description": "Цвет иконки активной точки останова."
//   },
//   {
//     "name": "debugIcon.breakpointDisabledForeground",
//     "color": ThemeColors.fg.subtle,
//     "Alpha": 10,
//     "description": "Цвет иконки отключённой точки останова."
//   },
//   {
//     "name": "debugIcon.breakpointUnverifiedForeground",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки непроверенной точки останова (например, строка не исполняется)."
//   },
//   {
//     "name": "debugIcon.breakpointCurrentStackframeForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет иконки точки останова, находящейся в текущем стеке вызовов."
//   },
//   {
//     "name": "debugIcon.breakpointStackframeForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет иконки точки останова, связанной с кадром стека."
//   },
//   {
//     "name": "debugIcon.startForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет иконки запуска отладки на панели инструментов."
//   },
//   {
//     "name": "debugIcon.pauseForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки паузы отладки."
//   },
//   {
//     "name": "debugIcon.stopForeground",
//     "color": ThemeColors.danger.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки остановки отладки."
//   },
//   {
//     "name": "debugIcon.disconnectForeground",
//     "color": ThemeColors.danger.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки отключения от сеанса отладки."
//   },
//   {
//     "name": "debugIcon.restartForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет иконки перезапуска отладки."
//   },
//   {
//     "name": "debugIcon.stepOverForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет иконки 'Step Over' (шаг с обходом)."
//   },
//   {
//     "name": "debugIcon.stepIntoForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет иконки 'Step Into' (шаг с входом)."
//   },
//   {
//     "name": "debugIcon.stepOutForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет иконки 'Step Out' (шаг с выходом)."
//   },
//   {
//     "name": "debugIcon.continueForeground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет иконки 'Continue' (продолжить выполнение)."
//   },
//   {
//     "name": "debugIcon.stepBackForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 5,
//     "description": "Цвет иконки 'Step Back' (шаг назад, при поддержке)."
//   },
//   {
//     "name": "debugConsole.infoForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет текста информационных сообщений в консоли отладки (REPL)."
//   },
//   {
//     "name": "debugConsole.warningForeground",
//     "color": ThemeColors.severe.fg,
//     "Alpha": 10,
//     "description": "Цвет текста предупреждений в консоли отладки (REPL)."
//   },
//   {
//     "name": "debugConsole.errorForeground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет текста ошибок в консоли отладки (REPL)."
//   },
//   {
//     "name": "debugConsole.sourceForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет имён файлов источников в консоли отладки (REPL)."
//   },
//   {
//     "name": "debugConsoleInputIcon.foreground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет иконки ввода в консоли отладки."
//   },
//   /**
//    * Notebook
//    *
//    * Цвета для интерфейса блокнотов (Notebook), включая ячейки, панели статуса, прокрутку,
//    * индикаторы выполнения и выделение.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#notebook-colors
//    */
//   {
//     "name": "notebook.editorBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон области редактора блокнота."
//   },
//   {
//     "name": "notebook.cellBorderColor",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы ячеек блокнота."
//   },
//   {
//     "name": "notebook.cellHoverBackground",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Фон ячейки при наведении курсора."
//   },
//   {
//     "name": "notebook.cellInsertionIndicator",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет индикатора вставки новой ячейки."
//   },
//   {
//     "name": "notebook.cellStatusBarItemHoverBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Фон элемента панели статуса ячейки при наведении."
//   },
//   {
//     "name": "notebook.cellToolbarSeparator",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет разделителя в нижней панели инструментов ячейки."
//   },
//   {
//     "name": "notebook.cellEditorBackground",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон редактора внутри ячейки блокнота."
//   },
//   {
//     "name": "notebook.focusedCellBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 3,
//     "description": "Фон ячейки, когда она находится в фокусе."
//   },
//   {
//     "name": "notebook.focusedCellBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет границ фокуса вокруг активной ячейки."
//   },
//   {
//     "name": "notebook.focusedEditorBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы редактора ячейки, когда она в фокусе."
//   },
//   {
//     "name": "notebook.inactiveFocusedCellBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Цвет верхней и нижней границы ячейки, когда она в фокусе, но редактор неактивен."
//   },
//   {
//     "name": "notebook.inactiveSelectedCellBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы ячейки, когда она выбрана, но редактор не в фокусе."
//   },
//   {
//     "name": "notebook.selectedCellBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Фон ячейки, когда она выбрана (но не в фокусе)."
//   },
//   {
//     "name": "notebook.selectedCellBorder",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Цвет верхней и нижней границы выбранной ячейки, когда она не в фокусе."
//   },
//   {
//     "name": "notebook.symbolHighlightBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 3,
//     "description": "Фон выделенной ячейки по символу (например, при навигации)."
//   },
//   {
//     "name": "notebook.outputContainerBackgroundColor",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон контейнера вывода ячейки (например, результат выполнения)."
//   },
//   {
//     "name": "notebook.outputContainerBorderColor",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы контейнера вывода ячейки."
//   },
//   {
//     "name": "notebookScrollbarSlider.background",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон ползунка прокрутки блокнота."
//   },
//   {
//     "name": "notebookScrollbarSlider.hoverBackground",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Фон ползунка прокрутки блокнота при наведении."
//   },
//   {
//     "name": "notebookScrollbarSlider.activeBackground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Фон ползунка прокрутки блокнота при нажатии."
//   },
//   {
//     "name": "notebookStatusErrorIcon.foreground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет иконки ошибки в панели статуса ячейки блокнота."
//   },
//   {
//     "name": "notebookStatusRunningIcon.foreground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет иконки выполнения («работает») в панели статуса ячейки."
//   },
//   {
//     "name": "notebookStatusSuccessIcon.foreground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет иконки успеха («выполнено») в панели статуса ячейки."
//   },
//   {
//     "name": "notebookEditorOverviewRuler.runningCellForeground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Цвет маркера выполняющейся ячейки на линейке обзора редактора блокнота."
//   },
//   /**
//    * Chart
//    *
//    * Цвета для графиков и диаграмм, отображаемых в интерфейсе VS Code.
//    * Используются в представлениях производительности, аналитики, Git-графах и других визуализациях.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#chart-colors
//    */
//   {
//     "name": "charts.foreground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Контрастный цвет текста в графиках."
//   },
//   {
//     "name": "charts.lines",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Цвет линий в графиках."
//   },
//   {
//     "name": "charts.red",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет красных элементов в графиках (например, ошибки)."
//   },
//   {
//     "name": "charts.blue",
//     "color": ThemeColors.accent.muted,
//     "Alpha": 10,
//     "description": "Цвет синих элементов в графиках."
//   },
//   {
//     "name": "charts.yellow",
//     "color": ThemeColors.attention.fg,
//     "Alpha": 10,
//     "description": "Цвет жёлтых элементов в графиках (например, предупреждения)."
//   },
//   {
//     "name": "charts.orange",
//     "color": ThemeColors.severe.muted,
//     "Alpha": 10,
//     "description": "Цвет оранжевых элементов в графиках."
//   },
//   {
//     "name": "charts.green",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет зелёных элементов в графиках (например, успех)."
//   },
//   {
//     "name": "charts.purple",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет фиолетовых элементов в графиках."
//   },
//   {
//     "name": "chart.line",
//     "color": ThemeColors.fg.muted,
//     "Alpha": 10,
//     "description": "Цвет линий на графике."
//   },
//   {
//     "name": "chart.axis",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет осей графика."
//   },
//   {
//     "name": "chart.guide",
//     "color": ThemeColors.border.muted,
//     "Alpha": 5,
//     "description": "Цвет направляющих линий (guides) на графике."
//   },
//   /**
//    * Ports
//    *
//    * Цвета для отображения портов, например, в панели "Ports".
//    * Включают цвета иконок для портов с запущенными процессами.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#ports-colors
//    */
//   {
//     "name": "ports.iconRunningProcessForeground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет иконки порта, с которым связан запущенный процесс."
//   },
//   /**
//    * Comments View
//    *
//    * Цвета для представления комментариев (например, в Pull Requests).
//    * Включают иконки для разрешённых и неразрешённых комментариев.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#comments-view-colors
//    */
//   {
//     "name": "commentsView.resolvedIcon",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет иконки разрешённых комментариев."
//   },
//   {
//     "name": "commentsView.unresolvedIcon",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Цвет иконки неразрешённых комментариев."
//   },
//   /**
//    * Action Bar
//    *
//    * Цвета для панели действий (action bar), например, в панелях отладки или навигации.
//    * Включает цвет фона для переключенных элементов.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#action-bar-colors
//    */
//   {
//     "name": "actionBar.toggledBackground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 5,
//     "description": "Фон переключённого элемента на панели действий."
//   },
//   /**
//    * Simple Find Widget
//    *
//    * Цвета для простого виджета поиска (в редакторе).
//    * Включает цвет границы разделителя (sash).
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#simple-find-widget-colors
//    */
//   {
//     "name": "simpleFindWidget.sashBorder",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы разделителя (sash) в виджете поиска."
//   },
//   /**
//    * Gauge
//    *
//    * Цвета для индикаторов (гauge), например, в представлениях производительности или прогресса.
//    * Используются в расширениях и встроенных виджетах.
//    *
//    * @see https://code.visualstudio.com/api/references/theme-color#gauge-colors
//    */
//   {
//     "name": "gauge.background",
//     "color": ThemeColors.canvas.inset,
//     "Alpha": 10,
//     "description": "Фон индикатора (гauge)."
//   },
//   {
//     "name": "gauge.foreground",
//     "color": ThemeColors.success.emphasis,
//     "Alpha": 10,
//     "description": "Цвет переднего плана индикатора (гauge)."
//   },
//   {
//     "name": "gauge.border",
//     "color": ThemeColors.border.muted,
//     "Alpha": 10,
//     "description": "Цвет границы индикатора (гauge)."
//   },
//   {
//     "name": "gauge.warningBackground",
//     "color": ThemeColors.accent.fg,
//     "Alpha": 10,
//     "description": "Фон индикатора в состоянии предупреждения."
//   },
//   {
//     "name": "gauge.warningForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста индикатора в состоянии предупреждения."
//   },
//   {
//     "name": "gauge.errorBackground",
//     "color": ThemeColors.danger.muted,
//     "Alpha": 10,
//     "description": "Фон индикатора в состоянии ошибки."
//   },
//   {
//     "name": "gauge.errorForeground",
//     "color": ThemeColors.fg.default,
//     "Alpha": 10,
//     "description": "Цвет текста индикатора в состоянии ошибки."
//   }
// ]
//# sourceMappingURL=ThemeColors.js.map