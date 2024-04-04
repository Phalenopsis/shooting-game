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
    const luminosity = getRandomInt(40, 100);

    return `hsl(${hue} ${saturation}% ${luminosity}%)`
}

export function getEnnemyOrigin() {
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;
    const dirInt = getRandomInt(4);
    switch (dirInt) {
        case 0:
            return { x: 0, y: getRandomInt(maxHeight) };
            break;
        case 1:
            return { x: maxWidth, y: getRandomInt(maxHeight) };
            break;
        case 2:
            return { x: getRandomInt(maxWidth), y: 0 };
            break;
        case 3:
            return { x: getRandomInt(maxWidth), y: maxHeight };
            break;

        default:
            throw new Error("Le nombre de getEnnemyOrigin est trop grand ou trop petit");
            break;
    }
}