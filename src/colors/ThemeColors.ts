/**
 *
 * src/colors/ThemeColors.ts
 *
 * Генератор семантических цветов для Vela Spectrum.
 *
 * Этот класс преобразует базовые цвета из `colorPalettePresets` в полную палитру,
 * организованную по ролям (accent, success, danger и т.д.), с учётом режима (colorblind, highContrast и др.).
 *
 * Все цвета возвращаются в формате OKLCH (l, c, h), где:
 * - l: светлота [0..1]
 * - c: насыщенность
 * - h: тон (градусы)
 *
 * Используется в ThemeGenerator для заполнения ThemeElementName.
 *
 * @class ThemeColors
 *
 */
import OKLCHColorGenerator from './ColorConverter.js';

// Импортируем типы
import { type DetailedPalette } from '../themes/colorPalettePresets.js';

type ThemeMode = 'normal' | 'dimmed' | 'highContrast' | 'colorblind' | 'tritanopia';

export class ThemeColors {
  /**
   * Генерирует полную палитру цветов на основе детализированного пресета и режима отображения.
   *
   * @param {DetailedPalette} palette - Пресет с отдельными настройками для light/dark
   * @param {ThemeMode} mode - Режим: normal, dimmed, highContrast, colorblind, tritanopia
   * @param {boolean} isDark - Является ли тема тёмной
   * @returns {Object} Объект с семантическими группами цветов (canvas, fg, accent и т.д.)
   */
  static generate ( palette: DetailedPalette, mode: ThemeMode, isDark: boolean ) {
    // Выбираем нужную палитру по типу темы
    const role = isDark ? palette.dark : palette.light;
console.log('🎨 Palette role:', role);
    // Вспомогательная функция для безопасного получения цвета
    const getColor = ( key: string ): { l: number; c: number; h: number; } => {
      // Шаг 1: Получаем значение по пути (например, 'syntax.punctuation' → 'fg.muted')
      let colorName = ThemeColors.getNestedValue( role, key );

      // 🔁 Рекурсивно разрешаем пути вроде 'fg.muted', 'accent.fg'
      while ( colorName && typeof colorName === 'string' && colorName.includes( '.' ) ) {
        const resolved = ThemeColors.getNestedValue( role, colorName );
        if ( !resolved ) break;
        colorName = resolved;
      }

      // 🔒 Проверка: теперь colorName должна быть строкой — именем цвета из colors.json
      if ( typeof colorName !== 'string' ) {
        console.error(
          `❌ Ожидалась строка, но получен ${ typeof colorName }:`,
          colorName,
          'для ключа:',
          key
        );
        return { l: 0.5, c: 0.1, h: 220 };
      }

      if ( !colorName ) {
        console.warn( `Цвет для ключа "${ key }" не найден` );
        return { l: 0.5, c: 0.1, h: 220 };
      }

      return this.getOklch( colorName );
    };

    // Получаем базовые цвета для коррекции
    const accentBase = getColor( 'accent.fg' );
    const successBase = getColor( 'success.fg' );
    const dangerBase = getColor( 'danger.fg' );
    const warningBase = getColor( 'warning.fg' );
    const infoBase = getColor( 'info.fg' );

    // Коррекция для режимов: тон (hue)
    const hAccent = this.adjustHue( accentBase.h, mode );
    const hSuccess = this.adjustHue( successBase.h, mode );
    const hDanger = this.adjustHue( dangerBase.h, mode );
    const hWarning = this.adjustHue( warningBase.h, mode );
    const hInfo = this.adjustHue( infoBase.h, mode );

    // Коррекция для режимов: насыщенность (chroma)
    const cAccent = this.adjustChroma( accentBase.c, mode );
    const cSuccess = this.adjustChroma( successBase.c, mode );
    const cDanger = this.adjustChroma( dangerBase.c, mode );
    const cWarning = this.adjustChroma( warningBase.c, mode );
    const cInfo = this.adjustChroma( infoBase.c, mode );

    // Коррекция светлоты (lightness) по режиму (опционально)
    const lAccent = this.adjustLightness( 0.8, mode );
    const lAccentEmphasis = this.adjustLightness( 0.7, mode );
    const lSuccess = this.adjustLightness( 0.7, mode );
    const lSuccessEmphasis = this.adjustLightness( 0.6, mode );
    const lDanger = this.adjustLightness( 0.7, mode );
    const lDangerEmphasis = this.adjustLightness( 0.6, mode );
    const lWarning = this.adjustLightness( 0.8, mode );
    const lWarningEmphasis = this.adjustLightness( 0.7, mode );
    const lInfo = this.adjustLightness( 0.8, mode );
    const lInfoEmphasis = this.adjustLightness( 0.7, mode );


    // 🔥 === ОТЛАДКА: Добавь это ===
    // console.log('🎨 Генерация темы:', { mode, isDark });
    // console.log('Accent base:', accentBase);
    // console.log('cAccent после коррекции:', cAccent);
    // console.log('hAccent после коррекции:', hAccent);
    // 🔚 === Конец отладки ===

    return {
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
        inset: getColor( 'canvas.inset' ),
        overlay: getColor( 'canvas.overlay' )
      },

      /**
       * Цвета текста и иконок.
       * Определяют читаемость и контраст.
       *
       * @example
       * "foreground": fg.default
       * "sideBar.foreground": fg.default
       */
      fg: {
        default: getColor( 'fg.default' ),
        muted: getColor( 'fg.muted' ),
        subtle: getColor( 'fg.subtle' )
      },

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
        fg: { l: lAccent, c: cAccent, h: hAccent },
        emphasis: { l: lAccentEmphasis, c: cAccent * 1.1, h: hAccent },
        muted: { l: 0.6, c: cAccent * 0.8, h: hAccent }
      },

      /**
       * Цвета для успешных действий (зелёные).
       * Используются в Git (добавленные файлы), прогрессе, уведомлениях.
       *
       * @example
       * "gitDecoration.addedResourceForeground": success.emphasis
       * "problems.errorForeground": success.fg
       */
      success: {
        fg: { l: lSuccess, c: cSuccess, h: hSuccess },
        emphasis: { l: lSuccessEmphasis, c: cSuccess * 1.2, h: hSuccess },
        muted: { l: 0.6, c: cSuccess * 0.8, h: getColor( 'success.muted' ).h }
      },

      /**
       * Цвета для ошибок и критических ситуаций (красные).
       * Используются в Git (удалённые файлы), ошибках, предупреждениях.
       *
       * @example
       * "gitDecoration.deletedResourceForeground": danger.muted
       * "editorError.foreground": danger.fg
       */
      danger: {
        fg: { l: lDanger, c: cDanger, h: hDanger },
        emphasis: { l: lDangerEmphasis, c: cDanger * 1.2, h: hDanger },
        muted: { l: 0.6, c: cDanger * 0.8, h: getColor( 'danger.muted' ).h }
      },

      /**
       * Цвета для предупреждений (жёлтые).
       * В VS Code называется "severe", но по смыслу — это warning.
       *
       * @example
       * "editorWarning.foreground": severe.fg
       */
      severe: {
        fg: { l: lWarning, c: cWarning, h: hWarning },
        emphasis: { l: 0.7, c: cWarning * 0.9, h: hWarning },
        muted: { l: 0.6, c: cWarning * 0.7, h: getColor( 'warning.muted' ).h }
      },

      /**
       * Цвета для информационных сообщений (синие).
       * Используются для подсказок, информации, вопросов.
       *
       * @example
       * "editorInfo.foreground": attention.fg
       */
      attention: {
        fg: { l: lInfo, c: cInfo, h: hInfo },
        emphasis: { l: lInfoEmphasis, c: cInfo * 1.1, h: hInfo }
      },

      /**
       * Цвета для спонсоров, платных функций, "поддержи проект".
       * Обычно фиолетовые или розовые.
       *
       * @example
       * "sash.hoverBorder": sponsors.fg
       */
      sponsors: {
        fg: { l: 0.75, c: cAccent * 0.9, h: getColor( 'sponsors.fg' ).h },
        muted: { l: 0.6, c: cAccent * 0.7, h: getColor( 'sponsors.muted' ).h }
      },

      /**
       * Цвета для "сделано", "выполнено".
       * Часто используется в списках задач, прогрессе.
       *
       * @example
       * "list.completedTaskIcon.foreground": done.fg
       */
      done: {
        fg: { l: 0.7, c: cSuccess * 0.9, h: getColor( 'done.fg' ).h },
        emphasis: { l: 0.6, c: cSuccess * 1.1, h: getColor( 'done.emphasis' ).h },
        muted: { l: 0.6, c: cSuccess * 0.6, h: getColor( 'done.muted' ).h }
      },

      /**
       * Цвета для "закрыто".
       * Используется в вкладках, задачах, тикетах.
       *
       * @example
       * "tab.inactiveModifiedBorder": closed.fg
       */
      closed: {
        fg: { l: 0.6, c: cDanger * 0.9, h: getColor( 'closed.fg' ).h },
        /**
         * Более насыщенный акцент для выделения.
         */
        emphasis: { l: 0.6, c: cDanger * 1.2, h: getColor( 'closed.fg' ).h },
        /**
         * Приглушённая версия.
         */
        muted: { l: 0.6, c: cDanger * 0.8, h: getColor( 'closed.fg' ).h }
      },

      /**
       * Цвета для "открыто".
       * Используется в активных вкладках, задачах, файлах.
       *
       * @example
       * "tab.activeBorder": open.emphasis
       */
      open: {
        fg: { l: 0.7, c: cSuccess * 0.8, h: getColor( 'open.fg' ).h },
        emphasis: { l: 0.6, c: cSuccess * 1.0, h: getColor( 'open.emphasis' ).h }
      },

      /**
       * ANSI-цвета для терминала.
       * Полная 16-цветная палитра.
       *
       * @example
       * "terminal.ansiRed": ansi.red
       * "terminal.ansiGreenBright": ansi.greenBright
       */
      ansi: {
        black: getColor( 'ansi.black' ),
        red: { l: 0.4, c: this.adjustChroma( getColor( 'ansi.red' ).c, mode ), h: this.adjustHue( getColor( 'ansi.red' ).h, mode ) },
        green: { l: 0.5, c: this.adjustChroma( getColor( 'ansi.green' ).c, mode ), h: this.adjustHue( getColor( 'ansi.green' ).h, mode ) },
        yellow: { l: 0.6, c: this.adjustChroma( getColor( 'ansi.yellow' ).c, mode ), h: this.adjustHue( getColor( 'ansi.yellow' ).h, mode ) },
        blue: { l: 0.55, c: this.adjustChroma( getColor( 'ansi.blue' ).c, mode ), h: this.adjustHue( getColor( 'ansi.blue' ).h, mode ) },
        magenta: { l: 0.5, c: this.adjustChroma( getColor( 'ansi.magenta' ).c, mode ), h: this.adjustHue( getColor( 'ansi.magenta' ).h, mode ) },
        cyan: { l: 0.55, c: this.adjustChroma( getColor( 'ansi.cyan' ).c, mode ), h: this.adjustHue( getColor( 'ansi.cyan' ).h, mode ) },
        white: getColor( 'ansi.white' ),
        blackBright: getColor( 'ansi.blackBright' ),
        redBright: { l: 0.5, c: this.adjustChroma( getColor( 'ansi.redBright' ).c, mode ), h: this.adjustHue( getColor( 'ansi.redBright' ).h, mode ) },
        greenBright: { l: 0.6, c: this.adjustChroma( getColor( 'ansi.greenBright' ).c, mode ), h: this.adjustHue( getColor( 'ansi.greenBright' ).h, mode ) },
        yellowBright: { l: 0.7, c: this.adjustChroma( getColor( 'ansi.yellowBright' ).c, mode ), h: this.adjustHue( getColor( 'ansi.yellowBright' ).h, mode ) },
        blueBright: { l: 0.65, c: this.adjustChroma( getColor( 'ansi.blueBright' ).c, mode ), h: this.adjustHue( getColor( 'ansi.blueBright' ).h, mode ) },
        magentaBright: { l: 0.6, c: this.adjustChroma( getColor( 'ansi.magentaBright' ).c, mode ), h: this.adjustHue( getColor( 'ansi.magentaBright' ).h, mode ) },
        cyanBright: { l: 0.65, c: this.adjustChroma( getColor( 'ansi.cyanBright' ).c, mode ), h: this.adjustHue( getColor( 'ansi.cyanBright' ).h, mode ) },
        whiteBright: getColor( 'ansi.whiteBright' )
      },

      /**
       * Нейтральные цвета (серые).
       * Используются для границ, разделителей, фонов.
       *
       * @example
       * "border.muted": neutral.muted
       * "list.hoverBackground": neutral.emphasis
       */
      neutral: {
        muted: getColor( 'neutral.muted' ),
        emphasis: getColor( 'neutral.emphasis' ),
        emphasisPlus: getColor( 'neutral.emphasisPlus' )
      },

      /**
       * Цвета границ.
       * Обычно приглушённые версии других цветов.
       *
       * @example
       * "editorGutter.addedBackground": border.muted
       */
      border: {
        muted: getColor( 'border.muted' )
      },

      /**
       * Цвета для синтаксической и семантической подсветки кода.
       * Используются в tokenColors для точной раскраски переменных, типов, функций и т.д.
       */
      syntax: {
        // === Типы и структуры ===
        type: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.type' ).c, mode ), h: this.adjustHue( getColor( 'syntax.type' ).h, mode ) },
        enum: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.enum' ).c, mode ), h: this.adjustHue( getColor( 'syntax.enum' ).h, mode ) },
        interface: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.interface' ).c, mode ), h: this.adjustHue( getColor( 'syntax.interface' ).h, mode ) },
        class: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.class' ).c, mode ), h: this.adjustHue( getColor( 'syntax.class' ).h, mode ) },
        struct: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.struct' ).c, mode ), h: this.adjustHue( getColor( 'syntax.struct' ).h, mode ) },

        // === Переменные и параметры ===
        variable: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.variable' ).c, mode ), h: this.adjustHue( getColor( 'syntax.variable' ).h, mode ) },
        parameter: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.parameter' ).c, mode ), h: this.adjustHue( getColor( 'syntax.parameter' ).h, mode ) },
        property: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.property' ).c, mode ), h: this.adjustHue( getColor( 'syntax.property' ).h, mode ) },
        field: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.field' ).c, mode ), h: this.adjustHue( getColor( 'syntax.field' ).h, mode ) },
        constant: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.constant' ).c, mode ), h: this.adjustHue( getColor( 'syntax.constant' ).h, mode ) },
        local: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.local' ).c, mode ), h: this.adjustHue( getColor( 'syntax.local' ).h, mode ) },

        // === Функции и методы ===
        function: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.function' ).c, mode ), h: this.adjustHue( getColor( 'syntax.function' ).h, mode ) },
        method: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.method' ).c, mode ), h: this.adjustHue( getColor( 'syntax.method' ).h, mode ) },
        arrowFunction: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.arrowFunction' ).c, mode ), h: this.adjustHue( getColor( 'syntax.arrowFunction' ).h, mode ) },
        constructor: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.constructor' ).c, mode ), h: this.adjustHue( getColor( 'syntax.constructor' ).h, mode ) },

        // === Модули и пространства имён ===
        module: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.module' ).c, mode ), h: this.adjustHue( getColor( 'syntax.module' ).h, mode ) },
        namespace: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.namespace' ).c, mode ), h: this.adjustHue( getColor( 'syntax.namespace' ).h, mode ) },

        // === Литералы ===
        string: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.string' ).c, mode ), h: this.adjustHue( getColor( 'syntax.string' ).h, mode ) },
        number: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.number' ).c, mode ), h: this.adjustHue( getColor( 'syntax.number' ).h, mode ) },
        boolean: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.boolean' ).c, mode ), h: this.adjustHue( getColor( 'syntax.boolean' ).h, mode ) },
        null: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.null' ).c, mode ), h: this.adjustHue( getColor( 'syntax.null' ).h, mode ) },
        regexp: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.regexp' ).c, mode ), h: this.adjustHue( getColor( 'syntax.regexp' ).h, mode ) },
        templateString: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.templateString' ).c, mode ), h: this.adjustHue( getColor( 'syntax.templateString' ).h, mode ) },

        // === Ключевые слова и операторы ===
        keyword: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.keyword' ).c, mode ), h: this.adjustHue( getColor( 'syntax.keyword' ).h, mode ) },
        operator: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.operator' ).c, mode ), h: this.adjustHue( getColor( 'syntax.operator' ).h, mode ) },
        modifier: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.modifier' ).c, mode ), h: this.adjustHue( getColor( 'syntax.modifier' ).h, mode ) },
        decorator: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.decorator' ).c, mode ), h: this.adjustHue( getColor( 'syntax.decorator' ).h, mode ) },
        comment: { l: 0.6, c: this.adjustChroma( getColor( 'syntax.comment' ).c, mode ), h: this.adjustHue( getColor( 'syntax.comment' ).h, mode ) },

        // === Ошибки и предупреждения ===
        error: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.error' ).c, mode ), h: this.adjustHue( getColor( 'syntax.error' ).h, mode ) },
        warning: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.warning' ).c, mode ), h: this.adjustHue( getColor( 'syntax.warning' ).h, mode ) },
        info: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.info' ).c, mode ), h: this.adjustHue( getColor( 'syntax.info' ).h, mode ) },

        // === Дополнительные синтаксические роли ===
        tag: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.tag' ).c, mode ), h: this.adjustHue( getColor( 'syntax.tag' ).h, mode ) },
        support: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.support' ).c, mode ), h: this.adjustHue( getColor( 'syntax.support' ).h, mode ) },
        punctuation: { l: 0.6, c: this.adjustChroma( getColor( 'syntax.punctuation' ).c, mode ), h: this.adjustHue( getColor( 'syntax.punctuation' ).h, mode ) },
        heading: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.heading' ).c, mode ), h: this.adjustHue( getColor( 'syntax.heading' ).h, mode ) },
        quote: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.quote' ).c, mode ), h: this.adjustHue( getColor( 'syntax.quote' ).h, mode ) },
        embedded: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.embedded' ).c, mode ), h: this.adjustHue( getColor( 'syntax.embedded' ).h, mode ) },
        inserted: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.inserted' ).c, mode ), h: this.adjustHue( getColor( 'syntax.inserted' ).h, mode ) },
        deleted: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.deleted' ).c, mode ), h: this.adjustHue( getColor( 'syntax.deleted' ).h, mode ) },
        changed: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.changed' ).c, mode ), h: this.adjustHue( getColor( 'syntax.changed' ).h, mode ) },
        ignored: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.ignored' ).c, mode ), h: this.adjustHue( getColor( 'syntax.ignored' ).h, mode ) },
        range: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.range' ).c, mode ), h: this.adjustHue( getColor( 'syntax.range' ).h, mode ) },
        header: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.header' ).c, mode ), h: this.adjustHue( getColor( 'syntax.header' ).h, mode ) },
        separator: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.separator' ).c, mode ), h: this.adjustHue( getColor( 'syntax.separator' ).h, mode ) },
        output: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.output' ).c, mode ), h: this.adjustHue( getColor( 'syntax.output' ).h, mode ) },
        link: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.link' ).c, mode ), h: this.adjustHue( getColor( 'syntax.link' ).h, mode ) },
        inline: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.inline' ).c, mode ), h: this.adjustHue( getColor( 'syntax.inline' ).h, mode ) },
        emphasis: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.emphasis' ).c, mode ), h: this.adjustHue( getColor( 'syntax.emphasis' ).h, mode ) },
        strong: { l: 0.7, c: this.adjustChroma( getColor( 'syntax.strong' ).c, mode ), h: this.adjustHue( getColor( 'syntax.strong' ).h, mode ) }
      }
    };
  }

  /**
   * Вспомогательная функция для получения вложенного значения
   * Пример: getNestedValue(obj, 'canvas.inset') → obj.canvas.inset
   */
private static getNestedValue(obj: any, path: string): string | undefined {
  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (current == null || typeof current !== 'object' || !(key in current)) {
      console.warn(`Путь "${path}" не найден: ключ "${key}" отсутствует`);
      return undefined;
    }
    current = current[key];
  }

  return current;
}

  private static getOklch ( colorName: string ) {
    const colorEntry = OKLCHColorGenerator.getColorRgb( colorName );
    if ( !colorEntry ) throw new Error( `Цвет "${ colorName }" не найден` );

    const rgbColor = {
      mode: 'rgb' as const,
      r: colorEntry.rgb.r,
      g: colorEntry.rgb.g,
      b: colorEntry.rgb.b,
      alpha: 1
    };

    return OKLCHColorGenerator.rgbToOKLCH( rgbColor );
  }

  /**
   * Корректирует тон (hue) в зависимости от режима.
   *
   * @param h - Исходный тон (0–360)
   * @param mode - Режим отображения
   * @returns Скорректированный тон
   */
  private static adjustHue ( h: number, mode: ThemeMode ): number {
    if ( mode === 'colorblind' ) {
      return h >= 200 && h <= 300 ? 250 : h;
    }
    if ( mode === 'tritanopia' ) {
      return h >= 200 && h <= 300 ? 200 : h;
    }
    return h;
  }

  /**
   * Корректирует насыщенность (chroma) в зависимости от режима.
   *
   * @param c - Исходная насыщенность
   * @param mode - Режим отображения
   * @returns Скорректированная насыщенность
   */
  private static adjustChroma ( c: number, mode: ThemeMode ): number {
    if ( mode === 'dimmed' ) return c * 0.7;
    if ( mode === 'highContrast' ) return Math.min( c * 1.3, 0.4 );
    return c;
  }

  /**
   * Корректирует светлоту (lightness) в зависимости от режима.
   *
   * @param l - Исходная светлота [0..1]
   * @param mode - Режим отображения
   * @returns Скорректированная светлота
   */
  private static adjustLightness ( l: number, mode: ThemeMode ): number {
    if ( mode === 'dimmed' ) return l * 0.95;
    if ( mode === 'highContrast' ) return l > 0.5 ? 1.0 : 0.0;
    return l;
  }
}