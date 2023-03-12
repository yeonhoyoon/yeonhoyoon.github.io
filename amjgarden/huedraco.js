const canvas = document.getElementById('huedraco-canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Draw a background gradient
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, '#70c1b3');
gradient.addColorStop(1, '#b2dbbf');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw a circle on the canvas
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 100;

ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
ctx.fillStyle = '#f8b195';
ctx.fill();

// Animate the circle
let angle = 0;
let rotate = true;

function animate() {
  requestAnimationFrame(animate);

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Redraw the background gradient
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Rotate the circle
  if (rotate) {
    angle += 0.0001;
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    ctx.translate(-centerX, -centerY);
  }

  // Draw the circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = '#f8b195';
  ctx.fill();
}

animate();

// Add an event listener to the image
const img = document.getElementById('huedraco-img');

img.addEventListener('click', () => {
  alert('Huedraco stole your colorful things!');
  rotate = false;
});