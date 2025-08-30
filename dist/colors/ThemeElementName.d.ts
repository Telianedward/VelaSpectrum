/**
 * Массив всех цветовых ролей VS Code.
 * Каждый элемент определяет:
 * - name: имя цвета в формате VS Code
 * - color: функция, возвращающая OKLCH-цвет из сгенерированной палитры
 * - Alpha: прозрачность от 0 до 10 (где 10 = 100%)
 * - description: описание для документации
 *
 * Используется в ThemeGenerator для генерации themes/*.json
 */
export declare const ThemeElementName: {
    name: string;
    color: (colors: any) => any;
    Alpha: number;
    description: string;
}[];
//# sourceMappingURL=ThemeElementName.d.ts.map