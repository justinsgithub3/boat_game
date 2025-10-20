export default class RockBuilder {

    // attributes
    constructor({x, y, w, h}) {
        this.x = x;
        this.y = y;
        this.w = w; // width
        this.h = h; // height

        this.body;

    }
    getBody (bodies) {
        this.body = bodies.rectangle(this.x, this.y, this.w, this.h, {isStatic: true}); // static param. makes the rock immovable
    }

    draw(p) {
        p.push();
         p.noStroke();
        p.rectMode(p.CENTER)
        p.translate(this.x, this.y);       // position of the rock at center
        p.fill(99, 99, 99);              // rocks are a dark grey color
        p.rect(0, 0, this.w, this.h);
        p.pop();
    }
}