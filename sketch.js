let circles = []
let new_circles_this_frame = 0
let new_circle_creation_attempts_this_frame = 0
// Set the starting radius for each circle
let START_RADIUS = 3
// Higher means more smaller circles, lower means fewer larger circles
let CREATE_LIMIT_PER_FRAME = 150
let MAX_ATTEMPTS_PER_FRAME = 10000
let img

function preload() {
  img = loadImage('./assets/high-detail.jpg');
}

function setup() {
  const density = displayDensity();
  pixelDensity(1);
  img.loadPixels();
  circles = [];

  createCanvas(img.width, img.height);
  // comment this out to remove the background images and just show the circles
  background(img)
}

function draw() {
  for (let circle of circles) {
    circle.isGrowing ? circle.grow(circles) : null
    circle.display()
  }

  while (new_circles_this_frame < CREATE_LIMIT_PER_FRAME) {
    newCircle()
    if (new_circle_creation_attempts_this_frame > MAX_ATTEMPTS_PER_FRAME) {
      console.log('Area Filled')
      noLoop()
    }
  }

  new_circles_this_frame = 0
  new_circle_creation_attempts_this_frame = 0
}

function newCircle() {
  new_circle_creation_attempts_this_frame += 1

  let x = random(0, img.width)
  let y = random(0, img.height)

  for (let circle of circles) {
    let circleDistance = dist(x, y, circle.x, circle.y)
    if (circleDistance < circle.radius + START_RADIUS) {
      return
    }
  }

  const index = (int(x) + int(y) * img.width) * 4;
  const r = img.pixels[index];
  const g = img.pixels[index + 1];
  const b = img.pixels[index + 2];
  const c = color(r, g, b);


  circles.push(new Circle(x, y, START_RADIUS, c))
  new_circles_this_frame += 1
}