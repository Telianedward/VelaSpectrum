interface RGB {
    r: number;
    g: number;
    b: number;
}
interface LAB {
    l: number;
    a: number;
    b: number;
}
interface LCH {
    l: number;
    c: number;
    h: number;
}
interface ColorEntry {
    id: number;
    name: string;
    hex: string;
    rgb: RGB;
}
interface LabColor {
    mode: string;
    l: number;
    a: number;
    b: number;
    alpha?: number;
}
interface RGBColor {
    mode: 'rgb';
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
declare class OKLCHColorGenerator {
    private static readonly colors_map;
    private static readonly fractions15;
    private static readonly fraction9;
    /**
     * Базовые значения XYZ для белого цвета (D50).
     */
    private static readonly j;
    /**
     * Константы для преобразования XYZ -> Lab.
     */
    private static readonly Jn;
    private static readonly jn;
    /**
     * Вспомогательная функция преобразования компоненты XYZ в нелинейную Lab-координату.
     * @param e - значение для преобразования.
     * @returns Преобразованное значение.
     */
    private static ut;
    /**
     * Преобразование XYZ в CIELAB.
     * @param param0 - Объект с координатами x, y, z и опционально alpha.
     * @returns Объект в цветовом пространстве CIELAB.
     */
    static nr({ x: e, y: t, z: n, alpha: r, }: {
        x?: number;
        y?: number;
        z?: number;
        alpha?: number;
    }): LabColor;
    /**
     * Гамма-коррекция для RGB (sRGB).
     * @param e - Значение канала RGB.
     * @returns Линейное значение.
     */
    private static at;
    /**
     * Преобразование RGB в линейное RGB (lrgb).
     * @param param0 - Объект с каналами r, g, b и опционально alpha.
     * @returns Объект в цветовом пространстве lrgb.
     */
    private static xe;
    /**
     * Нормализация угла hue в диапазоне [0, 360).
     * @param e - Угол в градусах.
     * @returns Нормализованный угол.
     */
    private static RangeHue;
    /**
     * Преобразование CIELAB в CIELCH.
     * @param param0 - Объект с компонентами l, a, b и опционально alpha.
     * @param mode - Целевой режим (по умолчанию "lch").
     * @returns Объект в цветовом пространстве CIELCH.
     */
    static cieLabToCieLch({ l: e, a: t, b: n, alpha: r }: {
        l: number;
        a?: number;
        b?: number;
        alpha?: number;
    }, mode?: string): LCHColor;
    /**
     * Преобразует линейное RGB в цветовое пространство Oklab.
     *
     * @param param0 - Объект с компонентами r, g, b и опционально alpha.
     * @returns Объект в цветовом пространстве Oklab.
     */
    static rgbLinertoOklab({ r: e, g: t, b: n, alpha: r, }: LinearRGB): OklabColor;
    /**
     * Преобразует цвет из RGB в OKLCH через Linear RGB и Oklab.
     *
     * @param rgb - Цвет в формате RGB.
     * @returns Цвет в формате OKLCH.
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
     * @param l - Lightness (в диапазоне [0..1])
     * @param c - Chroma (насыщенность)
     * @param h - Hue (тон в градусах)
     * @param alpha - Альфа-канал (0..1), по умолчанию 1
     * @returns HEX-строка, например: #ffc700 или #ffc700cc
     */
    static oklchToHex(l: number, c: number, h: number, alpha?: number): string;
    /**
     * Преобразует цвет из OKLCH в RGB.
     *
     * Процесс обратный к rgbToOKLCH:
     * 1. OKLCH → OKLAB (декартово)
     * 2. OKLAB → Linear RGB
     * 3. Linear RGB → Gamma-corrected RGB [0..255]
     *
     * @param oklch - Объект с компонентами l (0..1), c, h (0..360)
     * @returns Объект { r, g, b } в диапазоне [0..255]
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
    private static oklabToLMS;
    private static lmsToLinearRGB;
    static rgbToP3(rgb: RGBColor): {
        r: number;
        g: number;
        b: number;
        alpha: number;
    };
    /**
     * Ищет и возвращает цвет из справочника по ID, имени или HEX-значению.
     *
     * Метод поддерживает несколько способов поиска:
     * - По числовому `id` цвета
     * - По ключу (например, "blue", если такой ключ есть в словаре)
     * - По полному совпадению имени цвета
     * - По полному совпадению HEX-кода
     *
     * В случае успешного поиска возвращается копия объекта цвета.
     *
     * @param input - Входное значение для поиска. Может быть:
     *                - Числом (ID цвета),
     *                - Строкой (имя цвета, HEX-код, ключ в словаре).
     * @returns Найденный цвет в виде объекта `ColorEntry`, либо `null`, если цвет не найден.
     */
    static getColorRgb(input: string | number): ColorEntry | null;
    static rgbToXYZ(r: number, g: number, b: number): [number, number, number];
    /**
     * Преобразует цвет из пространства LMS (Long-Medium-Short) в OKLAB.
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
    private static gammaToLinear;
    private static toLiner;
    private static normalizeRgb;
    /**
     * Преобразует цвет из формата RGB в формат OKLCH.
     *
     * Процесс преобразования состоит из трёх этапов:
     * 1. Переводим RGB → LMS (Long-Middle-Short — значения колбочек глаза)
     * 2. Переводим LMS → OKLAB (декартова цветовая модель)
     * 3. Переводим OKLAB → OKLCH (полярное представление: светлота, хрома, тон)
     *
     * @param rgb - Объект с нормализованными компонентами RGB в диапазоне [0..1]
     * @returns Объект в формате OKLCH: { l: number, c: number, h: number }
     */
    static rgbToOklch2(rgb: RGB): LCH;
    /**
     * Нормализует значение тона (hue) к диапазону [0..360].
     *
     * Принимает любое число (включая отрицательные и больше 360),
     * и возвращает угол в градусах, соответствующий тому же цветовому тону,
     * но в пределах стандартного круга HSL/OKLCH (от 0 до 360 градусов).
     *
     * @param h - Исходное значение тона (в градусах, может быть любым числом).
     * @returns Значение тона в диапазоне [0..360].
     */
    private static normalizeHue;
    /**
     * Преобразует цвет из формата OKLCH в формат OKLAB.
     *
     * OKLCH — это полярное представление цвета (светлота, насыщенность, тон),
     * OKLAB — декартово представление (светлота, a, b), где:
     * - a отвечает за ось красный/зелёный,
     * - b отвечает за ось жёлтый/синий.
     *
     * @param l - Светлота в диапазоне [0..1].
     * @param c - Хрома (насыщенность), обычно в диапазоне [0..1+].
     * @param h - Тон в градусах [0..360].
     * @returns Объект в формате OKLAB: { l, a, b }.
     */
    private static oklchToOklab;
    /**
     * Преобразует цвет из цветового пространства OKLAB в линейное RGB.
     *
     * Используется при генерации палитры для проверки, находится ли цвет в пределах sRGB.
     * Все коэффициенты взяты из спецификации OKLAB и не изменены.
     *
     * @param l - Светлота (l) в диапазоне [0..1].
     * @param a - Цветовой компонент a (красный/зелёный).
     * @param b - Цветовой компонент b (жёлтый/синий).
     * @returns Объект с нормализованными значениями RGB в диапазоне [0..1].
     */
    private static oklabToLinearRgb;
    /**
     * Проверяет, находится ли цвет в пределах sRGB-гаммы.
     *
     * Цвет считается корректным, если все компоненты RGB лежат в диапазоне [0..1].
     * Используется для ограничения насыщенности (chroma) при генерации палитры в формате OKLCH.
     *
     * @param rgb - Объект с компонентами `r`, `g`, `b`, нормализованными к диапазону [0..1].
     * @returns `true`, если цвет находится в sRGB. Иначе — `false`.
     */
    private static isInSrgb;
    /**
     * Находит максимально допустимую хрому (насыщенность цвета) для заданной светлоты и тона,
     * при которой цвет остаётся в пределах sRGB.
     *
     * Метод пошагово увеличивает хрому до тех пор, пока соответствующий RGB-цвет не выйдет за границы sRGB.
     * Используется для генерации палитры в формате OKLCH.
     *
     * @param lightness - Светлота в процентах (например: 98.96).
     * @param hue - Цветовой тон в градусах (0–360).
     * @param step - Шаг увеличения хромы (по умолчанию 0.001).
     * @param maxChroma - Максимальное значение хромы для проверки (по умолчанию 0.4).
     * @returns Максимальная допустимая хрому, округлённая до трёх знаков после запятой.
     */
    private static findMaxChroma;
    /**
     * Генерирует массив значений светлоты (lightness) на основе заранее заданных дробных соотношений.
     *
     * Каждое значение рассчитывается как (num / denom) * 100 и округляется до двух знаков после запятой.
     * Используется для построения палитры цветов в формате OKLCH.
     *
     * @returns Массив чисел, представляющих собой значения светлоты в процентах:
     *          Например: [98.96, 97.92, ..., 8.33]
     */
    private static generateLightnessValues;
    private static generateLightnessValuesByOklch;
    /**
     * Генерирует CSS-палитру в формате OKLCH для заданного тона (hue).
     *
     * На основе предопределённых значений светлоты (`lightness`) вычисляются максимально допустимые
     * значения хромы (`chroma`) для каждого уровня. Тон (`hue`) остаётся неизменным.
     *
     * @param hue - Цветовой тон в градусах (0–360), определяющий оттенок палитры.
     * @param name_color - Название цвета или группы для использования в имени CSS переменной.
     * @returns Массив строк, представляющих собой CSS переменные в формате:
     *          '--vl-oklch-blue-0 : oklch(0.9896 0.004 283.65);'
     */
    private static generatePaletteForHueInternal;
    private static generatePaletteForHueInternalByOKLCH;
    /**
     * Генерирует CSS-палитру на основе входного цвета (HEX, RGB число или имя цвета).
     *
     * @param colorInput - Цвет в формате:
     *                     - HEX строка (например '#5551ff'),
     *                     - Число (RGB значение),
     *                     - Имя цвета (например 'blue', должно быть в справочнике colorsMap)
     *                     - Число от 0 до 360 — воспринимается как отдельный тон (hue).
     * @param name_color - Название группы/цвета для использования в имени CSS переменных.
     * @returns Массив строк, представляющих собой CSS переменные в формате:
     *          '--vl-oklch-blue-0: oklch(0.9896 0.004 283.65);'
     */
    static generatePaletteFromColor(colorInput: string | number, name_color?: string): string[];
    static generatePaletteFromColorByOKLCH(colorInput: string | number, name_color?: string): string[];
}
export default OKLCHColorGenerator;
