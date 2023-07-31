class Coins extends MoveableObject {

    offset = {
        top: 50,
        right: 25,
        bottom: 50,
        left: 25
    }

    constructor() {
        super().loadImage('../img/8_coin/coin_1.png');

        this.x = 500 + Math.random() * 1500;
        this.y = 0 + Math.random() * 300 ;

    }
}