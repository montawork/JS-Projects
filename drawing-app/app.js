const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const sizeEl = document.getElementById('size');
const colorEl = document.querySelector('input');
const clearBtn = document.querySelector('.clear');

let size = 5;
let isPressed;
let color = '#111';

colorEl.addEventListener('change', () => {
  color = colorEl.value;
});

plus.addEventListener('click', () => {
  if (size < 100) {
    size++;
    sizeEl.textContent = size;
  }
});

minus.addEventListener('click', () => {
  if (size > 1) {
    size--;
    sizeEl.textContent = size;
  }
});

canvas.addEventListener('mousedown', () => {
  isPressed = true;
});

canvas.addEventListener('mouseup', () => {
  isPressed = false;
});

canvas.addEventListener('mousemove', (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  if (isPressed) {
    drawCircle(x, y);
  }
});

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
