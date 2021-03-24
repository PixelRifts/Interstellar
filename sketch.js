let objects = [];
let slider;
let slingObj;
let dragging = false;
let clearDrag = false;
let G = 1;

let tX, tY;

function setup() {
    var canvas = createCanvas(1200, 800);
    canvas.parent('canvas');
    slider = createSlider(0, 10, 1, .01);
    slider.parent('slider');
    let c = color(253, 184, 19);
    tX = 0; tY = 0;
    objects.push(new CelestialObject(600, 400, 600, createVector(), c));
}

function draw() {
    if (keyIsDown(65)) {
        tX -= 5;
    } else if (keyIsDown(68)) {
        tX += 5;
    }
    if (keyIsDown(87)) {
        tY -= 5;
    } else if (keyIsDown(83)) {
        tY += 5;
    }

    push();
    translate(-tX, -tY);
    background(0);
    G = slider.value();

    if (dragging) {
        stroke(255);
        strokeWeight(4);
        line(mouseX + tX, mouseY + tY, slingObj.pos.x, slingObj.pos.y);
    }

    for (let i = 0; i < objects.length; i++) {
        objects[i].update();
	    for (let j = 0; j < objects.length; j++) {
            if (objects[i] != objects[j]) {
                if (!objects[i].freeze)
                    objects[i].attract(objects[j]);
            }
        }
        objects[i].show();
    }
    pop();
}

function mousePressed() {
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].checkPoint(mouseX + tX, mouseY + tY)) {
            dragging = true;
            slingObj = objects[i];
        }
    }
    if (!dragging) {
        let mass = random(5, 40);
        let c = color(random(255), random(255), random(255));
        let obj = new CelestialObject(mouseX + tX, mouseY + tY, mass, createVector(), c, true);
        objects.push(obj);
        dragging = true;
        slingObj = obj;
    }
}

function mouseReleased() {
    if (dragging) {
        let drag = p5.Vector.sub(slingObj.pos, createVector(mouseX + tX, mouseY + tY)).div(35);
        slingObj.vel.set(drag);
        slingObj.unfreeze();
    }
    dragging = false;
    slingObj = undefined;
}
