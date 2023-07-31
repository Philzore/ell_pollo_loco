class ThrowableObject extends MoveableObject {

    constructor(x, y, reverse) {
        super().loadImage('../img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
        this.throw(reverse);
    }

    throw(reverse) {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            if (reverse == false) {
                this.x += 10;
            } else if (reverse == true) {
                this.x -= 10;
            }
        }, 25);
    }
}