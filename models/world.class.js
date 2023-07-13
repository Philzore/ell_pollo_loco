class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    statusBar = new StatusBar();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        //character wird instanz von world gegeben um auf keyboard zuzugreifen
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    console.log('Kollision', this.character.energy);
                }
            });
        }, 200);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //translate ist verschieben um bestimmten Wert
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backroundObject);
        this.addToMap(this.character);
        this.addToMap(this.statusBar);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);

        //draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            //er kennt kein this mehr und deswegen wird die variable self erstellt
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.reverse) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx) ;
        mo.drawFrame(this.ctx) ;

        if (mo.reverse) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}