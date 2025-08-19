// src/colors/ThemeColors.ts

import OKLCHColorGenerator from './ColorConverter.js';
import { type ColorPalette } from '../themes/colorPalettePresets.js';

type ThemeMode = 'normal' | 'dimmed' | 'highContrast' | 'colorblind' | 'tritanopia';

export class ThemeColors {
  static generate(palette: ColorPalette, mode: ThemeMode) {
    // Получаем OKLCH для каждой роли
    const accent = this.getOklch(palette.accent);
    const success = this.getOklch(palette.success);
    const danger = this.getOklch(palette.danger);
    const warning = this.getOklch(palette.warning);
    const info = this.getOklch(palette.info);
    const fg = this.getOklch(palette.fg);
    const canvas = this.getOklch(palette.canvas);

    // Коррекция для цветослепоты
    const hAccent = this.adjustHue(accent.h, mode);
    const cAccent = this.adjustChroma(accent.c, mode);
    const cSuccess = this.adjustChroma(success.c, mode);
    const cDanger = this.adjustChroma(danger.c, mode);
    const cWarning = this.adjustChroma(warning.c, mode);
    const cInfo = this.adjustChroma(info.c, mode);

    // Базовые светлоты
    const isDark = mode !== 'normal' && mode !== 'highContrast' && mode !== 'colorblind' && mode !== 'tritanopia';
    const lBg = isDark ? 0.08 : 0.96;
    const lFg = isDark ? 0.85 : 0.18;
    const lMuted = isDark ? 0.65 : 0.35;

    return {
      // --- Canvas ---
      canvas: {
        inset: { l: lBg, c: 0, h: 220 },
        overlay: { l: lBg, c: 0, h: 220 }
      },

      // --- Foreground ---
      fg: {
        default: { l: lFg, c: fg.c, h: fg.h },
        muted: { l: lMuted, c: fg.c * 0.8, h: fg.h },
        subtle: { l: lMuted, c: fg.c * 0.6, h: fg.h }
      },

      // --- Accent ---
      accent: {
        fg: { l: 0.8, c: cAccent, h: hAccent },
        emphasis: { l: 0.7, c: cAccent * 1.1, h: hAccent },
        muted: { l: 0.6, c: cAccent * 0.8, h: hAccent }
      },

      // --- Success ---
      success: {
        fg: { l: 0.7, c: cSuccess, h: success.h },
        emphasis: { l: 0.6, c: cSuccess * 1.2, h: success.h },
        muted: { l: 0.6, c: cSuccess * 0.8, h: success.h }
      },

      // --- Danger ---
      danger: {
        fg: { l: 0.7, c: cDanger, h: danger.h },
        emphasis: { l: 0.6, c: cDanger * 1.2, h: danger.h },
        muted: { l: 0.6, c: cDanger * 0.8, h: danger.h }
      },

      // --- Warning (Severe) ---
      severe: {
        fg: { l: 0.8, c: cWarning, h: warning.h },
        emphasis: { l: 0.7, c: cWarning * 0.9, h: warning.h },
        muted: { l: 0.6, c: cWarning * 0.7, h: warning.h }
      },

      // --- Attention ---
      attention: {
        fg: { l: 0.8, c: cInfo, h: info.h },
        emphasis: { l: 0.7, c: cInfo * 1.1, h: info.h }
      },

      // --- Sponsors ---
      sponsors: {
        fg: { l: 0.75, c: accent.c * 0.9, h: accent.h + 30 },
        muted: { l: 0.6, c: accent.c * 0.7, h: accent.h + 30 }
      },

      // --- Done ---
      done: {
        fg: { l: 0.7, c: cSuccess * 0.9, h: success.h },
        emphasis: { l: 0.6, c: cSuccess * 1.1, h: success.h },
        muted: { l: 0.6, c: cSuccess * 0.6, h: success.h }
      },

      // --- Closed ---
      closed: {
        fg: { l: 0.6, c: cDanger * 0.9, h: danger.h }
      },

      // --- Open ---
      open: {
        fg: { l: 0.7, c: success.c * 0.8, h: success.h - 20 },
        emphasis: { l: 0.6, c: success.c * 1.0, h: success.h - 20 }
      },

      // --- ANSI Colors ---
      ansi: {
        black: { l: 0.05, c: 0, h: 0 },
        red: { l: 0.6, c: cDanger, h: danger.h },
        green: { l: 0.6, c: cSuccess, h: success.h },
        yellow: { l: 0.7, c: cWarning, h: warning.h },
        blue: { l: 0.6, c: cInfo, h: info.h },
        magenta: { l: 0.6, c: accent.c * 0.9, h: accent.h + 15 },
        cyan: { l: 0.6, c: cInfo * 0.9, h: info.h - 15 },
        white: { l: 0.9, c: 0.01, h: 220 },
        blackBright: { l: 0.15, c: 0, h: 0 },
        redBright: { l: 0.7, c: cDanger * 1.1, h: danger.h },
        greenBright: { l: 0.7, c: cSuccess * 1.1, h: success.h },
        yellowBright: { l: 0.8, c: cWarning * 1.1, h: warning.h },
        blueBright: { l: 0.7, c: cInfo * 1.1, h: info.h },
        magentaBright: { l: 0.7, c: accent.c * 1.0, h: accent.h + 15 },
        cyanBright: { l: 0.7, c: cInfo * 1.0, h: info.h - 15 },
        whiteBright: { l: 0.95, c: 0.02, h: 220 }
      },

      // --- Neutral ---
      neutral: {
        muted: { l: lMuted, c: 0.02, h: 220 },
        emphasis: { l: 0.7, c: 0.04, h: 220 },
        emphasisPlus: { l: 0.8, c: 0.06, h: 220 }
      },

      // --- Border ---
      border: {
        muted: { l: lMuted, c: 0.02, h: 220 }
      }
    };
  }

  private static getOklch(colorName: string) {
    const colorEntry = OKLCHColorGenerator.getColorRgb(colorName);
    if (!colorEntry) throw new Error(`Цвет "${colorName}" не найден`);

    const rgbColor = {
      mode: 'rgb' as const,
      r: colorEntry.rgb.r,
      g: colorEntry.rgb.g,
      b: colorEntry.rgb.b,
      alpha: 1
    };

    return OKLCHColorGenerator.rgbToOKLCH(rgbColor);
  }

  private static adjustHue(h: number, mode: ThemeMode): number {
    if (mode === 'colorblind') return h > 200 && h < 300 ? 250 : h;
    if (mode === 'tritanopia') return h > 200 && h < 300 ? 200 : h;
    return h;
  }

  private static adjustChroma(c: number, mode: ThemeMode): number {
    if (mode === 'dimmed') return c * 0.7;
    if (mode === 'highContrast') return Math.min(c * 1.3, 0.4);
    return c;
  }
}