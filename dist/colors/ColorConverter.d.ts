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
    description?: string;
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
/**
 * Класс для генерации и преобразования цветов в цветовом пространстве OKLCH.
 * Поддерживает преобразование между RGB, XYZ, Lab, LCH, Oklab, OKLCH,
 * а также генерацию CSS-палитр на основе заданных цветов.
 *
 * @class OKLCHColorGenerator
 */
declare class OKLCHColorGenerator {
    /**
 * Статическая карта цветов, загруженная из JSON-файла.
 * Содержит все доступные цвета по имени, ID и HEX-коду.
 *
 * @private
 * @static
 * @readonly
 * @type {NamedColors}
 */
    private static readonly colors_map;
    /**
     * Массив дробей, используемых для генерации значений светлоты (15 уровней).
     * Каждая дробь (num/denom) преобразуется в процентное значение светлоты.
     *
     * @private
     * @static
     * @readonly
     * @type {[number, number][]}
     */
    private static readonly fractions15;
    /**
     * Массив дробей, используемых для генерации значений светлоты (9 уровней).
     * Используется в альтернативной генерации палитры.
     *
     * @private
     * @static
     * @readonly
     * @type {[number, number][]}
     */
    private static readonly fraction9;
    /**
     * Базовые значения XYZ для белой точки D50.
     * Используются при преобразовании XYZ → Lab.
     *
     * @private
     * @static
     * @readonly
     * @type {{ X: number, Y: number, Z: number }}
     */
    private static readonly j;
    /**
     * Константа, используемая в преобразовании XYZ → Lab.
     * Вычисляется как (29/3)^3.
     *
     * @private
     * @static
     * @readonly
     * @type {number}
     */
    private static readonly Jn;
    /**
 * Константа, используемая в преобразовании XYZ → Lab.
 * Вычисляется как (6/29)^3.
 *
 * @private
 * @static
 * @readonly
 * @type {number}
 */
    private static readonly jn;
    /**
      * Вспомогательная функция преобразования компоненты XYZ в нелинейную Lab-координату.
      * Применяет кубический корень для больших значений и линейное преобразование для малых.
      *
      * @private
      * @static
      * @param {number} e - Значение канала XYZ
      * @returns {number} Преобразованное значение в Lab-пространстве
      */
    private static ut;
    /**
    * Преобразование XYZ в CIELAB.
    * Используется для перехода от XYZ к цветовому пространству Lab.
    *
    * @public
    * @static
    * @param {{ x?: number, y?: number, z?: number, alpha?: number }} param0 - Координаты XYZ и альфа-канал
    * @returns {LabColor} Цвет в формате LabColor
    */
    static nr({ x: e, y: t, z: n, alpha: r, }: {
        x?: number;
        y?: number;
        z?: number;
        alpha?: number;
    }): LabColor;
    /**
       * Гамма-коррекция для RGB (sRGB).
       * Преобразует нелинейные значения sRGB в линейное пространство.
       *
       * @private
       * @static
       * @param {number} e - Значение канала RGB (0–255)
       * @returns {number} Линейное значение в диапазоне [0, 1]
       */
    private static at;
    /**
      * Преобразование RGB в линейное RGB (lrgb).
      * Применяет гамма-коррекцию ко всем каналам.
      *
      * @private
      * @static
      * @param {LRGBColor} param0 - Цвет в формате RGB
      * @returns {LRGBColor} Цвет в линейном RGB-пространстве
      */
    private static xe;
    /**
      * Нормализация угла hue в диапазоне [0, 360).
      * Обеспечивает корректный циклический диапазон тона.
      *
      * @private
      * @static
      * @param {number} e - Угол в градусах (может быть любым числом)
      * @returns {number} Нормализованный угол в диапазоне [0, 360)
      */
    private static RangeHue;
    /**
      * Преобразование CIELAB в CIELCH.
      * Переводит декартовы координаты (a, b) в полярные (c, h).
      *
      * @public
      * @static
      * @param {{ l: number, a?: number, b?: number, alpha?: number }} param0 - Цвет в формате Lab
      * @param {string} mode - Целевой режим (по умолчанию "lch")
      * @returns {LCHColor} Цвет в формате LCH
      */
    static cieLabToCieLch({ l: e, a: t, b: n, alpha: r }: {
        l: number;
        a?: number;
        b?: number;
        alpha?: number;
    }, mode?: string): LCHColor;
    /**
     * Преобразует линейное RGB в цветовое пространство Oklab.
     * Oklab — это perceptual равномерное цветовое пространство.
     *
     * @public
     * @static
     * @param {LinearRGB} param0 - Цвет в линейном RGB
     * @returns {OklabColor} Цвет в формате Oklab
     */
    static rgbLinertoOklab({ r: e, g: t, b: n, alpha: r, }: LinearRGB): OklabColor;
    /**
       * Преобразует цвет из RGB в OKLCH через Linear RGB и Oklab.
       * Полный конвейер: RGB → Linear RGB → Oklab → OKLCH.
       *
       * @public
       * @static
       * @param {RGBColor} rgb - Цвет в формате RGB
       * @returns {{ l: number; c: number; h: number; alpha: number; }} Цвет в формате OKLCH
       */
    static rgbToOKLCH(rgb: RGBColor): {
        l: number;
        c: number;
        h: number;
        alpha: number;
    };
    /**
 * Конвертирует цвет из OKLCH в формат HEX (#RRGGBBAA).
 *
 * @public
 * @static
 * @param {number} l - Lightness (в диапазоне [0..1])
 * @param {number} c - Chroma (насыщенность)
 * @param {number} h - Hue (тон в градусах)
 * @param {number} alpha - Альфа-канал (0..1), по умолчанию 1
 * @returns {string} HEX-строка, например: #ffc700 или #ffc700cc
 */
    static oklchToHex(l: number, c: number, h: number, alpha?: number): string;
    /**
    * Преобразует цвет из OKLCH в RGB.
    * Обратный процесс к rgbToOKLCH: OKLCH → OKLAB → Linear RGB → sRGB.
    *
    * @public
    * @static
    * @param {{ l: number; c: number; h: number }} oklch - Цвет в формате OKLCH
    * @returns {{ r: number; g: number; b: number }} Цвет в формате RGB [0..255]
    */
    static oklchToRgb(oklch: {
        l: number;
        c: number;
        h: number;
    }): {
        r: number;
        g: number;
        b: number;
    };
    /**
   * Преобразует цвет из OKLAB в LMS (Long-Medium-Short).
   * LMS — модель, имитирующая работу колбочек глаза.
   *
   * @private
   * @static
   * @param {number} l - Компонента L (светлота)
   * @param {number} a - Компонента a (красный/зелёный)
   * @param {number} b - Компонента b (жёлтый/синий)
   * @returns {{ l: number; m: number; s: number }} Цвет в формате LMS
   */
    private static oklabToLMS;
    /**
 * Преобразует цвет из LMS в линейное RGB.
 * Используется обратная матрица преобразования.
 *
 * @private
 * @static
 * @param {number} l - Компонента L
 * @param {number} m - Компонента M
 * @param {number} s - Компонента S
 * @returns {[number, number, number]} Массив [r, g, b] в линейном RGB
 */
    private static lmsToLinearRGB;
    /**
     * Преобразует цвет из RGB в P3 (Display P3).
     * Используется для расширенного цветового охвата.
     *
     * @public
     * @static
     * @param {RGBColor} rgb - Цвет в формате RGB
     * @returns {{ r: number; g: number; b: number; alpha: number }} Цвет в P3-пространстве
     */
    static rgbToP3(rgb: RGBColor): {
        r: number;
        g: number;
        b: number;
        alpha: number;
    };
    /**
     * Ищет и возвращает цвет из справочника по ID, имени или HEX-значению.
     *
     * Поддерживает несколько способов поиска:
     * - По числовому `id` цвета
     * - По ключу (например, "blue")
     * - По полному совпадению имени цвета
     * - По полному совпадению HEX-кода
     *
     * @public
     * @static
     * @param {string | number} input - Входное значение для поиска
     * @returns {ColorEntry | null} Найденный цвет или null, если не найден
     */
    static getColorRgb(input: string | number): ColorEntry | null;
    /**
     * Преобразует цвет из RGB в XYZ.
     * Используется матрица преобразования sRGB → XYZ.
     *
     * @public
     * @static
     * @param {number} r - Красный канал (0–255)
     * @param {number} g - Зелёный канал (0–255)
     * @param {number} b - Синий канал (0–255)
     * @returns {[number, number, number]} Координаты [X, Y, Z]
     */
    static rgbToXYZ(r: number, g: number, b: number): [number, number, number];
    /**
     * Преобразует цвет из пространства LMS (Long-Medium-Short) в OKLAB.
     * Переводит декартовы координаты в полярные.
     *
     * LMS — это модель, имитирующая реакцию колбочек глаза на свет.
     * OKLAB — это perceptual равномерное цветовое пространство,
     * где одинаковые изменения в значениях соответствуют одинаковым воспринимаемым изменениям цвета.
     *
     * @param l - Компонента Long (L), чувствительность к длинным волнам (красный).
     * @param m - Компонента Medium (M), чувствительность к средним волнам (зелёный).
     * @param s - Компонента Short (S), чувствительность к коротким волнам (синий).
     * @returns Объект в формате OKLAB: { l: number; a: number; b: number }
     * Hf,jnftn yj yt
     */
    private static xyzToOklab;
    /**
     * Преобразует цвет из формата OKLAB в формат OKLCH.
     *
     * Используется при преобразовании sRGB → линейное RGB.
     *
     * OKLAB — это декартово представление цвета (l, a, b),
     * OKLCH — полярное представление (l, c, h), где:
     * - l — светлота,
     * - c — насыщенность (хрома),
     * - h — тон (в градусах).
     *
     * @param lab - Объект в формате OKLAB: { l: number, a: number, b: number }
     * @returns Объект в формате OKLCH: { l: number, c: number, h: number }
     */
    static oklabToOklch(lab: LAB): LCH;
    /**
  * Преобразует гамма-скорректированное значение в линейное.
  * Используется при преобразовании sRGB → линейное RGB.
  *
  * @private
  * @static
  * @param {number} n - Значение в диапазоне [0, 1]
  * @returns {number} Линейное значение
  */
    private static gammaToLinear;
    /**
 * Преобразует RGB-канал в линейное пространство.
 * Применяет гамма-коррекцию.
 *
 * @private
 * @static
 * @param {number} c - Значение канала (0–255)
 * @returns {number} Линейное значение в диапазоне [0, 1]
 */
    private static toLiner;
    /**
      * Нормализует RGB-компоненты в диапазон [0, 1].
      * Также ограничивает значения, чтобы избежать ошибок.
      *
      * @private
      * @static
      * @param {RGB} rgb - Цвет в формате RGB
      * @returns {RGB} Нормализованный цвет
      */
    private static normalizeRgb;
    /**
   * Преобразует цвет из RGB в OKLCH.
   * Используется альтернативный путь: RGB → XYZ → OKLAB → OKLCH.
   *
   * @public
   * @static
   * @param {RGB} rgb - Цвет в формате RGB
   * @returns {LCH} Цвет в формате OKLCH
   */
    static rgbToOklch2(rgb: RGB): LCH;
    /**
      * Нормализует значение тона (hue) к диапазону [0..360].
      * Приводит любое число к эквивалентному углу в цветовом круге.
      *
      * @private
      * @static
      * @param {number} h - Тон в градусах
      * @returns {number} Нормализованный тон в диапазоне [0, 360]
      */
    private static normalizeHue;
    /**
  * Преобразует цвет из формата OKLCH в формат OKLAB.
  * Обратный процесс к oklabToOklch.
  *
  * @private
  * @static
  * @param {{ l: number; c: number; h: number }} oklch - Цвет в формате OKLCH
  * @returns {{ l: number; a: number; b: number }} Цвет в формате OKLAB
  */
    private static oklchToOklab;
    /**
 * Преобразует цвет из OKLAB в линейное RGB.
 * Используется при проверке принадлежности цвета к sRGB.
 *
 * @private
 * @static
 * @param {LAB} param0 - Цвет в формате OKLAB
 * @returns {RGB} Цвет в линейном RGB
 */
    private static oklabToLinearRgb;
    /**
    * Проверяет, находится ли цвет в пределах sRGB-гаммы.
    * Цвет должен иметь все компоненты в диапазоне [0, 1].
    *
    * @private
    * @static
    * @param {RGB} rgb - Цвет в формате RGB
    * @returns {boolean} true, если цвет в sRGB, иначе false
    */
    private static isInSrgb;
    /**
     * Находит максимально допустимую хрому (насыщенность) для заданной светлоты и тона,
     * при которой цвет остаётся в пределах sRGB.
     *
     * @private
     * @static
     * @param {number} lightness - Светлота в процентах (0–100)
     * @param {number} hue - Тон в градусах (0–360)
     * @param {number} step - Шаг поиска (по умолчанию 0.001)
     * @param {number} maxChroma - Максимальная хрому для проверки (по умолчанию 0.4)
     * @returns {number} Максимальная допустимая хрому, округлённая до 3 знаков
     */
    private static findMaxChroma;
    /**
    * Генерирует массив значений светлоты на основе дробей из fractions15.
    * Каждое значение = (num/denom)*100, округлённое до 2 знаков.
    *
    * @private
    * @static
    * @returns {number[]} Массив значений светлоты в процентах
    */
    private static generateLightnessValues;
    /**
 * Генерирует массив значений светлоты на основе дробей из fraction9.
 * Используется в альтернативной палитре.
 *
 * @private
 * @static
 * @returns {number[]} Массив значений светлоты в процентах
 */
    private static generateLightnessValuesByOklch;
    /**
  * Генерирует CSS-палитру в формате OKLCH для заданного тона.
  * Создаёт переменные для всех уровней светлоты.
  *
  * @private
  * @static
  * @param {number} hue - Цветовой тон (0–360)
  * @param {string} name_color - Название цвета для имён переменных
  * @returns {string[]} Массив строк с CSS-переменными
  */
    private static generatePaletteForHueInternal;
    /**
 * Генерирует CSS-палитру с фиксированной насыщенностью.
 * Аналогична предыдущей, но с заданной хромой.
 *
 * @private
 * @static
 * @param {number} hue - Тон
 * @param {number} chroma - Фиксированная насыщенность
 * @param {string} name_color - Название цвета
 * @returns {string[]} Массив строк с CSS-переменными
 */
    private static generatePaletteForHueInternalByOKLCH;
    /**
 * Генерирует CSS-палитру на основе входного цвета.
 * Цвет может быть в формате HEX, имени, ID или числе.
 *
 * @public
 * @static
 * @param {string | number} colorInput - Входной цвет
 * @param {string} name_color - Название группы
 * @returns {string[]} Массив CSS-переменных
 */
    static generatePaletteFromColor(colorInput: string | number, name_color?: string): string[];
    /**
     * Генерирует CSS-палитру с фиксированной насыщенностью на основе входного цвета.
     *
     * @public
     * @static
     * @param {string | number} colorInput - Входной цвет
     * @param {string} name_color - Название группы
     * @returns {string[]} Массив CSS-переменных
     */
    static generatePaletteFromColorByOKLCH(colorInput: string | number, name_color?: string): string[];
}
export default OKLCHColorGenerator;
//# sourceMappingURL=ColorConverter.d.ts.map