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

    /**
    * set percent 
    * 
    * @param {percent value} percent 
    */
    setPercentage(percent) {
        this.percentage = percent;
        let path = this.IMAGES[this.findImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * find index of an image
     * 
     * @returns number
     */
        findImageIndex() {
            if (this.percentage == 100) {
                return 5;
            } else if (this.percentage >= 80) {
                return 4;
            } else if (this.percentage >= 60) {
                return 3;
            } else if (this.percentage >= 40) {
                return 2;
            } else if (this.percentage >= 20) {
                return 1;
            } else {
                return 0;
            }
        }

}