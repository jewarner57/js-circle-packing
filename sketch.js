// function setup() {
//   createCanvas(500, 500);
//   background(25, 105, 255)

//   for (i = 0; i < 15; i++) {
//     tree(random(0, 400), 401, random(40, 150), random(40, 150));
//   }

// }

// function tree(x, y, trunkHeight, leafSize) {
//   noStroke()
//   fill(random(140, 165), random(40, 85), random(10, 40))
//   rect(x, y, leafSize / 4, -trunkHeight)

//   var leafColorG = random(100, 255)
//   var leafColorB = random(0, 30)

//   for (var i = 0; i < 10; i++) {
//     fill(0, leafColorG, leafColorB);
//     ellipse(x + leafSize / 8 + random(-i, i), y - trunkHeight - leafSize / 2 + random(-i, i), leafSize + random(-i, i), leafSize + random(-i, i))
//   }

// }

let circles = []
let new_circles_this_frame = 0
let new_circle_creation_attempts_this_frame = 0
let START_RADIUS = 5

function setup() {
  createCanvas(500, 500);
  background(0, 0, 0)

  circles.push(new Circle(100, 100, START_RADIUS))
}

function draw() {

  for (circle of circles) {
    circle.isGrowing ? circle.grow(circles) : null
    circle.display()
  }

  while (new_circles_this_frame < 5) {
    newCircle()
    if (new_circle_creation_attempts_this_frame > 1000) {
      console.log('Area Filled')
      noLoop()
    }
  }

  new_circles_this_frame = 0
  new_circle_creation_attempts_this_frame = 0
}

function newCircle() {
  new_circle_creation_attempts_this_frame += 1
  let x = Math.random() * windowWidth
  let y = Math.random() * windowHeight

  for (let circle of circles) {
    let circleDistance = dist(x, y, circle.x, circle.y)
    if (circleDistance < circle.radius + START_RADIUS) {
      return
    }
  }

  circles.push(new Circle(x, y, START_RADIUS))
  new_circles_this_frame += 1
}