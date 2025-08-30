/**
 * Применяет прозрачность к цвету в формате OKLCH и возвращает HEX.
 * @param oklch - Объект { l, c, h } (l в диапазоне [0..1])
 * @param alphaPercent - Прозрачность от 0 до 10 (где 10 = 100%)
 * @returns HEX-строка, например #a1b2c3cc
 */
export declare function applyAlpha(oklch: {
    l: number;
    c: number;
    h: number;
}, alphaPercent: number): string;
//# sourceMappingURL=color.d.ts.map