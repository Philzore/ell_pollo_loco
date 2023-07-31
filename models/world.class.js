class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    statusBarBottle = new StatusBarBottle();
    throwableObject = [];

    coinSound = new Audio('../audio/coin.mp3');
    bottleSound = new Audio('../audio/bottle.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        //character wird instanz von world gegeben um auf keyboard zuzugreifen
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            //chekc collision
            this.checkCollision();
            //check key d for throw
            this.checkThrow();
        }, 150);
    }

    checkCollision() {
        this.checkCollisionEnemy();
        this.checkCollisionCoin();
        this.checkCollisionBottle();
    }

    checkCollisionEnemy() {
        let i = 0;
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.onCollisionCourse == 'x') {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
            if (this.character.isCollidingTop(enemy)) {
                //debugger;
                this.level.enemies[i].img.src = '../img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

                // this.level.enemies.splice(i, 1);
                i = 0;
            }
            this.throwableObject.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {
                    console.log('Flaschen treffer ' + enemy);
                    this.level.enemies.splice(i, 1);
                }
            });
            i++;
        });
    }

    checkCollisionCoin() {
        let i = 0;
        //this.coinSound.pause();
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinSound.play();
                this.character.coinStatus += 20;

                this.level.coins.splice(i, 1);

                this.statusBarCoins.setPercentage(this.character.coinStatus);

                if (this.character.coinStatus > 100) {
                    this.character.coinStatus = 100;
                }
                i = 0;
            }
            i++;
        });
    }

    checkCollisionBottle() {
        let i = 0;
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.character.bottleStatus += 20;
                this.bottleSound.play();
                this.level.bottles.splice(i, 1);

                this.statusBarBottle.setPercentage(this.character.bottleStatus);

                if (this.character.bottleStatus > 100) {
                    this.character.bottleStatus = 100;
                }
                i = 0;
            }
            i++;
        });
    }

    checkThrow() {
        if (this.keyboard.d) {

            if (this.character.bottleStatus > 0) {
                let bottle;
                if (this.character.reverse == true) {
                    bottle = new ThrowableObject(this.character.x , this.character.y + 100,true);
                } else if (this.character.reverse == false) {
                    bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100,false);
                }
                this.throwableObject.push(bottle);
                this.character.bottleStatus -= 20;
                this.statusBarBottle.setPercentage(this.character.bottleStatus);
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //translate ist verschieben um bestimmten Wert
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backroundObject);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0); // back
        // --- space for fixed objects ---
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottle);
        this.ctx.translate(this.camera_x, 0); // forward

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObject);
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

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

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