import { Player } from "./classes/Player.js";
import { Game } from "./classes/Game.js";

export function animate() {
    game.resetDisplay();
    game.updateParticles();
    game.updateProjectiles();
    game.updateEnemies();
}

const canvas = document.getElementById("game-container");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const game = new Game(
    new Player(canvas.width / 2, canvas.height / 2, 10, "red"),
    canvas,
    ctx
)

game.player.draw(game.ctx);

window.addEventListener("click", (e) => {
    game.fireProjectile(e);
});
game.spawnEnemies(game);
animate();


