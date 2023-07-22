class Bottle extends MoveableObject {

    constructor() {
        super().loadImage('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png');

        this.x = 500 + Math.random() * 1500;
        this.y = 330 ;
        this.height = 100;
    }
}