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

function setup() {
  createCanvas(500, 500);
  background(0, 0, 0)

  circles.push(new Circle(100, 100, 0))
}

function draw() {

  for (circle of circles) {
    circle.isGrowing ? circle.grow(circles) : null
    circle.display()
  }

  newCircle()
}

function newCircle() {
  let x = Math.random() * windowWidth
  let y = Math.random() * windowHeight

  for (let circle of circles) {
    let circleDistance = dist(x, y, circle.x, circle.y)
    if (circleDistance < circle.radius) {
      return
    }
  }

  circles.push(new Circle(x, y, 0))
}