class level {
    character  ;
    enemies ;
    coins;
    bottles;
    clouds;
    backroundObject ;
    level_end_x = 2200 ;

    /**
     * constructor always run one time when class be created
     * 
     * @param {object} enemies all enemies which are created
     * @param {object} coins all coins which are created
     * @param {object} bottles all bottles which are created
     * @param {object} clouds all clouds which are created
     * @param {object} backroundObject all backround objects which are created
     */
    constructor(enemies, coins, bottles ,clouds , backroundObject) {
        this.enemies = enemies ;
        this.coins = coins;
        this.bottles = bottles ;
        this.clouds = clouds ;
        this.backroundObject = backroundObject ;
    }
}