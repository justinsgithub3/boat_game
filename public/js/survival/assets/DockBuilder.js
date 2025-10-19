export default class DockBuilder {

    // attributes
    constructor({x, y, w, h}) {
        this.x = x;
        this.y = y;
        this.w = w; // width
        this.h = h; // height

        this.body;

    }
g

    getBody (bodies) {
        this.body = bodies.rectangle(this.x, this.y, this.w, this.h, {isStatic: true}); // static param. makes the dock immovable
    }

    draw(p) {
        p.push();
        p.rectMode(p.CENTER)
        p.translate(this.x, this.y);       // position of the dock center
        p.fill(150, 100, 60);              // docks are always brown
        p.rect(0, 0, this.w, this.h);
        p.pop();
    }
}