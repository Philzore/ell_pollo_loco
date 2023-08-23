let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let muted = false;

let backroundMusic = new Audio('./audio/backround.mp3');
let looseSound = new Audio('./audio/loose.mp3');
let winSound = new Audio('./audio/win.mp3');
let walkingSound = new Audio('./audio/walking.mp3');

/**
 * Eventlistener when screen size changed
 * 
 */
addEventListener('resize', checkDeviceWidth);

/**
 * Eventlistener when fullscreen change with escape button
 * 
 */
addEventListener('fullscreenchange', (event) => {
    if (!document.fullscreen) {
        removeFullViewClass();
    };
});

/**
 * initialize the game
 * 
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, muted);
}

/**
 * reload current page
 * 
 */
function reloadPage() {
    
    clearIntervals();
    document.getElementById('start-screen').classList.remove('d-none');
    document.getElementById('end-screen-loose').classList.add('d-none');
    document.getElementById('end-screen-win').classList.add('d-none');

}

/**
 * check current width of the screen and show overlay if smaller then 800px
 * 
 */
function checkDeviceWidth() {
    if (window.innerWidth <= 800) {
        document.getElementById('turn-device-screen').classList.remove('d-none');
    } else {
        document.getElementById('turn-device-screen').classList.add('d-none');
    }

}

/**
 * Eventlistener if a key is down
 * 
 */
window.addEventListener('keydown', (event) => {
    let pressedKey = event;
    switch (pressedKey['code']) {
        case 'ArrowUp':
            keyboard.up = true;
            break;
        case 'ArrowDown':
            keyboard.down = true;
            break;
        case 'ArrowLeft':
            keyboard.left = true;
            break;
        case 'ArrowRight':
            keyboard.right = true;
            break;
        case 'Space':
            keyboard.space = true;
            break;
        case 'KeyD':
            keyboard.d = true;
            break;
        default:
            break;
    }
});

/**
 * Eventlistener if a key is up
 * 
 */
window.addEventListener('keyup', (event) => {
    let pressedKey = event;

    switch (pressedKey['code']) {
        case 'ArrowUp':
            keyboard.up = false;
            break;
        case 'ArrowDown':
            keyboard.down = false;
            break;
        case 'ArrowLeft':
            keyboard.left = false;
            break;
        case 'ArrowRight':
            keyboard.right = false;
            break;
        case 'Space':
            keyboard.space = false;
            break;
        case 'KeyD':
            keyboard.d = false;
            break;
        default:
            break;
    }
});

/**
 * remove start screen
 * 
 */
function removeStartScreen() {
    initLevel();
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    init();
    backroundMusic.play();
}

/**
 * show win screen and clear intervals
 * 
 */
function endGameWin() {
    document.getElementById('end-screen-win').classList.remove('d-none');
    if (!muted) {
        backroundMusic.pause();
        walkingSound.pause();
        winSound.play();
    } else {
        winSound.pause();
    }
    clearIntervals();
}

/**
 * show end screen when loose and clear intervals
 * 
 */
function endGame() {
    document.getElementById('end-screen-loose').classList.remove('d-none');

    backroundMusic.pause();
    walkingSound.pause();
    if (!muted) {
        looseSound.play();
    } else {
        looseSound.pause();
    }

    clearIntervals();
}

/**
 * clear all intervals
 * 
 */
function clearIntervals() {
    for (let i = 0; i < 9999; i++) {
        window.clearInterval(i);
    }
}

/**
 * turn sound off and change sound img when toggle
 * 
 */
function soundOnOff() {
    let soundImage = document.getElementById('sound-off');

    if (muted) {
        soundImage.src = './img/0_hud/volume-off.svg';
        muted = false;
        backroundMusic.play();
    } else {
        soundImage.src = './img/0_hud/volume.svg';
        muted = true;
        backroundMusic.pause();
    }

}

/**
 * set full screen
 * 
 */
function setFullScreen() {
    let fullScreen = document.getElementById('main-screen');
    enterFullscreen(fullScreen);
}

/**
 * open full screen
 * 
 * @param {element} element which should enter full screen 
 */
function enterFullscreen(element) {

    if (document.getElementById('fullscreen-btn-img').src == 'https://philipp-moessl.developerakademie.net/pollo_locco/img/0_hud/fullscreen.svg') {

        if (element.requestFullscreen) {
            element.requestFullscreen();
            document.getElementById('introduction').classList.add('d-none');
        } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
            element.msRequestFullscreen();
        } else if (element.webkitRequestFullscreen) {  // iOS Safari
            element.webkitRequestFullscreen();
        }
        addFullViewClass();
    } else {
        exitFullscreen();
        removeFullViewClass();
    }

}

/**
 * give the elements the correct class for the full screen
 * 
 */
function addFullViewClass() {
    document.getElementById('start-screen').classList.add('full-view');
    document.getElementById('img-start-screen').classList.add('full-view');
    document.getElementById('canvas').classList.add('full-view');
    document.getElementById('fullscreen-btn-img').src = './img/0_hud/close.svg';
}

/**
 * remove the elements the correct class for the full screen
 * 
 */
function removeFullViewClass() {
    document.getElementById('start-screen').classList.remove('full-view');
    document.getElementById('img-start-screen').classList.remove('full-view');
    document.getElementById('canvas').classList.remove('full-view');
    document.getElementById('fullscreen-btn-img').src = './img/0_hud/fullscreen.svg';
    document.getElementById('introduction').classList.remove('d-none');
}

/**
 * exit from full screen
 * 
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
