import { SPEED_PROJECTILES } from "./constant.js";

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

export function calcAngle(referencePoint, event) {
    return Math.atan2(
        event.clientY - referencePoint.y,
        event.clientX - referencePoint.x
    );
}

export function getVelocity(angle) {
    return {
        x: Math.cos(angle) * SPEED_PROJECTILES,
        y: Math.sin(angle) * SPEED_PROJECTILES
    };
}