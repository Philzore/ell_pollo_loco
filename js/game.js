let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let muted = false;

let backroundMusic = new Audio('../audio/backround.mp3');
let looseSound = new Audio('../audio/loose.mp3');

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, muted);
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

function endGame() {
    //document.getElementById('canvas').classList.add('d-none');
    document.getElementById('end-screen').classList.remove('d-none');
    backroundMusic.pause();
    looseSound.play();
    //clear intervals
}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function stopGame() {
    intervalIds.forEach(clearInterval);
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
    debugger;
    backroundMusic.pause();
}
