class Keyboard {
    left = false;
    right = false;
    up = false;
    down = false;
    space = false;
    d = false;

    /**
     * constructor always run one time when class be created
     * 
     */
    constructor() {
        this.createListenerBtns();
    }

    /**
     * create Eventlistener for responsive with touch function
     * 
     */
    createListenerBtns() {
        this.createLeft();
        this.createRight();
        this.createUp();
        this.createThrow();
    }

    /**
     * create Eventlistener for responsive with touch function move left
     * 
     */
    createLeft() {
        //left
        document.getElementById('btn-left').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.left = true;
        });
        document.getElementById('btn-left').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.left = false;
        });
    }

    /**
     * create Eventlistener for responsive with touch function move right
     * 
     */
    createRight() {
        //right
        document.getElementById('btn-right').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.right = true;
        });
        document.getElementById('btn-right').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.right = false;
        });
    }

    /**
     * create Eventlistener for responsive with touch function jump
     * 
     */
    createUp() {
        //up
        document.getElementById('btn-up').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.up = true;
        });
        document.getElementById('btn-up').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.up = false;
        });
    }

    /**
     * create Eventlistener for responsive with touch function throw bottle
     * 
     */
    createThrow() {
        //throw
        document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.d = true;
        });
        document.getElementById('btn-throw').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.d = false;
        });
    }

}