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
    statusBarEndboss = new StatusBarEndboss();
    throwableObject = [];
    bottle;

    coinSound = new Audio('./audio/coin.mp3');
    bottleSound = new Audio('./audio/bottle.mp3');
    chickenHitSound = new Audio('./audio/chicken.mp3');

    enemyIsHit = false;

    /**
     * constructor always run one time when class be created
     * 
     * @param {element} canvas to set images on the canvas
     * @param {object} keyboard instance of class keyboard 
     */
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
            //check dead
            if (this.character.isDead()) {
                endGame();
            } else if (this.level.enemies.length == 0) {
                endGameWin();
            }
        }, 150);
    }

    checkCollision() {
        this.checkCollisionEnemy();
        this.checkCollisionCoin();
        this.checkCollisionBottle();
    }

    deleteAfterCollision(obj, item) {
        obj.splice(obj.indexOf(item), 1)
    }

    checkCollisionEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.onCollisionCourse == 'x') {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
            if (this.character.isCollidingTop(enemy)) {
                this.character.jump();
                enemy.hit();

                if (!muted) {
                    this.chickenHitSound.play();
                }
                setTimeout(() => {
                    this.deleteAfterCollision(this.level.enemies, enemy);
                }, 500);
            }
            this.throwableObject.forEach((bottle) => {

                if (bottle.isColliding(enemy) && !this.enemyIsHit) {
                    enemy.hit();
                    this.enemyIsHit = true;
                    bottle.splash = true;
                    
                    setTimeout(() => {
                        this.deleteAfterCollision(this.throwableObject, bottle);
                        this.enemyIsHit = false;
                    }, 500);

                    if (enemy.isDead()) {
                        setTimeout(() => {
                            this.deleteAfterCollision(this.level.enemies, enemy);
                        }, 500);

                    }
                    if (enemy instanceof Endboss) {
                        this.statusBarEndboss.setPercentage(enemy.energy);
                        if (enemy.energy == 0) {
                            this.statusBarEndboss.stopMoving = true ;
                        }
                    }
                }
            });

        });
    }

    checkCollisionCoin() {
        let i = 0;
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                if (!muted) {
                    this.coinSound.play();
                }

                this.character.coinStatus += 20;

                this.deleteAfterCollision(this.level.coins, coin);

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
                if (!muted) {
                    this.bottleSound.play();
                }
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
                if (this.character.reverse == true) {
                    this.bottle = new ThrowableObject(this.character.x, this.character.y + 100, true);
                } else if (this.character.reverse == false) {
                    this.bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, false);
                }
                this.throwableObject.push(this.bottle);
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
        this.addToMap(this.statusBarEndboss);
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