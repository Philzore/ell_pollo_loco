class BackroundObject extends MoveableObject {

    height = 480;
    width = 720;

    /**
     * constructor always run one time when class be created
     * 
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.y = 480 - this.height ;
        this.x = x ;
    }
}