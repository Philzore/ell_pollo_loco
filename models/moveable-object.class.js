class MoveableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    speed = 0.3;
    reverse = false;

    speedY = 0;
    acceleration = 2;

    currentImage = 0;
    imageCache = {};

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
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


}