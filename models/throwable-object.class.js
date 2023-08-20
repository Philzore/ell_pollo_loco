class ThrowableObject extends MoveableObject {
    splash = false ;

    IMAGES_ROTATION = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * constructor always run one time when class be created
     * 
     * @param {int} x coordinates where the bottle start for throwing
     * @param {int} y coordinates where the bottle start for throwing
     * @param {bool} reverse for the direction where the bottle throw
     */
    constructor(x, y, reverse) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
        this.throw(reverse);
    }

    throw(reverse) {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            if (reverse == false && !this.splash) {
                this.playAnimation(this.IMAGES_ROTATION);
                this.x += 10;
            } else if (reverse == true && !splash) {
                this.playAnimation(this.IMAGES_ROTATION);
                this.x -= 10;
            } else if (this.splash) {
                this.speedY = 0 ;
                this.playAnimation(this.IMAGES_SPLASH);
            }
        }, 25);
    }

    splash() {
        this.splash = true ;
    }

}