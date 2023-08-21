class Bottle extends MoveableObject {

    y = 330 ;
    height = 100 ;

    offset = {
        top: 10,
        right: 25,
        bottom: 10,
        left: 25
    }

    /**
     * constructor always run one time when class be created
     * 
     */
    constructor() {
        super().loadImage('./img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.x = 500 + Math.random() * 1500;
    }
}