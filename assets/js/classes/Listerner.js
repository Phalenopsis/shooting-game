export class Listener {
    constructor(game) {
        this.game = game;
    }

    listen() {
        window.addEventListener("click", (e) => {
            this.game.fireProjectile(e);
        });
    }
}