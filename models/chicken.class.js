class Chicken extends MoveableObject {

    height = 90;
    width = 90;
    y = 330;
    energy = 20;

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * constructor always run one time when class be created
     * 
     */
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 400 + Math.random() * 1000; //wert zwischen 0 und 1000 und 400 als start wert
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    /**
     * animate chicken play images dead or walking and move left
     * 
     */
    animate() {
        setInterval(() => {
            if (this.isDead() ) {
                this.speed = 0 ;
                this.playAnimation(this.IMAGES_DEAD) ;
            } else {
                this.moveLeft();
            }
        }, 1000 / 60); //60 fps

        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);

    }
}