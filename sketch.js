let objects = [];
let slider;
let G = 1;

function setup() {
    createCanvas(1200, 800);
    slider = createSlider(0, 10, 1, .01);
    let c = color(253, 184, 19);
    objects.push(new CelestialObject(600, 400, 600, createVector(), c));
}

function draw() {
    background(50);
    G = slider.value();

    for (let i = 0; i < objects.length; i++) {
        objects[i].update();
	    for (let j = 0; j < objects.length; j++) {
            if (objects[i] != objects[j]) {
                objects[i].attract(objects[j]);
            }
        }
        objects[i].show();
    }

    for (let i = 0; i < objects.length; i++) {
        
    }
}

function mouseClicked() {
    let vec = createVector(mouseX, mouseY).sub(objects[0].pos).setMag(1);
    let lr = random(0, 100);
    let mass = random(5, 40);
    let c = color(random(255), random(255), random(255));
    if (lr <= 50) objects.push(new CelestialObject(mouseX, mouseY, mass, createVector(vec.y, -vec.x), c));
    else objects.push(new CelestialObject(mouseX, mouseY, mass, createVector(-vec.y, vec.x), c));
}
