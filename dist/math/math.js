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
    static adjustWithPrecision = (type, value, precision = 0) => {
        // Если точность не указана или равна нулю — применяем стандартные методы Math
        if ((typeof precision === 'undefined') || (+precision === 0)) {
            return type === 'round'
                ? Math.round(value)
                : type === 'floor'
                    ? Math.floor(value)
                    : type === 'ceil'
                        ? Math.ceil(value)
                        : Math.round(value);
        }
        // Приводим входное значение и точность к числу
        value = +value;
        precision = +precision;
        // Проверяем корректность входных данных
        if (isNaN(value) ||
            !(typeof precision === 'number' && precision % 1 === 0)) {
            return NaN;
        }
        // Разбираем число на мантиссу и экспоненту
        const [mantissa, exponent] = value.toString().split('e');
        // Выполняем коррекцию с учетом типа и точности
        const adjustedValue = type === 'round'
            ? Math.round(+(mantissa + 'e' + (exponent ? (+exponent - precision) : -precision)))
            : type === 'floor'
                ? Math.floor(+(mantissa + 'e' + (exponent ? (+exponent - precision) : -precision)))
                : type === 'ceil'
                    ? Math.ceil(+(mantissa + 'e' + (exponent ? (+exponent - precision) : -precision)))
                    : Math.round(+(mantissa + 'e' + (exponent ? (+exponent - precision) : -precision)));
        // Возвращаем число к исходной точности
        const [adjustedMantissa, adjustedExponent] = adjustedValue.toString().split('e');
        return +(adjustedMantissa + 'e' + (adjustedExponent ? (+adjustedExponent + precision) : precision));
    };
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
    static radiansToDegrees(radians) {
        return radians * (180 / Math.PI);
    }
    /**
     * Переводит градусы в радианы.
     */
    static degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
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
    static trig(fn, angle, inDegrees = false, precision = null) {
        // Преобразуем угол в радианы, если нужно
        let rad = inDegrees ? this.degreesToRadians(angle) : angle;
        let result;
        switch (fn) {
            case 'cos':
                result = Math.cos(rad);
                break;
            case 'sin':
                result = Math.sin(rad);
                break;
            case 'tan':
                result = Math.tan(rad);
                break;
            case 'ctan':
                result = 1 / Math.tan(rad);
                break;
            default:
                return NaN;
        }
        // Обработка возможных погрешностей (например, ~6e-16 вместо 0)
        if (this.abs(result) < 1e-10)
            result = 0;
        // Округление с заданной точностью
        // Применяем коррекцию с заданной точностью
        if (precision != null) {
            return this.adjustWithPrecision('round', result, precision);
        }
        return result;
    }
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
    static abs(value, precision = null) {
        const num = +value;
        if (isNaN(num)) {
            return NaN;
        }
        const absolute = Math.abs(num);
        // return this.adjustWithPrecision('round', absolute, precision);
        if (precision != null) {
            return this.adjustWithPrecision('round', absolute, precision);
        }
        return absolute;
    }
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
    static getAngleWithPrecision(y, x, precision = null, toDegrees = false) {
        let angle = Math.atan2(y, x);
        if (toDegrees) {
            angle = this.radiansToDegrees(angle); // радианы → градусы
        }
        if (precision != null) {
            return this.adjustWithPrecision('round', angle, precision);
        }
        return angle;
    }
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
    static rootWithPrecision = (value, rootDegree = 3, precision = null) => {
        // Проверяем корректность входных данных
        if (typeof value !== 'number' || typeof rootDegree !== 'number' || rootDegree <= 0) {
            return NaN;
        }
        // Нечетные степени допускают отрицательные значения
        const isNegative = value < 0;
        // Обрабатываем специальные случаи
        if (value === 0)
            return 0;
        if (value === Infinity)
            return Infinity;
        if (value === -Infinity)
            return -Infinity;
        // Вычисляем корень
        const absValue = Math.abs(value);
        const result = isNegative
            ? -Math.pow(-absValue, rootDegree)
            : Math.pow(absValue, rootDegree);
        // Применяем коррекцию с заданной точностью
        if (precision != null) {
            return this.adjustWithPrecision('round', result, precision);
        }
        return result;
    };
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
    static extremum(type, precision = null, ...numbers) {
        if (!Array.isArray(numbers) || numbers.length === 0) {
            return NaN;
        }
        const filtered = numbers.filter((n) => !isNaN(+n));
        if (filtered.length === 0)
            return NaN;
        const result = type === 'min'
            ? Math.min(...filtered)
            : Math.max(...filtered);
        if (precision != null) {
            const precisionValue = precision ?? 0;
            return this.adjustWithPrecision('round', result, precisionValue);
        }
        return result;
    }
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
    static pow(base, exponent, precision = null) {
        const numBase = +base;
        const numExponent = +exponent;
        if (isNaN(numBase) || isNaN(numExponent)) {
            return NaN;
        }
        const result = Math.pow(numBase, numExponent);
        // Применяем коррекцию с заданной точностью
        if (precision != null) {
            return this.adjustWithPrecision('round', result, precision);
        }
        return result;
    }
    /**
     *  оригинальный метод написанный мной
     * @param type
     * @param value
     * @param precision
     * @returns
     */
    static adjustWithPrecision3 = (type, value, precision = 0) => {
        if ((`undefined` === typeof precision) ||
            (+precision === 0)) {
            return ((type == `round`) ? (Math.round(value)) : ((type == `floor`) ? (Math.floor(value)) : ((type == `ceil`) ? (Math.ceil(value)) : Math.round(value))));
        }
        value = +value;
        precision = +precision;
        if (isNaN(value) ||
            !((`number` === typeof precision) &&
                (precision % 1 === 0))) {
            return NaN;
        }
        value = value.toString().split(`e`);
        value = ((type == `round`) ? (Math.round(+(value[0] + `e` + (value[1] ? (+value[1] - precision) : -precision)))) : ((type == `floor`) ? (Math.floor(+(value[0] + `e` + (value[1] ? (+value[1] - precision) : -precision)))) : ((type == `ceil`) ? (Math.ceil(+(value[0] + `e` + (value[1] ? (+value[1] - precision) : -precision)))) : Math.round(+(value[0] + `e` + (value[1] ? (+value[1] - precision) : -precision))))));
        value = value.toString().split(`e`);
        return +(value[0] + `e` + (value[1] ? (+value[1] + precision) : precision));
    };
}
