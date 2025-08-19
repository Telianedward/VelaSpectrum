// src/colors/GenerateColor.ts
import fs from 'node:fs';
import path from 'node:path';
import OKLCHColorGenerator from './ColorConverter.js';
// Тест: жёлтый цвет из colors.json
const rgb = { mode: 'rgb', r: 255, g: 199, b: 0 };
console.log('Rgb', rgb);
// 1. RGB → OKLCH
const oklch = OKLCHColorGenerator.rgbToOKLCH(rgb);
console.log('OKLCH:', oklch); // → l: 0.8555
// 2. OKLCH → RGB (обратно)
const rgbBack = OKLCHColorGenerator.oklchToRgb({
    l: oklch.l * 100, // ✅ 85.55
    c: oklch.c,
    h: oklch.h
});
console.log('RGB обратно:', rgbBack); // → { r: 255, g: 199, b: 0 }
// 3. OKLCH → HEX (важно: l * 100!)
const hex = OKLCHColorGenerator.oklchToHex(oklch.l * 100, // ✅ Умножаем на 100
oklch.c, oklch.h, 1);
console.log('HEX:', hex); // → #ffc700
// 4. С прозрачностью
const hex80 = OKLCHColorGenerator.oklchToHex(oklch.l * 100, oklch.c, oklch.h, 0.8);
console.log('HEX 80% alpha:', hex80); // → #ffc700cc
