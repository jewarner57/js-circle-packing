class Circle {
    constructor(x, y, radius) {
        this.x = x
        this.y = y
        this.radius = radius
        this.canvasHeight = windowHeight
        this.canvasWidth = windowWidth
        this.isGrowing = true
    }

    display() {
        fill(0)
        stroke(255, 255, 255)
        strokeWeight(1);
        ellipse(this.x, this.y, this.radius * 2)
    }

    grow(bounding_circles) {
        this.radius += 1
        this.isGrowing = this.isWithinCanvas() && this.isWithinBoundingObjects(bounding_circles)
    }

    isWithinCanvas() {
        return !(
            this.x + this.radius > this.canvas_width ||
            this.x - this.radius < 0 ||
            this.y + this.radius > this.canvas_height ||
            this.y - this.radius < 0
        )
    }

    isWithinBoundingObjects(bounding_circles) {
        for (let circle of bounding_circles) {
            let circleDistance = dist(this.x, this.y, circle.x, circle.y)
            if (circleDistance < (circle.radius + this.radius) && circleDistance !== 0) {
                return false
            }
        }
        return true
    }
}