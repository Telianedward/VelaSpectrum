/**
 *
 *
 * Класс для корректировки чисел с заданной точностью (округление, вверх, вниз).
 * Поддерживает работу с числами в экспоненциальной записи.
 */
export default class NumberAdjuster {
    /**
     * Корректирует число с указанной точностью.
     *
     * @param {string} type - Тип коррекции: 'round', 'floor' или 'ceil'.
     * @param {number} value - Число, которое нужно скорректировать.
     * @param {number} [precision=0] - Точность (показатель степени 10), может быть отрицательным.
     * @returns {number} Скорректированное число.
     *
     * @example
     * NumberAdjuster.adjustWithPrecision('round', 55.55, -1); // 55.6
     * NumberAdjuster.adjustWithPrecision('round', 55.549, -1); // 55.5
     * NumberAdjuster.adjustWithPrecision('round', 55, 1); // 60
     * NumberAdjuster.adjustWithPrecision('round', 54.9, 1); // 50
     * NumberAdjuster.adjustWithPrecision('round', -55.55, -1); // -55.5
     * NumberAdjuster.adjustWithPrecision('round', -55.551, -1); // -55.6
     * NumberAdjuster.adjustWithPrecision('round', -55, 1); // -50
     * NumberAdjuster.adjustWithPrecision('round', -55.1, 1); // -60
     * NumberAdjuster.adjustWithPrecision('round', 1.005, -2); // 1.01
     * NumberAdjuster.adjustWithPrecision('floor', 55.59, -1); // 55.5
     * NumberAdjuster.adjustWithPrecision('floor', 59, 1); // 50
     * NumberAdjuster.adjustWithPrecision('floor', -55.51, -1); // -55.6
     * NumberAdjuster.adjustWithPrecision('floor', -51, 1); // -60
     * NumberAdjuster.adjustWithPrecision('ceil', 55.51, -1); // 55.6
     * NumberAdjuster.adjustWithPrecision('ceil', 51, 1); // 60
     * NumberAdjuster.adjustWithPrecision('ceil', -55.59, -1); // -55.5
     * NumberAdjuster.adjustWithPrecision('ceil', -59, 1); // -50
     * оптимизирован Qwen3 io  для лучшей читаемости
     */
    static adjustWithPrecision: (type: string, value: any, precision?: number) => number;
    /**
     * Преобразует угол из радианов в градусы.
     *
     * @param {number} radians - Угол в радианах.
     * @returns {number} Угол в градусах.
     *
     * @example
     * radiansToDegrees(Math.PI);       // 180
     * radiansToDegrees(Math.PI / 2);   // 90
     * radiansToDegrees(0);             // 0
     * radiansToDegrees(-Math.PI / 4);  // -45
     */
    static radiansToDegrees(radians: number): number;
    /**
     * Переводит градусы в радианы.
     */
    static degreesToRadians(degrees: number): number;
    /**
     * Вычисляет тригонометрическую функцию с поддержкой точности.
     *
     * @param {'cos' | 'sin' | 'tan' | 'ctan'} fn - Тригонометрическая функция
     * @param {number} angle - Угол (в радианах или градусах)
     * @param {boolean} [inDegrees=false] - Если true, угол считается в градусах
     * @param {number} [precision=0] - Точность результата (количество знаков после запятой)
     * @returns {number} Результат вычисления функции с округлением
     *
     * @example
     * trig('cos', 60, true, 2); // 0.5
     * trig('sin', Math.PI / 2, false, 4); // 1
     * trig('tan', 45, true, 2); // 1
     * trig('ctan', 45, true, 2); // 1
     */
    static trig(fn: 'cos' | 'sin' | 'tan' | 'ctan', angle: number, inDegrees?: boolean, precision?: number | null): number;
    /**
     * Возвращает абсолютное значение числа с заданной точностью.
     *
     * @param {number} value - Число, для которого нужно найти абсолютное значение
     * @param {number} [precision=0] - Точность округления (количество знаков после запятой)
     * @returns {number} Абсолютное значение с округлением
     *
     * @example
     * abs(-5);         // 5
     * abs(-3.1415, 2); // 3.14
     * abs(2.71828, 3); // 2.718
     * abs(NaN);        // NaN
     * abs(null);       // 0
     */
    static abs(value: number, precision?: number | null): number;
    /**
     * Возвращает угол между осью X и точкой (x, y) с округлением до заданной точности.
     *
     * @param {number} y - Y-координата точки
     * @param {number} x - X-координата точки
     * @param {number} [precision=0] - Точность результата (количество знаков после запятой)
     * @param {boolean} [toDegrees=false] - Перевести ли радианы в градусы
     * @returns {number} Угол в радианах или градусах с заданной точностью
     *
     * @example
     * new NumberAdjuster().getAngleWithPrecision(1, 1, 2); // ~0.79 радиан
     * new NumberAdjuster().getAngleWithPrecision(1, 1, 2, true); // ~45.00 градусов
     */
    static getAngleWithPrecision(y: number, x: number, precision?: number | null, toDegrees?: boolean): number;
    /**
     * Вычисляет корень указанной степени из числа с заданной точностью.
     *
     * @param {number} value - Число, из которого извлекается корень.
     * @param {number} rootDegree - Степень корня (натуральное число > 0).
     * @param {number} [precision=0] - Точность результата (десятичная степень), может быть отрицательной.
     * @returns {number} Корень указанной степени с заданной точностью.
     *
     * =====  если не вводить 3 аргумен округлять не будет =====
     * @example
     * NumberAdjuster.rootWithPrecision(16, 2);        // 4 (квадратный корень)
     * NumberAdjuster.rootWithPrecision(27, 3);        // 3 (кубический корень)
     * NumberAdjuster.rootWithPrecision(-27, 3);       // -3
     * NumberAdjuster.rootWithPrecision(0.0001, 4, 4); // 0.1
     * NumberAdjuster.rootWithPrecision(10, 5, 3);     // 1.585
     * NumberAdjuster.rootWithPrecision(-4, 2);        // NaN (четная степень, отрицательное число)
     */
    static rootWithPrecision: (value: number, rootDegree?: number, precision?: number | null) => number;
    /**
 * Возвращает минимальное или максимальное значение из списка чисел с заданной точностью.
 *
 * @param {'min' | 'max'} type - Тип операции: 'min' или 'max'
 * @param {number} [precision=0] - Точность результата (количество знаков после запятой)
 * @param {...number} numbers - Список чисел
 * @returns {number} Результат с округлением
 *
 * @example
 * extremum('min', null, 2, 3.1415, 2.718, 1.618); // 1.62
 * extremum('max', null, 1, 3.1415, 2.718, 1.618); // 3.1
 * extremum('min', null, 0, -5, 10, 0);            // -5
 * extremum('max', null, undefined, 1, 2, 3);      // 3
 * extremum('min', null,  NaN, 1, 2, 3);            // NaN
 */
    static extremum(type: 'min' | 'max', precision?: number | null, ...numbers: number[]): number;
    /**
     * Возводит число в степень с поддержкой точности округления.
     *
     * @param {number} base - Основание (число, которое нужно возвести в степень)
     * @param {number} exponent - Показатель степени
     * @param {number} [precision=0] - Точность результата (количество знаков после запятой)
     * @returns {number} Результат возведения в степень с округлением
     *
     * @example
     * pow(2, 3);              // 8
     * pow(5, 2);              // 25
     * pow(2, -2);             // 0.25
     * pow(25, 0.5);           // 5
     * pow(27, 1/3);           // 3
     * pow(2, 3, 0);           // 8
     * pow(2, 3, 2);           // 8
     * pow(2.1234, 2, 2);      // 4.51
     */
    static pow(base: number, exponent: number, precision?: number | null): number;
    /**
     *  оригинальный метод написанный мной
     * @param type
     * @param value
     * @param precision
     * @returns
     */
    static adjustWithPrecision3: (type: string, value: any, precision?: number) => number;
}
//# sourceMappingURL=math.d.ts.map