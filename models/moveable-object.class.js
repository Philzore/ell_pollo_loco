class MoveableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    speed = 0.3 ;
    reverse = false ;

    currentImage = 0 ;
    imageCache = {};

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Move Right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed ;
        },1000/60); //60 fps
    }
}