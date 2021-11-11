export function divideTextToWords(text: string) {
    return text.split(' ').join('|');
}