// src/themes/colorPalettePresets.ts

/**
 * Пресеты цветовых палитр для Vela Spectrum.
 * Каждый пресет определяет, какие цвета из `colors.json` использовать
 * для каждой семантической роли.
 */

export type ColorRole = 'accent' | 'success' | 'danger' | 'warning' | 'info' | 'fg' | 'canvas';

export type ColorPalette = {
  [key in ColorRole]: string; // название цвета из colors.json, например 'blues'
};

/**
 * Пресет: Синяя тема (по умолчанию)
 */
export const bluePalette: ColorPalette = {
  accent: 'blues',
  success: 'greens',
  danger: 'reds',
  warning: 'yellows',
  info: 'cerulean',
  fg: 'neutrals',
  canvas: 'jetblack'
};

/**
 * Пресет: Зелёная тема
 */
export const greenPalette: ColorPalette = {
  accent: 'greens',
  success: 'greens',
  danger: 'reds',
  warning: 'yellows',
  info: 'teals',
  fg: 'neutrals',
  canvas: 'jetblack'
};

/**
 * Пресет: Пастельная тема
 */
export const pastelPalette: ColorPalette = {
  accent: 'pinks',
  success: 'mints',
  danger: 'corals',
  warning: 'yellows',
  info: 'lavenders',
  fg: 'lightgray',
  canvas: 'alabasterwhite'
};

/**
 * Пресет: Тёмный акцент, светлые иконки
 */
export const contrastPalette: ColorPalette = {
  accent: 'deepblues',
  success: 'brightgreens',
  danger: 'firereds',
  warning: 'gold',
  info: 'electricblues',
  fg: 'white',
  canvas: 'black'
};

// Экспорт всех пресетов
export const palettes = {
  default: bluePalette,
  green: greenPalette,
  pastel: pastelPalette,
  contrast: contrastPalette
};