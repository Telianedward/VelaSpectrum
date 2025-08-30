import { type PaletteName } from '../types/index.js';
/**
 * Генерирует все темы на основе конфигураций и пресетов.
 * @param {PaletteName} paletteName - Название пресета: 'default', 'green', 'pastel', 'contrast'
 * @returns Массив объектов { config, theme }
 */
export declare function generateAllThemes(paletteName?: PaletteName): {
    config: import("../themes/config.js").ThemeConfig;
    theme: {
        name: string;
        type: import("../themes/config.js").ThemeType;
        semanticHighlighting: boolean;
        colors: Record<string, string>;
        tokenColors: ({
            scope: string[];
            settings: {
                foreground: string;
                fontStyle: string;
                background?: undefined;
            };
            score?: undefined;
        } | {
            scope: string[];
            settings: {
                foreground: string;
                fontStyle?: undefined;
                background?: undefined;
            };
            score?: undefined;
        } | {
            scope: string;
            settings: {
                foreground: string;
                fontStyle?: undefined;
                background?: undefined;
            };
            score?: undefined;
        } | {
            scope: string;
            settings: {
                foreground: string;
                fontStyle: string;
                background?: undefined;
            };
            score?: undefined;
        } | {
            scope: string;
            settings: {
                foreground: string;
                background: string;
                fontStyle: string;
            };
            score?: undefined;
        } | {
            scope: string[];
            settings: {
                fontStyle: string;
                foreground?: undefined;
                background?: undefined;
            };
            score?: undefined;
        } | {
            scope: string[];
            settings: {
                foreground: string;
                background: string;
                fontStyle?: undefined;
            };
            score?: undefined;
        } | {
            score: string[];
            settings: {
                foreground: string;
                fontStyle?: undefined;
                background?: undefined;
            };
            scope?: undefined;
        })[];
    };
}[];
//# sourceMappingURL=ThemeGenerator.d.ts.map