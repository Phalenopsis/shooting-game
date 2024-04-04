import { Player } from "./classes/Player.js";
import {Projectile} from "./classes/Projectile.js";

const SPEED = 2;

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
    const angle = Math.atan2(
        e.clientY - player.y,
        e.clientX - player.x
    );
    const velocity = {
        x: Math.cos(angle) * SPEED,
        y: Math.sin(angle) * SPEED
    };
    const projectile = new Projectile(
        e.clientX, 
        e.clientY, 
        5, 
        "white", 
        velocity
    );
    projectile.draw(ctx);
    projectiles.push(projectile);
});

function animate() {
    requestAnimationFrame(animate);

    ctx.fillStyle = "rgb(0, 0, 0, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.draw(ctx);

    projectiles.forEach((projectile) => projectile.update(ctx));
}
animate();