import { Engine, Composite, Bodies, Body } from 'matter-js';

// game will loop in here
// this function will be called repeatedly
export default async function gameLoop(p, engine, world, level, boats) {

    p.background(30, 80, 160); // color background of canvas : light blue
    // update physics
    Engine.update(engine);

    /* only adding boat following until I found out how to reformat sizing of screens to iphone */
    const playerBoat = boats[0];
    const boatBody = playerBoat.body;
    const offsetX = -boatBody.position.x + p.width / 2;  
    const offsetY = -boatBody.position.y + p.height / 2;

    p.translate(offsetX, offsetY);

    boats.forEach((boat) => {
        // get rigid body, force direction, and force size from instance
        let boatData = boat.getForcePosition();
        // apply a force to the rigid body
        Body.applyForce(boatData[0], boatData[1], boatData[2]);

        boat.showDrawing(p)
    });

    // draw level
    level.draw(p);

}