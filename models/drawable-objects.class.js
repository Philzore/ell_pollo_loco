class DrawableObject {
    img;
    currentImage = 0;
    imageCache = {};

    x = 120;
    y = 280;
   
    height = 150;
    width = 100;

    /**
     * load a single image
     * 
     * @param {string} path of a img 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * load a complete array of images
     * 
     * @param {array} arr which includes sources of images 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * draw a single image in the canvas with src, x, y, width and height
     * 
     * @param {elemnt} ctx canvas context 2d 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coins || this instanceof Bottle || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - (this.offset.right + this.offset.left) , this.height - (this.offset.bottom + this.offset.top));
            ctx.stroke();
        }
    }
}