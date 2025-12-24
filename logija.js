const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
const intro = document.getElementById("intro");
const start = document.getElementById("start");
const tree = document.getElementById("tree");
const christmasMessage = document.getElementById("christmasMessage");

/* CANVAS */
function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

/* NIEVE */
let snowflakes = [];

function createSnow() {
  snowflakes.push({
    x: Math.random() * canvas.width,
    y: -10,
    r: Math.random() * 3 + 1,
    speed: Math.random() * 1.5 + 0.5,
    drift: Math.random() * 0.5 - 0.25
  });
}

function animateSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.3) createSnow();

  snowflakes.forEach(s => {
    s.y += s.speed;
    s.x += s.drift;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fill();
  });

  snowflakes = snowflakes.filter(s => s.y < canvas.height + 10);
  requestAnimationFrame(animateSnow);
}

/* CLICK */
start.onclick = () => {
  intro.style.opacity = "0";
  setTimeout(() => intro.remove(), 800);

  animateSnow();

  // Mostrar árbol primero
  setTimeout(() => {
    tree.style.display = "block";
  }, 1500);

  // Mostrar mensaje después
  setTimeout(() => {
    christmasMessage.style.display = "flex";
  }, 3000);
};
