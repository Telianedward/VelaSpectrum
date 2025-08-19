// src/colors/palette.ts
import  ColorConverter  from '../colors/ColorConverter.js';

// === Типы ===
type ThemeType = 'dark' | 'light';
type VisionMode = 'normal' | 'colorblind' | 'tritanopia';

// === Основная палитра ===
export class VelaPalette {
  private static readonly accentHue = 270; // Сине-фиолетовый (можно менять)
  private static readonly accentChroma = 0.25;

  static get(theme: ThemeType, mode: VisionMode) {
    const isDark = theme === 'dark';
    const lBase = isDark ? 0.08 : 0.96; // фон
    const lText = isDark ? 0.85 : 0.18; // текст
    const lMuted = isDark ? 0.65 : 0.35; // приглушённый
    const alpha = (a: number) => a;

    // Коррекция для цветослепоты
    const h = this.getAdjustedHue(mode, this.accentHue);

    return {
      // --- Базовые ---
      'vela.base.bg': ColorConverter.oklchToHex(lBase, 0, 0, 1),
      'vela.base.fg': ColorConverter.oklchToHex(lText, 0.02, 220, 1),
      'vela.base.border': ColorConverter.oklchToHex(lMuted, 0.02, 220, alpha(0.3)),

      // --- Акцент ---
      'vela.accent.primary': ColorConverter.oklchToHex(0.8, this.accentChroma, h, 1),
      'vela.accent.focus': ColorConverter.oklchToHex(0.7, this.accentChroma * 1.1, h, alpha(0.8)),
      'vela.accent.hover': ColorConverter.oklchToHex(0.7, this.accentChroma, h, alpha(0.6)),

      // --- Приглушённые ---
      'vela.muted.weak': ColorConverter.oklchToHex(lMuted, 0.01, 220, alpha(0.15)),
      'vela.muted.medium': ColorConverter.oklchToHex(lMuted, 0.02, 220, alpha(0.4)),

      // --- Состояния ---
      'vela.state.success': ColorConverter.oklchToHex(0.7, 0.20, 140, 1),
      'vela.state.warning': ColorConverter.oklchToHex(0.8, 0.22, 75, 1),
      'vela.state.error': ColorConverter.oklchToHex(0.7, 0.25, 15, 1),
      'vela.state.info': ColorConverter.oklchToHex(0.7, 0.25, 270, 1),

      // --- Специальные ---
      'vela.canvas.overlay': ColorConverter.oklchToHex(lBase, 0, 0, alpha(0.8)),
      'vela.scrollbar.bg': ColorConverter.oklchToHex(lMuted, 0.02, 220, alpha(0.1))
    };
  }

  // Коррекция тона для цветослепоты
  private static getAdjustedHue(mode: VisionMode, originalHue: number): number {
    switch (mode) {
      case 'colorblind':
        return Math.abs(originalHue - 270) < 30 ? 250 : originalHue; // Сдвиг синего
      case 'tritanopia':
        return originalHue > 200 && originalHue < 300 ? 200 : originalHue; // Убрать сине-фиолетовый
      default:
        return originalHue;
    }
  }
}