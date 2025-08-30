import { type DetailedPalette } from '../themes/colorPalettePresets.js';
type ThemeMode = 'normal' | 'dimmed' | 'highContrast' | 'colorblind' | 'tritanopia';
export declare class ThemeColors {
    /**
     * Генерирует полную палитру цветов на основе детализированного пресета и режима отображения.
     *
     * @param {DetailedPalette} palette - Пресет с отдельными настройками для light/dark
     * @param {ThemeMode} mode - Режим: normal, dimmed, highContrast, colorblind, tritanopia
     * @param {boolean} isDark - Является ли тема тёмной
     * @returns {Object} Объект с семантическими группами цветов (canvas, fg, accent и т.д.)
     */
    static generate(palette: DetailedPalette, mode: ThemeMode, isDark: boolean): {
        /**
         * Цвета фона и "холста" интерфейса.
         * Используются для:
         * - Фона редактора
         * - Фона боковых панелей
         * - Фона модальных окон
         *
         * @example
         * "editor.background": canvas.inset
         * "sideBar.background": canvas.inset
         */
        canvas: {
            inset: {
                l: number;
                c: number;
                h: number;
            };
            overlay: {
                l: number;
                c: number;
                h: number;
            };
        };
        /**
         * Цвета текста и иконок.
         * Определяют читаемость и контраст.
         *
         * @example
         * "foreground": fg.default
         * "sideBar.foreground": fg.default
         */
        fg: {
            default: {
                l: number;
                c: number;
                h: number;
            };
            muted: {
                l: number;
                c: number;
                h: number;
            };
            subtle: {
                l: number;
                c: number;
                h: number;
            };
        };
        /**
         * Акцентный цвет.
         * Основной фирменный цвет темы (например, синий, фиолетовый).
         * Используется для выделения активных элементов.
         *
         * @example
         * "activityBar.foreground": accent.fg
         * "focusBorder": accent.emphasis
         */
        accent: {
            fg: {
                l: number;
                c: number;
                h: number;
            };
            emphasis: {
                l: number;
                c: number;
                h: number;
            };
            muted: {
                l: number;
                c: number;
                h: number;
            };
        };
        /**
         * Цвета для успешных действий (зелёные).
         * Используются в Git (добавленные файлы), прогрессе, уведомлениях.
         *
         * @example
         * "gitDecoration.addedResourceForeground": success.emphasis
         * "problems.errorForeground": success.fg
         */
        success: {
            fg: {
                l: number;
                c: number;
                h: number;
            };
            emphasis: {
                l: number;
                c: number;
                h: number;
            };
            muted: {
                l: number;
                c: number;
                h: number;
            };
        };
        /**
         * Цвета для ошибок и критических ситуаций (красные).
         * Используются в Git (удалённые файлы), ошибках, предупреждениях.
         *
         * @example
         * "gitDecoration.deletedResourceForeground": danger.muted
         * "editorError.foreground": danger.fg
         */
        danger: {
            fg: {
                l: number;
                c: number;
                h: number;
            };
            emphasis: {
                l: number;
                c: number;
                h: number;
            };
            muted: {
                l: number;
                c: number;
                h: number;
            };
        };
        /**
         * Цвета для предупреждений (жёлтые).
         * В VS Code называется "severe", но по смыслу — это warning.
         *
         * @example
         * "editorWarning.foreground": severe.fg
         */
        severe: {
            fg: {
                l: number;
                c: number;
                h: number;
            };
            emphasis: {
                l: number;
                c: number;
                h: number;
            };
            muted: {
                l: number;
                c: number;
                h: number;
            };
        };
        /**
         * Цвета для информационных сообщений (синие).
         * Используются для подсказок, информации, вопросов.
         *
         * @example
         * "editorInfo.foreground": attention.fg
         */
        attention: {
            fg: {
                l: number;
                c: number;
                h: number;
            };
            emphasis: {
                l: number;
                c: number;
                h: number;
            };
        };
        /**
         * Цвета для спонсоров, платных функций, "поддержи проект".
         * Обычно фиолетовые или розовые.
         *
         * @example
         * "sash.hoverBorder": sponsors.fg
         */
        sponsors: {
            fg: {
                l: number;
                c: number;
                h: number;
            };
            muted: {
                l: number;
                c: number;
                h: number;
            };
        };
        /**
         * Цвета для "сделано", "выполнено".
         * Часто используется в списках задач, прогрессе.
         *
         * @example
         * "list.completedTaskIcon.foreground": done.fg
         */
        done: {
            fg: {
                l: number;
                c: number;
                h: number;
            };
            emphasis: {
                l: number;
                c: number;
                h: number;
            };
            muted: {
                l: number;
                c: number;
                h: number;
            };
        };
        /**
         * Цвета для "закрыто".
         * Используется в вкладках, задачах, тикетах.
         *
         * @example
         * "tab.inactiveModifiedBorder": closed.fg
         */
        closed: {
            fg: {
                l: number;
                c: number;
                h: number;
            };
            /**
             * Более насыщенный акцент для выделения.
             */
            emphasis: {
                l: number;
                c: number;
                h: number;
            };
            /**
             * Приглушённая версия.
             */
            muted: {
                l: number;
                c: number;
                h: number;
            };
        };
        /**
         * Цвета для "открыто".
         * Используется в активных вкладках, задачах, файлах.
         *
         * @example
         * "tab.activeBorder": open.emphasis
         */
        open: {
            fg: {
                l: number;
                c: number;
                h: number;
            };
            emphasis: {
                l: number;
                c: number;
                h: number;
            };
        };
        /**
         * ANSI-цвета для терминала.
         * Полная 16-цветная палитра.
         *
         * @example
         * "terminal.ansiRed": ansi.red
         * "terminal.ansiGreenBright": ansi.greenBright
         */
        ansi: {
            black: {
                l: number;
                c: number;
                h: number;
            };
            red: {
                l: number;
                c: number;
                h: number;
            };
            green: {
                l: number;
                c: number;
                h: number;
            };
            yellow: {
                l: number;
                c: number;
                h: number;
            };
            blue: {
                l: number;
                c: number;
                h: number;
            };
            magenta: {
                l: number;
                c: number;
                h: number;
            };
            cyan: {
                l: number;
                c: number;
                h: number;
            };
            white: {
                l: number;
                c: number;
                h: number;
            };
            blackBright: {
                l: number;
                c: number;
                h: number;
            };
            redBright: {
                l: number;
                c: number;
                h: number;
            };
            greenBright: {
                l: number;
                c: number;
                h: number;
            };
            yellowBright: {
                l: number;
                c: number;
                h: number;
            };
            blueBright: {
                l: number;
                c: number;
                h: number;
            };
            magentaBright: {
                l: number;
                c: number;
                h: number;
            };
            cyanBright: {
                l: number;
                c: number;
                h: number;
            };
            whiteBright: {
                l: number;
                c: number;
                h: number;
            };
        };
        /**
         * Нейтральные цвета (серые).
         * Используются для границ, разделителей, фонов.
         *
         * @example
         * "border.muted": neutral.muted
         * "list.hoverBackground": neutral.emphasis
         */
        neutral: {
            muted: {
                l: number;
                c: number;
                h: number;
            };
            emphasis: {
                l: number;
                c: number;
                h: number;
            };
            emphasisPlus: {
                l: number;
                c: number;
                h: number;
            };
        };
        /**
         * Цвета границ.
         * Обычно приглушённые версии других цветов.
         *
         * @example
         * "editorGutter.addedBackground": border.muted
         */
        border: {
            muted: {
                l: number;
                c: number;
                h: number;
            };
        };
        /**
         * Цвета для синтаксической и семантической подсветки кода.
         * Используются в tokenColors для точной раскраски переменных, типов, функций и т.д.
         */
        syntax: {
            type: {
                l: number;
                c: number;
                h: number;
            };
            enum: {
                l: number;
                c: number;
                h: number;
            };
            interface: {
                l: number;
                c: number;
                h: number;
            };
            class: {
                l: number;
                c: number;
                h: number;
            };
            struct: {
                l: number;
                c: number;
                h: number;
            };
            variable: {
                l: number;
                c: number;
                h: number;
            };
            parameter: {
                l: number;
                c: number;
                h: number;
            };
            property: {
                l: number;
                c: number;
                h: number;
            };
            field: {
                l: number;
                c: number;
                h: number;
            };
            constant: {
                l: number;
                c: number;
                h: number;
            };
            local: {
                l: number;
                c: number;
                h: number;
            };
            function: {
                l: number;
                c: number;
                h: number;
            };
            method: {
                l: number;
                c: number;
                h: number;
            };
            arrowFunction: {
                l: number;
                c: number;
                h: number;
            };
            constructor: {
                l: number;
                c: number;
                h: number;
            };
            module: {
                l: number;
                c: number;
                h: number;
            };
            namespace: {
                l: number;
                c: number;
                h: number;
            };
            string: {
                l: number;
                c: number;
                h: number;
            };
            number: {
                l: number;
                c: number;
                h: number;
            };
            boolean: {
                l: number;
                c: number;
                h: number;
            };
            null: {
                l: number;
                c: number;
                h: number;
            };
            regexp: {
                l: number;
                c: number;
                h: number;
            };
            templateString: {
                l: number;
                c: number;
                h: number;
            };
            keyword: {
                l: number;
                c: number;
                h: number;
            };
            operator: {
                l: number;
                c: number;
                h: number;
            };
            modifier: {
                l: number;
                c: number;
                h: number;
            };
            decorator: {
                l: number;
                c: number;
                h: number;
            };
            comment: {
                l: number;
                c: number;
                h: number;
            };
            error: {
                l: number;
                c: number;
                h: number;
            };
            warning: {
                l: number;
                c: number;
                h: number;
            };
            info: {
                l: number;
                c: number;
                h: number;
            };
            tag: {
                l: number;
                c: number;
                h: number;
            };
            support: {
                l: number;
                c: number;
                h: number;
            };
            punctuation: {
                l: number;
                c: number;
                h: number;
            };
            heading: {
                l: number;
                c: number;
                h: number;
            };
            quote: {
                l: number;
                c: number;
                h: number;
            };
            embedded: {
                l: number;
                c: number;
                h: number;
            };
            inserted: {
                l: number;
                c: number;
                h: number;
            };
            deleted: {
                l: number;
                c: number;
                h: number;
            };
            changed: {
                l: number;
                c: number;
                h: number;
            };
            ignored: {
                l: number;
                c: number;
                h: number;
            };
            range: {
                l: number;
                c: number;
                h: number;
            };
            header: {
                l: number;
                c: number;
                h: number;
            };
            separator: {
                l: number;
                c: number;
                h: number;
            };
            output: {
                l: number;
                c: number;
                h: number;
            };
            link: {
                l: number;
                c: number;
                h: number;
            };
            inline: {
                l: number;
                c: number;
                h: number;
            };
            emphasis: {
                l: number;
                c: number;
                h: number;
            };
            strong: {
                l: number;
                c: number;
                h: number;
            };
        };
    };
    /**
     * Вспомогательная функция для получения вложенного значения
     * Пример: getNestedValue(obj, 'canvas.inset') → obj.canvas.inset
     */
    private static getNestedValue;
    private static getOklch;
    /**
     * Корректирует тон (hue) в зависимости от режима.
     *
     * @param h - Исходный тон (0–360)
     * @param mode - Режим отображения
     * @returns Скорректированный тон
     */
    private static adjustHue;
    /**
     * Корректирует насыщенность (chroma) в зависимости от режима.
     *
     * @param c - Исходная насыщенность
     * @param mode - Режим отображения
     * @returns Скорректированная насыщенность
     */
    private static adjustChroma;
    /**
     * Корректирует светлоту (lightness) в зависимости от режима.
     *
     * @param l - Исходная светлота [0..1]
     * @param mode - Режим отображения
     * @returns Скорректированная светлота
     */
    private static adjustLightness;
}
export {};
//# sourceMappingURL=ThemeColors.d.ts.map