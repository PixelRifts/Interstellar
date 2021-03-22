let objects = [];
let slider;
let slingObj;
let dragging = false;
let clearDrag = false;
let G = 1;

function setup() {
    createCanvas(1200, 800);
    slider = createSlider(0, 10, 1, .01);
    let c = color(253, 184, 19);
    objects.push(new CelestialObject(600, 400, 600, createVector(), c));
}

function draw() {
    background(0);
    G = slider.value();

    if (dragging) {
        stroke(255);
        strokeWeight(4);
        line(mouseX, mouseY, slingObj.pos.x, slingObj.pos.y);
    }

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
    if (!dragging) {
        let vec = createVector(mouseX, mouseY).sub(objects[0].pos).setMag(1);
        let lr = random(0, 100);
        let mass = random(5, 40);
        let c = color(random(255), random(255), random(255));
        if (lr <= 50) objects.push(new CelestialObject(mouseX, mouseY, mass, createVector(vec.y, -vec.x), c));
        else objects.push(new CelestialObject(mouseX, mouseY, mass, createVector(-vec.y, vec.x), c));
    }
    if (clearDrag) {
        dragging = false;
        clearDrag = false;
    }
}

function mousePressed() {
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].checkPoint(mouseX, mouseY)) {
            dragging = true;
            slingObj = objects[i];
        }
    }
}

function mouseReleased() {
    if (dragging) {
        let drag = p5.Vector.sub(slingObj.pos, createVector(mouseX, mouseY)).div(40);
        slingObj.vel = drag;
        clearDrag = true;
    }
}
