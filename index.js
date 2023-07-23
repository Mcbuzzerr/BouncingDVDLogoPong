
const DVDLogo = document.getElementById('dvd-logo');
const DVDLogoImage = document.getElementById('logo-img');

let velocityX = 3;
let velocityY = 3;

let pongMode = false;

let positionX = window.innerWidth / 2;
let positionY = window.innerHeight / 2;

const DVDLogoWidth = DVDLogo.offsetWidth;
const DVDLogoHeight = DVDLogo.offsetHeight;

DVDLogo.style.left = positionX + 'px';
DVDLogo.style.top = positionY + 'px';
DVDLogoImage.style.setProperty('--hue-rotato', Math.floor(Math.random() * 360) + 'deg');

const p1Paddle = document.getElementById('p1-paddle');
let p1PaddleY = window.innerHeight / 2;
p1Paddle.style.top = p1PaddleY + 'px';
const p2Paddle = document.getElementById('p2-paddle');
let p2PaddleY = window.innerHeight / 2;
p2Paddle.style.top = p2PaddleY + 'px';

let p1Score = 0;
let p2Score = 0;

let keyState = {
    arrowup: false,
    arrowdown: false,
    arrowleft: false,
    arrowright: false,
    enter: false,
    w: false,
    a: false,
    s: false,
    d: false,
    b: false,
};

let keyLog = [];

document.addEventListener('keydown', (event) => {
    let key = event.key.toLowerCase();
    if (key in keyState) {
        keyState[key] = true;
    }
    if (keyLog.length > 10) {
        keyLog.shift();
    }
    keyLog.push(key);
    if (keyLog.join('') === 'arrowuparrowuparrowdownarrowdownarrowleftarrowrightarrowleftarrowrightbaenter') {
        togglePongMode();
    }
})

document.addEventListener('keyup', (event) => {
    let key = event.key.toLowerCase();
    if (key in keyState) {
        keyState[key] = false;
    }
});

const togglePongMode = () => {
    pongMode = !pongMode;
    document.getElementsByClassName('paddle')[0].classList.toggle('hidden');
    document.getElementsByClassName('paddle')[1].classList.toggle('hidden');
    document.getElementById('pongUI').classList.toggle('hidden');
    if (pongMode) {
        positionX = window.innerWidth / 2;
        positionY = window.innerHeight / 2;
        velocityX = 3;
        velocityY = 3;
        alert('Pong Mode Activated');
        if (Math.random() > 0.5) {
            velocityX *= -1;
        }

        if (Math.random() > 0.5) {
            velocityY *= -1;
        }
    }
}

const animate = () => {
    requestAnimationFrame(animate);
    let DVDRect = DVDLogo.getBoundingClientRect();
    let p1Rect = p1Paddle.getBoundingClientRect();
    let p2Rect = p2Paddle.getBoundingClientRect();

    if (pongMode) {
        //left
        if (DVDRect.left < p1Rect.right && DVDRect.right > p1Rect.left && DVDRect.top < p1Rect.bottom && DVDRect.bottom > p1Rect.top) {
            document.getElementById('logo-img').style.setProperty('--hue-rotato', Math.floor(Math.random() * 360) + 'deg');
            let relativeIntersectY = (DVDRect.y + (DVDRect.height / 2)) - (p1Rect.y + (p1Rect.height / 2));
            let normalizedRelativeIntersectionY = (relativeIntersectY / (p1Rect.height / 2));
            let bounceAngle = normalizedRelativeIntersectionY * (Math.PI / 4);
            velocityX = Math.cos(bounceAngle) * 15;
            velocityY = Math.sin(bounceAngle) * 15;
        }
        //right
        if (DVDRect.left < p2Rect.right && DVDRect.right > p2Rect.left && DVDRect.top < p2Rect.bottom && DVDRect.bottom > p2Rect.top) {
            document.getElementById('logo-img').style.setProperty('--hue-rotato', Math.floor(Math.random() * 360) + 'deg');
            let relativeIntersectY = (DVDRect.y + (DVDRect.height / 2)) - (p2Rect.y + (p2Rect.height / 2));
            let normalizedRelativeIntersectionY = (relativeIntersectY / (p2Rect.height / 2));
            let bounceAngle = normalizedRelativeIntersectionY * (Math.PI / 4);
            velocityX = Math.cos(bounceAngle) * -15;
            velocityY = Math.sin(bounceAngle) * 15;
        }
    }

    if (positionX + (DVDLogoWidth / 2) >= window.innerWidth || positionX - (DVDLogoWidth / 2) <= 0) {
        velocityX *= -1;
        document.getElementById('logo-img').style.setProperty('--hue-rotato', Math.floor(Math.random() * 360) + 'deg');
        if (pongMode) {
            if (positionX < window.innerWidth / 2) {
                // alert('Left Wall')
                p2Score++;
            } else if (positionX > window.innerWidth / 2) {
                // alert('Right Wall')
                p1Score++;
            }
            positionX = window.innerWidth / 2;
            positionY = window.innerHeight / 2;
            velocityX *= -0.5;
            velocityY *= 0.5;
        }
    }
    if (positionY + (DVDLogoHeight / 2) >= window.innerHeight || positionY - (DVDLogoHeight / 2) <= 0) {
        velocityY *= -1;
        document.getElementById('logo-img').style.setProperty('--hue-rotato', Math.floor(Math.random() * 360) + 'deg');
    }

    if (!pongMode) {

        if (velocityX > 10 || velocityX < -10) {
            velocityX *= 0.99;
        }

        if (velocityY > 10 || velocityY < -10) {
            velocityY *= 0.99;
        }

        if (keyState['arrowup']) {
            velocityY -= 0.2;
        }

        if (keyState['arrowdown']) {
            velocityY += 0.2;
        }

        if (keyState['arrowleft']) {
            velocityX -= 0.2;
        }

        if (keyState['arrowright']) {
            velocityX += 0.2;
        }
    }

    if (pongMode) {
        const PADDLESPEED = 10;
        if (p1Rect.top >= 0) {
            if (keyState['w']) {
                p1PaddleY -= PADDLESPEED;
            }
        }

        if (p1Rect.bottom <= window.innerHeight) {
            if (keyState['s']) {
                p1PaddleY += PADDLESPEED;
            }
        }

        if (p2Rect.top >= 0) {
            if (keyState['arrowup']) {
                p2PaddleY -= PADDLESPEED;
            }
        }

        if (p2Rect.bottom <= window.innerHeight) {
            if (keyState['arrowdown']) {
                p2PaddleY += PADDLESPEED;
            }
        }
    }

    positionX += velocityX;
    positionY += velocityY;

    DVDLogo.style.left = positionX + 'px';
    DVDLogo.style.top = positionY + 'px';

    if (pongMode) {
        p1Paddle.style.top = p1PaddleY + 'px';
        p2Paddle.style.top = p2PaddleY + 'px';
    }
    document.getElementById('p1-score').innerHTML = p1Score;
    document.getElementById('p2-score').innerHTML = p2Score;
}

requestAnimationFrame(animate);

// Konami Code to turn on pong mode
