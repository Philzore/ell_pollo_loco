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

    currentJumpingImage = 1;
    state = '';

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

    snoringSound = new Audio('./audio/snoring.mp3');
    ouchSound = new Audio('./audio/ouch.mp3');

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
        this.intervalCharacterMoving();
        this.intervalCharacterImages();
    }

    /**
     * interval for character moving
     * 
     */
    intervalCharacterMoving() {
        setInterval(() => {
            walkingSound.pause();
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
    }

    /**
     * interval to play character images
     * 
     */
    intervalCharacterImages() {
        setInterval(() => {
            this.playCharacterImages();
        }, 100);
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
        this.soundPause();

        if (this.isDead()) {
            this.whenDead();
        } else if (this.isHurt()) {
            this.whenHurt();
        } else if (this.isAboveGround()) {
            this.whenIsAboveGround();
        } else if (this.world.keyboard.right || this.world.keyboard.left) {
            this.whenWalking();
        } else if (this.checkSnooze()) {
            this.whenNoMovement();
        }
    }

    /**
     * do when character is dead
     * 
     */
    whenDead() {
        this.playAnimation(this.IMAGES_DEAD);
        walkingSound.pause();

    }

    /**
     * do when character is hurt
     * 
     */
    whenHurt() {
        this.playAnimation(this.IMAGES_HURT);
        this.playSound(this.ouchSound);

    }

    /**
     * do when character is above ground
     * 
     */
    whenIsAboveGround() {
        this.playJumpAnimation();
        this.currentJumpingImage++;

    }

    /**
     * do when character is walking
     * 
     */
    whenWalking() {
        this.playAnimation(this.IMAGES_WALKING);

    }

    /**
     * do when character stay for a while
     * 
     */
    whenNoMovement() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        this.playSound(this.snoringSound);

    }

    /**
     * play the jumping images only once
     * 
     */
    playJumpAnimation() {
        if (this.currentJumpingImage < 8 && this.isAboveGround()) {
            this.loadImage(`./img/2_character_pepe/3_jump/J-3${this.currentJumpingImage}.png`);
        }
    }

    /**
     * pause the sounds
     * 
     */
    soundPause() {
        this.snoringSound.pause();
        this.ouchSound.pause();
    }

    /**
     * play a specific sound
     * 
     * @param {Audio} soundFile which should played
     */
    playSound(soundFile) {
        if (!muted) {
            soundFile.play();
        }
    }

    /**
     * play the walking sound
     * 
     */
    playWalkingSound() {
        if (!muted) {
            walkingSound.play();
        }
    }

    /**
     * let the character jump
     * 
     */
    jump() {
        this.currentJumpingImage = 1;
        this.speedY = 30;
    }
}