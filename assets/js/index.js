import { Player } from "./classes/Player.js";
import {Projectile} from "./classes/Projectile.js";

const canvas = document.getElementById("game-container");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');



const player = new Player(canvas.width / 2, canvas.height /2, 10, "red");
player.draw(ctx);
const projectile = new Projectile(50, 50, 30, "blue", {x:3, y:3});
projectile.draw(ctx);

const projectiles = [];

window.addEventListener("click", (e) => {
    const projectile = new Projectile(e.clientX, e.clientY, 5, "white", null);
    projectile.draw(ctx);
    projectiles.push(projectile);
});