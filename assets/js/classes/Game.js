import { Particle } from "./Particle.js";
import { Projectile } from "./Projectile.js";
import { SPEED_ENNEMIES } from "./../constant.js";
import { Enemy } from "./Enemy.js";
import { getRandomInt, getRandomHslColor, calcAngle, getVelocity } from "./../genericfunctions.js";
import { animate } from "./../index.js";

export class Game {
    constructor(player, canvas, ctx) {
        this.player = player;
        this.canvas = canvas;
        this.ctx = ctx;
        this.enemies = [];
        this.projectiles = [];
        this.particles = [];
    }

    resetDisplay() {
        this.animationId = requestAnimationFrame(animate);
        this.ctx.fillStyle = "rgb(0, 0, 0, 1)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx);
    }

    updateParticles() {
        this.particles.forEach((particle, index) => {
            if (particle.alpha <= 0.1) {
                this.particles.splice(index, 1);
            } else {
                particle.update(this.ctx);
            }
        });
    }

    updateProjectiles() {
        this.projectiles.forEach((projectile, index) => {
            if (
                projectile.x - projectile.radius < 0 ||
                projectile.x + projectile.radius > this.canvas.width ||
                projectile.y - projectile.radius < 0 ||
                projectile.y + projectile.radius > this.canvas.height
            ) {
                this.projectiles.splice(index, 1);
            }

            projectile.update(this.ctx);
        });
    }

    updateEnemies() {
        this.enemies.forEach((enemy, enemyIndex) => {
            this.projectiles.forEach((projectile, projectileIndex) => {
                const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
                if (distance - projectile.radius - enemy.radius <= 0) {
                    for (let i = 0; i < 8; i += 1) {
                        this.particles.push(
                            new Particle(
                                projectile.x,
                                projectile.y,
                                Math.random() * (3 - 1) + 1,
                                enemy.color,
                                {
                                    x: (Math.random() - 0.5) * 3,
                                    y: (Math.random() - 0.5) * 3
                                }
                            )
                        )
                    }
                    this.killOrReduceEnemy(enemy, enemyIndex);
                    this.destroyProjectile(projectileIndex);
                }
            });
            const distBetweenEnemyAndPlayer = Math.hypot(enemy.x - this.player.x, enemy.y - this.player.y);
            if (distBetweenEnemyAndPlayer - enemy.radius - this.player.radius <= 0) {
                cancelAnimationFrame(this.animationId);
            }
            enemy.update(this.ctx);
        });
    }

    killOrReduceEnemy(enemy, enemyIndex) {
        if (enemy.radius - 10 > 5) {
            this.reduceEnemySize(enemy);
        } else {
            this.killEnemy(enemyIndex)
        }
    }

    killEnemy(enemyIndex) {
        this.enemies.splice(enemyIndex, 1);
    }

    reduceEnemySize(enemy) {
        gsap.to(enemy, {
            radius: enemy.radius - 10,
        });
    }

    destroyProjectile(projectileIndex) {
        this.projectiles.splice(projectileIndex, 1);
    }

    spawnEnemies() {
        setInterval(() => {
            const ennemyOrigin = this.getEnnemyOrigin();
            const radius = getRandomInt(4, 30);
            const color = getRandomHslColor();
            const angle = Math.atan2(
                this.player.x - ennemyOrigin.y,
                this.player.y - ennemyOrigin.x
            );
            const velocity = {
                x: Math.cos(angle) * SPEED_ENNEMIES,
                y: Math.sin(angle) * SPEED_ENNEMIES
            };
            const enemy = new Enemy(ennemyOrigin.x, ennemyOrigin.y, radius, color, { x: velocity.x, y: velocity.y });
            this.enemies.push(enemy);

        }, 1000);
    }

    getEnnemyOrigin() {
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

    fireProjectile(e) {
        const angle = calcAngle(this.player, e);
        const velocity = getVelocity(angle);
        const projectile = new Projectile(
            this.player.x,
            this.player.y,
            5,
            "white",
            velocity
        );
        projectile.draw(this.ctx);
        this.projectiles.push(projectile);
    }
}