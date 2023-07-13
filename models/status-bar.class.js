class StatusBar extends DrawableObject {

    IMAGES = [
        '../ell_pollo_loco/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        '../ell_pollo_loco/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        '../ell_pollo_loco/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        '../ell_pollo_loco/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        '../ell_pollo_loco/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        '../ell_pollo_loco/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 100 ;
        this.y = 100 ;
        this.setPercentage(100);
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
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

}