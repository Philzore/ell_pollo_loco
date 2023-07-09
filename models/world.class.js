class World {

    character = new Character();
    level = level1 ;
    canvas;
    ctx;
    keyboard;
    camera_x = 0 ; 

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        //character wird instanz von world gegeben um auf keyboard zuzugreifen
        this.character.world = this;
    }

    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //translate ist verschieben um bestimmten Wert
        this.ctx.translate(this.camera_x,0);

        this.addObjectsToMap(this.level.backroundObject);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x,0);

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
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1 ;
        }

        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

        if (mo.reverse) {
            mo.x = mo.x * -1 ;
            this.ctx.restore();
        }
    }
}