class CelestialObject {
    constructor(x, y, mass, initial_vel, color) {
        this.mass = mass;
        this.color = color;
        this.pos = createVector(x, y);
        this.vel = initial_vel;
        this.acc = createVector(0, 0);
        this.r = sqrt(mass) * 2;
        this.history = [];
    }

    applyForce(force) {
        this.acc.add(p5.Vector.div(force, this.mass));
    }

    edges() {
        if (this.pos.y >= height - this.r) {
            this.pos.y = height - this.r;
            this.vel.y *= -1;
        }
        if (this.pos.x >= width - this.r) {
            this.pos.x = width - this.r;
            this.vel.x *= -1;
        } else if (this.pos.x <= this.r) {
            this.pos.x = this.r;
            this.vel.x *= -1;
        }
    }

    attract(other) {
        let force = p5.Vector.sub(this.pos, other.pos);
        let distanceSq = force.magSq();

        let strength = G * (this.mass * other.mass) / distanceSq;
        force.setMag(strength);
        other.applyForce(force);
    }

    update() {
        this.history.push({ x: this.pos.x, y: this.pos.y });
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
        if (this.history.length > 40) {
            this.history.splice(0, 1);
        }
    }

    show() {
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.r*2);
        beginShape();
        stroke(this.color);
        noFill();
        for (let i = 0; i < this.history.length; i++) {
            let pos = this.history[i];
            vertex(pos.x, pos.y);
        }
        endShape();
    }
}