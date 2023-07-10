class Endboss extends MoveableObject {

    height = 400;
    width = 250 ;
    y = 50 ;
    x = 2500 ;

    IMAGES_WALKING = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    constructor() {
        super().loadImage('../img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        //this.x = 2500 ;
        this.animate();
    }

    animate(){
        setInterval(() =>{
            this.playAnimation(this.IMAGES_WALKING);
        },100);
    }
}