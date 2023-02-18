const ball = document.getElementById('ball');

let x = Math.floor(Math.random() * window.innerWidth);
let y = Math.floor(Math.random() * window.innerHeight);

let dx = (Math.random() - 0.5) * 10;
let dy = (Math.random() - 0.5) * 10;

function animate() {
  requestAnimationFrame(animate);

  x += dx;
  y += dy;

  if (x + ball.clientWidth > window.innerWidth || x < 0) {
    dx = -dx;
  }

  if (y + ball.clientHeight > window.innerHeight || y < 0) {
    dy = -dy;
  }

  ball.style.transform = `translate(${x}px, ${y}px)`;
}

animate();
