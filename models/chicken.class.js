class Chicken extends MoveableObject {

    height = 90;
    width = 90;
    y = 330;

    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 400 + Math.random() * 1000; //wert zwischen 0 und 1000 und 400 als start wert
        this.loadImages(this.IMAGES_WALKING);

        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        // this.setStoppableInterval(this.moveLeft , 1000/60);
        
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); //60 fps

        // this.setStoppableInterval(this.playAnimation(this.IMAGES_WALKING) , 100)

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);

    }
}