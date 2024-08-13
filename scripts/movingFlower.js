/* ----------

script by @ast.rat

---------- */


const canvas = document.querySelector("canvas.moving-flower");
const ctx = canvas.getContext("2d");

const UPDATE_LOAD_COEFF = 0.5;
let targetInterval = 1000 / 60;
let prevTime = Date.now() - targetInterval;

let angle = Math.PI / 4;

function s(size) {
    return 0.7 * window.devicePixelRatio * size;
}

let canvasSize = {
    w: 55,
    h: 55
}

let center = {
    x: 0,
    y: 0
}

let eye = {
    x: 0,
    y: 0
}


function drawFlower() {
    ctx.lineCap = "round";
    ctx.lineWidth = s(1.7);
    ctx.beginPath();
    ctx.arc(center.x, center.y, s(26.5), 0, Math.PI * 2, false);
    ctx.fillStyle = "#CFBB50";
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(center.x, center.y, s(23.5), 0, Math.PI * 2, false);
    ctx.fillStyle = "#FFE763";
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(center.x - s(6), center.y + s(10));
    ctx.quadraticCurveTo(center.x, center.y + s(14.5), center.x + s(6), center.y + s(10));
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#000";
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(center.x + s(7), center.y - s(4.8), s(3.2), s(6.5), 0, 0, Math.PI * 2, false);
    ctx.ellipse(center.x - s(7), center.y - s(4.8), s(3.2), s(6.5), 0, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.clip();
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(center.x + s(7) + eye.x, center.y + eye.y - s(4.8), s(3), 0, Math.PI * 2, false);
    ctx.arc(center.x - s(7) + eye.x, center.y + eye.y - s(4.8), s(3), 0, Math.PI * 2, false);
    ctx.fill();
    ctx.lineWidth = s(1);
    ctx.beginPath();
    ctx.ellipse(center.x + s(7), center.y - s(4.8), s(3.2), s(6.5), 0, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(center.x - s(7), center.y - s(4.8), s(3.2), s(6.5), 0, 0, Math.PI * 2, false);
    ctx.stroke();
}

window.onload = function () {
    document.body.addEventListener("mousemove", (e) => {
        angle = Math.atan2((e.pageX - window.pageXOffset - canvas.getBoundingClientRect().x) * window.devicePixelRatio - center.x, -((e.pageY - window.pageYOffset - canvas.getBoundingClientRect().y) * window.devicePixelRatio - center.y));
    });
}


function mainUpdate() {
    canvas.width = canvasSize.w * window.devicePixelRatio;
    canvas.height = canvasSize.h * window.devicePixelRatio;
    canvas.style.width = canvasSize.w + "px";
    canvas.style.height = canvasSize.h + "px";
    center = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };
    eye = {
        x: eye.x += (Math.sin(angle) * s(2) - eye.x) / 5,
        y: eye.y += (Math.cos(angle) * s(-4.4) - eye.y) / 5
    }
}

function mainDraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFlower();
}

function mainloop() {
    let currentTime = Date.now();
    let updated = false;
    while (currentTime - prevTime > targetInterval * 0.5) {
        mainUpdate();
        updated = true;
        prevTime += targetInterval;
        const now = Date.now();
        const updateTime = now - currentTime;
        if (updateTime > targetInterval * UPDATE_LOAD_COEFF) {
            if (prevTime < now - targetInterval) {
                prevTime = now - targetInterval;
            }
            break;
        }
    }
    if (updated) {
        mainDraw();
    }
    requestAnimationFrame(mainloop);
}

mainloop();