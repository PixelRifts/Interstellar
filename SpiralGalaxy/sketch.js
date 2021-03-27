let axes = 2000;
let minM = 10;
let d = .3;
let ratio = 0.7;
let rotGradient;
let stars = [];
let showOrbits;

let rotGradientSlider;
let axesSlider;
let dSlider;

function setup() {
    let canvas = createCanvas(window.innerWidth / 1.5, window.innerHeight / 1.5);
    canvas.parent('canvas');

    rotGradient = PI / axes;
    rotGradientSlider = createSlider(0, rotGradient * 5, rotGradient, 0.00001);
    rotGradientSlider.parent('slider');

    axesSlider = createSlider(50, 4000, 2000, 5);
    axesSlider.parent('slider-axes');

    dSlider = createSlider(.1, 2, .3, .001);
    dSlider.parent('slider-d');

    for (let i = 0; i < axes; i++) {
        let majorAxis = minM + i * d;
        stars.push(new Star(majorAxis, ratio));
    }
}

function draw() {
    background(0);

    translate(width / 2, height / 2);

    if (axes != axesSlider.value()) {
        stars.splice(0, stars.length);
        axes = axesSlider.value();
        for (let i = 0; i < axes; i++) {
            let majorAxis = minM + i * d;
            stars.push(new Star(majorAxis, ratio));
        }
    }

    if (d != dSlider.value()) {
        stars.splice(0, stars.length);
        d = dSlider.value();
        for (let i = 0; i < axes; i++) {
            let majorAxis = minM + i * d;
            stars.push(new Star(majorAxis, ratio));
        }
    }

    for (let i = 0; i < axes; i++) {
        stars[i].update();
        rotate(rotGradientSlider.value());
        stars[i].show();
    }
}