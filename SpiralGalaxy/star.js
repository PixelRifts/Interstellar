class Star {
    constructor(majorAxis, ratio) {
        this.majorAxis = majorAxis;
        this.minorAxis = majorAxis * ratio;
        this.a = random(TWO_PI);
        this.r = random(90);
        this.g = random(255);
        this.b = random(255);
    }

    update() {
        this.a += 0.01;
    }

    show() {
        let x = (this.majorAxis * .5) * cos(this.a);
        let y = (this.minorAxis * .5) * sin(this.a);

        fill(this.r, this.g, this.b, 200);
        noStroke();
        circle(x, y, 2);
    }
}