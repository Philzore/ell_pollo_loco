class Coins extends MoveableObject {

    constructor() {
        super().loadImage('../img/8_coin/coin_1.png');

        this.x = 500 + Math.random() * 1500;
        this.y = 0 + Math.random() * 300 ;
    }
}