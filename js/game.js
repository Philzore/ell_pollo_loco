let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let muted = false;

let backroundMusic = new Audio('../audio/backround.mp3');
let looseSound = new Audio('../audio/loose.mp3');

addEventListener('resize' , checkDeviceWidth) ;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, muted);
}

function reloadPage() {
    location.reload();
}

function checkDeviceWidth() {
    if (window.innerWidth <= 800) {
        document.getElementById('turn-device-screen').classList.remove('d-none');
    } else {
        document.getElementById('turn-device-screen').classList.add('d-none');
    }
}

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

function removeStartScreen() {
    initLevel();
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    init();
    backroundMusic.play();
}

function endGameWin () {
    document.getElementById('end-screen-win').classList.remove('d-none');
    clearIntervals();
}

function endGame() {
    document.getElementById('end-screen-loose').classList.remove('d-none');
    
    backroundMusic.pause();
    if (!muted) {
        looseSound.play();
    } else {
        looseSound.pause();
    }
    
    clearIntervals();
}

function clearIntervals() {
     for (let i = 0; i < 9999; i++) {
        window.clearInterval(i);
     }
}

function soundOnOff() {
    let soundImage = document.getElementById('sound-off');

    if (muted) {
        soundImage.src = '../img/0_hud/volume-off.svg';
        muted = false;
    } else {
        soundImage.src = '../img/0_hud/volume.svg';
        muted = true;
    }

    if (document.getElementById('start-screen').classList.contains('d-none')) {
        world.muted = true;
    } else if (muted) {
        world.muted = false;
    }
    console.log('world mute = ' + world.muted);
    
    backroundMusic.pause();
}

function goLeft() {
    keyboard.left = true;

    console.log(keyboard.left);

}

function setFullScreen() {
    let fullScreen = document.getElementById('main-screen');
    enterFullscreen(fullScreen);
}

function enterFullscreen(element) {
    
    if (document.getElementById('fullscreen-btn-img').src == 'http://127.0.0.1:5500/img/0_hud/fullscreen.svg') {

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

function addFullViewClass() {
    document.getElementById('start-screen').classList.add('full-view');
    document.getElementById('img-start-screen').classList.add('full-view');
    document.getElementById('canvas').classList.add('full-view');
    document.getElementById('fullscreen-btn-img').src = '../img/0_hud/close.svg';
}

function removeFullViewClass() {
    document.getElementById('start-screen').classList.remove('full-view');
    document.getElementById('img-start-screen').classList.remove('full-view');
    document.getElementById('canvas').classList.remove('full-view');
    document.getElementById('fullscreen-btn-img').src = '../img/0_hud/fullscreen.svg';
    document.getElementById('introduction').classList.remove('d-none');
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

let btnLeft = document.getElementById('btn-left');
btnLeft.addEventListener('touchstart', goLeft);