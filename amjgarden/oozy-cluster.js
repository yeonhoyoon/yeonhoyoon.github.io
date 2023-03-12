var image = document.getElementById("myImage");
var x = 0;
var y = 0;
var xVelocity = 0;
var yVelocity = 0;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var isMoving = false;

function moveImage() {
  x += xVelocity;
  y += yVelocity;

  if (x + image.width > screenWidth || x < 0) {
    xVelocity = -xVelocity;
    changeBackgroundColor();
  }

  if (y + image.height > screenHeight || y < 0) {
    yVelocity = -yVelocity;
    changeBackgroundColor();
  }

  image.style.left = x + "px";
  image.style.top = y + "px";

  if (isMoving) {
    requestAnimationFrame(moveImage);
  }
}

function handleImageClick(event) {
  var imageRect = image.getBoundingClientRect();
  var clickX = event.clientX - imageRect.left;
  var clickY = event.clientY - imageRect.top;
  var centerX = image.width / 2;
  var centerY = image.height / 2;
  var deltaX = clickX - centerX;
  var deltaY = clickY - centerY;
  var angle = Math.atan2(deltaY, deltaX) - Math.PI;
  var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  var maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
  var velocity = distance / maxDistance * 10;

  if (isMoving) {
    isMoving = false;
    document.body.style.backgroundColor = "transparent";
  } else {
    xVelocity = Math.cos(angle) * velocity;
    yVelocity = Math.sin(angle) * velocity;
    isMoving = true;
    moveImage();
    changeBackgroundColor(clickX, clickY);
  }
}

function changeBackgroundColor(x, y) {
  if (isMoving) {
    var h = Math.floor(x / image.width * 360);
    var l = Math.floor(y / image.height * 50) + 50;
    var newColor = "hsl(" + h + ", 100%, " + l + "%)";
    document.body.style.backgroundColor = newColor;
  } else {
    document.body.style.backgroundColor = "transparent";
  }
}

image.addEventListener("click", handleImageClick);