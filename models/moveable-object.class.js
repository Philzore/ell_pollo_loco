class MoveableObject extends DrawableObject {

    speed = 0.3;
    reverse = false;
    energy = 100;
    lastHit = 0;
    lastMove = 0;

    speedY = 0;
    acceleration = 2;

    intervalId = 0 ;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }

    onCollisionCourse;

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
        this.reverse = false;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    getTimeLastMove() {
        this.lastMove = new Date().getTime();
    }

    checkSnooze() {
        let timePassed = new Date().getTime() - this.lastMove; //difference in ms
        timePassed = timePassed / 1000; //difference in seconds
        return timePassed > 3;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { //throwableObject allways fall
            return true;
        } else {
            return this.y < 130;
        }
    }

    isCollidingTop(obj) {
        return (this.x + this.width - this.offset.right) >= obj.x + obj.offset.left && this.x + this.offset.left <= (obj.x + obj.width - obj.offset.right) && 
        (this.y  + this.height - this.offset.bottom) >= obj.y + obj.offset.top && (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom) && 
        (this.onCollisionCourse == 'y' );

    }

    isColliding(obj) {
        return (this.x + this.width - this.offset.right) >= obj.x + obj.offset.left &&
            this.x + this.offset.left <= (obj.x + obj.width - obj.offset.right) &&
            (this.y  + this.height - this.offset.bottom) >= obj.y + obj.offset.top &&
            (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom);
        //&&
        //obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

    }

    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }

    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; //difference in ms
        timePassed = timePassed / 1000; //difference in seconds
        return timePassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }


}