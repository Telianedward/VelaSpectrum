# Vela Spectrum

> 🌌 Тема цвета будущего: глубокая, живая, интеллектуальная.
## 🎨 Превью

![Vela Spectrum](images/VelaSpectrum.png)

## 💡 Цветовая палитра

- **Акцент**: `#4F46E5` (фиолетовый)
- **Успех**: `#10B981` (зелёный)
- **Ошибка**: `#EF4444` (красный)
- **Предупреждение**: `#F59E0B` (жёлтый)
Vela Spectrum — это **современная тема для VS Code**, построенная на **OKLCH** и **семантических цветах**, с полной поддержкой **AI, Copilot, GitHub, Accessibility** и **режимов для дальтоников**.

Она не просто красивая — она **умная**.
Она не просто светлая/тёмная — она **адаптивная**.
Она не просто тема — она **экосистема**.

---

## 🎨 Особенности

✅ **Полная поддержка AI и Copilot**
Подсветка чата, лампочек, встроенного редактирования, inlay hints — всё с акцентом на интеллектуальность.

✅ **9 режимов цвета**
- `normal`, `dimmed`, `highContrast`
- `colorblind`, `tritanopia`
- `light`, `dark`, `auto`
- `ai` (эксклюзивный режим с фиолетовыми акцентами)

✅ **Глубокая настройка подсветки кода**
Тысячи токенов: `syntax.function`, `syntax.constant`, `syntax.local`, `syntax.decorator` — всё стилизовано.

✅ **Цветные скобки и направляющие**
`editor.bracketPairColorization.enabled` — включено и красиво.

✅ **Поддержка терминала, вкладок, панелей**
Цвета для `terminal`, `activityBar`, `titleBar`, `ports`, `merge conflicts` — везде.

✅ **Для дальтоников**
Режимы `colorblind` и `tritanopia` — безопасные цвета, которые не сливаются.

✅ **Оптимизирована для долгой работы**
Мягкие, сбалансированные тона — глаза не устают.

---
## 🖼 Скриншоты

### Темный режим
![Dark Mode](./images/demo/png/VelaSpectrumColorblind.png)
![Dark Mode](./images/demo/png/VelaSpectrumColorblind.png)
![DArk](./images/demo/png/VelaSpectrumColorblind.png)
### Светлый режим
![Light Mode](./images/demo/png/VelaSpectrumColorblindLight.png)

### AI Mode (эксклюзив)
![AI Mode](./images/demo/png/VelaSpectrumDark.png)

### Цветные скобки
![Bracket Pairs](./images/demo/png/VelaSpectrumDimmed.png)

### Подсветка Git-изменений
![Git Diff](./images/demo/png/VelaSpectrumDimmedLight.png)

### Copilot Chat
![Copilot Chat](./images/demo/png/VelaSpectrumHighContrast.png)

---

## 🌐 Режимы доступности

### Colorblind (протанопия/дейтеранопия)
![Colorblind Mode](images/accessibility/VelaSpectrum_Colorblind.png)

### Tritanopia (нарушение синего канала)
![Tritanopia Mode](images/accessibility/VelaSpectrum_Tritanopia.png)

### High Contrast (высокий контраст)
![High Contrast Mode](images/accessibility/VelaSpectrum_HighContrast.png)

---

## 🎨 Дополнительные режимы

### Dimmed (приглушённый)
![Dimmed Mode](images/modes/VelaSpectrum_Dimmed.png)

### AI Mode (фиолетовые акценты)
![AI Mode](images/modes/VelaSpectrum_AI.png)

---

## 🎥 Видео-превью (GIF)

### Темный режим
![Dark Mode Demo](images/videos/VelaSpectrum_Dark.gif)

### Светлый режим
![Light Mode Demo](images/videos/VelaSpectrum_Light.gif)

### Colorblind Mode
![Colorblind Demo](images/videos/VelaSpectrum_Colorblind.gif)

### AI Mode
![AI Mode Demo](images/videos/VelaSpectrum_AI.gif)

---

## ⚙️ Настройки (рекомендуемые)

Добавь в `settings.json`:

```json
{
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",
  "editor.guides.highlightActiveBracketPair": true,
  "editor.inlineSuggest.enabled": true,
  "editor.lightbulb.enabled": true,
  "workbench.colorTheme": "Vela Spectrum"
}