/**
 * Formats a number
 * 2 -> 2
 * 10.5 -> $10.50
 * 1.01 -> $1.01
 * @param value a number to format e.g. 10.5
 */
export function formatNumber(value){
    if (+value === 0) {
        return '$0';
    }

    const decimalPart = Math.floor(value);
    const fractionalPart = Math.floor(value * 100).toString().slice(-2);
    return `${decimalPart}${fractionalPart === '00' ? '' : '.' + fractionalPart}`;
}