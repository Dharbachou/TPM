/**
 * Возвращает массив случайных чисел
 * @param {number} count Количество элементов
 * @param {number} min Минимальное значение
 * @param {number} max Максимальное значение
 * @returns {number[]}
 */
export function generateArray(count, min = -1, max = 1) {
    const array = [];
    for (let i = 0; i < count; i++) {
        array.push(Math.floor((Math.random() * (max - min)) + min));
    }
    return array;
}

/**
 * Возвращает массив случайных 1 и -1
 * @param {number} count Количество элементов
 * @returns {number[]}
 */
export function generateBinaryArray(count) {
    const array = []
    for (let i = 0; i < count; i++) {
        array[i] = Math.random() > 0.5 ? 1 : -1;
    }
    return array;
}