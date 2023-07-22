class StatusBarCoins extends DrawableObject {

    IMAGES = [
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20 ;
        this.y = 50 ;
        this.width = 200 ;
        this.height = 60;
        this.setPercentage(0);
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

    //TODO

}