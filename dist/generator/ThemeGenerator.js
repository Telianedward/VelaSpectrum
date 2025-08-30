// src/generator/ThemeGenerator.ts
import { themeConfigs } from '../themes/config.js';
import { ThemeColors } from '../colors/ThemeColors.js';
import { palettes } from '../themes/colorPalettePresets.js';
import { ThemeElementName } from '../colors/ThemeElementName.js';
import { applyAlpha } from '../utils/color.js';
import {} from '../types/index.js'; // ✅ Импортируем тип
/**
 * Генерирует все темы на основе конфигураций и пресетов.
 * @param {PaletteName} paletteName - Название пресета: 'default', 'green', 'pastel', 'contrast'
 * @returns Массив объектов { config, theme }
 */
export function generateAllThemes(paletteName = 'default') {
    const palette = palettes[paletteName] ?? palettes.default;
    // console.log('🎨 Palette loaded:', palette);
    if (!palette) {
        console.warn(`Пресет "${paletteName}" не найден. Используется "default".`);
        return generateAllThemes('default');
    }
    return themeConfigs.map(config => {
        const isDark = config.type === 'vs-dark' || config.type === 'hc-black';
        const colors = ThemeColors.generate(palette, config.mode, isDark);
        const theme = {
            name: config.name,
            type: config.type,
            semanticHighlighting: true, // ✅ Добавлено здесь
            colors: {},
            "tokenColors": [
                {
                    "scope": [
                        "comment",
                        "punctuation.definition.comment",
                        "string.comment"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.comment, 6),
                        "fontStyle": "italic"
                    }
                },
                {
                    "scope": [
                        "constant",
                        "entity.name.constant",
                        "variable.other.constant",
                        "variable.other.enummember",
                        "variable.language",
                        "entity"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.constant, 10)
                    }
                },
                {
                    "scope": [
                        "entity.name",
                        "meta.export.default",
                        "meta.definition.variable"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.variable, 10)
                    }
                },
                {
                    "scope": [
                        "variable.parameter.function",
                        "meta.jsx.children",
                        "meta.block",
                        "meta.tag.attributes",
                        "entity.name.constant",
                        "meta.object.member",
                        "meta.embedded.expression"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.fg.default, 10)
                    }
                },
                {
                    "scope": "entity.name.function",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.function, 10)
                    }
                },
                {
                    "scope": [
                        "entity.name.tag",
                        "support.class.component"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.tag, 10)
                    }
                },
                {
                    "scope": "keyword",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.keyword, 10)
                    }
                },
                {
                    "scope": [
                        "storage",
                        "storage.type"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.type, 10)
                    }
                },
                {
                    "scope": [
                        "storage.modifier.package",
                        "storage.modifier.import",
                        "storage.type.java"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.modifier, 10)
                    }
                },
                {
                    "scope": [
                        "string punctuation.section.embedded source"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.string, 10)
                    }
                },
                {
                    "scope": "support",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.support, 6)
                    }
                },
                {
                    "scope": "meta.property-name",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.property, 10)
                    }
                },
                {
                    "scope": "variable",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.variable, 10)
                    }
                },
                {
                    "scope": "variable.other",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.variable, 10)
                    }
                },
                {
                    "scope": "invalid.broken",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.error, 10),
                        "fontStyle": "italic"
                    }
                },
                {
                    "scope": "invalid.deprecated",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.warning, 10),
                        "fontStyle": "italic"
                    }
                },
                {
                    "scope": "invalid.illegal",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.error, 10),
                        "fontStyle": "italic"
                    }
                },
                {
                    "scope": "invalid.unimplemented",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.warning, 10),
                        "fontStyle": "italic"
                    }
                },
                {
                    "scope": "carriage-return",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.error, 10),
                        "background": applyAlpha(colors.syntax.error, 10),
                        "fontStyle": "italic underline"
                    }
                },
                {
                    "scope": "message.error",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.error, 10)
                    }
                },
                {
                    "scope": "string variable",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.variable, 10)
                    }
                },
                {
                    "scope": [
                        "source.regexp",
                        "string.regexp"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.regexp, 10)
                    }
                },
                {
                    "scope": [
                        "string.regexp.character-class",
                        "string.regexp constant.character.escape",
                        "string.regexp source.ruby.embedded",
                        "string.regexp string.regexp.arbitrary-repitition"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.regexp, 10)
                    }
                },
                {
                    "scope": "string.regexp constant.character.escape",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.regexp, 10),
                        "fontStyle": "bold"
                    }
                },
                {
                    "scope": "support.constant",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.support, 10)
                    }
                },
                {
                    "scope": "support.variable",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.variable, 10)
                    }
                },
                {
                    "scope": "support.type.property-name.json",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.property, 10)
                    }
                },
                {
                    "scope": "meta.module-reference",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.module, 10)
                    }
                },
                {
                    "scope": "punctuation.definition.list.begin.markdown",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.punctuation, 10)
                    }
                },
                {
                    "scope": "punctuation.definition.list.end.markdown",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.punctuation, 10)
                    }
                },
                {
                    "scope": [
                        "markup.heading",
                        "markup.heading entity.name"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.heading, 10),
                        "fontStyle": "bold"
                    }
                },
                {
                    "scope": "markup.quote",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.quote, 10)
                    }
                },
                {
                    "scope": "markup.italic",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.emphasis, 10),
                        "fontStyle": "italic"
                    }
                },
                {
                    "scope": "markup.bold",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.strong, 10),
                        "fontStyle": "bold"
                    }
                },
                {
                    "scope": [
                        "markup.underline"
                    ],
                    "settings": {
                        "fontStyle": "underline"
                    }
                },
                {
                    "scope": [
                        "markup.strikethrough"
                    ],
                    "settings": {
                        "fontStyle": "strikethrough"
                    }
                },
                {
                    "scope": "markup.inline.raw",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.inline, 10)
                    }
                },
                {
                    "scope": [
                        "markup.deleted",
                        "meta.diff.header.from-file",
                        "punctuation.definition.deleted"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.deleted, 10),
                        "background": applyAlpha(colors.syntax.deleted, 10)
                    }
                },
                {
                    "scope": [
                        "punctuation.section.embedded"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.embedded, 10)
                    }
                },
                {
                    "scope": [
                        "markup.inserted",
                        "meta.diff.header.to-file",
                        "punctuation.definition.inserted"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.inserted, 10),
                        "background": applyAlpha(colors.syntax.inserted, 10)
                    }
                },
                {
                    "scope": [
                        "markup.changed",
                        "punctuation.definition.changed"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.changed, 10),
                        "background": applyAlpha(colors.syntax.changed, 10)
                    }
                },
                {
                    "scope": [
                        "markup.ignored",
                        "markup.untracked"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.ignored, 10),
                        "background": applyAlpha(colors.syntax.ignored, 10)
                    }
                },
                {
                    "scope": "meta.diff.range",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.range, 10),
                        "fontStyle": "bold"
                    }
                },
                {
                    "scope": "meta.diff.header",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.header, 10)
                    }
                },
                {
                    "scope": "meta.separator",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.separator, 10),
                        "fontStyle": "bold"
                    }
                },
                {
                    "scope": "meta.output",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.output, 10)
                    }
                },
                {
                    "scope": [
                        "brackethighlighter.tag",
                        "brackethighlighter.curly",
                        "brackethighlighter.round",
                        "brackethighlighter.square",
                        "brackethighlighter.angle",
                        "brackethighlighter.quote"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.neutral.emphasisPlus, 10)
                    }
                },
                {
                    "scope": "brackethighlighter.unmatched",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.error, 10)
                    }
                },
                {
                    "scope": [
                        "constant.other.reference.link",
                        "string.other.link"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.link, 10),
                        "fontStyle": "underline"
                    }
                },
                {
                    "scope": [
                        "constant.language",
                        "constant.numeric"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.number, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "support.type.property-name"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.property, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "string.regexp",
                        "constant.character.escape"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.fg.default, 10)
                    }
                },
                {
                    "scope": [
                        "string"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.string, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "keyword"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.keyword, 10)
                    }
                },
                {
                    "scope": [
                        "support.type.property-name"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.success.emphasis, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "entity.name.function"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.function, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "punctuation.section.embedded.begin.php",
                        "punctuation.section.embedded.end.php",
                        "punctuation.definition.parameters.end"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.sponsors.fg, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "entity.name.type"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.type, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "meta.embedded"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.sponsors.fg, 10)
                    }
                },
                {
                    "scope": [
                        "support.function"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.function, 10)
                    }
                },
                {
                    "scope": [
                        "storage.type"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.type, 10)
                    }
                },
                {
                    "scope": [
                        "storage.modifier"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.modifier, 10)
                    }
                },
                {
                    "scope": [
                        "variable"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.variable, 10)
                    }
                },
                {
                    "scope": [
                        "variable.other.readwrite.js"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.sponsors.fg, 10)
                    }
                },
                {
                    "scope": [
                        "variable",
                        "keyword.control"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.keyword, 10)
                    }
                },
                {
                    "scope": [
                        "variable.language"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.fg.muted, 10)
                    }
                },
                {
                    "scope": [
                        "variable"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.accent.emphasis, 10)
                    }
                },
                {
                    "scope": [
                        "keyword.operator"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.operator, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "keyword.operator"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.fg.default, 10)
                    }
                },
                {
                    "scope": [
                        "support.class"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.class, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "keyword"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.sponsors.fg, 10),
                        "fontStyle": ""
                    }
                },
                // {
                //   "scope": [
                //     "comment"
                //   ],
                //   "settings": {
                //     "foreground": applyAlpha(colors.syntax.comment, 10),
                //     "fontStyle": ""
                //   }
                // },
                {
                    "scope": [
                        "punctuation.separator.key-value.html"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.sponsors.fg, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "punctuation.definition.tag"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.sponsors.fg, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        // "punctuation.definition.string.begin.json.comments",
                        // "punctuation.definition.string.end.json.comments",
                        "punctuation.definition.string.begin.js",
                        "punctuation.definition.string.end.js"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.sponsors.fg, 10),
                        "fontStyle": ""
                    }
                },
                // {
                //   "scope": [
                //     "punctuation.support.type.property-name.begin.json.comments",
                //     "punctuation.support.type.property-name.end.json.comments"
                //   ],
                //   "settings": {
                //     "foreground": applyAlpha(colors.success.emphasis, 10),
                //     "fontStyle": ""
                //   }
                // },
                {
                    "scope": [
                        "punctuation.definition.string.begin.html",
                        "punctuation.definition.string.end.html",
                        "punctuation.definition.string.template.begin.js",
                        "punctuation.definition.string.template.end.js"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.done.fg, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "source.sql.embedded.php"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.sponsors.fg, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "punctuation.definition.string.begin.sql",
                        "punctuation.definition.string.end.sql",
                        // "punctuation.separator.dictionary.key-value.json.comments"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.success.emphasis, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "keyword.other.DML.sql",
                        "source.sql.embedded.php",
                        "string.quoted.single.sql.php",
                        "string.quoted.single.php"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.severe.fg, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "string.quoted.other.backtick.sql"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.severe.fg, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "variable.other.property.js",
                        "entity.name.function.member"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.severe.fg, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "punctuation.definition.string.template.begin.js",
                        "punctuation.definition.string.template.end.js"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.severe.fg, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "string.quoted.double.html",
                        "string.quoted.single.js",
                        "string.quoted.double.js",
                        "string.template.js"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.fg.muted, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "text.html.php"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.fg.muted, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "variable.other.constant",
                        "variable.other.constant.object.js",
                        "punctuation.definition.template-expression.begin.js",
                        "punctuation.definition.template-expression.end.js"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.attention.fg, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "punctuation.separator.comma.js",
                        // "punctuation.separator.dictionary.pair.json.comments"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.success.emphasis, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "punctuation.definition.string.begin.php",
                        "punctuation.definition.string.end.php"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.sponsors.fg, 10),
                        "fontStyle": ""
                    }
                },
                {
                    "scope": [
                        "punctuation.accessor.js"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.fg.default, 10)
                    }
                },
                {
                    "scope": [
                        "punctuation.accessor.js"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.fg.default, 10)
                    }
                },
                {
                    "scope": [
                        "support.type.property-name.json"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.done.fg, 10)
                    }
                },
                {
                    "scope": [
                        "variable.css"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.done.fg, 10)
                    }
                },
                {
                    "scope": [
                        "variable.argument.css"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.attention.fg, 10)
                    }
                },
                {
                    "scope": [
                        "constant.other.color.rgb-value",
                        "support.constant.property-value"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.severe.fg, 10)
                    }
                },
                {
                    "scope": [
                        "punctuation.separator.list.comma.css",
                        "punctuation.separator.key-value.css",
                        "punctuation.terminator.rule.css",
                        "meta.function.calc.css",
                        "keyword.operator.arithmetic.css",
                        "punctuation.definition.entity.css"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.success.emphasis, 10)
                    }
                },
                {
                    "scope": [
                        "punctuation.definition.string.begin.css",
                        "punctuation.definition.string.end.css"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.sponsors.fg, 10)
                    }
                },
                {
                    "scope": [
                        "string.quoted.single.css"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.fg.muted, 10)
                    }
                },
                {
                    "scope": [
                        "constant.numeric.css",
                        "keyword.other.unit.px.css",
                        "keyword.other.unit.rem.css",
                        "keyword.other.unit.em.css",
                        "keyword.other.unit.deg.css",
                        "keyword.other.unit.ms.css",
                        "keyword.other.unit.vw.css",
                        "keyword.other.unit.vh.css",
                        "keyword.other.unit",
                        "keyword.other.unit.s.css"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.attention.fg, 10)
                    }
                },
                {
                    "scope": [
                        "constant.numeric.css"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.severe.fg, 10)
                    }
                },
                {
                    "scope": [
                        "entity.other.attribute-name.pseudo-class.css",
                        "entity.other.attribute-name.class.css"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.accent.fg, 10)
                    }
                },
                {
                    "scope": [
                        "entity.name.tag.css"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.attention.fg, 10)
                    }
                },
                {
                    "scope": [
                        "support.type.property-name.css",
                        "entity.other.keyframe-offset.css"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.accent.fg, 10)
                    }
                },
                {
                    "scope": [
                        "support.constant.vendored.property-value.css",
                        "support.constant.font-name.css",
                        "entity.other.attribute-name.class.css"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.sponsors.fg, 10)
                    }
                },
                {
                    "scope": [
                        "entity.other.attribute-name.pseudo-element.css"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.accent.fg, 10)
                    }
                },
                {
                    "scope": [
                        "support.type.property-name.media.css",
                        "support.constant.media.css"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.done.fg, 10)
                    }
                },
                {
                    "scope": [
                        "keyword.operator.logical.only.media.css",
                        "keyword.operator.logical.and.media.css",
                        "string.quoted.double.css"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.success.emphasis, 10)
                    }
                },
                {
                    "scope": [
                        "entity.other.attribute-name.id.css"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.accent.fg, 10)
                    }
                },
                {
                    "scope": [
                        "support.function.transform.css"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.accent.fg, 10)
                    }
                },
                {
                    "scope": [
                        "entity.other.keyframe-offset.percentage.css"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.sponsors.fg, 10)
                    }
                },
                {
                    "scope": "token.info-token",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.info, 10)
                    }
                },
                {
                    "scope": "token.warn-token",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.warning, 10)
                    }
                },
                {
                    "scope": "token.error-token",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.error, 10)
                    }
                },
                {
                    "scope": "variable.other.global.php",
                    "settings": {
                        "foreground": applyAlpha(colors.done.fg, 10)
                    }
                },
                {
                    "scope": "token.debug-token",
                    "settings": {
                        "foreground": applyAlpha(colors.done.fg, 10)
                    }
                },
                {
                    "scope": "constant.numeric",
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.number, 10)
                    }
                },
                {
                    "score": [
                        "meta.structure.dictionary.value.json",
                        "meta.structure.dictionary.json",
                        "meta.structure.dictionary.value.json",
                        "meta.structure.dictionary.json",
                        "source.json"
                    ],
                    "settings": {
                        "foreground": applyAlpha(colors.neutral.muted, 10)
                    }
                },
                {
                    "scope": ["storage.type.class.jsdoc", "storage.type"],
                    "settings": {
                        "foreground": applyAlpha(colors.syntax.tag, 10)
                    }
                },
            ]
        };
        for (const item of ThemeElementName) {
            const oklch = item.color(colors);
            theme.colors[item.name] = applyAlpha(oklch, item.Alpha);
        }
        return { config, theme };
    });
}
//# sourceMappingURL=ThemeGenerator.js.map