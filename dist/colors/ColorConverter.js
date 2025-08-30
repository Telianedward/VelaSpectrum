// src/colors/ColorConverter.ts
/**
 * Модуль для преобразования цветов между различными цветовыми пространствами.
 * Реализует конвертацию:
 * - HEX → RGB
 * - RGB → XYZ → LAB → OKLCH
 * - Поддерживает поиск цветов по имени, ID или HEX-коду
 *
 * Используется в ThemeColors для генерации семантических цветов в формате OKLCH.
 *
 * @module ColorConverter
 */
// Импортируем цветовую палитру из JSON
import colors_map from './colors.json' with { type: 'json' };
// Вспомогательный класс для коррекции чисел
import NumberAdjuster from '../math/math.js';
/**
 * Класс для генерации и преобразования цветов в цветовом пространстве OKLCH.
 * Поддерживает преобразование между RGB, XYZ, Lab, LCH, Oklab, OKLCH,
 * а также генерацию CSS-палитр на основе заданных цветов.
 *
 * @class OKLCHColorGenerator
 */
class OKLCHColorGenerator {
    /**
 * Статическая карта цветов, загруженная из JSON-файла.
 * Содержит все доступные цвета по имени, ID и HEX-коду.
 *
 * @private
 * @static
 * @readonly
 * @type {NamedColors}
 */
    static colors_map = colors_map;
    /**
     * Массив дробей, используемых для генерации значений светлоты (15 уровней).
     * Каждая дробь (num/denom) преобразуется в процентное значение светлоты.
     *
     * @private
     * @static
     * @readonly
     * @type {[number, number][]}
     */
    static fractions15 = [
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
    /**
     * Массив дробей, используемых для генерации значений светлоты (9 уровней).
     * Используется в альтернативной генерации палитры.
     *
     * @private
     * @static
     * @readonly
     * @type {[number, number][]}
     */
    static fraction9 = [
        [83, 91], //0.9120879120879121
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
     * Базовые значения XYZ для белой точки D50.
     * Используются при преобразовании XYZ → Lab.
     *
     * @private
     * @static
     * @readonly
     * @type {{ X: number, Y: number, Z: number }}
     */
    static j = {
        X: 0.3457 / 0.3585,
        Y: 1,
        Z: (1 - 0.3457 - 0.3585) / 0.3585,
    };
    /**
     * Константа, используемая в преобразовании XYZ → Lab.
     * Вычисляется как (29/3)^3.
     *
     * @private
     * @static
     * @readonly
     * @type {number}
     */
    static Jn = Math.pow(29, 3) / Math.pow(3, 3);
    /**
 * Константа, используемая в преобразовании XYZ → Lab.
 * Вычисляется как (6/29)^3.
 *
 * @private
 * @static
 * @readonly
 * @type {number}
 */
    static jn = Math.pow(6, 3) / Math.pow(29, 3);
    /**
      * Вспомогательная функция преобразования компоненты XYZ в нелинейную Lab-координату.
      * Применяет кубический корень для больших значений и линейное преобразование для малых.
      *
      * @private
      * @static
      * @param {number} e - Значение канала XYZ
      * @returns {number} Преобразованное значение в Lab-пространстве
      */
    static ut(e) {
        return e > this.jn ? Math.cbrt(e) : (this.Jn * e + 16) / 116;
    }
    /**
    * Преобразование XYZ в CIELAB.
    * Используется для перехода от XYZ к цветовому пространству Lab.
    *
    * @public
    * @static
    * @param {{ x?: number, y?: number, z?: number, alpha?: number }} param0 - Координаты XYZ и альфа-канал
    * @returns {LabColor} Цвет в формате LabColor
    */
    static nr({ x: e, y: t, z: n, alpha: r, }) {
        e = e ?? 0;
        t = t ?? 0;
        n = n ?? 0;
        const i = this.ut(e / this.j.X);
        const l = this.ut(t / this.j.Y);
        const a = this.ut(n / this.j.Z);
        const o = {
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
       * Преобразует нелинейные значения sRGB в линейное пространство.
       *
       * @private
       * @static
       * @param {number} e - Значение канала RGB (0–255)
       * @returns {number} Линейное значение в диапазоне [0, 1]
       */
    static at(e = 0) {
        e = e / 255;
        const t = Math.abs(e);
        return t <= 0.04045
            ? e / 12.92
            : (Math.sign(e) || 1) * Math.pow((t + 0.055) / 1.055, 2.4);
    }
    /**
      * Преобразование RGB в линейное RGB (lrgb).
      * Применяет гамма-коррекцию ко всем каналам.
      *
      * @private
      * @static
      * @param {LRGBColor} param0 - Цвет в формате RGB
      * @returns {LRGBColor} Цвет в линейном RGB-пространстве
      */
    static xe({ r: e, g: t, b: n, alpha: r, }) {
        const i = {
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
    /**
      * Нормализация угла hue в диапазоне [0, 360).
      * Обеспечивает корректный циклический диапазон тона.
      *
      * @private
      * @static
      * @param {number} e - Угол в градусах (может быть любым числом)
      * @returns {number} Нормализованный угол в диапазоне [0, 360)
      */
    static RangeHue(e) {
        e = e % 360;
        return e < 0 ? e + 360 : e;
    }
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
    static cieLabToCieLch({ l: e, a: t, b: n, alpha: r }, mode = 'lch') {
        t = t ?? 0;
        n = n ?? 0;
        const l = Math.sqrt(t * t + n * n);
        const a = {
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
     * Oklab — это perceptual равномерное цветовое пространство.
     *
     * @public
     * @static
     * @param {LinearRGB} param0 - Цвет в линейном RGB
     * @returns {OklabColor} Цвет в формате Oklab
     */
    static rgbLinertoOklab({ r: e, g: t, b: n, alpha: r, }) {
        // Установка значений по умолчанию
        e = e ?? 0;
        t = t ?? 0;
        n = n ?? 0;
        // Вычисление компонентов через кубические корни
        const i = Math.cbrt(0.41222147079999993 * e + 0.5363325363 * t + 0.0514459929 * n);
        const l = Math.cbrt(0.2119034981999999 * e + 0.6806995450999999 * t + 0.1073969566 * n);
        const a = Math.cbrt(0.08830246189999998 * e + 0.2817188376 * t + 0.6299787005000002 * n);
        // Расчёт компонентов Oklab
        const o = {
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
    /**
       * Преобразует цвет из RGB в OKLCH через Linear RGB и Oklab.
       * Полный конвейер: RGB → Linear RGB → Oklab → OKLCH.
       *
       * @public
       * @static
       * @param {RGBColor} rgb - Цвет в формате RGB
       * @returns {{ l: number; c: number; h: number; alpha: number; }} Цвет в формате OKLCH
       */
    static rgbToOKLCH(rgb) {
        // Шаг 1: RGB → Linear RGB
        const linearRgb = this.xe(rgb);
        // Шаг 2: Linear RGB → Oklab
        const oklab = this.rgbLinertoOklab(linearRgb);
        // Если все компоненты равны (серый), обнуляем a и b
        if (rgb.r === rgb.b && rgb.b === rgb.g) {
            oklab.a = oklab.b = 0;
        }
        // Шаг 3: Oklab → OKLCH
        const oklch = this.cieLabToCieLch(oklab, 'oklch');
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
 * @public
 * @static
 * @param {number} l - Lightness (в диапазоне [0..1])
 * @param {number} c - Chroma (насыщенность)
 * @param {number} h - Hue (тон в градусах)
 * @param {number} alpha - Альфа-канал (0..1), по умолчанию 1
 * @returns {string} HEX-строка, например: #ffc700 или #ffc700cc
 */
    static oklchToHex(l, c, h, alpha = 1) {
        // Шаг 1: OKLCH → RGB
        const rgb = this.oklchToRgb({ l, c, h });
        // Шаг 2: RGB → HEX
        const toHex = (n) => n.toString(16).padStart(2, '0');
        const hex = `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
        // Шаг 3: Добавляем альфа, если нужно
        return alpha < 1
            ? hex + Math.round(alpha * 255).toString(16).padStart(2, '0')
            : hex;
    }
    /**
    * Преобразует цвет из OKLCH в RGB.
    * Обратный процесс к rgbToOKLCH: OKLCH → OKLAB → Linear RGB → sRGB.
    *
    * @public
    * @static
    * @param {{ l: number; c: number; h: number }} oklch - Цвет в формате OKLCH
    * @returns {{ r: number; g: number; b: number }} Цвет в формате RGB [0..255]
    */
    static oklchToRgb(oklch) {
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
    static oklabToLMS(l, a, b) {
        const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
        const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
        const s_ = l - 0.0894841775 * a - 1.2914855480 * b;
        return {
            l: Math.pow(l_, 3),
            m: Math.pow(m_, 3),
            s: Math.pow(s_, 3)
        };
    }
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
    static lmsToLinearRGB(l, m, s) {
        return [
            4.076741661347994 * l - 3.307711590408193 * m + 0.230969928729428 * s,
            -1.2684380040921763 * l + 2.6097574006633715 * m - 0.3413193963102197 * s,
            -0.004196086541837188 * l - 0.7034186144594493 * m + 1.7076147009309444 * s
        ];
    }
    /**
     * Преобразует цвет из RGB в P3 (Display P3).
     * Используется для расширенного цветового охвата.
     *
     * @public
     * @static
     * @param {RGBColor} rgb - Цвет в формате RGB
     * @returns {{ r: number; g: number; b: number; alpha: number }} Цвет в P3-пространстве
     */
    static rgbToP3(rgb) {
        // Шаг 1: RGB → Linear RGB
        const linearRgb = this.xe(rgb);
        // Шаг 2: Linear RGB → OKLAB
        const oklab = this.rgbLinertoOklab(linearRgb);
        // Шаг 3: OKLAB → LMS
        const lms = this.oklabToLMS(oklab.l, oklab.a, oklab.b);
        // Шаг 4: LMS → Linear RGB (уже P3-диапазон)
        const p3LinearRgb = this.lmsToLinearRGB(lms.l, lms.m, lms.s); // Возвращает { r, g, b }
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
    static getColorRgb(input) {
        let colorEntry;
        // 🔒 Защита: если input — null, undefined или не строка/число
        if (input === null || input === undefined) {
            console.warn(`getColorRgb: получен null или undefined`);
            return null;
        }
        // Если вход — число, ищем по ID
        if (typeof input === 'number') {
            colorEntry = Object.values(this.colors_map).find((c) => c.id === input);
        }
        else if (typeof input === 'string') {
            // 🔒 Теперь безопасно: мы знаем, что input — строка
            const str = input.trim().toLowerCase();
            // Пытаемся найти цвет по ключу (например, "red")
            if (this.colors_map[str]) {
                colorEntry = this.colors_map[str];
            }
            else {
                // Ищем по имени цвета (регистронезависимо)
                colorEntry = Object.values(this.colors_map).find((c) => c.name.toLowerCase() === str);
                // Если не нашли по имени — ищем по HEX-коду
                if (!colorEntry) {
                    colorEntry = Object.values(this.colors_map).find((c) => c.hex.toLowerCase() === str);
                }
            }
        }
        else {
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
    static rgbToXYZ(r, g, b) {
        let r1 = r / 255;
        let a = g / 255;
        let i = b / 255;
        let s = .4124564 * (r1 = r1 > .04045 ? Math.pow((r1 + .055) / 1.055, 2.4) : r1 / 12.92) + .3575761 * (a = a > .04045 ? Math.pow((a + .055) / 1.055, 2.4) : a / 12.92) + .1804375 * (i = i > .04045 ? Math.pow((i + .055) / 1.055, 2.4) : i / 12.92), o = .2126729 * r1 + .7151522 * a + .072175 * i, l = .0193339 * r1 + .119192 * a + .9503041 * i;
        const X2 = Number((100 * s).toFixed(4));
        const Y3 = Number((100 * o).toFixed(4));
        const Z4 = Number((100 * l).toFixed(4));
        r = this.toLiner(r);
        g = this.toLiner(g);
        b = this.toLiner(b);
        const X = (0.4124564 * r + 0.3575761 * r + 0.1804670 * b) * 100;
        const Y = (0.2126729 * r + 0.7151522 * g + 0.0721750 * b) * 100;
        const Z = (0.0193339 * r + 0.1191920 * g + 0.9503041 * b) * 100;
        return [X, Y, Z];
    }
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
    static xyzToOklab(x, y, z) {
        var t = x, i = y, r = z;
        t = this.gammaToLinear(t / 255);
        i = this.gammaToLinear(i / 255);
        r = this.gammaToLinear(r / 255);
        var u = .4122214708 * t + .5363325363 * i + .0514459929 * r, f = .2119034982 * t + .6806995451 * i + .1073969566 * r, e = .0883024619 * t + .2817188376 * i + .6299787005 * r;
        return u = Math.cbrt(u), f = Math.cbrt(f), e = Math.cbrt(e), {
            l: Math.round((u * .2104542553 + f * .793617785 + e * -.0040720468) * 1e3),
            a: Math.round((u * 1.9779984951 + f * -2.428592205 + e * .4505937099) * 1e3),
            b: Math.round((u * .0259040371 + f * .7827717662 + e * -.808675766) * 1e3)
        };
    }
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
    static oklabToOklch(lab) {
        const { a, b } = lab;
        //console.log( "lab :", lab );
        // Вычисляем хрому (насыщенность) как длину вектора (a, b)
        const chroma = NumberAdjuster.rootWithPrecision(a * a + b * b, 2);
        // const chroma: number = Math.sqrt(a * a + b * b);
        //console.log( "chroma :", chroma );
        // Для наглядности вычисляем угол между компонентами a и b
        const hueRad = NumberAdjuster.getAngleWithPrecision(b, a);
        //console.log( "hueRad :", hueRad );
        // Переводим радианы в градусы
        const hueDeg = NumberAdjuster.radiansToDegrees(hueRad);
        //console.log( "hueDeg :", hueDeg );
        // Нормализуем тон к диапазону [0..360]
        const normalizedHue = hueDeg < 0 ? hueDeg + 360 : hueDeg;
        const normalizedL = NumberAdjuster.extremum('max', null, 0, NumberAdjuster.extremum('min', null, 1, lab.l));
        const normalizedC = chroma;
        return {
            l: normalizedL,
            c: chroma,
            h: normalizedHue
        };
    }
    /**
  * Преобразует гамма-скорректированное значение в линейное.
  * Используется при преобразовании sRGB → линейное RGB.
  *
  * @private
  * @static
  * @param {number} n - Значение в диапазоне [0, 1]
  * @returns {number} Линейное значение
  */
    static gammaToLinear(n) {
        return n >= .04045 ? Math.pow((n + .055) / 1.055, 2.4) : n / 12.92;
    }
    /**
 * Преобразует RGB-канал в линейное пространство.
 * Применяет гамма-коррекцию.
 *
 * @private
 * @static
 * @param {number} c - Значение канала (0–255)
 * @returns {number} Линейное значение в диапазоне [0, 1]
 */
    static toLiner(c) {
        const CLine = 0.04045;
        // Гамма-коррекция: переводим sRGB в линейное пространство
        c = c / 255;
        return c <= CLine
            ? c / 12.92
            : Math.pow((c + 0.055) / 1.055, 2.4);
    }
    /**
      * Нормализует RGB-компоненты в диапазон [0, 1].
      * Также ограничивает значения, чтобы избежать ошибок.
      *
      * @private
      * @static
      * @param {RGB} rgb - Цвет в формате RGB
      * @returns {RGB} Нормализованный цвет
      */
    static normalizeRgb(rgb) {
        return {
            r: NumberAdjuster.extremum('max', null, 0, NumberAdjuster.extremum('min', null, 1, rgb.r / 255)),
            g: NumberAdjuster.extremum('max', null, 0, NumberAdjuster.extremum('min', null, 1, rgb.g / 255)),
            b: NumberAdjuster.extremum('max', null, 0, NumberAdjuster.extremum('min', null, 1, rgb.b / 255))
        };
    }
    /**
   * Преобразует цвет из RGB в OKLCH.
   * Используется альтернативный путь: RGB → XYZ → OKLAB → OKLCH.
   *
   * @public
   * @static
   * @param {RGB} rgb - Цвет в формате RGB
   * @returns {LCH} Цвет в формате OKLCH
   */
    static rgbToOklch2(rgb) {
        // // Шаг 1: Конвертируем RGB в пространство LMS
        // const [ l, m, s ] = this.rgbToLMS( rgb.r, rgb.g, rgb.b );
        // Шаг 1: Конвертируем RGB в пространство LMS
        const [x, y, z] = this.rgbToXYZ(rgb.r, rgb.g, rgb.b);
        // // Шаг 2: Переводим LMS в OKLAB
        // const lab: LAB = this.lmsToOklab( l, m, s );
        const lab = this.xyzToOklab(x, y, z);
        //console.log( "------==== LAB====---", lab );
        // Шаг 3: Переводим OKLAB в OKLCH
        const oklch = this.oklabToOklch(lab);
        // ✅ Ограничиваем хрому, чтобы цвет был в sRGB
        const maxC = this.findMaxChroma(oklch.l * 100, oklch.h); // lightness в процентах
        //console.log( 'maxC :', maxC );
        oklch.c = NumberAdjuster.extremum('min', null, oklch.c, maxC);
        return oklch;
    }
    /**
      * Нормализует значение тона (hue) к диапазону [0..360].
      * Приводит любое число к эквивалентному углу в цветовом круге.
      *
      * @private
      * @static
      * @param {number} h - Тон в градусах
      * @returns {number} Нормализованный тон в диапазоне [0, 360]
      */
    static normalizeHue(h) {
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
    /**
  * Преобразует цвет из формата OKLCH в формат OKLAB.
  * Обратный процесс к oklabToOklch.
  *
  * @private
  * @static
  * @param {{ l: number; c: number; h: number }} oklch - Цвет в формате OKLCH
  * @returns {{ l: number; a: number; b: number }} Цвет в формате OKLAB
  */
    static oklchToOklab(oklch) {
        const rad = oklch.h * (Math.PI / 180);
        const a = oklch.c * Math.cos(rad);
        const b = oklch.c * Math.sin(rad);
        return { l: oklch.l / 100, a, b }; // ❌ Деление на 100 — ошибка!
    }
    /**
 * Преобразует цвет из OKLAB в линейное RGB.
 * Используется при проверке принадлежности цвета к sRGB.
 *
 * @private
 * @static
 * @param {LAB} param0 - Цвет в формате OKLAB
 * @returns {RGB} Цвет в линейном RGB
 */
    static oklabToLinearRgb({ l, a, b }) {
        /**
         * Вычисляем L', M', S' через кубические преобразования OKLAB → LMS.
         * Эти коэффициенты взяты из оригинального преобразования OKLAB.
         */
        const l_prime = NumberAdjuster.pow(l * 0.9999999984505198 + 0.39633779217376786 * a + 0.2158037580607588 * b, 3);
        const m = NumberAdjuster.pow(l * 1.0000000088817609 - 0.10556134232365635 * a - 0.06385417477170591 * b, 3);
        const s = NumberAdjuster.pow(l * 1.0000000546724108 - 0.08948418209496575 * a - 1.2914855378640917 * b, 3);
        /**
         * Конвертируем LMS в линейный RGB с помощью обратной матрицы преобразования.
         * Коэффициенты взяты из официального описания OKLAB.
         */
        return {
            r: 4.076741661347994 * l_prime -
                3.307711590408193 * m +
                0.230969928729428 * s,
            g: -1.2684380040921763 * l_prime +
                2.6097574006633715 * m -
                0.3413193963102197 * s,
            b: -0.004196086541837188 * l_prime -
                0.7034186144594493 * m +
                1.7076147009309444 * s
        };
    }
    /**
    * Проверяет, находится ли цвет в пределах sRGB-гаммы.
    * Цвет должен иметь все компоненты в диапазоне [0, 1].
    *
    * @private
    * @static
    * @param {RGB} rgb - Цвет в формате RGB
    * @returns {boolean} true, если цвет в sRGB, иначе false
    */
    static isInSrgb(rgb) {
        /**
         * Проверяем, что каждая компонента цвета:
         * - Не меньше 0
         * - Не больше 1
         */
        return (rgb.r >= 0 && rgb.r <= 1 &&
            rgb.g >= 0 && rgb.g <= 1 &&
            rgb.b >= 0 && rgb.b <= 1);
    }
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
    static findMaxChroma(lightness, hue, step = 0.001, maxChroma = 0.4) {
        /**
         * Начальное значение хромы.
         */
        let c = 0;
        /**
         * Преобразуем светлоту из процентного значения [0..100] в диапазон [0..1].
         * Затем последовательно увеличиваем хрому, пока цвет в RGB не выйдет за пределы sRGB.
         */
        while (c <= maxChroma) {
            const lab = this.oklchToOklab({
                l: lightness / 100, // нормализуем светлоту
                c,
                h: this.normalizeHue(hue) // нормализуем тон к диапазону [0..360]
            });
            const rgb = this.oklabToLinearRgb(lab); // преобразуем в линейный RGB
            /**
             * Если цвет вышел за пределы sRGB — прерываем цикл.
             */
            if (!this.isInSrgb(rgb))
                break;
            c += step; // увеличиваем хрому
        }
        /**
         * Возвращаем максимальную хрому, которая ещё укладывается в sRGB.
         * Округляем до 3 знаков после запятой.
         */
        return parseFloat((c - step).toFixed(3));
    }
    /**
    * Генерирует массив значений светлоты на основе дробей из fractions15.
    * Каждое значение = (num/denom)*100, округлённое до 2 знаков.
    *
    * @private
    * @static
    * @returns {number[]} Массив значений светлоты в процентах
    */
    static generateLightnessValues() {
        /**
         * Для каждого элемента из this.fractions вычисляем процентную долю от деления num / denom,
         * умноженную на 100, и округляем до двух знаков после запятой.
         */
        return this.fractions15
            .map(([num, denom]) => {
            const value = (num / denom) * 100;
            return parseFloat(value.toFixed(2)); // Округление до двух знаков после запятой
        });
    }
    /**
 * Генерирует массив значений светлоты на основе дробей из fraction9.
 * Используется в альтернативной палитре.
 *
 * @private
 * @static
 * @returns {number[]} Массив значений светлоты в процентах
 */
    static generateLightnessValuesByOklch() {
        /**
         * Для каждого элемента из this.fractions вычисляем процентную долю от деления num / denom,
         * умноженную на 100, и округляем до двух знаков после запятой.
         */
        return this.fraction9
            .map(([num, denom]) => {
            const value = (num / denom) * 100;
            return parseFloat(value.toFixed(2)); // Округление до двух знаков после запятой
        });
    }
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
    static generatePaletteForHueInternal(hue, name_color = "empty") {
        /**
         * Получаем массив процентных значений светлоты (например: [98.96, 97.92, ..., 8.33]).
         */
        const lightnessValues = this.generateLightnessValues();
        /**
         * Массив для хранения готовых CSS переменных.
         */
        const palette = [];
        /**
         * Счётчик индексов для именования переменных (от 0 до 15).
         */
        let i = 0;
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
            const C = this.findMaxChroma(L, hue);
            const N = L / 100; // нормализация светлоты в диапазон [0..1]
            palette.push(`--#{prefix.$name}oklch-${name_color.toLowerCase()}-${i} : oklch(${parseFloat(N.toFixed(4))} ${C} ${hue});`);
            palette.push(`--#{prefix.$name}${name_color.toLowerCase()}-${i} : ${parseFloat(N.toFixed(4))} ${C} ${hue};`);
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
    static generatePaletteForHueInternalByOKLCH(hue, chroma, name_color = "empty") {
        /**
         * Получаем массив процентных значений светлоты (например: [98.96, 97.92, ..., 8.33]).
         */
        const lightnessValues = this.generateLightnessValuesByOklch();
        /**
         * Массив для хранения готовых CSS переменных.
         */
        const palette = [];
        /**
         * Счётчик индексов для именования переменных (от 0 до 15).
         */
        let i = 0;
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
            const C = this.findMaxChroma(L, hue);
            const N = L / 100; // нормализация светлоты в диапазон [0..1]
            palette.push(`--#{prefix.$name}oklch-${name_color.toLowerCase()}-${i} : oklch(${parseFloat(N.toFixed(4))} ${chroma} ${hue});`);
            palette.push(`--#{prefix.$name}${name_color.toLowerCase()}-${i} : ${parseFloat(N.toFixed(4))} ${chroma} ${hue};`);
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
 * Генерирует CSS-палитру на основе входного цвета.
 * Цвет может быть в формате HEX, имени, ID или числе.
 *
 * @public
 * @static
 * @param {string | number} colorInput - Входной цвет
 * @param {string} name_color - Название группы
 * @returns {string[]} Массив CSS-переменных
 */
    static generatePaletteFromColor(colorInput, name_color = "empty") {
        let hue = null;
        let rgb = null;
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
            const color = this.getColorRgb(colorInput);
            name_color = color.name ?? name_color ?? colorInput;
            rgb = color.rgb ?? null;
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
        const oklch = this.rgbToOKLCH(rgb);
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
    /**
     * Генерирует CSS-палитру с фиксированной насыщенностью на основе входного цвета.
     *
     * @public
     * @static
     * @param {string | number} colorInput - Входной цвет
     * @param {string} name_color - Название группы
     * @returns {string[]} Массив CSS-переменных
     */
    static generatePaletteFromColorByOKLCH(colorInput, name_color = "empty") {
        let hue = null;
        let rgb = null;
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
            const color = this.getColorRgb(colorInput);
            name_color = color.name ?? name_color ?? colorInput;
            rgb = color.rgb ?? null;
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
        const oklch = this.rgbToOKLCH(rgb);
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
//# sourceMappingURL=ColorConverter.js.map