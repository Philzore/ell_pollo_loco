class Cloud extends MoveableObject {
    y = 20;
    width = 500 ;
    height = 200 ; 
    
    /**
     * constructor always run one time when class be created
     * 
     */
    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 500;
        this.animate();
        
    }

    /**
     * animate the clouds let them fly to the left
     * 
     */
    animate() {
        this.moveLeft();
    }

    
}