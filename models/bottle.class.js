class Bottle extends MoveableObject {

    constructor() {
        super().loadImage('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png');

        this.x = 500 + Math.random() * 1500;
        this.y = 330 ;
        this.height = 100;

        this.offset.top = 10 ;
        this.offset.left = 25 ;
        this.offset.right = 25 ;
        this.offset.bottom = 10 ;
    }
}