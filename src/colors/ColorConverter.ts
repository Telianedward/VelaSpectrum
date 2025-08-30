/**
 *
 * src/colors/ColorConverter.ts
 *
 * Модуль преобразования цветов между цветовыми пространствами для Vela Spectrum.
 *
 * Этот класс обеспечивает конвертацию цветов между различными цветовыми моделями:
 * - HEX/RGB → OKLCH (через sRGB → Linear RGB → OKLAB → OKLCH)
 * - Поддержка поиска цветов по имени, ID или HEX-коду из встроенной палитры
 * - Генерация семантических CSS-переменных в формате OKLCH
 *
 * Является основой для генерации визуально равномерных палитр в перцептуальном цветовом пространстве OKLCH.
 * Используется в ThemeColors для создания тем с корректной цветопередачей и доступностью.
 *
 * Поддерживаемые форматы входных данных:
 * - HEX строка (#RRGGBB)
 * - Число (0xRRGGBB или тон 0..360)
 * - Имя цвета ('blues', 'reds', 'frostWhite' и др.)
 *
 * Все выходные значения используют OKLCH:
 * - l: светлота [0..1]
 * - c: насыщенность (хрома) ≥ 0
 * - h: тон в градусах [0..360)
 *
 * @module ColorConverter
 * @author telianedward
 * @see https://github.com/telianedward/VelaSpectrum
 * @see https://bottosson.github.io/posts/oklab/ – Основа OKLAB/OKLCH
 * @license MIT
 *
 */

// Импортируем цветовую палитру из JSON
import colors_map from './colors.json' with { type: 'json' };

// Вспомогательный класс для коррекции чисел
import NumberAdjuster from '../math/math.js';


/**
 * Интерфейс RGB-цвета.
 *
 * @interface RGB
 * @property {number} r - Красный канал (0–255)
 * @property {number} g - Зелёный канал (0–255)
 * @property {number} b - Синий канал (0–255)
 */
interface RGB {
  r: number;
  g: number;
  b: number;
}
/**
 * Интерфейс LAB-цвета (CIELAB).
 *
 * @interface LAB
 * @property {number} l - Светлота (0–100)
 * @property {number} a - Зелёно-красный компонент (-128 до 128)
 * @property {number} b - Сине-жёлтый компонент (-128 до 128)
 */
interface LAB {
  l: number;
  a: number;
  b: number;
}

/**
 * Интерфейс LCH-цвета (CIELAB в полярных координатах).
 *
 * @interface LCH
 * @property {number} l - Светлота (0–100)
 * @property {number} c - Насыщенность (0–100)
 * @property {number} h - Тон (0–360 градусов)
 */
interface LCH {
  l: number;
  c: number;
  h: number;
}

/**
 * Описание цвета в библиотеке.
 *
 * @interface ColorEntry
 * @property {number} id - Уникальный идентификатор цвета
 * @property {string} name - Название цвета (например, "blues", "slateInk")
 * @property {string} [description] - Опциональное описание (например, "Глубокий серо-синий")
 * @property {string} hex - HEX-код цвета (например, "#3E92CC")
 * @property {RGB} rgb - RGB-значение цвета
 */
interface ColorEntry {
  id: number;
  name: string;
  description?: string; // Опционально, для русского описания
  hex: string;
  rgb: RGB;
}

/**
 * Цвет в формате LAB с мета-информацией.
 *
 * @interface LabColor
 * @property {string} mode - Режим цвета ("lab")
 * @property {number} l - Светлота
 * @property {number} a - Зелёно-красный компонент
 * @property {number} b - Сине-жёлтый компонент
 * @property {number} [alpha] - Альфа-канал (опционально)
 */
interface LabColor {
  mode: string;
  l: number;
  a: number;
  b: number;
  alpha?: number;
}
interface LRGBColor {
  mode: string;
  r: number;
  g: number;
  b: number;
  alpha?: number;
}
/**
 * Цвет в формате RGB с мета-информацией.
 *
 * @interface RGBColor
 * @property {string} mode - Режим цвета ("rgb")
 * @property {number} r - Красный канал
 * @property {number} g - Зелёный канал
 * @property {number} b - Синий канал
 * @property {number} [alpha] - Альфа-канал (опционально)
 */
interface RGBColor {
  mode: string;
  r: number;
  g: number;
  b: number;
  alpha?: number;
}
interface LCHColor {
  mode: string;
  l: number;
  c: number;
  h?: number;
  alpha?: number;
}
interface OKLCHColor {
  mode: string;
  l: number;
  c: number;
  h?: number;
  alpha?: number;
}
interface LinearRGB {
  r?: number;
  g?: number;
  b?: number;
  alpha?: number;
}

interface OklabColor {
  mode: 'oklab';
  l: number;
  a: number;
  b: number;
  alpha?: number;
}
type NamedColors = {
  [ key: string ]: ColorEntry;
};
/**
 * Класс для генерации и преобразования цветов в цветовом пространстве OKLCH.
 * Поддерживает преобразование между RGB, XYZ, Lab, LCH, Oklab, OKLCH,
 * а также генерацию CSS-палитр на основе заданных цветов.
 *
 * @class OKLCHColorGenerator
 */
class OKLCHColorGenerator {

  /**
   * Статический реестр всех доступных цветов, загруженный из `colors.json`.
   *
   * Это **центральный справочник**, используемый всеми компонентами цветовой системы.
   * Содержит полную информацию о каждом цвете:
   * - `id`: уникальный числовой идентификатор
   * - `name`: читаемое название (например, "blues", "frostWhite")
   * - `hex`: HEX-код в формате `#RRGGBB`
   * - `rgb`: объект с компонентами `r`, `g`, `b` в диапазоне [0..255]
   *
   * Реестр позволяет находить цвета по:
   * - Имени (`blues`)
   * - HEX-коду (`#3E92CC`)
   * - ID (100)
   *
   * Используется в:
   * - `findColor` — поиск цвета по ID, имени или HEX
   * - `rgbToOklch` — конвертация цветов
   * - Генерации палитр и тем
   *
   * @private
   * @static
   * @readonly
   * @type {NamedColors}
   *
   * @see {@link findColor} – функция, использующая этот реестр
   * @see {@link colors.json} – исходный файл
   * @see https://bottosson.github.io/posts/oklab/ – OKLAB и работа с цветами
   */
  private static readonly colorRegistry: NamedColors = colors_map;
  /**
   * Массив дробей, используемых для генерации 15 уровней светлоты (lightness) в процентах.
   *
   * Каждая дробь `[num, denom]` преобразуется в процентное значение `(num / denom) * 100`,
   * что даёт визуально равномерную шкалу от ~98.96% (почти белый) до ~8.33% (почти чёрный).
   *
   * Эта шкала — **основа всей цветовой системы** `Vela Spectrum`. Используется при генерации:
   * - Семантических палитр (синяя, зелёная и т.д.)
   * - CSS-переменных темы
   * - Цветовых шкал для UI
   *
   * ### Значения (округлено до 2 знаков):
   * - 98.96%
   * - 97.92%
   * - 95.83%
   * - 91.67%
   * - 83.33%
   * - 75.00%
   * - 66.67%
   * - 58.33%
   * - 50.00%
   * - 41.67%
   * - 33.33%
   * - 25.00%
   * - 20.83%
   * - 16.67%
   * - 12.50%
   * - 8.33%
   *
   * ⚠️ **Внимание**: В массиве **16 элементов**, но используется 15 (последний — 8.33% — дублирует `fraction9`)
   *
   * Используется в:
   * - `generateLightnessSteps`
   *
   * @private
   * @static
   * @readonly
   * @type {[number, number][]}
   *
   * @see {@link generateLightnessSteps} – функция, использующая эту шкалу
   * @see https://bottosson.github.io/posts/oklab/ – OKLAB и визуально равномерные палитры
   */
  private static readonly lightnessSteps15: [ number, number ][] = [
    [ 95, 96 ],  // ~98.96%
    [ 47, 48 ],  // ~97.92%
    [ 23, 24 ],  // ~95.83%
    [ 11, 12 ],  // ~91.67%
    [ 10, 12 ],  // ~83.33%
    [ 9, 12 ],   // ~75.00%
    [ 8, 12 ],   // ~66.67%
    [ 7, 12 ],   // ~58.33%
    [ 6, 12 ],   // ~50.00%
    [ 5, 12 ],   // ~41.67%
    [ 4, 12 ],   // ~33.33%
    [ 3, 12 ],   // ~25.00%
    [ 5, 24 ],   // ~20.83%
    [ 2, 12 ],   // ~16.67%
    [ 3, 24 ],   // ~12.50%
    [ 1, 12 ]    // ~8.33%
  ];
  /**
   * Массив дробей, используемых для генерации 9 уровней светлоты (lightness) в процентах.
   *
   * Каждая дробь `[num, denom]` преобразуется в процентное значение `(num / denom) * 100`,
   * что даёт визуально равномерную шкалу от ~91% (очень светлый) до ~8.3% (очень тёмный).
   *
   * Эта шкала используется в альтернативных палитрах, где требуется **меньшее количество градаций**,
   * например, при генерации палитр с фиксированной насыщенностью.
   *
   * ### Значения (округлено до 2 знаков):
   * - 91.21%
   * - 83.33%
   * - 75.00%
   * - 61.54%
   * - 50.00%
   * - 40.43%
   * - 29.17%
   * - 18.33%
   * - 8.33%
   *
   * Используется в:
   * - `generateLightnessStepsForOklch`
   * - `generateOklchPaletteWithFixedChroma`
   *
   * @private
   * @static
   * @readonly
   * @type {[number, number][]}
   *
   * @see {@link generateLightnessStepsForOklch} – функция, использующая эту шкалу
   * @see https://bottosson.github.io/posts/oklab/ – OKLAB и визуально равномерные палитры
   */
  private static readonly lightnessSteps9: [ number, number ][] = [
    [ 83, 91 ],  // ~91.21%
    [ 10, 12 ],  // ~83.33%
    [ 9, 12 ],   // ~75.00%
    [ 8, 13 ],   // ~61.54%
    [ 1, 2 ],    // ~50.00%
    [ 19, 42 ],  // ~40.43%
    [ 7, 24 ],   // ~29.17%
    [ 11, 60 ],  // ~18.33%
    [ 1, 12 ]    // ~8.33%
  ];

  /**
  * Базовые координаты XYZ для стандартной белой точки D50.
  *
  * Белая точка D50 — это эталонный источник дневного света с цветовой температурой ~5000K,
  * используемый в цветовых пространствах CIE Lab, OKLAB и OKLCH как опорный белый.
  *
  * Эти значения необходимы при преобразовании XYZ → CIELAB:
  * - X, Y, Z нормализуются относительно этих координат
  * - Это обеспечивает корректное восприятие цвета в зависимости от освещения
  *
  * Используется в методах:
  * - `xyzToCieLab`
  * - `ut` (вспомогательная функция)
  *
  * @private
  * @static
  * @readonly
  * @type {{ X: number, Y: number, Z: number }}
  *
  * @see https://en.wikipedia.org/wiki/Illuminant_D50 – Описание D50
  * @see https://www.cie.co.at/publications/colorimetry-part-4-cie-15-2018 – CIE 15:2018
  */
  private static readonly D50_WHITE_POINT: { X: number; Y: number; Z: number; } = {
    X: 0.3457 / 0.3585,
    Y: 1,
    Z: ( 1 - 0.3457 - 0.3585 ) / 0.3585,
  };
  /**
* Пороговое значение (6/29)^3, используемое в нелинейном преобразовании XYZ → CIELAB.
*
* В CIELAB применяется кусочно-линейная функция:
* - Если значение ≤ LAB_NONLINEAR_THRESHOLD → используется линейная аппроксимация
* - Если значение > LAB_NONLINEAR_THRESHOLD → применяется кубический корень
*
* Это обеспечивает стабильность вычислений вблизи нуля и соответствует спецификации CIELAB.
*
* @private
* @static
* @readonly
* @type {number}
* @see https://en.wikipedia.org/wiki/CIELAB_color_space#Forward_transformation_(CIE_XYZ_to_CIELAB)
*/
  private static readonly LAB_NONLINEAR_THRESHOLD: number = Math.pow( 6, 3 ) / Math.pow( 29, 3 );

  /**
   * Масштабный множитель (29/3)^3, используемый в линейной части преобразования XYZ → CIELAB.
   *
   * Применяется при вычислении нелинейной компоненты для малых значений XYZ:
   * `f(t) = (LAB_LINEAR_SCALE_FACTOR * t + 16) / 116`
   *
   * Обеспечивает плавный переход между линейной и нелинейной частями функции.
   *
   * @private
   * @static
   * @readonly
   * @type {number}
   */
  private static readonly LAB_LINEAR_SCALE_FACTOR: number = Math.pow( 29, 3 ) / Math.pow( 3, 3 );
  /**
   * Нелинейное преобразование компоненты XYZ в пространство CIELAB.
   *
   * Является ключевой частью алгоритма конвертации XYZ → CIELAB.
   * Применяет **кусочно-линейную функцию**:
   * - Если значение > (6/29)^3 → применяется кубический корень: `cbrt(e)`
   * - Иначе → линейная аппроксимация: `(Jn * e + 16) / 116`
   *
   * Это преобразование обеспечивает:
   * - Плавный переход между линейной и нелинейной частями
   * - Стабильность при малых значениях (например, в тенях)
   * - Соответствие спецификации CIELAB
   *
   * @private
   * @static
   *
   * @param e - Нормализованное значение канала XYZ (обычно X/Xn, Y/Yn, Z/Zn)
   * @returns Преобразованное значение, готовое для вычисления L*, a*, b*
   *
   * @example
   * const fy = OKLCHColorGenerator.xyzToLabNonlinear(y / Yn);
   *
   * @see https://en.wikipedia.org/wiki/CIELAB_color_space#Forward_transformation_(CIE_XYZ_to_CIELAB)
   * @see https://www.cie.co.at/publications/colorimetry-part-4-cie-15-2018
   */
  private static xyzToLabNonlinear ( e: number ): number {
    return e > this.LAB_NONLINEAR_THRESHOLD
      ? Math.cbrt( e )
      : ( this.LAB_LINEAR_SCALE_FACTOR * e + 16 ) / 116;
  }
  /**
   * Преобразует цвет из цветового пространства XYZ в CIELAB (L*a*b*).
   *
   * CIELAB — это **перцептуально равномерное** цветовое пространство, разработанное CIE (Международной комиссией по освещению).
   * Это означает, что одинаковые изменения в значениях L*, a*, b* соответствуют примерно одинаковым **визуальным изменениям цвета** для человеческого глаза.
   *
   * Это преобразование критически важно для:
   * - Сравнения цветов (например, вычисление контраста)
   * - Генерации палитр с равномерным восприятием
   * - Преобразования в другие цветовые пространства (например, OKLCH)
   *
   * ### Алгоритм:
   * 1. Нормализует XYZ относительно опорного белого (`this.j.X`, `this.j.Y`, `this.j.Z`)
   * 2. Применяет нелинейное преобразование `ut()` (кубический корень + линейная часть)
   * 3. Вычисляет компоненты:
   *    - `L*` — светлота (0 = чёрный, 100 = белый)
   *    - `a*` — ось красный/зелёный
   *    - `b*` — ось жёлтый/синий
   *
   * @public
   * @static
   *
   * @param param0 - Объект с компонентами цвета в пространстве XYZ и опциональным альфа-каналом
   * @param param0.x - Компонента X (отражает яркость, связанная с зелёным/красным)
   * @param param0.y - Компонента Y (яркость, основная для светлоты)
   * @param param0.z - Компонента Z (связана с синим)
   * @param param0.alpha - Опциональный альфа-канал (прозрачность)
   *
   * @returns Объект в цветовом пространстве CIELAB с полями:
   * - `mode`: 'lab'
   * - `l`: светлота [0..100]
   * - `a`: красный/зелёный [-128..128]
   * - `b`: жёлтый/синий [-128..128]
   * - `alpha?`: прозрачность (если была передана)
   *
   * @example
   * const lab = OKLCHColorGenerator.xyzToCieLab({ x: 95.05, y: 100, z: 108.88 });
   * console.log(lab); // { mode: 'lab', l: 100, a: 0, b: 0 } → чистый белый
   *
   * @example
   * const lab = OKLCHColorGenerator.xyzToCieLab({ x: 41.24, y: 21.26, z: 1.93 });
   * // → тёмно-красный в CIELAB
   *
   * @see https://en.wikipedia.org/wiki/CIELAB_color_space – CIELAB и его свойства
   * @see https://www.cie.co.at – Официальная документация CIE
   */
  public static xyzToCieLab ( {
    x,
    y,
    z,
    alpha,
  }: {
    x?: number;
    y?: number;
    z?: number;
    alpha?: number;
  } ): LabColor {
    // Установка значений по умолчанию
    x = x ?? 0;
    y = y ?? 0;
    z = z ?? 0;

    // Нормализация относительно опорного белого (D50 или D65)
    const xNorm = x / this.D50_WHITE_POINT.X;
    const yNorm = y / this.D50_WHITE_POINT.Y;
    const zNorm = z / this.D50_WHITE_POINT.Z;

    // Применение нелинейного преобразования (gamma-like для Lab)
    const fX = this.xyzToLabNonlinear( xNorm );
    const fY = this.xyzToLabNonlinear( yNorm );
    const fZ = this.xyzToLabNonlinear( zNorm );

    // Вычисление компонент CIELAB
    const lab: LabColor = {
      mode: 'lab',
      l: 116 * fY - 16,         // Светлота
      a: 500 * ( fX - fY ),       // Ось красный (a>0) / зелёный (a<0)
      b: 200 * ( fY - fZ ),       // Ось жёлтый (b>0) / синий (b<0)
    };

    // Сохраняем альфа-канал, если он был
    if ( alpha !== undefined ) {
      lab.alpha = alpha;
    }

    return lab;
  }

  /**
 * Выполняет гамма-коррекцию для компоненты цвета в формате sRGB, преобразуя её в линейное цветовое пространство (linear RGB).
 *
 * В цветовых моделях мониторов (sRGB) яркость отображается нелинейно — это называется **гамма-нелинейность**.
 * Для точных цветовых вычислений (например, при конвертации в OKLCH) необходимо сначала **удалить гамму** и перейти в линейное пространство.
 *
 * Этот метод реализует стандартную формулу sRGB → linear RGB:
 * - Если значение ≤ 0.04045: делится на 12.92
 * - Иначе: применяется степенная коррекция с показателем 2.4
 *
 * Используется при конвейере преобразования:
 * sRGB → linear RGB → Oklab → OKLCH
 *
 * @private
 * @static
 * @param {number} e - Значение канала RGB в диапазоне [0..255] (например, r=255, g=120, b=80)
 * @returns {number} Нормализованное линейное значение в диапазоне [0..1], готовое для дальнейших цветовых преобразований
 *
 * @example
 * OKLCHColorGenerator.at(128); // → ~0.214 (после нормализации и гамма-коррекции)
 * OKLCHColorGenerator.at(0);   // → 0
 * OKLCHColorGenerator.at(255); // → 1.0
 *
 * @see https://en.wikipedia.org/wiki/SRGB – sRGB и гамма-коррекция
 * @see https://bottosson.github.io/posts/oklab/ – Описание пространства Oklab и необходимость линейных вычислений
 */
  private static srgbToLinear ( e: number = 0 ): number {
    e = e / 255; // Нормализуем [0..255] → [0..1]
    const t = Math.abs( e );
    return t <= 0.04045
      ? e / 12.92
      : ( Math.sign( e ) || 1 ) * Math.pow( ( t + 0.055 ) / 1.055, 2.4 );
  }

  /**
   * Преобразует цвет из sRGB в линейное RGB (linear RGB) путём применения гамма-коррекции к каждому каналу.
   *
   * В sRGB цвета хранятся с нелинейной гамма-зависимостью для эффективного отображения на экранах.
   * Для точных цветовых вычислений (например, при конвертации в OKLCH, XYZ или Oklab) необходимо
   * сначала перевести цвет в **линейное цветовое пространство**, где яркость пропорциональна значению.
   *
   * Этот метод использует стандартную формулу sRGB → linear RGB:
   * - Если значение ≤ 0.04045: делится на 12.92
   * - Иначе: применяется степенная функция с показателем 2.4
   *
   * Вызывает `srgbToLinear(channel)` для каждого канала (R, G, B).
   *
   * @private
   * @static
   *
   * @param param0 - Объект с компонентами цвета в sRGB и опциональным альфа-каналом
   * @param param0.r - Красный канал [0..255]
   * @param param0.g - Зелёный канал [0..255]
   * @param param0.b - Синий канал [0..255]
   * @param param0.alpha - Опциональный альфа-канал [0..1]
   *
   * @returns Объект в линейном RGB-пространстве:
   * - `mode`: 'lrgb'
   * - `r`, `g`, `b`: линейные значения в диапазоне [0..1]
   * - `alpha?`: передаётся без изменений, если был указан
   *
   * @example
   * const linear = OKLCHColorGenerator.rgbToLinearRgb({
   *   r: 255,
   *   g: 128,
   *   b: 0
   * });
   * // → { mode: 'lrgb', r: 1.0, g: ~0.214, b: 0 }
   *
   * @see https://en.wikipedia.org/wiki/SRGB#The_forward_transformation_(sRGB_to_CIE_XYZ) – Формула sRGB → linear
   * @see {@link srgbToLinear} – внутренняя функция для одного канала
   */
  private static rgbToLinearRgb ( {
    r,
    g,
    b,
    alpha,
  }: LRGBColor ): { mode: string; r: number; g: number; b: number; alpha?: number; } {
    // Преобразуем каждый канал sRGB → linear RGB
    const linear: LRGBColor = {
      mode: 'lrgb',
      r: this.srgbToLinear( r ),
      g: this.srgbToLinear( g ),
      b: this.srgbToLinear( b ),
    };

    // Сохраняем альфа-канал, если он был
    if ( alpha !== undefined ) {
      linear.alpha = alpha;
    }

    return linear;
  }
  /**
   * Нормализует значение цветового тона (hue) к стандартному диапазону [0, 360) градусов.
   *
   * Цветовой тон в пространствах HSL, OKLCH и других — это угловая величина, которая циклична:
   * - 360° эквивалентно 0°
   * - -90° эквивалентно 270°
   * - 720° эквивалентно 0°
   *
   * Эта функция гарантирует, что любое входное значение (отрицательное, больше 360 и т.д.)
   * будет корректно приведено к диапазону [0, 360), что необходимо для:
   * - Правильного отображения цветов
   * - Сравнения тонов
   * - Интерполяции в цветовых пространствах (например, OKLCH)
   *
   * @private
   * @static
   *
   * @param e - Исходное значение тона в градусах (может быть любым числом: отрицательным, >360 и т.д.)
   * @returns Нормализованное значение в диапазоне [0, 360)
   *
   * @example
   * normalizeHue(360)   → 0
   * normalizeHue(-90)   → 270
   * normalizeHue(720)   → 0
   * normalizeHue(270)   → 270
   *
   * @see https://en.wikipedia.org/wiki/Hue – Определение тона в цветовых моделях
   * @see https://drafts.csswg.org/css-color/#hue – CSS Color Module Level 4
   */
  private static normalizeHue ( e: number ): number {
    e = e % 360;
    return e < 0 ? e + 360 : e;
  }
  /**
* Преобразует цвет из декартового цветового пространства CIELAB в полярное CIELCH.
*
* CIELCH — это полярная форма CIELAB, где:
* - `L` — светлота (остаётся без изменений)
* - `C` — хрома (насыщенность), вычисляется как длина вектора (a, b)
* - `H` — тон (hue), вычисляется как угол между компонентами a и b
*
* Это преобразование необходимо для:
* - Интерполяции цветов по тону
* - Генерации гармоничных палитр
* - Работы с цветовыми моделями, основанными на тоне (например, OKLCH)
*
* @public
* @static
*
* @param param0 - Объект в формате CIELAB
* @param param0.l - Светлота [0..100]
* @param param0.a - Зелёно-красный компонент [-128..128], по умолчанию 0
* @param param0.b - Сине-жёлтый компонент [-128..128], по умолчанию 0
* @param param0.alpha - Опциональный альфа-канал
* @param mode - Режим цветового пространства (по умолчанию `'lch'`)
*
* @returns Объект в формате CIELCH:
* - `mode`: указанный режим
* - `l`: светлота
* - `c`: хрома (насыщенность)
* - `h`: тон в градусах [0..360), нормализован
* - `alpha?`: передаётся без изменений, если был указан
*
* @example
* const lch = OKLCHColorGenerator.labToLch({
*   l: 80,
*   a: 15,
*   b: 30
* });
* // → { mode: 'lch', l: 80, c: 33.54, h: 63.43 }
*
* @example
* const lch = OKLCHColorGenerator.labToLch({ l: 90, a: 0, b: 0 });
* // → { mode: 'lch', l: 90, c: 0 } // ахроматический цвет (тон не определён)
*
* @see https://en.wikipedia.org/wiki/CIELAB_color_space#Cylindrical_representation:_CIELCh – CIELCh
* @see https://drafts.csswg.org/css-color/#lch – CSS Color Module Level 4
*/
  public static labToLch (
    { l, a = 0, b = 0, alpha }: {
      l: number;
      a?: number;
      b?: number;
      alpha?: number;
    },
    mode: string = 'lch'
  ): LCHColor {
    // Вычисляем хрому (насыщенность) как длину вектора (a, b)
    const chroma: number = Math.sqrt( a * a + b * b );

    const lch: LCHColor = {
      mode,
      l,
      c: chroma,
    };

    // Угол (тон) вычисляем только если хрома > 0
    if ( chroma > 0 ) {
      // Math.atan2(b, a) → угол в радианах
      // Переводим в градусы и нормализуем
      const hueDeg = ( Math.atan2( b, a ) * 180 ) / Math.PI;
      lch.h = this.normalizeHue( hueDeg );
    }

    // Сохраняем альфа-канал, если он был
    if ( alpha !== undefined ) {
      lch.alpha = alpha;
    }

    return lch;
  }
  /**
 * Преобразует цвет из линейного RGB в цветовое пространство OKLAB.
 *
 * OKLAB — это **перцептуально равномерное** цветовое пространство, разработанное Брюсом Линдбломом (Björn Ottosson).
 * Это означает, что одинаковые изменения в значениях L, a, b соответствуют **одинаковым визуальным изменениям** для человеческого глаза.
 *
 * Это делает OKLAB идеальным для:
 * - Генерации палитр с равномерной насыщенностью
 * - Интерполяции цветов (градиенты без "провалов")
 * - Ограничения насыщенности (chroma) при генерации тем
 * - Работы с AI и динамическими цветовыми режимами
 *
 * ### Алгоритм:
 * 1. Применяется кубический корень к компонентам LMS (Long, Medium, Short — модель колбочек глаза)
 * 2. Результат конвертируется в декартовы координаты OKLAB
 *
 * Используется в конвейере:
 * sRGB → linear RGB → OKLAB → OKLCH
 *
 * @public
 * @static
 *
 * @param param0 - Объект с компонентами цвета в линейном RGB и опциональным альфа-каналом
 * @param param0.r - Красный канал [0..1]
 * @param param0.g - Зелёный канал [0..1]
 * @param param0.b - Синий канал [0..1]
 * @param param0.alpha - Опциональный альфа-канал [0..1]
 *
 * @returns Объект в цветовом пространстве OKLAB:
 * - `mode`: 'oklab'
 * - `l`: светлота [0..1]
 * - `a`: красный/зелёный [-1..1]
 * - `b`: жёлтый/синий [-1..1]
 * - `alpha?`: передаётся без изменений, если был указан
 *
 * @example
 * const oklab = OKLCHColorGenerator.linearRgbToOklab({
 *   r: 1.0,
 *   g: 0.5,
 *   b: 0.0
 * });
 * // → { mode: 'oklab', l: 0.75, a: 0.32, b: 0.41 }
 *
 * @example
 * const oklab = OKLCHColorGenerator.linearRgbToOklab({ r: 0.5, g: 0.5, b: 0.5 });
 * // → { mode: 'oklab', l: 0.5, a: 0, b: 0 } // серый цвет
 *
 * @see https://bottosson.github.io/posts/oklab/ – Официальное описание OKLAB
 * @see https://drafts.csswg.org/css-color-5/#oklab – CSS Color Module Level 5
 */
  public static linearRgbToOklab ( {
    r,
    g,
    b,
    alpha,
  }: LinearRGB ): OklabColor {
    // Установка значений по умолчанию
    r = r ?? 0;
    g = g ?? 0;
    b = b ?? 0;

    // Шаг 1: Преобразование RGB → LMS (Long-Medium-Short)
    // Эти коэффициенты имитируют чувствительность колбочек глаза
    const L = 0.41222147079999993 * r + 0.5363325363 * g + 0.0514459929 * b;
    const M = 0.2119034981999999 * r + 0.6806995450999999 * g + 0.1073969566 * b;
    const S = 0.08830246189999998 * r + 0.2817188376 * g + 0.6299787005000002 * b;

    // Шаг 2: Применение кубического корня (нелинейное преобразование)
    const L_cbrt = Math.cbrt( L );
    const M_cbrt = Math.cbrt( M );
    const S_cbrt = Math.cbrt( S );

    // Шаг 3: Конвертация LMS → OKLAB
    const oklab: OklabColor = {
      mode: 'oklab',
      l: 0.2104542553 * L_cbrt + 0.793617785 * M_cbrt - 0.0040720468 * S_cbrt,
      a: 1.9779984951 * L_cbrt - 2.428592205 * M_cbrt + 0.4505937099 * S_cbrt,
      b: 0.0259040371 * L_cbrt + 0.7827717662 * M_cbrt - 0.808675766 * S_cbrt,
    };

    // Сохраняем альфа-канал, если он был
    if ( alpha !== undefined ) {
      oklab.alpha = alpha;
    }

    return oklab;
  }

  /**
* Преобразует цвет из sRGB в цветовое пространство OKLCH через конвейер:
* sRGB → Linear RGB → OKLAB → OKLCH.
*
* OKLCH — это **перцептуально равномерное** цветовое пространство, идеально подходящее для:
* - Генерации палитр с естественным восприятием
* - Интерполяции цветов (без "провалов" в тенях)
* - Работы с AI, темами и динамическими режимами
* - Ограничения насыщенности (chroma) для sRGB-безопасных цветов
*
* ### Конвейер преобразования:
* 1. **sRGB → Linear RGB**: удаление гамма-коррекции
* 2. **Linear RGB → OKLAB**: преобразование в перцептуальное пространство
* 3. **OKLAB → OKLCH**: переход к полярным координатам (светлота, насыщенность, тон)
*
* Особое внимание уделено **серым цветам**: если `r == g == b`, компоненты `a` и `b` в OKLAB обнуляются,
* чтобы избежать ошибок при вычислении тона (hue).
*
* @public
* @static
*
* @param rgb - Объект с компонентами цвета в sRGB и опциональным альфа-каналом
* @param rgb.r - Красный канал [0..255]
* @param rgb.g - Зелёный канал [0..255]
* @param rgb.b - Синий канал [0..255]
* @param rgb.alpha - Опциональный альфа-канал [0..1]
*
* @returns Объект в цветовом пространстве OKLCH:
* - `l`: светлота [0..1]
* - `c`: насыщенность (chroma) [0..1]
* - `h`: тон (hue) в градусах [0..360], нормализован
* - `alpha`: альфа-канал [0..1], по умолчанию 1
*
* @example
* const oklch = OKLCHColorGenerator.rgbToOklch({
*   r: 255,
*   g: 128,
*   b: 0
* });
* // → { l: 0.75, c: 0.32, h: 45.6, alpha: 1 }
*
* @example
* const oklch = OKLCHColorGenerator.rgbToOklch({ r: 100, g: 100, b: 100 });
* // → { l: 0.4, c: 0, h: 0, alpha: 1 } // серый цвет (c=0)
*
* @see https://bottosson.github.io/posts/oklab/ – Официальное описание OKLAB и OKLCH
* @see https://drafts.csswg.org/css-color-5/#oklch – CSS Color Module Level 5
* @see https://en.wikipedia.org/wiki/Grayscale – Серые цвета и их обработка
*/
  public static rgbToOklch ( rgb: RGBColor ): { l: number; c: number; h: number; alpha: number; } {
    // Шаг 1: sRGB → Linear RGB (удаляем гамма-коррекцию)
    const linearRgb = this.rgbToLinearRgb( rgb );

    // Шаг 2: Linear RGB → OKLAB (переход в перцептуальное пространство)
    const oklab: OklabColor = this.linearRgbToOklab( linearRgb );

    // Специальная обработка серых цветов: r == g == b
    // В этом случае a и b в OKLAB должны быть 0, чтобы тон (h) был неопределённым
    if ( rgb.r === rgb.g && rgb.g === rgb.b ) {
      oklab.a = 0;
      oklab.b = 0;
    }

    // Шаг 3: OKLAB → OKLCH (переход к полярным координатам)
    const oklch: OKLCHColor = this.labToLch( oklab, 'oklch' );
    // console.log('oklch' , oklch);
    return {
      l: oklch.l,           // Светлота [0..1]
      c: oklch.c,           // Насыщенность [0..1]
      h: oklch.h ?? 0,      // Тон [0..360], 0 для ахроматических цветов
      alpha: rgb.alpha ?? 1 // Альфа по умолчанию 1 (непрозрачный)
    };
  }
  /**
   * Преобразует цвет из цветового пространства OKLCH в HEX-строку (#RRGGBB или #RRGGBBAA).
   *
   * Это **финальный этап** конвейера генерации цветов: после вычисления OKLCH,
   * этот метод конвертирует его в формат, понятный CSS и VS Code.
   *
   * ### Процесс преобразования:
   * 1. **OKLCH → RGB**: вызывается `oklchToRgb` для получения компонент [0..255]
   * 2. **RGB → HEX**: каждый канал переводится в шестнадцатеричную систему
   * 3. **Альфа-канал**: добавляется как два шестнадцатеричных символа, если `alpha < 1`
   *
   * Поддерживает:
   * - Полноцветные коды: `#ffc700`
   * - С прозрачностью: `#ffc700cc`
   * - Нормализацию альфа-канала: `alpha = 0.5` → `80` (в HEX)
   *
   * @public
   * @static
   *
   * @param l - Светлота (Lightness) в диапазоне [0..1]
   * @param c - Насыщенность (Chroma) — может быть любым положительным числом
   * @param h - Тон (Hue) в градусах [0..360]
   * @param alpha - Альфа-канал (прозрачность) [0..1], по умолчанию 1 (непрозрачный)
   *
   * @returns HEX-строка в формате:
   * - `#rrggbb` — если `alpha >= 1`
   * - `#rrggbbaa` — если `alpha < 1`
   *
   * @example
   * const hex = OKLCHColorGenerator.oklchToHex(0.8, 0.2, 275, 1);
   * // → '#b080e0'
   *
   * @example
   * const hex = OKLCHColorGenerator.oklchToHex(0.6, 0.3, 120, 0.8);
   * // → '#7cb342cc' (прозрачность 80%)
   *
   * @example
   * const hex = OKLCHColorGenerator.oklchToHex(0.9, 0, 0, 1);
   * // → '#ffffff' (серый/белый, c=0)
   *
   * @see https://drafts.csswg.org/css-color-5/#hex-notation – CSS HEX Notation
   * @see https://en.wikipedia.org/wiki/Web_colors – Веб-цвета
   */
  public static oklchToHex ( l: number, c: number, h: number, alpha = 1 ): string {
    // Защита от некорректных значений
    if ( l < 0 || l > 1 ) {
      console.warn( `oklchToHex: l=${ l } вне диапазона [0..1]` );
      l = Math.max( 0, Math.min( 1, l ) );
    }
    if ( c < 0 ) c = 0;
    if ( h < 0 || h >= 360 ) h = ( ( h % 360 ) + 360 ) % 360;
    if ( alpha < 0 || alpha > 1 ) alpha = Math.max( 0, Math.min( 1, alpha ) );

    // Шаг 1: OKLCH → RGB
    // Конвертируем из перцептуального пространства в sRGB [0..255]
    const rgb = this.oklchToRgb( { l, c, h } );

    // Вспомогательная функция для перевода числа в HEX (2 символа)
    const toHex = ( n: number ): string => n.toString( 16 ).padStart( 2, '0' );

    // Формируем основной HEX-код: #rrggbb
    const hex = `#${ toHex( rgb.r ) }${ toHex( rgb.g ) }${ toHex( rgb.b ) }`;

    // Если альфа < 1, добавляем два HEX-символа для прозрачности
    return alpha < 1
      ? hex + Math.round( alpha * 255 ).toString( 16 ).padStart( 2, '0' )
      : hex;
  }


  /**
 * Преобразует цвет из цветового пространства OKLCH в sRGB (стандартное для экранов).
 *
 * Это **обратный процесс** к `rgbToOklch`, состоящий из трёх этапов:
 * 1. **OKLCH → OKLAB** — переход из полярных координат (светлота, хрома, тон) в декартовы
 * 2. **OKLAB → Linear RGB** — преобразование в линейное цветовое пространство
 * 3. **Linear RGB → sRGB** — применение гамма-коррекции для отображения на экране
 *
 * Используется при:
 * - Конвертации OKLCH в HEX (`oklchToHex`)
 * - Проверке, находится ли цвет в sRGB-гамме
 * - Генерации палитр и тем
 *
 * ### Важные особенности:
 * - Результат округляется до целых значений `[0..255]`
 * - Применяется **ограничение диапазона**, чтобы избежать переполнения
 * - Используется **гамма-коррекция sRGB** (не линейная)
 *
 * @public
 * @static
 *
 * @param oklch - Объект с компонентами цвета в OKLCH
 * @param oklch.l - Светлота (Lightness) в диапазоне [0..1]
 * @param oklch.c - Насыщенность (Chroma) — может быть любым положительным числом
 * @param oklch.h - Тон (Hue) в градусах [0..360]
 *
 * @returns Объект с компонентами sRGB, нормализованными в диапазоне [0..255], округлёнными до целых:
 * - `r` — красный канал
 * - `g` — зелёный канал
 * - `b` — синий канал
 *
 * @example
 * const rgb = OKLCHColorGenerator.oklchToRgb({
 *   l: 0.8,
 *   c: 0.2,
 *   h: 275
 * });
 * // → { r: 176, g: 128, b: 224 }
 *
 * @example
 * const rgb = OKLCHColorGenerator.oklchToRgb({
 *   l: 0.9,
 *   c: 0,
 *   h: 0
 * });
 * // → { r: 255, g: 255, b: 255 } // белый (c=0)
 *
 * @example
 * const rgb = OKLCHColorGenerator.oklchToRgb({
 *   l: 0.2,
 *   c: 0.4,
 *   h: 120
 * });
 * // → { r: 30, g: 100, b: 30 } // тёмно-зелёный
 *
 * @see https://bottosson.github.io/posts/oklab/ – Официальное описание OKLAB и OKLCH
 * @see https://drafts.csswg.org/css-color-5/#color-conversion – CSS Color Module Level 5
 * @see https://en.wikipedia.org/wiki/SRGB – sRGB и гамма-коррекция
 */
  public static oklchToRgb ( oklch: { l: number; c: number; h: number; } ): { r: number; g: number; b: number; } {
    // Шаг 1: OKLCH → OKLAB (полярные → декартовы координаты)
    // Вычисляем компоненты a и b через косинус и синус тона
    const oklab = this.oklchToOklab( oklch );

    // Шаг 2: OKLAB → Linear RGB
    // Преобразуем в линейное RGB-пространство, где яркость пропорциональна значению
    const linearRgb = this.oklabToLinearRgb( oklab );

    // Шаг 3: Linear RGB → sRGB (гамма-коррекция)
    // Применяем стандартную формулу sRGB для отображения на экранах
    const sRgb = {
      r: linearRgb.r <= 0.0031308
        ? linearRgb.r * 12.92
        : 1.055 * Math.pow( linearRgb.r, 1 / 2.4 ) - 0.055,
      g: linearRgb.g <= 0.0031308
        ? linearRgb.g * 12.92
        : 1.055 * Math.pow( linearRgb.g, 1 / 2.4 ) - 0.055,
      b: linearRgb.b <= 0.0031308
        ? linearRgb.b * 12.92
        : 1.055 * Math.pow( linearRgb.b, 1 / 2.4 ) - 0.055,
    };

    // Шаг 4: Масштабирование и ограничение
    // Переводим [0..1] → [0..255], обрезаем по диапазону и округляем
    return {
      r: Math.round( NumberAdjuster.extremum( 'max', null, 0, NumberAdjuster.extremum( 'min', null, 255, sRgb.r * 255 ) ) ),
      g: Math.round( NumberAdjuster.extremum( 'max', null, 0, NumberAdjuster.extremum( 'min', null, 255, sRgb.g * 255 ) ) ),
      b: Math.round( NumberAdjuster.extremum( 'max', null, 0, NumberAdjuster.extremum( 'min', null, 255, sRgb.b * 255 ) ) )
    };
  }

  /**
   * Преобразует цвет из цветового пространства OKLAB в модель LMS (Long-Medium-Short).
   *
   * LMS — это **физиологическая модель цветового восприятия**, имитирующая чувствительность
   * трёх типов колбочек в человеческом глазе:
   * - **L** (Long) — чувствительна к длинным волнам (красный)
   * - **M** (Medium) — чувствительна к средним волнам (зелёный)
   * - **S** (Short) — чувствительна к коротким волнам (синий)
   *
   * Это преобразование — **обратный процесс** к `lmsToOklab` и используется при:
   * - Конвертации OKLAB → Linear RGB
   * - Проверке, находится ли цвет в sRGB-гамме
   * - Генерации палитр с учётом восприятия
   *
   * ### Алгоритм:
   * 1. Применяется линейное преобразование из OKLAB → L'M'S' (нелинейные компоненты)
   * 2. Каждый канал возводится в куб: `L = L'^3`, `M = M'^3`, `S = S'^3`
   * 3. Результат — значения в пространстве LMS, готовые для дальнейшей конвертации в RGB
   *
   * @private
   * @static
   *
   * @param l - Светлота (Lightness) в OKLAB [0..1]
   * @param a - Цветовой компонент a (красный/зелёный) в OKLAB
   * @param b - Цветовой компонент b (жёлтый/синий) в OKLAB
   *
   * @returns Объект с компонентами LMS:
   * - `l`: Long (чувствительность к красному)
   * - `m`: Medium (чувствительность к зелёному)
   * - `s`: Short (чувствительность к синему)
   * Все значения — положительные числа, результат возведения в куб
   *
   * @example
   * const lms = OKLCHColorGenerator.oklabToLms(0.8, 0.1, 0.2);
   * // → { l: 0.72, m: 0.64, s: 0.58 }
   *
   * @example
   * const lms = OKLCHColorGenerator.oklabToLms(0.5, 0, 0);
   * // → { l: 0.125, m: 0.125, s: 0.125 } // ахроматический цвет
   *
   * @see https://bottosson.github.io/posts/oklab/ – Официальное описание OKLAB и LMS
   * @see https://en.wikipedia.org/wiki/LMS_color_space – LMS и физиология зрения
   * @see https://en.wikipedia.org/wiki/Color_vision – Как работают колбочки глаза
   */
  private static oklabToLms ( l: number, a: number, b: number ): { l: number; m: number; s: number; } {
    // Шаг 1: Линейное преобразование OKLAB → L'M'S'
    // Это обратная матрица к преобразованию LMS → OKLAB
    const l_prime = l + 0.3963377774 * a + 0.2158037573 * b;
    const m_prime = l - 0.1055613458 * a - 0.0638541728 * b;
    const s_prime = l - 0.0894841775 * a - 1.2914855480 * b;

    // Шаг 2: Возведение в куб — возврат к нелинейной модели
    // Это компенсирует кубический корень, применённый при LMS → OKLAB
    return {
      l: Math.pow( l_prime, 3 ),
      m: Math.pow( m_prime, 3 ),
      s: Math.pow( s_prime, 3 )
    };
  }

  /**
   * Преобразует цвет из цветового пространства LMS (Long-Medium-Short) в линейное RGB.
   *
   * LMS — это модель, имитирующая работу колбочек глаза:
   * - **L** (Long) — чувствительна к красному свету
   * - **M** (Medium) — чувствительна к зелёному свету
   * - **S** (Short) — чувствительна к синему свету
   *
   * Это преобразование использует **обратную матрицу** к преобразованию RGB → LMS,
   * что позволяет вернуться из физиологического цветового пространства обратно в RGB.
   *
   * Используется в конвейере:
   * OKLAB → LMS → Linear RGB → sRGB
   *
   * ### Алгоритм:
   * Применяется матрица преобразования:
   * ```
   * R =  4.07674 * L - 3.30771 * M + 0.23097 * S
   * G = -1.26844 * L + 2.60976 * M - 0.34132 * S
   * B = -0.00420 * L - 0.70342 * M + 1.70761 * S
   * ```
   *
   * @private
   * @static
   *
   * @param l - Компонента L (Long) — чувствительность к длинным волнам
   * @param m - Компонента M (Medium) — чувствительность к средним волнам
   * @param s - Компонента S (Short) — чувствительность к коротким волнам
   *
   * @returns Массив `[r, g, b]` с компонентами линейного RGB в диапазоне [0..1]
   *
   * @example
   * const [r, g, b] = OKLCHColorGenerator.lmsToLinearRgb(0.7, 0.6, 0.5);
   * // → [0.5, 0.4, 0.3] (примерные значения)
   *
   * @example
   * const [r, g, b] = OKLCHColorGenerator.lmsToLinearRgb(0.1, 0.1, 0.1);
   * // → [0.0, 0.0, 0.0] (почти чёрный)
   *
   * @see https://bottosson.github.io/posts/oklab/ – Официальное описание OKLAB и LMS
   * @see https://en.wikipedia.org/wiki/LMS_color_space – LMS и физиология зрения
   * @see https://en.wikipedia.org/wiki/Transformation_matrix – Матрицы преобразования
   */
  private static lmsToLinearRgb ( l: number, m: number, s: number ): [ number, number, number ] {
    return [
      4.076741661347994 * l - 3.307711590408193 * m + 0.230969928729428 * s,
      -1.2684380040921763 * l + 2.6097574006633715 * m - 0.3413193963102197 * s,
      -0.004196086541837188 * l - 0.7034186144594493 * m + 1.7076147009309444 * s
    ];
  }

  /**
* Преобразует цвет из sRGB в цветовое пространство Display P3.
*
* Display P3 — это **расширенное цветовое пространство**, используемое в современных дисплеях Apple,
* поддерживающих более насыщенные и яркие цвета, особенно в зелёной и красной зонах.
*
* Эта функция используется для:
* - Проверки, находится ли цвет в sRGB или выходит за его пределы
* - Генерации палитр с расширенным охватом
* - Сравнения цветов в разных гаммах
*
* ### Конвейер преобразования:
* 1. **sRGB → Linear RGB**: удаление гамма-коррекции
* 2. **Linear RGB → OKLAB**: переход в перцептуальное пространство
* 3. **OKLAB → LMS**: модель, имитирующая работу колбочек глаза
* 4. **LMS → Linear RGB (P3)**: применение матрицы Display P3
*
* Результат — цвет в линейном RGB, но уже в диапазоне Display P3.
*
* @public
* @static
*
* @param rgb - Объект с компонентами цвета в sRGB и опциональным альфа-каналом
* @param rgb.r - Красный канал [0..255]
* @param rgb.g - Зелёный канал [0..255]
* @param rgb.b - Синий канал [0..255]
* @param rgb.alpha - Опциональный альфа-канал [0..1]
*
* @returns Объект с компонентами в Display P3:
* - `r`, `g`, `b`: значения в диапазоне [0..1] (не [0..255])
* - `alpha`: передаётся без изменений, по умолчанию 1
*
* @example
* const p3 = OKLCHColorGenerator.rgbToDisplayP3({
*   r: 255,
*   g: 128,
*   b: 0
* });
* // → { r: 1.0, g: 0.45, b: 0.0, alpha: 1 }
*
* @example
* const p3 = OKLCHColorGenerator.rgbToDisplayP3({ r: 200, g: 200, b: 200, alpha: 0.8 });
* // → { r: 0.78, g: 0.78, b: 0.78, alpha: 0.8 }
*
* @see https://en.wikipedia.org/wiki/DCI-P3 – Описание цветового пространства P3
* @see https://developer.apple.com/documentation/uikit/uicolor/understanding_color_management – Apple и Display P3
* @see https://bottosson.github.io/posts/oklab/ – Использование OKLAB для преобразования цветов
*/
  public static rgbToDisplayP3 ( rgb: RGBColor ): { r: number; g: number; b: number; alpha: number; } {
    // Шаг 1: sRGB → Linear RGB (удаляем гамма-коррекцию)
    const linearRgb = this.rgbToLinearRgb( rgb );

    // Шаг 2: Linear RGB → OKLAB (переход в перцептуальное пространство)
    const oklab = this.linearRgbToOklab( linearRgb );

    // Шаг 3: OKLAB → LMS (Long-Medium-Short — модель колбочек глаза)
    const lms = this.oklabToLms( oklab.l, oklab.a, oklab.b );

    // Шаг 4: LMS → Linear RGB в Display P3 (обратная матрица)
    const p3LinearRgb = this.lmsToLinearRgb( lms.l, lms.m, lms.s );

    return {
      r: p3LinearRgb[ 0 ],
      g: p3LinearRgb[ 1 ],
      b: p3LinearRgb[ 2 ],
      alpha: rgb.alpha ?? 1,
    };
  }

  /**
* Находит и возвращает объект цвета из справочника по ID, имени, ключу или HEX-коду.
*
* Это **универсальный метод поиска цвета**, который поддерживает несколько способов идентификации:
* - По числовому `id` (например, 100)
* - По ключу в словаре (например, `"blues"`, `"reds"`)
* - По полному совпадению имени (например, "Deep Sapphire")
* - По полному совпадению HEX-кода (например, "#3e92cc", "#3E92CC")
*
* Используется во всех ключевых частях системы:
* - Генерация тем
* - Проверка цветовой палитры
* - Конвертация в OKLCH
*
* ### Особенности:
* - Регистронезависимый поиск по имени и HEX
* - Возвращает **копию** объекта, чтобы избежать мутаций
* - Автоматически обрезает и нормализует строки
* - Подробные предупреждения при ошибках
*
* @public
* @static
*
* @param input - Критерий поиска цвета
* @param input - Число: ищется по `id`
* @param input - Строка: ищется по ключу, имени или HEX-коду
*
* @returns Объект `ColorEntry`, если цвет найден, иначе `null`
*
* @example
* const color = OKLCHColorGenerator.findColor(100);
* // → { id: 100, name: "blues", hex: "#3E92CC", rgb: { r: 62, g: 146, b: 204 } }
*
* @example
* const color = OKLCHColorGenerator.findColor("blues");
* // → найдёт по ключу
*
* @example
* const color = OKLCHColorGenerator.findColor("#3e92cc");
* // → найдёт по HEX (регистронезависимо)
*
* @example
* const color = OKLCHColorGenerator.findColor("Deep Sapphire");
* // → найдёт по имени
*
* @example
* const color = OKLCHColorGenerator.findColor("nonexistent");
* // → null + предупреждение в консоли
*
* @see {@link ColorEntry} – структура объекта цвета
* @see {@link colors_map} – справочник всех цветов
*/
  public static findColor ( input: string | number ): ColorEntry | null {
    let colorEntry: ColorEntry | undefined;

    // 🔒 Защита: null или undefined
    if ( input === null || input === undefined ) {
      console.warn( `findColor: получен null или undefined` );
      return null;
    }

    if ( typeof input === 'number' ) {
      // Поиск по ID
      colorEntry = Object.values( this.colorRegistry ).find(
        ( c: ColorEntry ): boolean => c.id === input
      );
    } else if ( typeof input === 'string' ) {
      const str: string = input.trim().toLowerCase();

      // Поиск по ключу (например, "blues")
      if ( this.colorRegistry[ str ] ) {
        colorEntry = this.colorRegistry[ str ];
      } else {
        // Поиск по имени (регистронезависимо)
        colorEntry = Object.values( this.colorRegistry ).find(
          ( c: ColorEntry ): boolean => c.name.toLowerCase() === str
        );

        // Если не нашли по имени — ищем по HEX
        if ( !colorEntry ) {
          colorEntry = Object.values( this.colorRegistry ).find(
            ( c: ColorEntry ): boolean => c.hex.toLowerCase() === str
          );
        }
      }
    } else {
      // 🔴 Неподдерживаемый тип
      console.error( `findColor: ожидается строка или число, получено ${ typeof input }`, input );
      return null;
    }

    // 🔍 Цвет не найден
    if ( !colorEntry ) {
      console.warn( `Цвет "${ input }" не найден` );
      return null;
    }
    // console.log("colorEntry. -> ", colorEntry)
    // ✅ Возвращаем копию, чтобы не мутировать оригинал
    return { ...colorEntry };
  }
  /**
   * Преобразует цвет из sRGB в цветовое пространство XYZ с белой точкой D50.
   *
   * Это первый шаг в конвейере преобразования sRGB → OKLAB → OKLCH.
   * Белая точка D50 (~5000K) используется в цветовых моделях OKLAB и OKLCH,
   * так как она лучше соответствует восприятию цвета при просмотре на бумаге и экранах.
   *
   * ### Алгоритм:
   * 1. **Нормализация RGB** [0..255] → [0..1]
   * 2. **Гамма-коррекция sRGB → linear RGB** (удаление гамма-нелинейности)
   * 3. **Применение матрицы преобразования** sRGB → XYZ
   * 4. **Масштабирование на 100** (стандарт CIE)
   *
   * Используется в:
   * - `linearRgbToOklab`
   * - `rgbToOklch`
   * - `rgbToDisplayP3`
   *
   * @public
   * @static
   *
   * @param r - Красный канал [0..255]
   * @param g - Зелёный канал [0..255]
   * @param b - Синий канал [0..255]
   *
   * @returns Массив `[X, Y, Z]` — координаты в цветовом пространстве XYZ (D50)
   * - `X`: отражает яркость, связан с зелёным/красным
   * - `Y`: яркость (luminance)
   * - `Z`: связан с синим
   *
   * @example
   * const [X, Y, Z] = OKLCHColorGenerator.rgbToXyzD50(255, 128, 0);
   * // → [71.3, 50.2, 25.6] (примерные значения)
   *
   * @example
   * const [X, Y, Z] = OKLCHColorGenerator.rgbToXyzD50(255, 255, 255);
   * // → [95.05, 100.00, 108.88] (белый D50)
   *
   * @see https://en.wikipedia.org/wiki/SRGB – sRGB и матрица преобразования
   * @see https://en.wikipedia.org/wiki/CIE_1931_color_space – XYZ и белые точки
   * @see https://bottosson.github.io/posts/oklab/ – OKLAB и использование D50
   */
  public static rgbToXyzD50 ( r: number, g: number, b: number ): [ number, number, number ] {
    // Шаг 1: Нормализация [0..255] → [0..1]
    const rLinear = r / 255;
    const gLinear = g / 255;
    const bLinear = b / 255;

    // Шаг 2: sRGB → Linear RGB (гамма-коррекция)
    const linearR = rLinear <= 0.04045 ? rLinear / 12.92 : Math.pow( ( rLinear + 0.055 ) / 1.055, 2.4 );
    const linearG = gLinear <= 0.04045 ? gLinear / 12.92 : Math.pow( ( gLinear + 0.055 ) / 1.055, 2.4 );
    const linearB = bLinear <= 0.04045 ? bLinear / 12.92 : Math.pow( ( bLinear + 0.055 ) / 1.055, 2.4 );

    // Шаг 3: Матрица преобразования sRGB → XYZ (с белой точкой D50)
    const X = ( 0.4124564 * linearR + 0.3575761 * linearG + 0.1804375 * linearB ) * 100;
    const Y = ( 0.2126729 * linearR + 0.7151522 * linearG + 0.0721750 * linearB ) * 100;
    const Z = ( 0.0193339 * linearR + 0.1191920 * linearG + 0.9503041 * linearB ) * 100;

    return [ X, Y, Z ];
  }
  /**
* Преобразует цвет из цветового пространства LMS (Long-Medium-Short) в OKLAB.
*
* LMS — это физиологическая модель, имитирующая чувствительность трёх типов колбочек глаза:
* - **L** (Long) — к длинным волнам (красный)
* - **M** (Medium) — к средним волнам (зелёный)
* - **S** (Short) — к коротким волнам (синий)
*
* OKLAB — это **перцептуально равномерное** цветовое пространство, где одинаковые изменения
* в значениях L, a, b соответствуют одинаковым визуальным изменениям для человека.
*
* Это преобразование — ключевой шаг в конвейере:
* sRGB → Linear RGB → OKLAB → OKLCH
*
* ### Алгоритм:
* 1. Применяется кубический корень к компонентам LMS
* 2. Результат преобразуется в декартовы координаты OKLAB
*
* @private
* @static
*
* @param l - Компонента L (Long), чувствительность к красному
* @param m - Компонента M (Medium), чувствительность к зелёному
* @param s - Компонента S (Short), чувствительность к синему
*
* @returns Объект в формате OKLAB:
* - `l`: светлота [0..1]
* - `a`: красный/зелёный [-1..1]
* - `b`: жёлтый/синий [-1..1]
*
* @example
* const oklab = OKLCHColorGenerator.lmsToOklab(0.7, 0.6, 0.5);
* // → { l: 0.8, a: 0.12, b: 0.25 }
*
* @example
* const oklab = OKLCHColorGenerator.lmsToOklab(0.1, 0.1, 0.1);
* // → { l: 0.1, a: 0, b: 0 } // ахроматический цвет
*
* @see https://bottosson.github.io/posts/oklab/ – Официальное описание OKLAB
* @see https://en.wikipedia.org/wiki/LMS_color_space – LMS и физиология зрения
*/
  // private static lmsToOklab(l: number, m: number, s: number): { l: number; a: number; b: number } {
  //   // Шаг 1: Применяем кубический корень к компонентам LMS
  //   // Это "линеаризует" нелинейную чувствительность колбочек
  //   const l_cbrt = Math.cbrt(l);
  //   const m_cbrt = Math.cbrt(m);
  //   const s_cbrt = Math.cbrt(s);

  //   // Шаг 2: Линейное преобразование в OKLAB
  //   // Коэффициенты взяты из спецификации OKLAB
  //   return {
  //     l: 0.2104542553 * l_cbrt + 0.793617785 * m_cbrt - 0.0040720468 * s_cbrt,
  //     a: 1.9779984951 * l_cbrt - 2.428592205 * m_cbrt + 0.4505937099 * s_cbrt,
  //     b: 0.0259040371 * l_cbrt + 0.7827717662 * m_cbrt - 0.808675766 * s_cbrt
  //   };
  // }
  /**
   * Преобразует цвет из цветового пространства OKLAB в OKLCH.
   *
   * Это ключевой шаг при конвертации цветов из sRGB → OKLCH.
   * OKLAB — это декартово пространство (l, a, b), а OKLCH — полярное (l, c, h), где:
   * - `l` — светлота (остаётся без изменений)
   * - `c` — хрома (насыщенность), вычисляется как длина вектора (a, b)
   * - `h` — тон (hue), вычисляется как угол между компонентами a и b
   *
   * ### Алгоритм:
   * 1. **Хрома (c)** = √(a² + b²)
   * 2. **Тон (h)** = atan2(b, a) → радианы → градусы → нормализация [0..360)
   * 3. **Светлота (l)** — копируется, но с проверкой на диапазон [0..1]
   *
   * Используется в:
   * - `rgbToOklch`
   * - Генерации семантических цветов
   * - Ограничении насыщенности
   *
   * @public
   * @static
   *
   * @param lab - Объект в формате OKLAB:
   * - `l`: светлота [0..1]
   * - `a`: красный/зелёный
   * - `b`: жёлтый/синий
   *
   * @returns Объект в формате OKLCH:
   * - `l`: светлота [0..1]
   * - `c`: насыщенность (хрома) ≥ 0
   * - `h`: тон в градусах [0..360), нормализован
   *
   * @example
   * const oklch = OKLCHColorGenerator.oklabToOklch({
   *   l: 0.8,
   *   a: 0.1,
   *   b: 0.2
   * });
   * // → { l: 0.8, c: 0.224, h: 63.43 }
   *
   * @example
   * const oklch = OKLCHColorGenerator.oklabToOklch({ l: 0.5, a: 0, b: 0 });
   * // → { l: 0.5, c: 0, h: 0 } // ахроматический цвет
   *
   * @see https://bottosson.github.io/posts/oklab/ – Официальное описание OKLAB и OKLCH
   * @see https://en.wikipedia.org/wiki/Cylindrical_coordinate_system – Полярные координаты
   */
  public static oklabToOklch ( lab: LAB ): LCH {
    const { a, b } = lab;

    // Шаг 1: Вычисляем хрому (насыщенность) как длину вектора (a, b)
    const chroma = Math.sqrt( a * a + b * b );

    // Шаг 2: Вычисляем угол в радианах с помощью atan2(b, a)
    // atan2 учитывает квадрант и возвращает значение [-π, π]
    const hueRad = Math.atan2( b, a );

    // Шаг 3: Переводим радианы в градусы
    const hueDeg = ( hueRad * 180 ) / Math.PI;

    // Шаг 4: Нормализуем тон в диапазон [0..360)
    const normalizedHue = hueDeg < 0 ? hueDeg + 360 : hueDeg;

    // Шаг 5: Ограничиваем светлоту [0..1] (защита от ошибок)
    const clampedLightness = Math.max( 0, Math.min( 1, lab.l ) );

    return {
      l: clampedLightness,
      c: chroma,
      h: normalizedHue
    };
  }


  /**
   * Преобразует цвет из цветового пространства OKLCH в OKLAB.
   *
   * Это **обратный процесс** к `oklabToOklch` и используется при:
   * - Конвертации HEX → OKLCH → OKLAB → LMS → Linear RGB
   * - Проверке, находится ли цвет в sRGB-гамме
   * - Генерации палитр с ограничением насыщенности
   *
   * ### Алгоритм:
   * 1. **Тон (h)** переводится из градусов в радианы
   * 2. **Хрома (c)** и **тон (h)** преобразуются в декартовы координаты:
   *    - `a = c * cos(h)`
   *    - `b = c * sin(h)`
   * 3. **Светлота (l)** копируется без изменений (в диапазоне [0..1])
   *
   * ⚠️ **Важно**: `l` в OKLCH — это [0..1], а не [0..100] → **деление на 100 — ошибка**
   *
   * @private
   * @static
   *
   * @param oklch - Объект в формате OKLCH:
   * - `l`: светлота [0..1]
   * - `c`: насыщенность (хрома)
   * - `h`: тон (hue) в градусах [0..360]
   *
   * @returns Объект в формате OKLAB:
   * - `l`: светлота [0..1]
   * - `a`: красный/зелёный
   * - `b`: жёлтый/синий
   *
   * @example
   * const oklab = OKLCHColorGenerator.oklchToOklab({
   *   l: 0.8,
   *   c: 0.2,
   *   h: 275
   * });
   * // → { l: 0.8, a: -0.06, b: 0.19 }
   *
   * @example
   * const oklab = OKLCHColorGenerator.oklchToOklab({ l: 0.5, c: 0, h: 0 });
   * // → { l: 0.5, a: 0, b: 0 } // серый цвет
   *
   * @see https://bottosson.github.io/posts/oklab/ – Официальное описание OKLAB и OKLCH
   * @see https://drafts.csswg.org/css-color-5/#oklch – CSS Color Module Level 5
   */
  private static oklchToOklab ( oklch: { l: number; c: number; h: number; } ): { l: number; a: number; b: number; } {
    // Шаг 1: Переводим тон из градусов в радианы
    const rad = ( oklch.h * Math.PI ) / 180;

    // Шаг 2: Преобразуем полярные координаты (c, h) в декартовы (a, b)
    const a = oklch.c * Math.cos( rad );
    const b = oklch.c * Math.sin( rad );

    // Шаг 3: Возвращаем OKLAB
    // ❌ Раньше было: l: oklch.l / 100 → ошибка!
    // ✅ Теперь: l остаётся в диапазоне [0..1]
    return {
      l: oklch.l,
      a,
      b
    };
  }


  /**
 * Преобразует цвет из цветового пространства OKLAB в линейное RGB.
 *
 * Это **обратный процесс** к `linearRgbToOklab` и используется для:
 * - Проверки, находится ли цвет в sRGB-гамме
 * - Ограничения насыщенности (chroma) при генерации палитр
 * - Валидации цветов в теме
 *
 * ### Алгоритм:
 * 1. **OKLAB → LMS**: применение матрицы и возведение в куб (обратная операция к `cbrt`)
 * 2. **LMS → Linear RGB**: умножение на обратную матрицу преобразования
 *
 * Коэффициенты взяты из официальной спецификации OKLAB (Björn Ottosson).
 *
 * @private
 * @static
 *
 * @param param0 - Объект в формате OKLAB
 * @param param0.l - Светлота [0..1]
 * @param param0.a - Цветовой компонент a (красный/зелёный)
 * @param param0.b - Цветовой компонент b (жёлтый/синий)
 *
 * @returns Объект в линейном RGB-пространстве:
 * - `r`, `g`, `b`: значения в диапазоне [0..1]
 *
 * @example
 * const linearRgb = OKLCHColorGenerator.oklabToLinearRgb({
 *   l: 0.8,
 *   a: 0.1,
 *   b: 0.2
 * });
 * // → { r: 0.9, g: 0.6, b: 0.4 } (примерные значения)
 *
 * @example
 * const linearRgb = OKLCHColorGenerator.oklabToLinearRgb({ l: 0.5, a: 0, b: 0 });
 * // → { r: 0.5, g: 0.5, b: 0.5 } // серый цвет
 *
 * @see https://bottosson.github.io/posts/oklab/ – Официальное описание OKLAB
 * @see https://drafts.csswg.org/css-color-5/#oklab – CSS Color Module Level 5
 */
  private static oklabToLinearRgb ( { l, a, b }: LAB ): RGB {
    /**
     * Шаг 1: OKLAB → LMS (Long-Medium-Short)
     * Применяем линейное преобразование, а затем возводим в куб.
     * Это обратный процесс к преобразованию LMS → OKLAB.
     */
    const l_prime = Math.pow(
      l * 0.9999999984505198 + 0.39633779217376786 * a + 0.2158037580607588 * b,
      3
    );
    const m_prime = Math.pow(
      l * 1.0000000088817609 - 0.10556134232365635 * a - 0.06385417477170591 * b,
      3
    );
    const s_prime = Math.pow(
      l * 1.0000000546724108 - 0.08948418209496575 * a - 1.2914855378640917 * b,
      3
    );

    /**
     * Шаг 2: LMS → Linear RGB
     * Применяем обратную матрицу преобразования из LMS в RGB.
     * Это стандартная матрица, используемая в цветовых библиотеках.
     */
    return {
      r: 4.076741661347994 * l_prime - 3.307711590408193 * m_prime + 0.230969928729428 * s_prime,
      g: -1.2684380040921763 * l_prime + 2.6097574006633715 * m_prime - 0.3413193963102197 * s_prime,
      b: -0.004196086541837188 * l_prime - 0.7034186144594493 * m_prime + 1.7076147009309444 * s_prime
    };
  }


  /**
* Проверяет, находится ли цвет в пределах sRGB-гаммы.
*
* Цвет считается корректным и отображаемым на большинстве экранов,
* только если все его компоненты (R, G, B) находятся в диапазоне [0..1].
*
* Используется при:
* - Генерации палитр в формате OKLCH
* - Ограничении насыщенности (chroma)
* - Проверке, можно ли безопасно отобразить цвет
*
* Если любая компонента:
* - < 0 → цвет слишком тёмный (например, отрицательный красный)
* - > 1 → цвет слишком яркий (выходит за пределы sRGB)
* — цвет считается **вне sRGB**.
*
* @private
* @static
*
* @param rgb - Объект с компонентами цвета в линейном RGB [0..1]
* @param rgb.r - Красный канал
* @param rgb.g - Зелёный канал
* @param rgb.b - Синий канал
*
* @returns `true`, если цвет находится в sRGB-гамме, иначе `false`
*
* @example
* const inGamut = OKLCHColorGenerator.isInSrgb({
*   r: 0.9,
*   g: 0.5,
*   b: 0.3
* });
* // → true
*
* @example
* const outOfGamut = OKLCHColorGenerator.isInSrgb({
*   r: 1.2,
*   g: 0.6,
*   b: 0.4
* });
* // → false (r > 1)
*
* @example
* const outOfGamut = OKLCHColorGenerator.isInSrgb({
*   r: -0.1,
*   g: 0.5,
*   b: 0.5
* });
* // → false (r < 0)
*
* @see https://en.wikipedia.org/wiki/SRGB – Описание sRGB
* @see https://bottosson.github.io/posts/oklab/ – OKLAB и работа с гаммой
* @see https://drafts.csswg.org/css-color-5/#color-gamut – CSS Color Module Level 5
*/
  private static isInSrgb ( rgb: RGB ): boolean {
    /**
     * Проверяем, что каждая компонента цвета:
     * - Не меньше 0
     * - Не больше 1
     */
    return (
      rgb.r >= 0 && rgb.r <= 1 &&
      rgb.g >= 0 && rgb.g <= 1 &&
      rgb.b >= 0 && rgb.b <= 1
    );
  }

  /**
* Находит максимально допустимую насыщенность (хрому) для заданных светлоты и тона,
* при которой цвет остаётся в пределах sRGB-гаммы.
*
* Это критически важная функция при генерации палитр в формате OKLCH.
* Поскольку OKLCH позволяет создавать цвета с любой насыщенностью, но не все из них
* могут быть отображены на экранах (sRGB), эта функция определяет **границу гаммы**.
*
* ### Алгоритм:
* 1. Начинаем с `c = 0` (серый цвет)
* 2. Последовательно увеличиваем хрому с шагом `step`
* 3. На каждом шаге:
*    - Преобразуем OKLCH → OKLAB → Linear RGB
*    - Проверяем, находится ли цвет в sRGB (`isInSrgb`)
* 4. Как только цвет выходит за пределы sRGB — возвращаем предыдущее значение
*
* Используется при:
* - Генерации CSS-переменных с безопасными цветами
* - Построении палитр для UI
* - Ограничении цветов в темах
*
* @private
* @static
*
* @param lightness - Светлота в процентах [0..100]
* @param hue - Цветовой тон в градусах [0..360], будет нормализован
* @param step - Шаг увеличения хромы (по умолчанию 0.001). Меньше = точнее, но медленнее
* @param maxChroma - Максимальная хрому для проверки (по умолчанию 0.4). Ограничивает время выполнения
*
* @returns Максимальная допустимая хрому, округлённая до 3 знаков после запятой.
*          Если цвет выходит за пределы sRGB даже при `c = 0`, возвращает `0`.
*
* @example
* const maxC = OKLCHColorGenerator.findMaxChroma(80, 275);
* // → 0.152 (максимальная насыщенность для сине-фиолетового при светлоте 80%)
*
* @example
* const maxC = OKLCHColorGenerator.findMaxChroma(98, 120);
* // → 0.021 (очень слабая насыщенность для почти белого зелёного)
*
* @example
* const maxC = OKLCHColorGenerator.findMaxChroma(10, 0);
* // → 0.045 (ограниченная насыщенность для тёмного красного)
*
* @see https://bottosson.github.io/posts/oklab/ – Официальное описание OKLAB и OKLCH
* @see https://en.wikipedia.org/wiki/SRGB – sRGB и границы цветовой гаммы
* @see https://drafts.csswg.org/css-color-5/#gamut-mapping – Gamut mapping в CSS
*/
  private static findMaxChroma (
    lightness: number,
    hue: number,
    step: number = 0.001,
    maxChroma: number = 0.4
  ): number {
    /**
     * Начальное значение хромы.
     */
    let c: number = 0;

    /**
     * Преобразуем светлоту из процентного значения [0..100] в диапазон [0..1].
     * Затем последовательно увеличиваем хрому, пока цвет в RGB не выйдет за пределы sRGB.
     */
    while ( c <= maxChroma ) {
      const lab: LAB = this.oklchToOklab( {
        l: lightness / 100, // нормализуем светлоту
        c,
        h: this.normalizeHue( hue ) // нормализуем тон к диапазону [0..360]
      } );

      const rgb: RGB = this.oklabToLinearRgb( lab ); // преобразуем в линейный RGB

      /**
       * Если цвет вышел за пределы sRGB — прерываем цикл.
       */
      if ( !this.isInSrgb( rgb ) ) break;

      c += step; // увеличиваем хрому
    }

    /**
     * Возвращаем максимальную хрому, которая ещё укладывается в sRGB.
     * Округляем до 3 знаков после запятой.
     */
    return parseFloat( ( c - step ).toFixed( 3 ) );
  }

  /**
   * Генерирует массив предопределённых значений светлоты (в процентах) для построения цветовых палитр.
   *
   * Использует набор дробей `fractions15`, представляющих собой соотношения, имитирующие
   * визуально равномерные шаги светлоты. Каждое значение рассчитывается как `(num / denom) * 100`
   * и округляется до двух знаков после запятой.
   *
   * Результат — массив из 15 значений, начинающийся с ~98.96% (почти белый) и заканчивающийся ~8.33% (почти чёрный).
   * Эти значения используются как основа для генерации CSS-переменных и цветовых шкал в формате OKLCH.
   *
   * ### Пример результата:
   * ```ts
   * [98.96, 97.92, 96.88, 95.84, 94.8, 93.76, 92.72, 91.68, 90.64, 89.6, 88.56, 87.52, 86.48, 85.44, 8.33]
   * ```
   *
   * Используется в:
   * - `generatePaletteForHueInternal`
   * - Генерации CSS-переменных темы
   * - Построении семантических палитр (например, `--vl-blue-5`)
   *
   * @private
   * @static
   *
   * @returns {number[]} Массив значений светлоты в процентах, от самых светлых к самым тёмным
   *
   * @example
   * const steps = OKLCHColorGenerator.generateLightnessSteps();
   * console.log(steps[0]);  // → 98.96 (самый светлый)
   * console.log(steps[14]); // → 8.33  (самый тёмный)
   *
   * @see {@link lightnessSteps15} – массив дробей, используемых для расчёта
   * @see https://bottosson.github.io/posts/oklab/ – OKLAB и визуально равномерные палитры
   */
  private static generateLightnessSteps (): number[] {
    /**
     * Для каждого элемента из this.fractions15 вычисляем процентную долю от деления num / denom,
     * умноженную на 100, и округляем до двух знаков после запятой.
     */
    return this.lightnessSteps15.map( ( [ num, denom ]: [ number, number ] ): number => {
      const value: number = ( num / denom ) * 100;
      return parseFloat( value.toFixed( 2 ) ); // Округление до двух знаков после запятой
    } );
  }

  /**
   * Генерирует массив предопределённых значений светлоты (в процентах) для использования в палитрах на основе OKLCH.
   *
   * Использует набор дробей `fraction9`, представляющих собой соотношения, имитирующие
   * визуально равномерные шаги светлоты. Каждое значение рассчитывается как `(num / denom) * 100`
   * и округляется до двух знаков после запятой.
   *
   * Результат — массив из 9 значений, начинающийся с ~98.96% (почти белый) и заканчивающийся ~8.33% (почти чёрный).
   * Эти значения используются как основа для генерации CSS-переменных и цветовых шкал, где требуется
   * меньшее количество градаций по сравнению с основной палитрой.
   *
   * ### Пример результата:
   * ```ts
   * [98.96, 97.92, 96.88, 95.84, 94.8, 93.76, 92.72, 91.68, 8.33]
   * ```
   *
   * Используется в:
   * - `generatePaletteForHueInternalByOKLCH` — генерация палитры с фиксированной насыщенностью
   * - Построении упрощённых цветовых шкал
   * - Темах, где нужна меньшая детализация светлоты
   *
   * @private
   * @static
   *
   * @returns {number[]} Массив значений светлоты в процентах, от самых светлых к самым тёмным
   *
   * @example
   * const steps = OKLCHColorGenerator.generateLightnessStepsForOklch();
   * console.log(steps[0]);  // → 98.96 (самый светлый)
   * console.log(steps[8]);  // → 8.33  (самый тёмкий)
   *
   * @see {@link lightnessSteps9} – массив дробей, используемых для расчёта
   * @see {@link generateOklchPaletteWithFixedChroma} – функция, использующая эти шаги
   * @see https://bottosson.github.io/posts/oklab/ – OKLAB и визуально равномерные палитры
   */
  private static generateLightnessStepsForOklch (): number[] {
    /**
     * Для каждого элемента из this.fraction9 вычисляем процентную долю от деления num / denom,
     * умноженную на 100, и округляем до двух знаков после запятой.
     */
    return this.lightnessSteps9.map( ( [ num, denom ]: [ number, number ] ): number => {
      const value: number = ( num / denom ) * 100;
      return parseFloat( value.toFixed( 2 ) ); // Округление до двух знаков после запятой
    } );
  }

  /**
   * Генерирует CSS-палитру в формате OKLCH для заданного цветового тона (hue).
   *
   * Создаёт набор CSS-переменных для всех уровней светлоты, где:
   * - `l` (светлота) берётся из предопределённой шкалы (`generateLightnessSteps`)
   * - `c` (хрома) вычисляется как максимально допустимая для sRGB при данном `l` и `h`
   * - `h` (тон) остаётся неизменным
   *
   * Результат — 15 градаций одного оттенка, от почти белого до почти чёрного,
   * с визуально равномерным затемнением и безопасной насыщенностью.
   *
   * ### Формат выходных данных:
   * ```css
   * --vl-oklch-blue-0: oklch(0.9896 0.004 283.65);
   * --vl-blue-0: 0.9896 0.004 283.65;
   * ```
   *
   * Используется при генерации:
   * - Семантических палитр (синяя, зелёная и т.д.)
   * - CSS-переменных темы
   * - Цветовых шкал для компонентов UI
   *
   * @private
   * @static
   *
   * @param hue - Цветовой тон в градусах [0..360], будет нормализован
   * @param name_color - Название цвета для использования в имени переменной (например, "blue")
   *
   * @returns Массив строк, представляющих собой CSS-переменные и вспомогательные комментарии
   *
   * @example
   * const palette = OKLCHColorGenerator.generateOklchPaletteForHue(275, "purple");
   * console.log(palette[0]);
   * // → '--vl-oklch-purple-0: oklch(0.9896 0.004 275);'
   *
   * @example
   * const palette = OKLCHColorGenerator.generateOklchPaletteForHue(120, "green");
   * // → Генерирует 15 уровней зелёного
   *
   * @see {@link generateLightnessSteps} – источник значений светлоты
   * @see {@link findMaxChroma} – вычисление безопасной насыщенности
   * @see https://bottosson.github.io/posts/oklab/ – OKLCH и визуально равномерные палитры
   */
  private static generateOklchPaletteForHue (
    hue: number,
    name_color: string = "empty"
  ): string[] {
    /**
     * Получаем массив процентных значений светлоты (например: [98.96, 97.92, ..., 8.33]).
     * Эти значения обеспечивают визуально равномерное затемнение.
     */
    const lightnessValues: number[] = this.generateLightnessSteps();

    /**
     * Массив для хранения готовых CSS-переменных.
     */
    const palette: string[] = [];

    /**
     * Счётчик индексов для именования переменных (от 0 до 15).
     */
    let i: number = 0;

    /**
     * Добавляем комментарий в начало группы для упрощения поиска и структурирования в CSS.
     * Формат: // colorName: hue
     */
    palette.push( `\n// ${ name_color }: ${ this.normalizeHue( hue ) }\n` );

    /**
     * Для каждого уровня светлоты:
     * 1. Вычисляем максимальную хрому с помощью `findMaxChroma`.
     * 2. Нормализуем светлоту к диапазону [0..1].
     * 3. Формируем строку CSS переменной в формате OKLCH.
     */
    for ( const L of lightnessValues ) {
      const C: number = this.findMaxChroma( L, hue );
      const N: number = L / 100; // нормализация светлоты в диапазон [0..1]

      palette.push(
        `--#{prefix.$name}oklch-${ name_color.toLowerCase() }-${ i }: oklch(${ parseFloat( N.toFixed( 4 ) ) } ${ C } ${ hue });`
      );
      palette.push(
        `--#{prefix.$name}${ name_color.toLowerCase() }-${ i }: ${ parseFloat( N.toFixed( 4 ) ) } ${ C } ${ hue };`
      );
      i++;
    }

    /**
     * Добавляем завершающий комментарий — дублируем имя группы и значение тона.
     * Это помогает при чтении CSS и автоматическом парсинге.
     */
    palette.push( `\n// ${ name_color }: ${ this.normalizeHue( hue ) } \n` );

    /**
     * Возвращаем готовую палитру.
     */
    return palette;
  }
  /**
   * Генерирует CSS-палитру в формате OKLCH для заданного тона с **фиксированной насыщенностью (хромой)**.
   *
   * В отличие от `generateOklchPaletteForHue`, где насыщенность вычисляется как максимально допустимая
   * для sRGB при каждом уровне светлоты, эта функция использует **одно и то же значение `chroma`**
   * для всех уровней.
   *
   * Это полезно для:
   * - Генерации палитр с высокой, но контролируемой насыщенностью
   * - Создания "игровых" или стилизованных тем
   * - Экспериментов с цветом, где важна единообразная насыщенность
   *
   * ⚠️ **Внимание**: Использование слишком высокой `chroma` может привести к цветам вне sRGB.
   * Эта функция **не проверяет выход за гамму** — ответственность на вызывающей стороне.
   *
   * @private
   * @static
   *
   * @param hue - Цветовой тон в градусах [0..360], будет нормализован
   * @param chroma - Фиксированная насыщенность (хрома), например 0.15, 0.3
   * @param name_color - Название цвета для использования в имени переменной (например, "purple")
   *
   * @returns Массив строк, представляющих собой CSS-переменные в формате:
   * - `--vl-oklch-purple-0: oklch(0.9896 0.15 275);`
   * - `--vl-purple-0: 0.9896 0.15 275;`
   *
   * @example
   * const palette = OKLCHColorGenerator.generateOklchPaletteWithFixedChroma(275, 0.15, "purple");
   * console.log(palette[0]);
   * // → '--vl-oklch-purple-0: oklch(0.9896 0.15 275);'
   *
   * @example
   * const palette = OKLCHColorGenerator.generateOklchPaletteWithFixedChroma(120, 0.2, "green");
   * // → Генерирует 9 уровней зелёного с одинаковой насыщенностью
   *
   * @see {@link generateLightnessStepsForOklch} – источник значений светлоты
   * @see {@link generateOklchPaletteForHue} – версия с динамической насыщенностью
   * @see https://bottosson.github.io/posts/oklab/ – OKLCH и визуально равномерные палитры
   */
  private static generateOklchPaletteWithFixedChroma (
    hue: number,
    chroma: number,
    name_color: string = "empty"
  ): string[] {
    /**
     * Получаем массив процентных значений светлоты (например: [98.96, 97.92, ..., 8.33]).
     * Используется сокращённая шкала из 9 уровней.
     */
    const lightnessValues: number[] = this.generateLightnessStepsForOklch();

    /**
     * Массив для хранения готовых CSS-переменных.
     */
    const palette: string[] = [];

    /**
     * Счётчик индексов для именования переменных (от 0 до 8).
     */
    let i: number = 0;

    /**
     * Добавляем комментарий в начало группы для упрощения поиска и структурирования в CSS.
     */
    palette.push( `\n// ${ name_color }: ${ this.normalizeHue( hue ) }\n` );

    /**
     * Для каждого уровня светлоты:
     * 1. Нормализуем светлоту к диапазону [0..1].
     * 2. Используем переданную фиксированную насыщенность (chroma).
     * 3. Формируем строку CSS переменной в формате OKLCH.
     */
    for ( const L of lightnessValues ) {
      const normalizedLightness: number = L / 100; // нормализация [0..100] → [0..1]

      palette.push(
        `--#{prefix.$name}oklch-${ name_color.toLowerCase() }-${ i }: oklch(${ parseFloat( normalizedLightness.toFixed( 4 ) ) } ${ chroma } ${ hue });`
      );
      palette.push(
        `--#{prefix.$name}${ name_color.toLowerCase() }-${ i }: ${ parseFloat( normalizedLightness.toFixed( 4 ) ) } ${ chroma } ${ hue };`
      );
      i++;
    }

    /**
     * Добавляем завершающий комментарий — дублируем имя группы и значение тона.
     * Это помогает при чтении CSS и автоматическом парсинге.
     */
    palette.push( `\n// ${ name_color }: ${ this.normalizeHue( hue ) } \n` );

    /**
     * Возвращаем готовую палитру.
     */
    return palette;
  }

  /**
   * Генерирует CSS-палитру в формате OKLCH на основе входного цвета.
   *
   * Эта функция — **центральный механизм генерации цветовых палитр** в `Vela Spectrum`.
   * Она принимает цвет в любом формате и создает семантически насыщенную палитру из 15 градаций,
   * где:
   * - Светлота (`l`) берётся из предопределённой шкалы
   * - Насыщенность (`c`) вычисляется как максимально допустимая для sRGB при каждом уровне
   * - Тон (`h`) остаётся неизменным
   *
   * Поддерживаемые форматы входных данных:
   * - **HEX строка** (например, `'#5551ff'`)
   * - **Число в формате 0xRRGGBB** (например, `0x5551ff`)
   * - **Имя цвета** (например, `'blues'`, `'reds'`, `'frostWhite'`) — ищется в `colors_map`
   * - **Число от 0 до 360** — интерпретируется как **цветовой тон (hue)**, без привязки к конкретному цвету
   *
   * ### Результат:
   * Массив строк в формате:
   * ```css
   * --vl-oklch-blue-0: oklch(0.9896 0.004 275);
   * --vl-blue-0: 0.9896 0.004 275;
   * ```
   *
   * Используется при:
   * - Генерации CSS-переменных темы
   * - Создании семантических палитр (синяя, зелёная и т.д.)
   * - Динамическом построении цветовых шкал
   *
   * @public
   * @static
   *
   * @param colorInput - Входной цвет. Может быть:
   * - Строкой: HEX (`#RRGGBB`) или имя цвета
   * - Числом: RGB (`0xRRGGBB`) или тон (`0..360`)
   * @param name_color - Название группы/цвета для использования в имени переменной (например, `"blue"`)
   *
   * @returns Массив строк, содержащий:
   * - Комментарий с исходным цветом в формате OKLCH
   * - Специальные маркеры (colorInput)
   * - Список CSS-переменных
   * Если цвет не найден — возвращает пустой массив.
   *
   * @example
   * const palette = OKLCHColorGenerator.generateOklchPaletteFromColor('#5551ff', 'indigo');
   * console.log(palette[0]);
   * // → '// Исходный цвет: oklch(0.65 0.22 275) rgb {"r":85,"g":81,"b":255}'
   *
   * @example
   * const palette = OKLCHColorGenerator.generateOklchPaletteFromColor('greens', 'mint');
   * // → Генерирует палитру на основе цвета 'greens'
   *
   * @example
   * const palette = OKLCHColorGenerator.generateOklchPaletteFromColor(275, 'purple');
   * // → Генерирует палитру только по тону 275°
   *
   * @see {@link findColor} – поиск цвета по имени, HEX или ID
   * @see {@link rgbToOklch} – конвертация RGB → OKLCH
   * @see {@link generateOklchPaletteForHue} – генерация палитры по тону
   * @see https://bottosson.github.io/posts/oklab/ – Официальное описание OKLCH
   */
  public static generateOklchPaletteFromColor (
    colorInput: string | number,
    name_color: string = "empty"
  ): string[] {
    let hue: number | null = null;
    let rgb: RGB | null = null;

    // Если передано число от 0 до 360 — это трактуется как отдельный тон (hue)
    if ( typeof colorInput === 'number' && colorInput >= 0 && colorInput <= 360 ) {
      return this.generateOklchPaletteForHue( colorInput, name_color );
    }

    // Если передано число — предполагаем, что это цвет в формате 0xRRGGBB
    if ( typeof colorInput === 'number' ) {
      rgb = {
        r: ( ( colorInput >> 16 ) & 255 ) / 255,
        g: ( ( colorInput >> 8 ) & 255 ) / 255,
        b: ( colorInput & 255 ) / 255
      };
    }

    // Если передана строка — пробуем найти цвет в справочнике
    else if ( typeof colorInput === 'string' ) {
      const color: ColorEntry | null = this.findColor( colorInput );
      if ( color ) {
        name_color = color.name || name_color || colorInput;
        rgb = color.rgb || null;
      }
    }

    // Если не удалось получить корректное RGB — выводим предупреждение и возвращаем пустой массив
    if ( !rgb ) {
      console.warn( `Невозможно создать палитру для "${ colorInput }". Цвет не найден.` );
      return [];
    }

    // Преобразуем RGB в OKLCH
    const oklch: LCH = this.rgbToOklch( { r: rgb.r, g: rgb.g, b: rgb.b } as RGBColor );

    // Округляем тон (hue) до одного знака после запятой
    hue = NumberAdjuster.adjustWithPrecision( 'round', oklch.h, -1 );

    // Генерируем палитру на основе полученного тона
    const paletteArray = this.generateOklchPaletteForHue( hue, name_color );

    // Подготавливаем RGB в диапазоне [0..255] для отображения
    const rgb255 = {
      r: Math.round( rgb.r * 255 ),
      g: Math.round( rgb.g * 255 ),
      b: Math.round( rgb.b * 255 )
    };

    // Возвращаем финальный массив строк
    return [
      `// Исходный цвет: oklch(${ parseFloat( oklch.l.toFixed( 3 ) ) } ${ oklch.c.toFixed( 3 ) } ${ hue }) rgb ${ JSON.stringify( rgb255 ) }`,
      `\n/**${ colorInput }*/\n`,
      ...paletteArray,
      `\n/**${ colorInput }*/\n`
    ];
  }
  /**
   * Генерирует CSS-палитру в формате OKLCH на основе входного цвета с **фиксированной насыщенностью (chroma)**.
   *
   * В отличие от `generateOklchPaletteFromColor`, где насыщенность вычисляется как максимально допустимая
   * для sRGB при каждом уровне светлоты, эта функция использует **одно и то же значение `c`**,
   * взятое из исходного цвета, для всех уровней палитры.
   *
   * Это создаёт **стилизованную, насыщенную палитру**, где цвет сохраняет свою интенсивность
   * даже в тёмных и светлых тонах. Подходит для:
   * - Акцентных цветов
   * - Тем, где важна визуальная насыщенность
   * - Экспериментов с цветом
   *
   * ⚠️ **Внимание**: Использование слишком высокой `chroma` может привести к цветам вне sRGB.
   * Эта функция **не проверяет выход за гамму** — ответственность на вызывающей стороне.
   *
   * Поддерживаемые форматы входных данных:
   * - **HEX строка** (например, `'#5551ff'`)
   * - **Число в формате 0xRRGGBB** (например, `0x5551ff`)
   * - **Имя цвета** (например, `'blues'`, `'reds'`)
   *
   * ### Результат:
   * Массив строк в формате:
   * ```css
   * --vl-oklch-blue-0: oklch(0.9896 0.22 275);
   * --vl-blue-0: 0.9896 0.22 275;
   * ```
   *
   * Используется при:
   * - Генерации акцентных палитр
   * - Создании тем с высокой насыщенностью
   * - Экспериментальных темах
   *
   * @public
   * @static
   *
   * @param colorInput - Входной цвет. Может быть:
   * - Строкой: HEX (`#RRGGBB`) или имя цвета
   * - Числом: RGB (`0xRRGGBB`)
   * @param name_color - Название группы/цвета для использования в имени переменной (например, `"blue"`)
   *
   * @returns Массив строк, содержащий:
   * - Комментарий с исходным цветом в формате OKLCH
   * - Специальные маркеры colorInput
   * - Список CSS-переменных
   * Если цвет не найден — возвращает пустой массив.
   *
   * @example
   * const palette = OKLCHColorGenerator.generateOklchPaletteFromColorWithFixedChroma('#5551ff', 'indigo');
   * console.log(palette[0]);
   * // → '// Исходный цвет: oklch(0.65 0.22 275) rgb {"r":0.333,"g":0.318,"b":1}'
   *
   * @example
   * const palette = OKLCHColorGenerator.generateOklchPaletteFromColorWithFixedChroma('greens', 'mint');
   * // → Генерирует палитру с фиксированной насыщенностью на основе цвета 'greens'
   *
   * @see {@link findColor} – поиск цвета по имени, HEX или ID
   * @see {@link rgbToOklch} – конвертация RGB → OKLCH
   * @see {@link generateOklchPaletteWithFixedChroma} – генерация палитры с фиксированной хромой
   * @see https://bottosson.github.io/posts/oklab/ – Официальное описание OKLCH
   */
  public static generateOklchPaletteFromColorWithFixedChroma (
    colorInput: string | number,
    name_color: string = "empty"
  ): string[] {
    let hue: number | null = null;
    let rgb: RGB | null = null;

    // Если передано число — предполагаем, что это цвет в формате 0xRRGGBB
    if ( typeof colorInput === 'number' ) {
      rgb = {
        r: ( ( colorInput >> 16 ) & 255 ) / 255,
        g: ( ( colorInput >> 8 ) & 255 ) / 255,
        b: ( colorInput & 255 ) / 255
      };
    }

    // Если передана строка — пробуем найти цвет в справочнике
    else if ( typeof colorInput === 'string' ) {
      const color: ColorEntry | null = this.findColor( colorInput );
      if ( color ) {
        name_color = color.name || name_color || colorInput;
        rgb = color.rgb || null;
      }
    }

    // Если не удалось получить корректное RGB — выводим предупреждение и возвращаем пустой массив
    if ( !rgb ) {
      console.warn( `Невозможно создать палитру для "${ colorInput }". Цвет не найден.` );
      return [];
    }

    // Преобразуем RGB в OKLCH
    const oklch: LCH = this.rgbToOklch( { r: rgb.r, g: rgb.g, b: rgb.b } as RGBColor );

    // Округляем тон (hue) до одного знака после запятой
    hue = NumberAdjuster.adjustWithPrecision( 'round', oklch.h, -1 );

    // Генерируем палитру с фиксированной насыщенностью
    const paletteArray = this.generateOklchPaletteWithFixedChroma( hue, oklch.c, name_color );

    // Подготавливаем RGB в диапазоне [0..255] для отображения
    const rgb255 = {
      r: Math.round( rgb.r * 255 ),
      g: Math.round( rgb.g * 255 ),
      b: Math.round( rgb.b * 255 )
    };

    // Возвращаем финальный массив строк
    return [
      `// Исходный цвет: oklch(${ parseFloat( oklch.l.toFixed( 3 ) ) } ${ oklch.c.toFixed( 3 ) } ${ hue }) rgb ${ JSON.stringify( rgb255 ) }`,
      `\n/**${ colorInput }*/\n`,
      ...paletteArray,
      `\n/**${ colorInput }*/\n`
    ];
  }
}

export default OKLCHColorGenerator;