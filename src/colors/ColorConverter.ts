// src/colors/ColorConverter.ts
import colors_map from './colors.json' with { type: 'json' };
import NumberAdjuster from '../math/math.js';

interface RGB {
    r: number;
    g: number;
    b: number;
}
interface XYZ {
    x: number;
    y: number;
    z: number;
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
    description?: string; // Опционально, для русского описания
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
interface XYZColor {
    mode: string;
    x: number;
    y: number;
    z: number;
    alpha?: number;
}
interface LRGBColor {
    mode: string;
    r: number;
    g: number;
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
    [key: string]: ColorEntry;
};

class OKLCHColorGenerator {
    private static readonly colors_map: NamedColors = colors_map;
    // === Вспомогательная функция: преобразование имени цвета в RGB ===
    // === Список дробей, которые дают нужные нам lightness ===
    private static readonly fractions15: [number, number][] = [
        [95, 96],
        [47, 48],
        [23, 24],
        [11, 12],
        [10, 12],
        [9, 12],
        [8, 12],
        [7, 12],
        [6, 12],
        [5, 12],
        [4, 12],
        [3, 12],
        [5, 24],
        [2, 12],
        [3, 24],
        [1, 12]
    ];
    private static readonly fraction9: [number, number][] = [
        [83, 91],  //0.9120879120879121
        [10, 12], //0.8333333333333334
        [9, 12], //075
        [8, 13], //0.6153846153846154
        [1, 2], // 0.5
        [19, 42], //0.404255319149
        [7, 24], //0.2916666666666667
        [11, 60], // 0.18333333333333332
        [1, 12] // 0.08333333333333333
    ];

    /**
     * Базовые значения XYZ для белого цвета (D50).
     */
    private static readonly j = {
        X: 0.3457 / 0.3585,
        Y: 1,
        Z: (1 - 0.3457 - 0.3585) / 0.3585,
    };

    /**
     * Константы для преобразования XYZ -> Lab.
     */
    private static readonly Jn = Math.pow(29, 3) / Math.pow(3, 3);
    private static readonly jn = Math.pow(6, 3) / Math.pow(29, 3);

    /**
     * Вспомогательная функция преобразования компоненты XYZ в нелинейную Lab-координату.
     * @param e - значение для преобразования.
     * @returns Преобразованное значение.
     */
    private static ut(e: number): number {
        return e > this.jn ? Math.cbrt(e) : (this.Jn * e + 16) / 116;
    }

    /**
     * Преобразование XYZ в CIELAB.
     * @param param0 - Объект с координатами x, y, z и опционально alpha.
     * @returns Объект в цветовом пространстве CIELAB.
     */
    public static nr({
        x: e,
        y: t,
        z: n,
        alpha: r,
    }: {
        x?: number;
        y?: number;
        z?: number;
        alpha?: number;
    }): LabColor {
        e = e ?? 0;
        t = t ?? 0;
        n = n ?? 0;

        const i = this.ut(e / this.j.X);
        const l = this.ut(t / this.j.Y);
        const a = this.ut(n / this.j.Z);

        const o: LabColor = {
            mode: 'lab',
            l: 116 * l - 16,
            a: 500 * (i - l),
            b: 200 * (l - a),
        };

        if (r !== undefined) {
            o.alpha = r;
        }

        return o;
    }

    /**
     * Гамма-коррекция для RGB (sRGB).
     * @param e - Значение канала RGB.
     * @returns Линейное значение.
     */
    private static at(e: number = 0): number {
        e = e / 255;
        const t = Math.abs(e);
        return t <= 0.04045
            ? e / 12.92
            : (Math.sign(e) || 1) * Math.pow((t + 0.055) / 1.055, 2.4);
    }

    /**
     * Преобразование RGB в линейное RGB (lrgb).
     * @param param0 - Объект с каналами r, g, b и опционально alpha.
     * @returns Объект в цветовом пространстве lrgb.
     */
    private static xe({
        r: e,
        g: t,
        b: n,
        alpha: r,
    }: LRGBColor): { mode: string; r: number; g: number; b: number; alpha?: number; } {
        const i: LRGBColor = {
            mode: 'lrgb',
            r: this.at(e),
            g: this.at(t),
            b: this.at(n),
        };

        if (r !== undefined) {
            i.alpha = r;
        }

        return i;
    }

//    /**
//     * Преобразование RGB в XYZ (D50).
//     * @param e - Объект с каналами r, g, b и опционально alpha.
//     * @returns Объект в цветовом пространстве XYZ.
//     */
//    public static RGBTOHYZ(e: RGBColor): XYZColor {
//        const { r: t, g: n, b: r, alpha: i } = this.xe(e);
//
//        const l: XYZColor = {
//            mode: 'xyz50',
//            x:
//                0.436065742824811 * t +
//                0.3851514688337912 * n +
//                0.14307845442264197 * r,
//            y:
//                0.22249319175623702 * t +
//                0.7168870538238823 * n +
//                0.06061979053616537 * r,
//            z:
//                0.013923904500943465 * t +
//                0.09708128566574634 * n +
//                0.7140993584005155 * r,
//        };
//
//        if (i !== undefined) {
//            l.alpha = i;
//        }
//
//        return l;
//    }

//    /**
//     * Преобразование RGB в CIELAB через XYZ.
//     * @param rgb - Объект с каналами r, g, b и опционально alpha.
//     * @returns Объект в цветовом пространстве CIELAB.
//     */
//    public static RGBtoSIELAB(rgb: RGBColor): { mode: string; l: number; a: number; b: number; alpha?: number; } {
//        const lab = this.nr(this.RGBTOHYZ(rgb));
//
//        // Если все компоненты равны — обнуляем цветовые компоненты
//        if (rgb.r === rgb.b && rgb.b === rgb.g) {
//            lab.a = lab.b = 0;
//        }
//
//        return lab;
//    }

    /**
     * Нормализация угла hue в диапазоне [0, 360).
     * @param e - Угол в градусах.
     * @returns Нормализованный угол.
     */
    private static RangeHue(e: number): number {
        e = e % 360;
        return e < 0 ? e + 360 : e;
    }

    /**
     * Преобразование CIELAB в CIELCH.
     * @param param0 - Объект с компонентами l, a, b и опционально alpha.
     * @param mode - Целевой режим (по умолчанию "lch").
     * @returns Объект в цветовом пространстве CIELCH.
     */
    public static cieLabToCieLch(
        { l: e, a: t, b: n, alpha: r }: {
            l: number;
            a?: number;
            b?: number;
            alpha?: number;
        },
        mode: string = 'lch'
    ): LCHColor {
        t = t ?? 0;
        n = n ?? 0;

        const l: number = Math.sqrt(t * t + n * n);
        const a: LCHColor = {
            mode,
            l: e,
            c: l,
        };

        if (l) {
            a.h = this.RangeHue((Math.atan2(n, t) * 180) / Math.PI);
        }

        if (r !== undefined) {
            a.alpha = r;
        }

        return a;
    }
    /**
     * Преобразует линейное RGB в цветовое пространство Oklab.
     *
     * @param param0 - Объект с компонентами r, g, b и опционально alpha.
     * @returns Объект в цветовом пространстве Oklab.
     */
    public static rgbLinertoOklab({
        r: e,
        g: t,
        b: n,
        alpha: r,
    }: LinearRGB): OklabColor {
        // Установка значений по умолчанию
        e = e ?? 0;
        t = t ?? 0;
        n = n ?? 0;

        // Вычисление компонентов через кубические корни
        const i = Math.cbrt(0.41222147079999993 * e + 0.5363325363 * t + 0.0514459929 * n);
        const l = Math.cbrt(0.2119034981999999 * e + 0.6806995450999999 * t + 0.1073969566 * n);
        const a = Math.cbrt(0.08830246189999998 * e + 0.2817188376 * t + 0.6299787005000002 * n);

        // Расчёт компонентов Oklab
        const o: OklabColor = {
            mode: 'oklab',
            l: 0.2104542553 * i + 0.793617785 * l - 0.0040720468 * a,
            a: 1.9779984951 * i - 2.428592205 * l + 0.4505937099 * a,
            b: 0.0259040371 * i + 0.7827717662 * l - 0.808675766 * a,
        };

        // Добавление альфа-канала, если он указан
        if (r !== undefined) {
            o.alpha = r;
        }

        return o;
    }
//    /**
//     * Основная функция преобразования RGB в OKLCH.
//     * @param rgb - Объект с каналами r, g, b и опционально alpha.
//     * @returns Объект в цветовом пространстве OKLCH.
//     */
//    public static rgbToLCH(rgb: RGBColor): { l: number; c: number; h: number; alpha: number; } {
//        const linearRGB = this.RGBtoSIELAB(rgb); // Преобразование в линейное RGB
//        const lch: LCHColor = this.cieLabToCieLch(linearRGB); // Преобразование в CIELCH
//
//        return {
//            l: lch.l / 100, // Нормализация до диапазона [0, 1]
//            c: lch.c,
//            h: lch.h ?? 0,
//            alpha: rgb.alpha ?? 1,
//        };
//    }

    /**
     * Преобразует цвет из RGB в OKLCH через Linear RGB и Oklab.
     *
     * @param rgb - Цвет в формате RGB.
     * @returns Цвет в формате OKLCH.
     */
    public static rgbToOKLCH(rgb: RGBColor): { l: number; c: number; h: number; alpha: number; } {
        // Шаг 1: RGB → Linear RGB
        const linearRgb = this.xe(rgb);

        // Шаг 2: Linear RGB → Oklab
        const oklab: OklabColor = this.rgbLinertoOklab(linearRgb);

        // Если все компоненты равны (серый), обнуляем a и b
        if (rgb.r === rgb.b && rgb.b === rgb.g) {
            oklab.a = oklab.b = 0;
        }

        // Шаг 3: Oklab → OKLCH
        const oklch: OKLCHColor = this.cieLabToCieLch(oklab, 'oklch');

        return {
            l: oklch.l, // Нормализация до диапазона [0, 1]
            c: oklch.c,
            h: oklch.h ?? 0,
            alpha: rgb.alpha ?? 1,
        };
    }
/**
 * Конвертирует цвет из OKLCH в формат HEX (#RRGGBBAA).
 *
 * @param l - Lightness (в диапазоне [0..1])
 * @param c - Chroma (насыщенность)
 * @param h - Hue (тон в градусах)
 * @param alpha - Альфа-канал (0..1), по умолчанию 1
 * @returns HEX-строка, например: #ffc700 или #ffc700cc
 */
public static oklchToHex(l: number, c: number, h: number, alpha = 1): string {
  // Шаг 1: OKLCH → RGB
  const rgb = this.oklchToRgb({ l, c, h });

  // Шаг 2: RGB → HEX
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  const hex = `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;

  // Шаг 3: Добавляем альфа, если нужно
  return alpha < 1
    ? hex + Math.round(alpha * 255).toString(16).padStart(2, '0')
    : hex;
}
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
    public static oklchToRgb(oklch: { l: number; c: number; h: number }): { r: number; g: number; b: number } {
    // Шаг 1: OKLCH → OKLAB
    const oklab = this.oklchToOklab(oklch);

    // Шаг 2: OKLAB → Linear RGB
    const linearRgb = this.oklabToLinearRgb(oklab);

    // Шаг 3: Linear RGB → sRGB (с гамма-коррекцией)
    const sRgb = {
        r: linearRgb.r <= 0.0031308
        ? linearRgb.r * 12.92
        : 1.055 * Math.pow(linearRgb.r, 1 / 2.4) - 0.055,
        g: linearRgb.g <= 0.0031308
        ? linearRgb.g * 12.92
        : 1.055 * Math.pow(linearRgb.g, 1 / 2.4) - 0.055,
        b: linearRgb.b <= 0.0031308
        ? linearRgb.b * 12.92
        : 1.055 * Math.pow(linearRgb.b, 1 / 2.4) - 0.055,
    };

    // Шаг 4: Масштабируем [0..1] → [0..255] и округляем
    return {
        r: Math.round(NumberAdjuster.extremum('max', null, 0, NumberAdjuster.extremum('min', null, 255, sRgb.r * 255))),
        g: Math.round(NumberAdjuster.extremum('max', null, 0, NumberAdjuster.extremum('min', null, 255, sRgb.g * 255))),
        b: Math.round(NumberAdjuster.extremum('max', null, 0, NumberAdjuster.extremum('min', null, 255, sRgb.b * 255))),
    };
    }

    private static oklabToLMS(l: number, a: number, b: number): { l: number; m: number; s: number } {
        const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
        const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
        const s_ = l - 0.0894841775 * a - 1.2914855480 * b;

        return {
            l: Math.pow(l_, 3),
            m: Math.pow(m_, 3),
            s: Math.pow(s_, 3)
        };
    }
    private static lmsToLinearRGB(l: number, m: number, s: number): [number, number, number] {
        return [
            4.076741661347994 * l - 3.307711590408193 * m + 0.230969928729428 * s,
            -1.2684380040921763 * l + 2.6097574006633715 * m - 0.3413193963102197 * s,
            -0.004196086541837188 * l - 0.7034186144594493 * m + 1.7076147009309444 * s
        ];
    }
    public static rgbToP3(rgb: RGBColor): { r: number; g: number; b: number; alpha: number } {
        // Шаг 1: RGB → Linear RGB
        const linearRgb = this.xe(rgb);

        // Шаг 2: Linear RGB → OKLAB
        const oklab = this.rgbLinertoOklab(linearRgb);

        // Шаг 3: OKLAB → LMS
        const lms = this.oklabToLMS(oklab.l, oklab.a, oklab.b);

        // Шаг 4: LMS → Linear RGB (уже P3-диапазон)
        const p3LinearRgb = this.lmsToLinearRGB(lms.l, lms.m, lms.s);// Возвращает { r, g, b }

        return {
            r: p3LinearRgb[0],
            g: p3LinearRgb[1],
            b: p3LinearRgb[2],
            alpha: rgb.alpha ?? 1,
        };
    }

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
    public static getColorRgb(input: string | number): ColorEntry | null {
  let colorEntry: ColorEntry | undefined;

  // 🔒 Защита: если input — null, undefined или не строка/число
  if (input === null || input === undefined) {
    console.warn(`getColorRgb: получен null или undefined`);
    return null;
  }

  // Если вход — число, ищем по ID
  if (typeof input === 'number') {
    colorEntry = Object.values(this.colors_map).find(
      (c: ColorEntry): boolean => c.id === input
    );
  } else if (typeof input === 'string') {
    // 🔒 Теперь безопасно: мы знаем, что input — строка
    const str: string = input.trim().toLowerCase();

    // Пытаемся найти цвет по ключу (например, "red")
    if (this.colors_map[str]) {
      colorEntry = this.colors_map[str];
    } else {
      // Ищем по имени цвета (регистронезависимо)
      colorEntry = Object.values(this.colors_map).find(
        (c: ColorEntry): boolean => c.name.toLowerCase() === str
      );

      // Если не нашли по имени — ищем по HEX-коду
      if (!colorEntry) {
        colorEntry = Object.values(this.colors_map).find(
          (c: ColorEntry): boolean => c.hex.toLowerCase() === str
        );
      }
    }
  } else {
    // 🔴 Если не строка и не число — ошибка типа
    console.error(`getColorRgb: ожидается строка или число, получено ${typeof input}`, input);
    return null;
  }

  // Если цвет не найден — выводим предупреждение
  if (!colorEntry) {
    console.warn(`Цвет "${input}" не найден`);
    return null;
  }

  // Возвращаем копию объекта, чтобы не мутировать оригинал
  return { ...colorEntry };
}

    public static rgbToXYZ(r: number, g: number, b: number): [number, number, number] {

        let r1 = r / 255;
        let a: number = g / 255;
        let i: number = b / 255;
        let s: number = .4124564 * (r1 = r1 > .04045 ? Math.pow((r1 + .055) / 1.055, 2.4) : r1 / 12.92) + .3575761 * (a = a > .04045 ? Math.pow((a + .055) / 1.055, 2.4) : a / 12.92) + .1804375 * (i = i > .04045 ? Math.pow((i + .055) / 1.055, 2.4) : i / 12.92),
            o: number = .2126729 * r1 + .7151522 * a + .072175 * i,
            l: number = .0193339 * r1 + .119192 * a + .9503041 * i;

        const X2: number = Number((100 * s).toFixed(4));
        const Y3: number = Number((100 * o).toFixed(4));
        const Z4: number = Number((100 * l).toFixed(4));
        //console.log( "X2", X2 );
        //console.log( "Y3", Y3 );
        //console.log( "Z4", Z4 );
        // return [X, Y, Z];

        //console.log( "r", r );
        //console.log( "g", g );
        //console.log( "b", b );
        // Нормализация RGB к диапазону [0..1], если входные значения в [0..255]
        r = this.toLiner(r);
        g = this.toLiner(g);
        b = this.toLiner(b);
        //console.log( "rLiner", r );
        //console.log( "gLiner", g );
        //console.log( "bLiner", b );
        // Матрица преобразования RGB → XYZ
        const X = (0.4124564 * r + 0.3575761 * r + 0.1804670 * b) * 100;
        const Y = (0.2126729 * r + 0.7151522 * g + 0.0721750 * b) * 100;
        const Z = (0.0193339 * r + 0.1191920 * g + 0.9503041 * b) * 100;
        //console.log( "X:", X, "X2 == X :", X2 == X );
        //console.log( "Y:", Y, "Y3 == Y :", Y3 == Y );
        //console.log( "Z :", Z, "Z4 == Z :", Z4 == Z );
        return [X, Y, Z];
    }
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
    private static xyzToOklab(
        x: number,
        y: number,
        z: number
    ): LAB {
        var t = x,
            i = y,
            r = z;
        t = this.gammaToLinear(t / 255);
        i = this.gammaToLinear(i / 255);
        r = this.gammaToLinear(r / 255);
        var u = .4122214708 * t + .5363325363 * i + .0514459929 * r,
            f = .2119034982 * t + .6806995451 * i + .1073969566 * r,
            e = .0883024619 * t + .2817188376 * i + .6299787005 * r;
        return u = Math.cbrt(u), f = Math.cbrt(f), e = Math.cbrt(e), {
            l: Math.round((u * .2104542553 + f * .793617785 + e * -.0040720468) * 1e3),
            a: Math.round((u * 1.9779984951 + f * -2.428592205 + e * .4505937099) * 1e3),
            b: Math.round((u * .0259040371 + f * .7827717662 + e * -.808675766) * 1e3)
        };
        /**
         * Применяем кубический корень к каждому каналу LMS.
         * Это необходимо для перехода в нелинейное цветовое пространство,
         * что позволяет более точно моделировать восприятие цвета человеком.
         */
        //     const l_ = NumberAdjuster.rootWithPrecision( l, 3);
        //     const m_ = NumberAdjuster.rootWithPrecision( m ,3);
        //     const s_ = NumberAdjuster.rootWithPrecision( s ,3);

        // //     /**
        // //      * Вычисляем компоненты OKLAB по официальной формуле:
        // //      * https://bottosson.github.io/posts/oklab/
        // //      *
        // //      * Формулы преобразования:
        // //      * l — светлота
        // //      * a — от красного к зелёному
        // //      * b — от жёлтого к синему
        // //      */

        //     return {
        //         /**
        //          * Светлота (l) вычисляется как комбинация всех трёх каналов.
        //          */
        //         l: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,

        //         /**
        //          * Цветовой канал a: положительные значения → красный, отрицательные → зелёный.
        //          */
        //         a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.450593709 * s_,

        //         /**
        //          * Цветовой канал b: положительные значения → жёлтый, отрицательные → синий.
        //          */
        //         b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
        //     };
    }

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
    public static oklabToOklch(lab: LAB): LCH {
        const { a, b } = lab;
        //console.log( "lab :", lab );
        // Вычисляем хрому (насыщенность) как длину вектора (a, b)
        const chroma: number = NumberAdjuster.rootWithPrecision(a * a + b * b, 2);
        // const chroma: number = Math.sqrt(a * a + b * b);
        //console.log( "chroma :", chroma );
        // Для наглядности вычисляем угол между компонентами a и b
        const hueRad: number = NumberAdjuster.getAngleWithPrecision(b, a);
        //console.log( "hueRad :", hueRad );
        // Переводим радианы в градусы
        const hueDeg: number = NumberAdjuster.radiansToDegrees(hueRad);
        //console.log( "hueDeg :", hueDeg );
        // Нормализуем тон к диапазону [0..360]
        const normalizedHue: number = hueDeg < 0 ? hueDeg + 360 : hueDeg;
        const normalizedL = NumberAdjuster.extremum('max', null, 0, NumberAdjuster.extremum('min', null, 1, lab.l));
        const normalizedC = chroma;
        return {
            l: normalizedL,
            c: chroma,
            h: normalizedHue
        };
    }
    private static gammaToLinear(n: number): number {
        return n >= .04045 ? Math.pow((n + .055) / 1.055, 2.4) : n / 12.92;
    }
    private static toLiner(c: number): number {
        const CLine: number = 0.04045;
        // Гамма-коррекция: переводим sRGB в линейное пространство
        c = c / 255;
        return c <= CLine
            ? c / 12.92
            : Math.pow((c + 0.055) / 1.055, 2.4);
    }

    private static normalizeRgb(rgb: RGB): RGB {

        return {


            r: NumberAdjuster.extremum('max', null, 0, NumberAdjuster.extremum('min', null, 1, rgb.r / 255)),
            g: NumberAdjuster.extremum('max', null, 0, NumberAdjuster.extremum('min', null, 1, rgb.g / 255)),
            b: NumberAdjuster.extremum('max', null, 0, NumberAdjuster.extremum('min', null, 1, rgb.b / 255))
        };
    }
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

    public static rgbToOklch2(rgb: RGB): LCH {
        // // Шаг 1: Конвертируем RGB в пространство LMS
        // const [ l, m, s ] = this.rgbToLMS( rgb.r, rgb.g, rgb.b );
        // Шаг 1: Конвертируем RGB в пространство LMS
        const [x, y, z] = this.rgbToXYZ(rgb.r, rgb.g, rgb.b);
        // // Шаг 2: Переводим LMS в OKLAB
        // const lab: LAB = this.lmsToOklab( l, m, s );

        const lab: LAB = this.xyzToOklab(x, y, z);
        //console.log( "------==== LAB====---", lab );
        // Шаг 3: Переводим OKLAB в OKLCH
        const oklch: LCH = this.oklabToOklch(lab);

        // ✅ Ограничиваем хрому, чтобы цвет был в sRGB
        const maxC: number = this.findMaxChroma(oklch.l * 100, oklch.h); // lightness в процентах
        //console.log( 'maxC :', maxC );
        oklch.c = NumberAdjuster.extremum('min', null, oklch.c, maxC);

        return oklch;
    }
    // --- остальные методы (ваш текущий код) ---

    // Функция для нормализации угла hue
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
    private static normalizeHue(
        h: number
    ): number {
        /**
         * Сначала находим остаток от деления на 360 — это приводит число к диапазону [-360...360]
         */
        h = h % 360;
        /**
         * Если результат отрицательный — добавляем 360, чтобы получить положительный тон.
         * Например:
         * -90 → 270
         * -360 → 0
         * -450 → 270
         */
        return h < 0 ? h + 360 : h;
    }
    // Преобразование OKLCH → OKLAB
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
//    private static oklchToOklab(
//        {
//            l,
//            c,
//            h
//        }: LCH): LAB {
//        /**
//         * Переводим тон из градусов в радианы, чтобы использовать его в тригонометрических функциях.
//         */
//        const rad: number = NumberAdjuster.radiansToDegrees(h);
//
//        /**
//         * Вычисляем компоненты 'a' и 'b' через косинус и синус угла.
//         * Эти значения определяют цветовой тон и насыщенность в пространстве OKLAB.
//         */
//        const a: number = c * NumberAdjuster.trig('cos', rad);
//        const b: number = c * NumberAdjuster.trig('sin', rad);
//
//        /**
//         * Возвращаем цвет в формате OKLAB.
//         */
//        return { l, a, b };
//    }
private static oklchToOklab(oklch: { l: number; c: number; h: number }): { l: number; a: number; b: number } {
  const rad = oklch.h * (Math.PI / 180);
  const a = oklch.c * Math.cos(rad);
  const b = oklch.c * Math.sin(rad);
  return { l: oklch.l / 100, a, b }; // ❌ Деление на 100 — ошибка!
}
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
    private static oklabToLinearRgb({
        l,
        a,
        b
    }: LAB): RGB {
        /**
         * Вычисляем L', M', S' через кубические преобразования OKLAB → LMS.
         * Эти коэффициенты взяты из оригинального преобразования OKLAB.
         */
        const l_prime: number = NumberAdjuster.pow(
            l * 0.9999999984505198 + 0.39633779217376786 * a + 0.2158037580607588 * b,
            3
        );

        const m: number = NumberAdjuster.pow(
            l * 1.0000000088817609 - 0.10556134232365635 * a - 0.06385417477170591 * b,
            3
        );

        const s: number = NumberAdjuster.pow(
            l * 1.0000000546724108 - 0.08948418209496575 * a - 1.2914855378640917 * b,
            3
        );

        /**
         * Конвертируем LMS в линейный RGB с помощью обратной матрицы преобразования.
         * Коэффициенты взяты из официального описания OKLAB.
         */
        return {
            r:
                4.076741661347994 * l_prime -
                3.307711590408193 * m +
                0.230969928729428 * s,

            g:
                -1.2684380040921763 * l_prime +
                2.6097574006633715 * m -
                0.3413193963102197 * s,

            b:
                -0.004196086541837188 * l_prime -
                0.7034186144594493 * m +
                1.7076147009309444 * s
        };
    }
    /**
     * Проверяет, находится ли цвет в пределах sRGB-гаммы.
     *
     * Цвет считается корректным, если все компоненты RGB лежат в диапазоне [0..1].
     * Используется для ограничения насыщенности (chroma) при генерации палитры в формате OKLCH.
     *
     * @param rgb - Объект с компонентами `r`, `g`, `b`, нормализованными к диапазону [0..1].
     * @returns `true`, если цвет находится в sRGB. Иначе — `false`.
     */
    private static isInSrgb(
        rgb: RGB
    ): boolean {
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
    private static findMaxChroma(
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
        while (c <= maxChroma) {
            const lab: LAB = this.oklchToOklab(
                {
                    l: lightness / 100, // нормализуем светлоту
                    c,
                    h: this.normalizeHue(hue) // нормализуем тон к диапазону [0..360]
                });

            const rgb: RGB = this.oklabToLinearRgb(lab); // преобразуем в линейный RGB

            /**
             * Если цвет вышел за пределы sRGB — прерываем цикл.
             */
            if (!this.isInSrgb(rgb)) break;

            c += step; // увеличиваем хрому
        }

        /**
         * Возвращаем максимальную хрому, которая ещё укладывается в sRGB.
         * Округляем до 3 знаков после запятой.
         */
        return parseFloat((c - step).toFixed(3));
    }

    /**
     * Генерирует массив значений светлоты (lightness) на основе заранее заданных дробных соотношений.
     *
     * Каждое значение рассчитывается как (num / denom) * 100 и округляется до двух знаков после запятой.
     * Используется для построения палитры цветов в формате OKLCH.
     *
     * @returns Массив чисел, представляющих собой значения светлоты в процентах:
     *          Например: [98.96, 97.92, ..., 8.33]
     */
    private static generateLightnessValues(): number[] {
        /**
         * Для каждого элемента из this.fractions вычисляем процентную долю от деления num / denom,
         * умноженную на 100, и округляем до двух знаков после запятой.
         */
        return this.fractions15
            .map(([num, denom]: [number, number]): number => {
                const value: number = (num / denom) * 100;
                return parseFloat(value.toFixed(2)); // Округление до двух знаков после запятой
            });
    }
    private static generateLightnessValuesByOklch(): number[] {
        /**
         * Для каждого элемента из this.fractions вычисляем процентную долю от деления num / denom,
         * умноженную на 100, и округляем до двух знаков после запятой.
         */
        return this.fraction9
            .map(([num, denom]: [number, number]): number => {
                const value: number = (num / denom) * 100;
                return parseFloat(value.toFixed(2)); // Округление до двух знаков после запятой
            });
    }
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
    private static generatePaletteForHueInternal(
        hue: number,
        name_color: string = "empty"
    ): string[] {
        /**
         * Получаем массив процентных значений светлоты (например: [98.96, 97.92, ..., 8.33]).
         */
        const lightnessValues: number[] = this.generateLightnessValues();

        /**
         * Массив для хранения готовых CSS переменных.
         */
        const palette: string[] = [];

        /**
         * Счётчик индексов для именования переменных (от 0 до 15).
         */
        let i: number = 0;

        /**
         * Добавляем комментарий в начало группы для упрощения поиска и структурирования в CSS.
         */
        palette.push(`\n// ${name_color}: ${hue}\n`);

        /**
         * Для каждого уровня светлоты:
         * 1. Вычисляем максимальную хрому с помощью `findMaxChroma`.
         * 2. Нормализуем светлоту к диапазону [0..1].
         * 3. Формируем строку CSS переменной в формате OKLCH.
         */
        for (const L of lightnessValues) {
            const C: number = this.findMaxChroma(L, hue);
            const N: number = L / 100; // нормализация светлоты в диапазон [0..1]

            palette.push(
                `--#{prefix.$name}oklch-${name_color.toLowerCase()}-${i} : oklch(${parseFloat(N.toFixed(4))} ${C} ${hue});`
            );
            palette.push(
                `--#{prefix.$name}${name_color.toLowerCase()}-${i} : ${parseFloat(N.toFixed(4))} ${C} ${hue};`
            );
            i++;
        }

        /**
         * Добавляем завершающий комментарий — дублируем имя группы и значение тона.
         * Это помогает при чтении CSS и автоматическом парсинге.
         */
        palette.push(`\n// ${name_color}: ${hue} \n`);

        /**
         * Возвращаем готовую палитру.
         */
        return palette;
    }
    private static generatePaletteForHueInternalByOKLCH(
        hue: number,
        chroma: number,
        name_color: string = "empty"
    ): string[] {
        /**
         * Получаем массив процентных значений светлоты (например: [98.96, 97.92, ..., 8.33]).
         */
        const lightnessValues: number[] = this.generateLightnessValuesByOklch();

        /**
         * Массив для хранения готовых CSS переменных.
         */
        const palette: string[] = [];

        /**
         * Счётчик индексов для именования переменных (от 0 до 15).
         */
        let i: number = 0;

        /**
         * Добавляем комментарий в начало группы для упрощения поиска и структурирования в CSS.
         */
        palette.push(`\n// ${name_color}: ${hue}\n`);

        /**
         * Для каждого уровня светлоты:
         * 1. Вычисляем максимальную хрому с помощью `findMaxChroma`.
         * 2. Нормализуем светлоту к диапазону [0..1].
         * 3. Формируем строку CSS переменной в формате OKLCH.
         */
        for (const L of lightnessValues) {
            const C: number = this.findMaxChroma(L, hue);
            const N: number = L / 100; // нормализация светлоты в диапазон [0..1]

            palette.push(
                `--#{prefix.$name}oklch-${name_color.toLowerCase()}-${i} : oklch(${parseFloat(N.toFixed(4))} ${chroma} ${hue});`
            );
            palette.push(
                `--#{prefix.$name}${name_color.toLowerCase()}-${i} : ${parseFloat(N.toFixed(4))} ${chroma} ${hue};`
            );
            i++;
        }

        /**
         * Добавляем завершающий комментарий — дублируем имя группы и значение тона.
         * Это помогает при чтении CSS и автоматическом парсинге.
         */
        palette.push(`\n// ${name_color}: ${hue} \n`);

        /**
         * Возвращаем готовую палитру.
         */
        return palette;
    }
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
    public static generatePaletteFromColor(
        colorInput: string | number,
        name_color: string = "empty"
    ): string[] {
        let hue: number | null = null;
        let rgb: RGB | null = null;

        /**
         * Если передано число от 0 до 360 — это трактуется как отдельный тон (hue).
         * Генерируем палитру только по этому тону.
         */
        if (typeof colorInput === 'number' && colorInput >= 0 && colorInput <= 360) {
            return this.generatePaletteForHueInternal(colorInput, name_color);
        }

        /**
         * Если передано число — предполагаем, что это цвет в формате 0xRRGGBB.
         * Преобразуем его в нормализованный RGB [0..1].
         */
        if (typeof colorInput === 'number') {
            rgb = {
                r: ((colorInput >> 16) & 255) / 255,
                g: ((colorInput >> 8) & 255) / 255,
                b: (colorInput & 255) / 255
            };
        }

        /**
         * Если передана строка — пробуем найти цвет в справочнике.
         * Если найдено — используем его RGB и имя.
         * Если не найдено — оставляем name_color и rgb = null.
         */
        else if (typeof colorInput === 'string') {
            const color: ColorEntry | null = this.getColorRgb(colorInput);
            name_color = (color as any).name ?? name_color ?? colorInput;
            rgb = (color as any).rgb ?? null;
            //console.log( "rgb 1: ", rgb );

        }

        /**
         * Если не удалось получить корректное RGB — выводим предупреждение и возвращаем пустой массив.
         */
        if (!rgb) {
            console.warn(`Невозможно создать палитру для "${colorInput}". Цвет не найден.`);
            return [];
        }

        /**
         * Преобразуем RGB в OKLCH.
         */
        //console.log( "rgb - ", rgb );
        // const lch: LCH = this.rgbToLCH( ( rgb as RGBColor ) );
        //     console.log( "lch - ", lch );
        const oklch: LCH = this.rgbToOKLCH((rgb as RGBColor));
        // const p3:RGB = this.rgbToP3( ( rgb as RGBColor ) );

        // console.log( "oklch - ", oklch );
        //     console.log( " p3 - ",  p3 );
        /**
         * Округляем тон (hue) до одного знака после запятой.
         */
        hue = NumberAdjuster.adjustWithPrecision('round', oklch.h, -3);

        /**
         * Генерируем палитру на основе полученного тона.
         */
        const paletteArray = this.generatePaletteForHueInternal(hue, name_color);
        //console.log( "oklch =", oklch );

        // //console.log("paletteArray", paletteArray);
        /**
         * Возвращаем финальный массив строк:
         * - Комментарий с исходным цветом в формате oklch(...)
         * - Специальные маркеры
         * - Перечень CSS переменных --vl-oklch-...
         */
        return [
            `// Исходный цвет: oklch(${NumberAdjuster.adjustWithPrecision('round', oklch.l, -3)} ${oklch.c.toFixed(3)} ${hue})  rgb ${JSON.stringify(rgb)}`,
            `\n/**${colorInput}*/\n`,
            ...paletteArray,
            `\n/**${colorInput}*/\n`
        ];
    }

    public static generatePaletteFromColorByOKLCH(
        colorInput: string | number,
        name_color: string = "empty"
    ): string[] {
        let hue: number | null = null;
        let rgb: RGB | null = null;

        /**
         * Если передано число от 0 до 360 — это трактуется как отдельный тон (hue).
         * Генерируем палитру только по этому тону.
         */
        // if ( typeof colorInput === 'number' && colorInput >= 0 && colorInput <= 360 ) {
        //     return this.generatePaletteForHueInternalByOKLCH( colorInput, name_color );
        // }

        /**
         * Если передано число — предполагаем, что это цвет в формате 0xRRGGBB.
         * Преобразуем его в нормализованный RGB [0..1].
         */
        if (typeof colorInput === 'number') {
            rgb = {
                r: ((colorInput >> 16) & 255) / 255,
                g: ((colorInput >> 8) & 255) / 255,
                b: (colorInput & 255) / 255
            };
        }

        /**
         * Если передана строка — пробуем найти цвет в справочнике.
         * Если найдено — используем его RGB и имя.
         * Если не найдено — оставляем name_color и rgb = null.
         */
        else if (typeof colorInput === 'string') {
            const color: ColorEntry | null = this.getColorRgb(colorInput);
            name_color = (color as any).name ?? name_color ?? colorInput;
            rgb = (color as any).rgb ?? null;
            //console.log( "rgb 1: ", rgb );

        }

        /**
         * Если не удалось получить корректное RGB — выводим предупреждение и возвращаем пустой массив.
         */
        if (!rgb) {
            console.warn(`Невозможно создать палитру для "${colorInput}". Цвет не найден.`);
            return [];
        }

        /**
         * Преобразуем RGB в OKLCH.
         */
        //console.log( "rgb - ", rgb );
        // const lch: LCH = this.rgbToLCH( ( rgb as RGBColor ) );
        //     console.log( "lch - ", lch );
        const oklch: LCH = this.rgbToOKLCH((rgb as RGBColor));
        // const p3:RGB = this.rgbToP3( ( rgb as RGBColor ) );

        // console.log( "oklch - ", oklch );
        //     console.log( " p3 - ",  p3 );
        /**
         * Округляем тон (hue) до одного знака после запятой.
         */
        hue = NumberAdjuster.adjustWithPrecision('round', oklch.h, -3);

        /**
         * Генерируем палитру на основе полученного тона.
         */
        const paletteArray = this.generatePaletteForHueInternalByOKLCH(hue, Number(oklch.c), name_color);
        //console.log( "oklch =", oklch );

        // //console.log("paletteArray", paletteArray);
        /**
         * Возвращаем финальный массив строк:
         * - Комментарий с исходным цветом в формате oklch(...)
         * - Специальные маркеры
         * - Перечень CSS переменных --vl-oklch-...
         */
        return [
            `// Исходный цвет: oklch(${NumberAdjuster.adjustWithPrecision('round', oklch.l, -3)} ${oklch.c.toFixed(3)} ${hue})  rgb ${JSON.stringify(rgb)}`,
            `\n/**${colorInput}*/\n`,
            ...paletteArray,
            `\n/**${colorInput}*/\n`
        ];
    }

}



export default OKLCHColorGenerator;