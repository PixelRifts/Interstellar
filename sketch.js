let objects = [];

function setup() {
    createCanvas(1200, 800);
    let s = color(255, 255, 50);
    objects[0] = new CelestialObject(600, 400, 500, createVector(0, 0), s);
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
    let vec = p5.Vector.sub(createVector(mouseX, mouseY), objects[0].pos).setMag(5);
    let lr = random(0, 100);
    let mass = random(5, 40);
    let c = color(random(255), random(255), random(255));
    if (lr <= 50)
        objects.push(new CelestialObject(mouseX, mouseY, mass, createVector(vec.y, -vec.x), c));
    else 
        objects.push(new CelestialObject(mouseX, mouseY, mass, createVector(-vec.y, vec.x), c));
}

