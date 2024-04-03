import { Entity } from "./Entity.js";
export class Player extends Entity{
    constructor(x, y, radius, color) {
        super( x, y, radius);
        this.color = color;
    }
}