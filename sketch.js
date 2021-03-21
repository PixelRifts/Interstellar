let objects = [];

function setup() {
    createCanvas(1200, 800);
    let s = color(255, 255, 50);
    objects[0] = new CelestialObject(600, 400, 400, createVector(0, 0), s);
}

function draw() {
    background(50);

    for (let i = 0; i < objects.length; i++) {
        objects[i].update();
	for (let j = 0; j < objects.length; j++) {
            if (objects[i] != objects[j]) {
                objects[i].attract(objects[j]);
            }
        }
        objects[i].show();
    }
}

function mouseClicked() {
    let p = color(50, 255, 50);
    objects.push(new CelestialObject(mouseX, mouseY, 10, p5.Vector.random2D().setMag(5), p));
}

