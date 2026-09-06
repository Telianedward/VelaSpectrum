# Vela Spectrum — local development

## Layout

- `package.json` — extension manifest; `contributes.themes` lists the 10 theme labels and `uiTheme` values.
- `themes/default-*.json` — generated color themes (`type`: `"dark"` | `"light"`).
- `src/` — TypeScript generator (`ColorConverter`, `ThemeColors`, `ThemeElementName`, `ThemeGenerator`).

## Run

1. `npm install`
2. `npm run build` to regenerate `themes/*.json`
3. Press `F5` to open an Extension Development Host
4. `Preferences: Color Theme` → pick e.g. **Vela Spectrum Dark+**

Inspect scopes with `Developer: Inspect Editor Tokens and Scopes`.

## Package

`npm run package` runs color checks, refreshes `contributes.themes` from `package.json.template` + files in `themes/`, then builds a `.vsix` via `@vscode/vsce`.
