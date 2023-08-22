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
    splashSound = new Audio('./audio/splash.mp3');

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

    /**
     * give character instance of world to have access to the keyboard
     * 
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * run the game to check all functions
     * 
     */
    run() {
        setInterval(() => {
            //chekc collision
            this.checkCollisionCoin();
            this.checkCollisionBottle();
        }, 50);
        setInterval(() => {
            //check key d for throw
            this.checkThrow();
        }, 200);
        setInterval(() => {
            this.checkCollisionEnemy();
            //check dead
            if (this.character.isDead()) {
                endGame();
            } else if (this.level.enemies.length == 0) {
                endGameWin();
            }
        }, 150);
    }

    /**
     * delete a single object from the array/game
     * 
     * @param {object} obj object which need to be deleted
     * @param {number} item which position in the array
     */
    deleteAfterCollision(obj, item) {
        obj.splice(obj.indexOf(item), 1);
    }

    /**
     * check collision with enemies
     * 
     */
    checkCollisionEnemy() {
        this.level.enemies.forEach((enemy) => {

            this.characterCollidingBySide(enemy);
            this.characterCollidingTop(enemy);

            this.throwableObject.forEach((bottle) => {

                if (bottle.isColliding(enemy) && !this.enemyIsHit) {

                    this.bottleCollidingWithEnemy(enemy, bottle);
                    this.checkEnemyIsDead(enemy);
                    this.stoppStatusBarEndboss(enemy);
                }
            });

        });
    }

    /**
     * do when colliding course is by side
     * 
     * @param {object} enemy which current colliding 
     */
    characterCollidingBySide(enemy) {
        if (this.character.isColliding(enemy) && this.character.onCollisionCourse == 'x') {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    /**
     * do when colliding course is from top, not working on the endboss
     * 
     * @param {object} enemy which current colliding 
     */
    characterCollidingTop(enemy) {
        if (this.character.isCollidingTop(enemy) && !(enemy instanceof Endboss)) {
            this.character.jump();
            enemy.hit();

            if (!muted) {
                this.chickenHitSound.play();
            }
            setTimeout(() => {
                this.deleteAfterCollision(this.level.enemies, enemy);
            }, 500);
        }
    }

    /**
     * slice the enemy energy, let the bottle splash and delete it after 500ms
     * 
     * @param {object} enemy which enemy current colliding
     * @param {object} bottle with bottle is colliding
     */
    bottleCollidingWithEnemy(enemy, bottle) {
        enemy.hit();
        this.enemyIsHit = true;
        bottle.splash = true;
        if (!muted) {
            this.splashSound.play();
        }
        setTimeout(() => {
            this.deleteAfterCollision(this.throwableObject, bottle);
            this.enemyIsHit = false;
        }, 200);
    }

    /**
     * check if enemy is dead if yes, delete it
     * 
     * @param {object} enemy which current colliding 
     */
    checkEnemyIsDead(enemy) {
        if (enemy.isDead()) {
            setTimeout(() => {
                this.deleteAfterCollision(this.level.enemies, enemy);
            }, 500);
        }
    }

    /**
     * when endboss is dead, stop the stausbar from endboss
     * 
     * @param {object} enemy which current colliding 
     */
    stoppStatusBarEndboss(enemy) {
        if (enemy instanceof Endboss) {
            this.statusBarEndboss.setPercentage(enemy.energy);
            if (enemy.energy == 0) {
                this.statusBarEndboss.stopMoving = true;
            }
        }
    }

    /**
     * check collision with coins
     * 
     */
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

    /**
     * check collision with bottles
     * 
     */
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

    /**
     * check if character can throw a bottle
     * 
     */
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

    /**
     * draw all objects on the canvas
     * 
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //translate ist verschieben um bestimmten Wert
        this.ctx.translate(this.camera_x, 0);

        this.drawBackroundAndCharacter();

        this.ctx.translate(-this.camera_x, 0); // back
        // --- space for fixed objects ---
        this.drawFixedObjects();
        this.ctx.translate(this.camera_x, 0); // forward

        this.addToMap(this.statusBarEndboss);
        this.drawInteractableItems();

        this.ctx.translate(-this.camera_x, 0);

        this.requestFrame();
    }

    /**
     * call draw function how often your pc can do it
     * 
     */
    requestFrame() {
        //draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            //er kennt kein this mehr und deswegen wird die variable self erstellt
            self.draw();
        });
    }

    /**
     * add backround and character img to canvas
     * 
     */
    drawBackroundAndCharacter() {
        this.addObjectsToMap(this.level.backroundObject);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
    }

    /**
     * add fixed objects to canvas
     * 
     */
    drawFixedObjects() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottle);
    }

    /**
     * add interactable items to canvas
     * 
     */
    drawInteractableItems() {
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObject);
    }

    /**
     * add an object array to the canvas
     * 
     * @param {array} objects for the canvas
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);

        });
    }

    /**
     * add a single object to the canvas
     * 
     * @param {object} mo single moveable-object 
     */
    addToMap(mo) {
        if (mo.reverse) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.reverse) {
            this.flipImageBack(mo);
        }
    }

    /**
     * flip character image when you move left
     * 
     * @param {object} mo single moveable-object 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * flip the character image back when you move right
     * 
     * @param {object} mo single moveable-object
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}