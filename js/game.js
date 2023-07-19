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
        case 'd':
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
        case 'd':
            keyboard.d = false;
            break;
        default:
            break;
    }
});