class MoveableObject extends DrawableObject {

    speed = 0.3;
    reverse = false;
    energy = 100;
    lastHit = 0;
    lastMove = 0;

    speedY = 0;
    acceleration = 2;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }

    onCollisionCourse;

    /**
     * play the array length all images
     * 
     * @param {array} images array where img src are included
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * let the object move right
     * 
     */
    moveRight() {
        this.x += this.speed;
        this.reverse = false;
    }

    /**
     * let the object move right
     * 
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * get the time from the last movement
     * 
     */
    getTimeLastMove() {
        this.lastMove = new Date().getTime();
    }

    /**
     * when the character not moving longer then tree seconds , play snooze animation
     * 
     * @returns true or false
     */
    checkSnooze() {
        let timePassed = new Date().getTime() - this.lastMove; //difference in ms
        timePassed = timePassed / 1000; //difference in seconds
        return timePassed > 3;
    }

    /**
     * set gravity to let objects fall down
     * 
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * check if an object is above ground
     * 
     * @returns true or false
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { //throwableObject allways fall
            return true;
        } else {
            return this.y < 130;
        }
    }

    /**
     * check if collision come from the top (y)
     * 
     * @param {object} obj where the collision need to be checked
     * @returns true or false
     */
    isCollidingTop(obj) {
        return (this.x + this.width - this.offset.right) >= obj.x + obj.offset.left && this.x + this.offset.left <= (obj.x + obj.width - obj.offset.right) && 
        (this.y  + this.height - this.offset.bottom) >= obj.y + obj.offset.top && (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom) && 
        (this.onCollisionCourse == 'y' );

    }

    /**
     * check if collision come from the side (x)
     * 
     * @param {object} obj where the collision need to be checked
     * @returns true or false
     */
    isColliding(obj) {
        return (this.x + this.width - this.offset.right) >= obj.x + obj.offset.left &&
            this.x + this.offset.left <= (obj.x + obj.width - obj.offset.right) &&
            (this.y  + this.height - this.offset.bottom) >= obj.y + obj.offset.top &&
            (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom);
    }

    /**
     * slice the energy from an object
     * 
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }

    }

    /**
     * to play a short animation when the character is hurt
     * 
     * @returns true or false
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; //difference in ms
        timePassed = timePassed / 1000; //difference in seconds
        return timePassed < 1;
    }

    /**
     * check if objects energy is zero
     * 
     * @returns true or false
     */
    isDead() {
        return this.energy == 0;
    }


}