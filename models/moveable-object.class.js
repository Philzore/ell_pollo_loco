class MoveableObject extends DrawableObject {
   
    speed = 0.3;
    reverse = false;
    energy = 100 ;
    lastHit = 0 ;

    speedY = 0;
    acceleration = 2;

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

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 130;
    }

    isColliding(obj) {
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
            (this.y /*+ this.offsetY*/ + this.height) >= obj.y &&
            (this.y /*+ this.offsetY*/) <= (obj.y + obj.height); //&&
            //obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0 ;
        }
        else {
            this.lastHit = new Date().getTime() ;
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit ; //difference in ms
        timePassed = timePassed / 1000 ; //difference in seconds
        return timePassed < 1 ; 
    }

    isDead() {
        return this.energy == 0 ;
    }
}