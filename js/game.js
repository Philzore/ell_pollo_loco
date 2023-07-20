let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
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
}