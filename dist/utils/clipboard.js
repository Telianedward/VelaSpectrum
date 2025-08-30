//src/utils/clipboard.ts
export const copyToClipboard = (text) => {
    // Проверка, что navigator не undefined
    if (!navigator)
        return Promise.resolve();
    //Проверка, что clipboardдоступна
    if (!navigator.clipboard) {
        console.warn('navigator clipboard недоступна');
        return Promise.resolve();
    }
    //Копируем текст
    try {
        return navigator.clipboard.writeText(text);
    }
    catch (err) {
        console.error('Ошибка копирования:', err);
        return Promise.resolve();
    }
};
//# sourceMappingURL=clipboard.js.map