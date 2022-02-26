let circles = []
let new_circles_this_frame = 0
let new_circle_creation_attempts_this_frame = 0
let START_RADIUS = 5
let CREATE_LIMIT_PER_FRAME = 20
let MAX_ATTEMPTS_PER_FRAME = 1000
let spots = []

function setup() {
  getImage((width, height) => { createCanvas(width, height); loop() })
  background(0, 0, 0)

  noLoop()
}

function draw() {
  if (spots.length > 0) {
    for (circle of circles) {
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
}

function newCircle() {
  new_circle_creation_attempts_this_frame += 1

  const randomSpot = Math.floor(Math.random() * spots.length)

  let x = spots[randomSpot][0]
  let y = spots[randomSpot][1]
  let spot_color = spots[randomSpot][2]
  spots.splice(randomSpot, 1)

  for (let circle of circles) {
    let circleDistance = dist(x, y, circle.x, circle.y)
    if (circleDistance < circle.radius + START_RADIUS) {
      return
    }
  }

  circles.push(new Circle(x, y, START_RADIUS, spot_color))
  new_circles_this_frame += 1
}

function getImage(callback) {
  const img = loadImage('./test.jpg', (img) => {

    img.loadPixels()
    console.log(img)

    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
        let index = (x + y * width) * 4;
        const pixel_color = color(img.pixels[index], img.pixels[index + 1], img.pixels[index + 2])
        if ((img.pixels[index] + img.pixels[index + 1] + img.pixels[index + 2]) / 3 < 250) {
          spots.push([x, y, pixel_color])
        }
      }
    }

    callback(img.width, img.height)
  })
}