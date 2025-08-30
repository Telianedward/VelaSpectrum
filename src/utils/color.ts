import OKLCHColorGenerator from '../colors/ColorConverter.js';

/**
 * Применяет прозрачность к цвету в формате OKLCH и возвращает HEX.
 * @param oklch - Объект { l, c, h } (l в диапазоне [0..1])
 * @param alphaPercent - Прозрачность от 0 до 10 (где 10 = 100%)
 * @returns HEX-строка, например #a1b2c3cc
 */
export function applyAlpha(
  oklch: { l: number; c: number; h: number } | undefined,
  alphaPercent: number
): string {
  if (!oklch) {
    console.warn('applyAlpha: получен undefined, возвращаем fallback #808080');
    return '#808080';
  }

  const alpha = alphaPercent / 10; // 1–10 → 0.1–1.0

  // ❌ НЕ НАДО: oklch.l * 100
  // ✅ ПРАВИЛЬНО: oklch.l (в [0..1])
  return OKLCHColorGenerator.oklchToHex(oklch.l, oklch.c, oklch.h, alpha);
}