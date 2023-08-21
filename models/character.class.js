class Character extends MoveableObject {
    height = 300;
    width = 150;
    y = 0;
    speed = 10;
    coinStatus = 0;
    bottleStatus = 0;

    offset = {
        top: 100,
        right: 50,
        bottom: 20,
        left: 50
    }

    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_LONG_IDLE = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    world;
    walkingSound = new Audio('./audio/walking.mp3');
    snoringSound = new Audio('./audio/snoring.mp3');

    /**
     * constructor always run one time when class be created
     * 
     */
    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
        this.getTimeLastMove();
    }

    /**
     * animate character
     * 
     */
    animate() {
        setInterval(() => {
            this.walkingSound.pause();
            if (this.canCharacterMoveRight()) {
                this.characterMoveRight();
            }
            if (this.canCharacterMoveLeft()) {
                this.characterMoveLeft();
            }

            if (this.canCharacterJump()) {
                this.jump();
            }

            this.setCollisionCourse();

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            this.playCharacterImages();
        }, 50);

    }

    /**
     * check if character can walk right
     * 
     * @returns true or false
     */
    canCharacterMoveRight() {
        return this.world.keyboard.right && this.x < this.world.level.level_end_x;
    }

    /**
     * check if character can walk left
     * 
     * @returns true or false
     */
    canCharacterMoveLeft() {
        return this.world.keyboard.left && this.x > 0;
    }

    /**
     * check if character can jump
     * 
     * @returns true or false
     */
    canCharacterJump() {
        return (this.world.keyboard.up || this.world.keyboard.space) && !this.isAboveGround();
    }

    /**
     * move the character to the right
     * 
     */
    characterMoveRight() {
        this.moveRight();
        this.getTimeLastMove();
        this.playWalkingSound();
    }

    /**
     * move the character to the left
     * 
     */
    characterMoveLeft() {
        this.reverse = true;
        this.moveLeft();
        this.getTimeLastMove();
        this.playWalkingSound();
    }

    /**
     * set collision course variable y or x
     * 
     */
    setCollisionCourse() {
        if (this.isAboveGround()) {
            this.onCollisionCourse = 'y';
        } else {
            setTimeout(() => {
                this.onCollisionCourse = 'x';
            }, 100);
        }
    }

    /**
     * play the correct images for the correct situation
     * 
     */
    playCharacterImages() {
        this.snoringSound.pause();
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.walkingSound.pause();
        }
        else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        }
        else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
        else if (this.world.keyboard.right || this.world.keyboard.left) {
            this.playAnimation(this.IMAGES_WALKING);
        }
        else if (this.checkSnooze()) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            if (!muted) {
                this.snoringSound.play();
            }
        }
    }

    /**
     * play the walking sound
     * 
     */
    playWalkingSound() {
        if (!muted) {
            this.walkingSound.play();
        }
    }

    /**
     * let the character jump
     * 
     */
    jump() {
        this.speedY = 30;
    }
}