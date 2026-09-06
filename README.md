# Vela Spectrum

Личная цветовая система для VS Code на перцептуально равномерном пространстве **OKLCH**. Версия расширения: **0.3.7**.

10 тем: пять режимов (`normal`, `dimmed`, `highContrast`, `colorblind`, `tritanopia`) × тёмный и светлый варианты.

## Установка

1. Установите расширение **Vela Spectrum** из Marketplace или из `.vsix`.
2. `Code` → `Preferences: Color Theme` (или `Cmd/Ctrl+K` затем `Cmd/Ctrl+T`).
3. Выберите одну из тем ниже — **ровно с этими подписями** (это `contributes.themes[].label` из `package.json`):

| Тема | `uiTheme` | Файл |
|------|-----------|------|
| **Vela Spectrum Dark+** | `vs-dark` | `themes/default-d.json` |
| **Vela Spectrum Dimmed** | `vs-dark` | `themes/default-dd.json` |
| **Vela Spectrum High Contrast** | `hc-black` | `themes/default-dhc.json` |
| **Vela Spectrum Colorblind** | `vs-dark` | `themes/default-dc.json` |
| **Vela Spectrum Tritanopia** | `hc-black` | `themes/default-dt.json` |
| **Vela Spectrum Light+** | `vs` | `themes/default-l.json` |
| **Vela Spectrum Dimmed Light** | `vs` | `themes/default-ld.json` |
| **Vela Spectrum High Contrast Light** | `hc-light` | `themes/default-lhc.json` |
| **Vela Spectrum Colorblind Light** | `vs` | `themes/default-lc.json` |
| **Vela Spectrum Tritanopia Light** | `hc-light` | `themes/default-lt.json` |

Пример в `settings.json`:

```json
{
  "workbench.colorTheme": "Vela Spectrum Dark+",
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active"
}
```

> В JSON темы поле `type` — только `"dark"` или `"light"`. Базовый chrome VS Code задаётся через `uiTheme` в `package.json` (`vs-dark` / `vs` / `hc-black` / `hc-light`).

## Режимы

| Режим | Назначение |
|-------|------------|
| `normal` | Стандартная палитра (Dark+ / Light+) |
| `dimmed` | Приглушённые акценты и ниже насыщенность |
| `highContrast` | Усиленный контраст UI и синтаксиса; HC Light исправлен (без «схлопывания» светлоты) |
| `colorblind` | Перестройка палитры под протанопию/дейтеранопию |
| `tritanopia` | Перестройка под тританопию (сине-жёлтая ось) |

Отдельных режимов `ai`, `auto` или «11-го режима» **нет**.

## Цветовая философия

- Палитра **семантическая**: роли вроде canvas / fg / accent / success / danger / warning / syntax, а не произвольные HEX по экрану.
- **Зелёный** — акцент для прогресса, success, git-added, primary CTA и похожих сигналов. Он **не** залит на весь chrome: после refresh `success.emphasis` ослаблен, лишний «зелёный интерфейс» убран в пользу нейтралей и accent.
- **Warning ≠ error**: предупреждения и ошибки разведены по тону и роли.
- Мягче основной foreground, отдельные уровни светлоты синтаксиса для light/dark, заметный `focusBorder`, комментарии ближе к AA.

В темах включён `semanticHighlighting: true` и TextMate `tokenColors`. Отдельного блока `semanticTokenColors` пока **нет**.

Стили для Copilot / Inline Chat / inlay hints задаются через обычные цвета workbench и токенов там, где VS Code это позволяет — без отдельного «AI-режима».

## Как работает цвет: OKLCH → HEX

Источник правды — TypeScript-библиотека `src/colors/ColorConverter.ts` (`OKLCHColorGenerator`).

1. Цвета библиотеки и пресетов задаются как **HEX** (и имена из `src/colors/colors.json`).
2. Конвертер переводит **HEX → sRGB → linear RGB → OKLab → OKLCH**.
3. В OKLCH: **`l` ∈ [0..1]**, `c` ≥ 0, `h` ∈ [0..360).
4. `ThemeColors` строит семантические роли с учётом режима и dark/light.
5. `ThemeElementName` + `applyAlpha` мапят роли на ключи VS Code; `oklchToHex(l, c, h, alpha)` пишет итоговый HEX (с альфой при необходимости).

Не путать с HSL: одинаковый шаг по `l`/`c` в OKLCH ближе к одинаковому шагу восприятия.

## Структура репозитория

```
src/                 # генератор (в git): ColorConverter, ThemeColors, ThemeElementName, ThemeGenerator
themes/*.json        # готовые темы для VS Code (регенерируются сборкой)
package.json         # contributes.themes (label + uiTheme + path)
VelaSpectrum.png     # иконка расширения (корень пакета)
images/demo/         # скриншоты PNG/GIF для README (не обязательны в .vsix)
```

Исходники генератора снова в git: чистый clone может пересобрать темы. В `.vsix` попадают в основном `themes/`, манифест и иконка; `src/`, `scripts/`, `dist/` в пакет не кладутся (см. `.vscodeignore`).

## Сборка из исходников

```bash
npm install
npm run build          # tsc && node dist/main.js → themes/default-*.json
npm run check-colors   # проверка палитры
npm run watch          # пересборка при правках src/
npm run package        # check-colors + generate-package.js + vsce package
```

`npm run package` обновляет `contributes.themes` из файлов в `themes/` по шаблону `package.json.template` — после упаковки сверьте `version` и labels.

## Скриншоты

Скриншоты лежат в репозитории (`images/demo/…`). Ниже — абсолютные URL на `main`, чтобы превью работало и на GitHub, и в Marketplace (тяжёлые demo-ассеты в `.vsix` не включаются).

### PNG

![Vela Spectrum Dark+](https://raw.githubusercontent.com/Telianedward/VelaSpectrum/main/images/demo/png/VelaSpectrumDark.png)

![Vela Spectrum Light+](https://raw.githubusercontent.com/Telianedward/VelaSpectrum/main/images/demo/png/VelaSpectrumLight.png)

![Vela Spectrum Colorblind](https://raw.githubusercontent.com/Telianedward/VelaSpectrum/main/images/demo/png/VelaSpectrumColorblind.png)

![Vela Spectrum Colorblind Light](https://raw.githubusercontent.com/Telianedward/VelaSpectrum/main/images/demo/png/VelaSpectrumColorblindLight.png)

![Vela Spectrum Dimmed](https://raw.githubusercontent.com/Telianedward/VelaSpectrum/main/images/demo/png/VelaSpectrumDimmed.png)

![Vela Spectrum Dimmed Light](https://raw.githubusercontent.com/Telianedward/VelaSpectrum/main/images/demo/png/VelaSpectrumDimmedLight.png)

![Vela Spectrum High Contrast](https://raw.githubusercontent.com/Telianedward/VelaSpectrum/main/images/demo/png/VelaSpectrumHighContrast.png)

![Vela Spectrum High Contrast Light](https://raw.githubusercontent.com/Telianedward/VelaSpectrum/main/images/demo/png/VelaSpectrumHighContrastLight.png)

![Vela Spectrum Tritanopia](https://raw.githubusercontent.com/Telianedward/VelaSpectrum/main/images/demo/png/VelaSpectrumTritanopia.png)

![Vela Spectrum Tritanopia Light](https://raw.githubusercontent.com/Telianedward/VelaSpectrum/main/images/demo/png/VelaSpectrumTritanopiaLight.png)

### GIF

![Dark+](https://raw.githubusercontent.com/Telianedward/VelaSpectrum/main/images/demo/gif/VelaSpectrumDark.gif)

![Light+](https://raw.githubusercontent.com/Telianedward/VelaSpectrum/main/images/demo/gif/VelaSpectrumLight.gif)

![Colorblind](https://raw.githubusercontent.com/Telianedward/VelaSpectrum/main/images/demo/gif/VelaSpectrumColorblind.gif)

![Colorblind Light](https://raw.githubusercontent.com/Telianedward/VelaSpectrum/main/images/demo/gif/VelaSpectrumColorblindLight.gif)

![Dimmed](https://raw.githubusercontent.com/Telianedward/VelaSpectrum/main/images/demo/gif/VelaSpectrumDimmed.gif)

![Dimmed Light](https://raw.githubusercontent.com/Telianedward/VelaSpectrum/main/images/demo/gif/VelaSpectrumDimmedLight.gif)

![High Contrast](https://raw.githubusercontent.com/Telianedward/VelaSpectrum/main/images/demo/gif/VelaSpectrumHighContrast.gif)

![High Contrast Light](https://raw.githubusercontent.com/Telianedward/VelaSpectrum/main/images/demo/gif/VelaSpectrumHighContrastLight.gif)

![Tritanopia](https://raw.githubusercontent.com/Telianedward/VelaSpectrum/main/images/demo/gif/VelaSpectrumTritanopia.gif)

![Tritanopia Light](https://raw.githubusercontent.com/Telianedward/VelaSpectrum/main/images/demo/gif/VelaSpectrumTritanopiaLight.gif)

## Лицензия

MIT. Репозиторий: [Telianedward/VelaSpectrum](https://github.com/Telianedward/VelaSpectrum).
