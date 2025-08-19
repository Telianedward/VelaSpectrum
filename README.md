VelaSpectrum/
├── src/
│   ├── main.ts                     ← Точка входа (запуск генерации)
│   ├── generator/
│   │   ├── ThemeGenerator.ts       ← Основной класс генерации тем
│   │   └── ColorProcessor.ts       ← Обработка OKLCH → HEX, альфа, коррекция
│   ├── colors/
│   │   ├── index.ts                ← Экспорт палитр
│   │   ├── colors.json             ← Твоя база цветов (уже есть)
│   │   ├── ColorConverter.ts       ← Твой `OKLCHColorGenerator` (обновлённый)
│   │   └── ColorSchemeBuilder.ts   ← Создание схем: normal, colorblind, tritanopia и т.д.
│   └── themes/
│       └── presets/                ← Пресеты: dark, light, high-contrast и т.д.
│           ├── base-dark.json
│           ├── base-light.json
│           └── ...
├── themes/                         ← Готовые .json для VS Code (генерируются)
├── package.json
├── tsconfig.json
└── README.md