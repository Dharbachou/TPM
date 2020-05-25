export const RULES_IDENTIFIER = {
    HEBBIAN: 0,
    ANTI_HEBBIAN: 1,
    RANDOM_WALK: 2
};

/**
 *  Is used for correcting learning speed
 *
 *  @type {number}
 */
const step = 0.5;

/**
 * @see {@link https://ru.qwe.wiki/wiki/Neural_cryptography}
 *
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
function F(x, y) {
    return x === y ? 1 : 0;
}

/**
 * Hebbian
 *
 * @param w
 * @param sig
 * @param inp
 * @param out
 */
export function hebbian(w, sig, inp, out) {
    return w + sig * inp * F(sig, out);
}

/**
 * Anti-Hebbian
 *
 * @param w
 * @param sig
 * @param inp
 * @param out
 */
export function antiHebbian(w, sig, inp, out) {
    return w - sig * inp * F(sig, out);
}

/**
 * Random walk
 *
 * @param w
 * @param sig
 * @param inp
 * @param out
 */
export function randWalk(w, sig, inp, out) {
    return w + inp * F(sig, out);
}

/**
 *
 * @param {number} rule
 * @returns {Function}
 */
export default function getTrainFunc(rule) {
    switch (rule) {
        case RULES_IDENTIFIER.HEBBIAN:
            return hebbian;
        case RULES_IDENTIFIER.ANTI_HEBBIAN:
            return antiHebbian;
        case RULES_IDENTIFIER.RANDOM_WALK:
            return randWalk;
    }
}
