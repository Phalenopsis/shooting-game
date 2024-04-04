import { Player } from "./classes/Player.js";
import { Projectile } from "./classes/Projectile.js";
import { Enemy } from "./classes/Enemy.js";
import { getRandomInt, getRandomHslColor, getEnnemyOrigin } from "./genericfunctions.js";

const SPEED_PROJECTILES = 5;
const SPEED_ENNEMIES = 2;

const canvas = document.getElementById("game-container");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');



const player = new Player(canvas.width / 2, canvas.height / 2, 10, "red");
player.draw(ctx);
const projectile = new Projectile(50, 50, 30, "blue", { x: 3, y: 3 });
projectile.draw(ctx);

const projectiles = [];

window.addEventListener("click", (e) => {
    const angle = Math.atan2(
        e.clientY - player.y,
        e.clientX - player.x
    );
    const velocity = {
        x: Math.cos(angle) * SPEED_PROJECTILES,
        y: Math.sin(angle) * SPEED_PROJECTILES
    };
    const projectile = new Projectile(
        player.x,
        player.y,
        5,
        "white",
        velocity
    );
    projectile.draw(ctx);
    projectiles.push(projectile);
});

const enemies = [];

function spawnEnemies() {
    setInterval(() => {

        const ennemyOrigin = getEnnemyOrigin();
        const velocityX = getRandomInt(-2, 2);
        const velocityY = getRandomInt(-2, 2);
        const radius = getRandomInt(4, 30);
        const color = getRandomHslColor();
        const angle = Math.atan2(
            player.x - ennemyOrigin.y,
            player.y - ennemyOrigin.x
        );
        const velocity = {
            x: Math.cos(angle) * SPEED_ENNEMIES,
            y: Math.sin(angle) * SPEED_ENNEMIES
        };
        const enemy = new Enemy(ennemyOrigin.x, ennemyOrigin.y, radius, color, { x: velocity.x, y: velocity.y });
        enemies.push(enemy);

    }, 1000);
}


let animationId;

function animate() {
    animationId = requestAnimationFrame(animate);

    ctx.fillStyle = "rgb(0, 0, 0, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.draw(ctx);
    projectiles.forEach((projectile, index) => {
        if (
            projectile.x - projectile.radius < 0 ||
            projectile.x + projectile.radius > canvas.width ||
            projectile.y - projectile.radius < 0 ||
            projectile.y + projectile.radius > canvas.height
        ) {
            projectiles.splice(index, 1);
        }

        projectile.update(ctx);
    });
    enemies.forEach((enemy, enemyIndex) => {
        projectiles.forEach((projectile, projectileIndex) => {
            const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
            if (distance - projectile.radius - enemy.radius <= 0) {
                if (enemy.radius - 10 > 5) {
                    gsap.to(enemy, {
                        radius: enemy.radius - 10,
                    });
                } else {
                    enemies.splice(enemyIndex, 1);
                    projectiles.splice(projectileIndex, 1);
                }
            }
        });
        const distBetweenEnemyAndPlayer = Math.hypot(enemy.x - player.x, enemy.y - player.y);
        if (distBetweenEnemyAndPlayer - enemy.radius - player.radius <= 0) {
            console.log("touched");
            cancelAnimationFrame(animationId);
        }
        enemy.update(ctx);
    });
}
spawnEnemies();
animate();

