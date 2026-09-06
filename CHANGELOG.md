# Changelog

All notable changes to the **Vela Spectrum** extension are documented in this file.

Format inspired by [Keep a Changelog](https://keepachangelog.com/).

## [0.3.8] — 2026-09-06

### Fixed

- Template resolver now resolves `{{path}}N` placeholders in all `tokenColors` settings keys (including `border`), so `inlineChat.*` borders emit real HEX instead of unresolved `{{…}}10`.
- Ready for Marketplace republish after VSIX verification (placeholders gone, `type` dark/light, 10 themes, version 0.3.8).

## [0.3.7] — 2026-09-06

### Changed

- Theme refresh: softer foreground, separate light/dark syntax lightness, warning≠error, stronger `focusBorder`, comments closer to AA contrast.
- Less green chrome: `success.emphasis` no longer paints most UI; green kept for progress, success/git marks, badges, and primary CTAs.
- Theme JSON `type` is `"dark"` | `"light"`; VS Code base chrome still comes from `uiTheme` in `package.json`.
- Generator sources (`src/`, scripts) are versioned again; `themes/*.json` regenerated from them.
- Docs aligned with the real 10 themes (no phantom `ai` / `auto` / “11 modes”); theme labels match `package.json` / `theme.name`.

### Fixed

- High Contrast Light lightness collapse and related OKLCH out-of-gamut / NaN issues in the library pipeline.

## [Unreleased]

—

## [0.3.5] / earlier

See git history for pre-0.3.7 packaging and theme iterations.
