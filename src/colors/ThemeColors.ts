/**
 *
 * src/colors/ThemeColors.ts
 *
 * Генератор семантических цветов для Vela Spectrum.
 *
 * Этот класс преобразует базовые цветовые пресеты в полную, структурированную палитру,
 * организованную по ролям (accent, success, danger, syntax и др.), с учётом режима отображения
 * (normal, dimmed, highContrast, colorblind, tritanopia) и типа темы (светлая/тёмная).
 *
 * Все цвета генерируются в перцептуально равномерном цветовом пространстве OKLCH (l, c, h), где:
 * - l: светлота [0..1]
 * - c: насыщенность (хрома)
 * - h: тон (hue) в градусах [0..360)
 *
 * Поддерживает коррекцию цветов для:
 * - Протанопии/дейтеранопии (`colorblind`) — сдвиг сине-фиолетовых тонов
 * - Тританопии (`tritanopia`) — коррекция сине-жёлтой зоны
 * - Высокого контраста — бинарная светлота и усиленная насыщенность
 * - Приглушённого режима — снижение яркости и насыщенности
 *
 * Используется в ThemeGenerator для заполнения семантических ролей темы,
 * включая UI, синтаксис, ANSI-цвета и специальные состояния (done, closed, open).
 *
 * @class ThemeColors
 * @author telianedward
 * @see https://github.com/telianedward/VelaSpectrum
 * @see https://en.wikipedia.org/wiki/Color_blindness    – Цветовая слепота и её типы
 * @see https://www.color-blindness.com    – Симуляторы и рекомендации по доступности
 * @license MIT
 *
 */
import OKLCHColorGenerator from './ColorConverter.js';

// Импортируем типы
import { type DetailedPalette } from '../themes/colorPalettePresets.js';

/**
 * Тип, представляющий доступные режимы отображения темы.
 *
 * Каждый режим изменяет цветовую палитру для улучшения восприятия, комфорта или доступности.
 * Режимы применяются при генерации темы и влияют на:
 * - Насыщенность (chroma)
 * - Светлоту (lightness)
 * - Тон (hue)
 * - Контраст
 *
 * Поддерживаемые режимы:
 *
 * @example
 * // Использование в генерации темы
 * ThemeGenerator.generate('default-d', 'normal');
 * ThemeGenerator.generate('default-d', 'colorblind');
 *
 * @property {'normal'} normal - Стандартный режим без коррекций
 * @property {'dimmed'} dimmed - Приглушённый режим: снижена насыщенность и светлота
 * @property {'highContrast'} highContrast - Режим высокого контраста: увеличена разница между светлыми и тёмными элементами
 * @property {'colorblind'} colorblind - Режим для протанопии/дейтеранопии: коррекция тонов в сине-фиолетовой зоне
 * @property {'tritanopia'} tritanopia - Режим для тританопии: коррекция тонов в сине-жёлтой зоне
 *
 * @see https://en.wikipedia.org/wiki/Color_blindness    – Цветовая слепота
 * @see https://www.color-blindness.com    – Информация и симуляторы для дальтоников
 * @see {@link ThemeColors.adjustHue} – коррекция тона в зависимости от режима
 * @see {@link ThemeColors.adjustChroma} – коррекция насыщенности
 * @see {@link ThemeColors.adjustLightness} – коррекция светлоты
 */
type ThemeMode =
  | 'normal'        // Стандартный режим
  | 'dimmed'        // Приглушённый режим (менее яркие цвета)
  | 'highContrast'  // Высокий контраст (для улучшения читаемости)
  | 'colorblind'    // Коррекция для протанопии/дейтеранопии
  | 'tritanopia';   // Коррекция для тританопии

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
    // console.log('🎨 Palette role:', role);
    // Вспомогательная функция для безопасного получения цвета
    const getColor = ( key: string ): { l: number; c: number; h: number; } => {
      // 🔍 Отладка: что запрашивается
      // console.log( `🔍 getColor: запрошен ключ "${ key }"` );

      let colorName = ThemeColors.getNestedValue( role, key );
      //onsole.log( `🔍 getColor: найдено значение "${ colorName }" (тип: ${ typeof colorName })` );

      // 🔁 Рекурсивное разрешение 'fg.muted' → 'steelSlate'
      while ( colorName && typeof colorName === 'string' && colorName.includes( '.' ) ) {
        const resolved = ThemeColors.getNestedValue( role, colorName );
        console.log( `🔍 getColor: разрешаем путь "${ colorName }" → "${ resolved }"` );
        if ( !resolved ) break;
        colorName = resolved;
      }

      // 🔒 Проверка типа
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
        console.warn( `🟡 Цвет для ключа "${ key }" не найден` );
        return { l: 0.5, c: 0.1, h: 220 };
      }

      // 🔒 Защита от getOklch
      try {
        const result = this.getOklch( colorName );
        // console.log( `✅ getColor: "${ key }" → "${ colorName }" → OKLCH:`, result );
        return result;
      } catch ( error ) {
        console.error( `❌ Ошибка при получении цвета "${ colorName }" (ключ: "${ key }"):`, error );
        return { l: 0.5, c: 0.1, h: 220 };
      }
    };

    // Получаем базовые цвета для коррекции
    const accentBase = getColor( 'accent.fg' );
    const successBase = getColor( 'success.fg' );
    const dangerBase = getColor( 'danger.fg' );
    const warningBase = getColor( 'warning.fg' );
    const infoBase = getColor( 'info.fg' );

    // ✅ Передаём isDark в adjustHue, adjustChroma, adjustLightness
    const hAccent = this.adjustHue( accentBase.h, mode, isDark );
    const hSuccess = this.adjustHue( successBase.h, mode, isDark );
    const hDanger = this.adjustHue( dangerBase.h, mode, isDark );
    const hWarning = this.adjustHue( warningBase.h, mode, isDark );
    const hInfo = this.adjustHue( infoBase.h, mode, isDark );

    const cAccent = this.adjustChroma( accentBase.c, mode, isDark );
    const cSuccess = this.adjustChroma( successBase.c, mode, isDark );
    const cDanger = this.adjustChroma( dangerBase.c, mode, isDark );
    const cWarning = this.adjustChroma( warningBase.c, mode, isDark );
    const cInfo = this.adjustChroma( infoBase.c, mode, isDark );

    const lAccent = this.adjustLightness( 0.8, mode, isDark );
    const lAccentEmphasis = this.adjustLightness( 0.7, mode, isDark );
    const lSuccess = this.adjustLightness( 0.7, mode, isDark );
    const lSuccessEmphasis = this.adjustLightness( 0.6, mode, isDark );
    const lDanger = this.adjustLightness( 0.7, mode, isDark );
    const lDangerEmphasis = this.adjustLightness( 0.6, mode, isDark );
    const lWarning = this.adjustLightness( 0.8, mode, isDark );
    const lWarningEmphasis = this.adjustLightness( 0.7, mode, isDark );
    const lInfo = this.adjustLightness( 0.8, mode, isDark );
    const lInfoEmphasis = this.adjustLightness( 0.7, mode, isDark );

    const ansiRed = getColor( 'ansi.red' );
    const ansiGreen = getColor( 'ansi.green' );
    const ansiYellow = getColor( 'ansi.yellow' );
    const ansiBlue = getColor( 'ansi.blue' );
    const ansiMagenta = getColor( 'ansi.magenta' );
    const ansiCyan = getColor( 'ansi.cyan' );
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
        // Смягчаем glare тёмного fg и чистый #000 у светлого
        default: this.softenForeground( getColor( 'fg.default' ), isDark, mode ),
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
        // Warning остаётся жёлтым/янтарным — не путать с danger (красным)
        fg: { l: lWarning, c: cWarning, h: hWarning },
        emphasis: { l: lWarningEmphasis, c: cWarning * 1.05, h: hWarning },
        muted: {
          l: this.adjustLightness( isDark ? 0.72 : 0.48, mode, isDark ),
          c: cWarning * 0.85,
          h: this.adjustHue( getColor( 'warning.muted' ).h, mode, isDark )
        }
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
        red: ansiRed ? {
          l: 0.4,
          c: this.adjustChroma( ansiRed.c, mode, isDark ),
          h: this.adjustHue( ansiRed.h, mode, isDark )
        } : { l: 0.4, c: 0.2, h: 0 },
        green: ansiGreen ? {
          l: 0.5,
          c: this.adjustChroma( ansiGreen.c, mode, isDark ),
          h: this.adjustHue( ansiGreen.h, mode, isDark )
        } : { l: 0.5, c: 0.2, h: 140 },
        yellow: ansiYellow ? {
          l: 0.6,
          c: this.adjustChroma( ansiYellow.c, mode, isDark ),
          h: this.adjustHue( ansiYellow.h, mode, isDark )
        } : { l: 0.6, c: 0.2, h: 80 },
        blue: ansiBlue ? {
          l: 0.55,
          c: this.adjustChroma( ansiBlue.c, mode, isDark ),
          h: this.adjustHue( ansiBlue.h, mode, isDark )
        } : { l: 0.55, c: 0.25, h: 275 },
        magenta: ansiMagenta ? {
          l: 0.5,
          c: this.adjustChroma( ansiMagenta.c, mode, isDark ),
          h: this.adjustHue( ansiMagenta.h, mode, isDark )
        } : { l: 0.5, c: 0.2, h: 350 },
        cyan: ansiCyan ? {
          l: 0.55,
          c: this.adjustChroma( ansiCyan.c, mode, isDark ),
          h: this.adjustHue( ansiCyan.h, mode, isDark )
        } : { l: 0.55, c: 0.2, h: 200 },
        white: getColor( 'ansi.white' ),
        blackBright: getColor( 'ansi.blackBright' ),
        redBright: { l: 0.5, c: this.adjustChroma( getColor( 'ansi.redBright' )?.c || 0.2, mode, isDark ), h: this.adjustHue( getColor( 'ansi.redBright' )?.h || 0, mode, isDark ) },
        greenBright: { l: 0.6, c: this.adjustChroma( getColor( 'ansi.greenBright' )?.c || 0.2, mode, isDark ), h: this.adjustHue( getColor( 'ansi.greenBright' )?.h || 140, mode, isDark ) },
        yellowBright: { l: 0.7, c: this.adjustChroma( getColor( 'ansi.yellowBright' )?.c || 0.2, mode, isDark ), h: this.adjustHue( getColor( 'ansi.yellowBright' )?.h || 80, mode, isDark ) },
        blueBright: { l: 0.65, c: this.adjustChroma( getColor( 'ansi.blueBright' )?.c || 0.25, mode, isDark ), h: this.adjustHue( getColor( 'ansi.blueBright' )?.h || 275, mode, isDark ) },
        magentaBright: { l: 0.6, c: this.adjustChroma( getColor( 'ansi.magentaBright' )?.c || 0.2, mode, isDark ), h: this.adjustHue( getColor( 'ansi.magentaBright' )?.h || 350, mode, isDark ) },
        cyanBright: { l: 0.65, c: this.adjustChroma( getColor( 'ansi.cyanBright' )?.c || 0.2, mode, isDark ), h: this.adjustHue( getColor( 'ansi.cyanBright' )?.h || 200, mode, isDark ) },
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
       * L раздельно для light/dark; function/type/property различаются по L и chroma.
       */
      syntax: this.buildSyntaxPalette( getColor, mode, isDark )
    };
  }

  /**
   * Смягчает основной foreground: тёмный без glare #f6f8fa, светлый не чистый #000.
   */
  private static softenForeground (
    color: { l: number; c: number; h: number; },
    isDark: boolean,
    mode: ThemeMode
  ): { l: number; c: number; h: number; } {
    const targetL = isDark ? 0.88 : 0.28;
    let l = targetL;
    if ( mode === 'dimmed' ) {
      l = isDark ? 0.82 : 0.32;
    } else if ( mode === 'highContrast' ) {
      l = isDark ? 0.96 : 0.12;
    }
    return { l, c: color.c * ( isDark ? 0.35 : 0.2 ), h: color.h };
  }

  /**
   * Базовая светлота синтаксиса: dark ~0.68–0.76, light ~0.43–0.55.
   */
  private static syntaxRoleLightness ( role: string, isDark: boolean ): number {
    const base = isDark ? 0.72 : 0.48;
    const offsets: Record<string, number> = {
      function: isDark ? 0.04 : 0.05,
      method: isDark ? 0.03 : 0.04,
      arrowFunction: isDark ? 0.03 : 0.04,
      type: isDark ? -0.02 : -0.03,
      interface: isDark ? -0.02 : -0.03,
      class: isDark ? 0.01 : 0.02,
      property: isDark ? -0.04 : -0.02,
      field: isDark ? -0.03 : -0.01,
      comment: isDark ? -0.02 : 0.06,
      punctuation: isDark ? -0.06 : 0.02,
      keyword: isDark ? 0.02 : 0.03,
      string: isDark ? 0.0 : 0.02,
      constant: isDark ? 0.01 : 0.01,
      warning: isDark ? 0.04 : 0.05,
      error: isDark ? 0.02 : 0.03
    };
    const l = base + ( offsets[ role ] ?? 0 );
    return Math.max( isDark ? 0.68 : 0.43, Math.min( isDark ? 0.76 : 0.55, l ) );
  }

  /**
   * Множитель хромы для разведения ролей, которые раньше сливались (function/type/property).
   */
  private static syntaxChromaScale ( role: string ): number {
    const scales: Record<string, number> = {
      function: 1.15,
      method: 1.1,
      type: 0.95,
      interface: 0.9,
      property: 0.75,
      field: 0.8,
      comment: 0.45,
      punctuation: 0.4
    };
    return scales[ role ] ?? 1;
  }

  private static buildSyntaxPalette (
    getColor: ( key: string ) => { l: number; c: number; h: number; },
    mode: ThemeMode,
    isDark: boolean
  ): Record<string, { l: number; c: number; h: number; }> {
    const roles = [
      'type', 'enum', 'interface', 'class', 'struct',
      'variable', 'parameter', 'property', 'field', 'constant', 'local',
      'function', 'method', 'arrowFunction', 'constructor',
      'module', 'namespace',
      'string', 'number', 'boolean', 'null', 'regexp', 'templateString',
      'keyword', 'operator', 'modifier', 'decorator', 'comment',
      'error', 'warning', 'info',
      'tag', 'support', 'punctuation', 'heading', 'quote', 'embedded',
      'inserted', 'deleted', 'changed', 'ignored', 'range', 'header',
      'separator', 'output', 'link', 'inline', 'emphasis', 'strong'
    ] as const;

    const syntax: Record<string, { l: number; c: number; h: number; }> = {};
    for ( const role of roles ) {
      const base = getColor( `syntax.${ role }` );
      const l = this.adjustLightness( this.syntaxRoleLightness( role, isDark ), mode, isDark );
      const c = this.adjustChroma( base.c * this.syntaxChromaScale( role ), mode, isDark );
      const h = this.adjustHue( base.h, mode, isDark );
      syntax[ role ] = { l, c, h };
    }
    return syntax;
  }

  /**
   * Вспомогательная функция для безопасного получения вложенного значения из объекта по строковому пути.
   *
   * Используется для разрешения цветовых путей вида 'canvas.inset', 'accent.fg', 'syntax.keyword' и т.д.
   * Проходит по объекту, последовательно обращаясь к каждому ключу в пути.
   *
   * @example
   * getNestedValue({ canvas: { inset: 'frostWhite' } }, 'canvas.inset') → 'frostWhite'
   * getNestedValue({ accent: { fg: 'blues' } }, 'accent.fg') → 'blues'
   * getNestedValue({ accent: {} }, 'accent.fg') → undefined + предупреждение
   *
   * @param obj - Исходный объект, в котором ищем значение (например, `palette.dark` или `palette.light`)
   * @param path - Строка с путём к значению, разделённая точками (например, 'canvas.inset', 'accent.fg.muted')
   * @returns Значение по указанному пути (обычно строка — имя цвета), или `undefined`, если путь не найден
   *
   * @throws Предупреждение в консоль, если один из ключей в пути отсутствует
   */
  private static getNestedValue ( obj: any, path: string ): string | undefined {
    const keys = path.split( '.' );
    let current = obj;

    for ( const key of keys ) {
      // Проверяем, что текущий уровень объекта существует и имеет ключ
      if ( current == null || typeof current !== 'object' || !( key in current ) ) {
        console.warn( `Путь "${ path }" не найден: ключ "${ key }" отсутствует` );
        return undefined;
      }
      current = current[ key ];
    }

    return current;
  }

  /**
   * Преобразует имя цвета в его представление в цветовом пространстве OKLCH.
   *
   * Функция ищет цвет по имени в справочнике `colors.json` через `OKLCHColorGenerator.getColorRgb`,
   * затем конвертирует его RGB-значение в OKLCH — современное цветовое пространство,
   * обеспечивающее визуально равномерное восприятие цвета человеком.
   *
   * Используется в `ThemeColors.generate` для генерации всех семантических цветов темы.
   *
   * @example
   * getOklch('blues') → { l: 0.55, c: 0.25, h: 275 }
   * getOklch('greens') → { l: 0.64, c: 0.17, h: 152 }
   *
   * @param colorName - Имя цвета (ключ из `colors.json`, например 'blues', 'reds', 'frostWhite')
   * @returns Объект с полями `{ l, c, h }` в формате OKLCH:
   *   - `l` — светлота [0..1]
   *   - `c` — насыщенность (chroma)
   *   - `h` — тон (hue) в градусах
   *
   * @throws Ошибка, если цвет с таким именем не найден в `colors.json`
   *
   * @see {@link OKLCHColorGenerator.findColor} — получение RGB по имени
   * @see {@link OKLCHColorGenerator.rgbToOklch} — конвертация RGB → OKLCH
   */
  private static getOklch ( colorName: string ): { l: number; c: number; h: number; } {
    const colorEntry = OKLCHColorGenerator.findColor( colorName );
    if ( !colorEntry ) {
      throw new Error( `Цвет "${ colorName }" не найден в справочнике цветов (colors.json)` );
    }

    const rgbColor = {
      mode: 'rgb' as const,
      r: colorEntry.rgb.r,
      g: colorEntry.rgb.g,
      b: colorEntry.rgb.b,
      alpha: 1
    };

    return OKLCHColorGenerator.rgbToOklch( rgbColor );
  }

  /**
   * Корректирует тон (hue) цвета в зависимости от режима отображения и типа темы.
   *
   * Используется для улучшения восприятия цветов:
   * - В режиме `colorblind` сдвигаются сине-фиолетовые и зелёные тона
   * - В режиме `tritanopia` корректируются синие и жёлтые зоны
   * - В `dimmed` и `highContrast` — без изменений (тон сохраняется)
   *
   * @example
   * adjustHue(275, 'colorblind', true) → 250 // тёмная тема: синий → нейтральный
   * adjustHue(275, 'colorblind', false) → 245 // светлая тема: чуть мягче
   * adjustHue(120, 'normal', true) → 120    // без изменений
   *
   * @param h - Исходный тон в градусах (диапазон 0–360)
   * @param mode - Режим отображения: 'normal', 'dimmed', 'highContrast', 'colorblind', 'tritanopia'
   * @param isDark - Является ли тема тёмной (true) или светлой (false)
   * @returns Скорректированный тон (в диапазоне 0–360)
   */
  private static adjustHue ( h: number, mode: ThemeMode, isDark: boolean ): number {
    // 🔹 Режим normal — без изменений
    if ( mode === 'normal' ) {
      return h;
    }

    // 🔹 Режим colorblind (протанопия/дейтеранопия)
    if ( mode === 'colorblind' ) {
      if ( h >= 200 && h <= 300 ) {
        return isDark ? 250 : 245; // Тёмная: нейтральный синий, светлая: чуть мягче
      }
      if ( h >= 130 && h < 200 ) {
        return isDark ? 180 : 175; // Зелёный → бирюзовый (светлая — чуть приглушённее)
      }
      if ( h < 130 || h > 300 ) {
        return 90; // Красный/оранжевый/жёлтый → жёлтый (одинаково)
      }
      return h;
    }

    // 🔹 Режим tritanopia (нарушение синего канала)
    if ( mode === 'tritanopia' ) {
      if ( h >= 240 && h <= 300 ) {
        return isDark ? 280 : 270; // Синий → сине-фиолетовый (светлая — чуть мягче)
      }
      if ( h >= 180 && h < 240 ) {
        return isDark ? 220 : 215; // Голубой → бирюзовый
      }
      if ( h >= 40 && h < 100 ) {
        return isDark ? 130 : 125; // Жёлтый → зелёный (светлая — чуть приглушённее)
      }
      return h;
    }

    // 🔹 Для dimmed и highContrast — не меняем тон
    return h;
  }

  /**
   * Корректирует насыщенность (chroma) цвета в зависимости от режима и типа темы.
   *
   * Используется для адаптации под условия:
   * - В режиме `dimmed`: снижается насыщенность (на 30% для тёмных, 35% для светлых)
   * - В режиме `highContrast`: увеличивается, но ограничена sRGB
   * - В режиме `tritanopia`: увеличивается для лучшей различимости
   *
   * @example
   * adjustChroma(0.25, 'dimmed', true) → 0.175  // тёмная: 30%
   * adjustChroma(0.25, 'dimmed', false) → 0.1625 // светлая: 35%
   * adjustChroma(0.25, 'highContrast', true) → 0.325 (но не более 0.4)
   *
   * @param c - Исходная насыщенность (chroma), обычно в диапазоне [0..1]
   * @param mode - Режим отображения
   * @param isDark - Является ли тема тёмной (true) или светлой (false)
   * @returns Скорректированная насыщенность
   */
  private static adjustChroma ( c: number, mode: ThemeMode, isDark: boolean ): number {
    if ( mode === 'dimmed' ) {
      return isDark ? c * 0.62 : c * 0.58; // Dimmed: мягче и согласованнее
    }

    if ( mode === 'highContrast' ) {
      return Math.min( c * 1.3, 0.4 ); // Увеличиваем, но не более 0.4
    }

    if ( mode === 'tritanopia' ) {
      return Math.min( c * ( isDark ? 1.5 : 1.4 ), 0.4 ); // Тёмная: +50%, светлая: +40%
    }

    return c;
  }

  /**
   * Корректирует светлоту (lightness) цвета в зависимости от режима и типа темы.
   *
   * Применяется для улучшения читаемости и комфорта:
   * - Для светлой темы: снижаем яркость на 8%, чтобы снизить "выбеливание"
   * - В режиме `dimmed`: дополнительно затемняем (на 5% для тёмных, 6% для светлых)
   * - В режиме `highContrast`: бинарный контраст (чёрное/белое)
   * - В режиме `tritanopia`: лёгкое затемнение для светлых тем
   *
   * 🔥 Ключевое: в `highContrast` для СВЕТЛОЙ темы — чёрный текст на белом фоне
   *
   * @example
   * adjustLightness(0.8, 'normal', false) → 0.736  // светлая тема — затемнение
   * adjustLightness(0.6, 'highContrast', false) → 0.0  // светлая + HC → чёрный
   * adjustLightness(0.4, 'highContrast', true) → 1.0  // тёмная + HC → белый
   *
   * @param l - Исходная светлота в диапазоне [0..1]
   * @param mode - Режим отображения
   * @param isDark - Является ли тема тёмной (true) или светлой (false)
   * @returns Скорректированная светлота в диапазоне [0..1]
   */
  private static adjustLightness ( l: number, mode: ThemeMode, isDark: boolean ): number {
    // 🔹 Режим highContrast — высокий контраст без коллапса всех оттенков в один цвет
    if ( mode === 'highContrast' ) {
      if ( !isDark ) {
        // Светлая HC: тёмные, но различимые акценты на белом фоне (не всё → #000)
        return Math.max( 0.16, Math.min( 0.42, l * 0.48 ) );
      }
      // Тёмная HC: светлые акценты на чёрном, с сохранением относительной светлоты
      return Math.max( 0.72, Math.min( 1.0, 0.55 + l * 0.45 ) );
    }

    // 🔹 Для СВЕТЛОЙ темы: снижаем яркость на 8%
    if ( !isDark ) {
      l = l * 0.92;
    }

    // 🔹 Дополнительная коррекция по режиму
    if ( mode === 'dimmed' ) {
      return isDark ? l * 0.92 : l * 0.90; // Чуть мягче, чтобы Dimmed оставался самым спокойным
    }

    if ( mode === 'tritanopia' ) {
      if ( !isDark ) {
        return l * 0.95; // Светлая: чуть затемняем
      }
      return l; // Тёмная: без изменений
    }

    return l;
  }
}