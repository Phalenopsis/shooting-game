export function getRandomInt(value1, value2 = undefined) {
    if (value2 === undefined) {
        const max = value1;
        return Math.floor(Math.random() * max);
    }
    const min = Math.ceil(value1);
    const max = Math.floor(value2);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomHslColor() {
    const hue = getRandomInt(360);
    const saturation = getRandomInt(100);
    const luminosity = getRandomInt(100);

    return `hsl(${hue} ${saturation}% ${luminosity}%)`
}