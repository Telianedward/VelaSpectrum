// src/utils/color.ts
import OKLCHColorGenerator from '../colors/ColorConverter.js';

/**
 * Применяет прозрачность к цвету в формате OKLCH и возвращает HEX.
 * @param oklch - Объект { l, c, h } (l в диапазоне [0..1])
 * @param alphaPercent - Прозрачность от 0 до 10 (где 10 = 100%)
 * @returns HEX-строка, например #a1b2c3cc
 */
export function applyAlpha(oklch: { l: number; c: number; h: number }, alphaPercent: number): string {
  const alpha = alphaPercent / 10;
  return OKLCHColorGenerator.oklchToHex(oklch.l * 100, oklch.c, oklch.h, alpha);
}