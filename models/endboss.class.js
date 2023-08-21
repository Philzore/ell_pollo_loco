class Endboss extends MoveableObject {

    height = 400;
    width = 250;
    speed = 5;
    y = 50;
    x = 2500;

    offset = {
        top: 65,
        right: 0,
        bottom: 0,
        left: 0
    }

    i = 0;
    bossFirstContact = false

    firstContactSound = new Audio('./audio/chicken_endboss.mp3');

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * constructor always run one time when class be created
     * 
     */
    constructor() {
        super().loadImage('./img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);

        this.animate();
    }

    /**
     * animate the endboss
     * 
     */
    animate() {
        setInterval(() => {
            this.playEndbossImages();

            this.i++;

            this.characterHaveFirstContact();

            if (this.bossFirstContact) {
                this.moveLeft();
            }
        }, 50);
    }

    /**
     * play the correct images for the correct situation
     * 
     */
    playEndbossImages() {
        if (this.i < 20) {
            this.playAnimation(this.IMAGES_ALERT);
        }
        else if (this.isHurt() && this.energy >= 20) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        }
        else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * check if character have first contact with endboss
     * 
     */
    characterHaveFirstContact() {
        if (world.character.x > 2000 && !this.bossFirstContact) {
            this.i = 0;
            this.bossFirstContact = true;
            if (!muted) {
                this.firstContactSound.play();
            }
        }
    }
}