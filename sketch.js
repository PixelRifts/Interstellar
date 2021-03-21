let sun;
let objects = [];

function setup() {
    createCanvas(1200, 800);
    let s = color(255, 255, 50);
    sun = new CelestialObject(600, 400, 40, s);
    let p = color(50, 255, 50);
    objects[0] = new CelestialObject(200, 100, 10, p);
}

function draw() {
    background(50);

    sun.update();
    sun.show();

    for (let i = 0; i < objects.length; i++) {
        objects[i].update();
        objects[i].show();
    }
}
