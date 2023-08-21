class StatusBarEndboss extends DrawableObject {

    x = 2500;
    y = 50 ;
    width = 200;
    height = 60;
    speed = 5;
    stopMoving = false ;

    IMAGES = [
        './img/7_statusbars/2_statusbar_endboss/0.png',
        './img/7_statusbars/2_statusbar_endboss/20.png',
        './img/7_statusbars/2_statusbar_endboss/40.png',
        './img/7_statusbars/2_statusbar_endboss/60.png',
        './img/7_statusbars/2_statusbar_endboss/80.png',
        './img/7_statusbars/2_statusbar_endboss/100.png'
    ];

    percentage = 100;

    /**
     * constructor always run one time when class be created
     * 
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.animate();
    }

    /**
     * set percent 
     * 
     * @param {number} percent 
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

    /**
     * move the status bar with the boss if the character have first contact
     * 
     */
    animate() {
        let bossFirstContact = false;
        setInterval(() => {
            if (world.character.x > 2000 && !bossFirstContact) {
                bossFirstContact = true;
            }
            if (bossFirstContact && !this.stopMoving) {
                this.moveWithBoss();
            }
            
        }, 50);

    }

    /**
     * movel statusbar to the left
     * 
     */
    moveWithBoss() {
        this.x -= this.speed;
    }

}