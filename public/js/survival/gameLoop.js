import { Engine, Composite, Bodies, Body, Render } from 'matter-js';

// game will loop in here
// this function will be called repeatedly

// variable for moving screen to the right
let cameraX = -800;

export default async function gameLoop(p, engine, world, level, boats) {
  
    p.background(30, 80, 160); // color background of canvas : light blue
    // update physics
    Engine.update(engine);

    // increment camera offset
    cameraX += 2; // change value to adjust speed

    /* only adding boat following until I found out how to reformat sizing of screens to iphone */
    const playerBoat = boats[0];
    const boatBody = playerBoat.body;
    const offsetY = -boatBody.position.y + p.height / 2;

    // scroll to the left, camera moving right
    p.translate(-cameraX, offsetY);

    /*boats.forEach((boat) => {
        // get rigid body, force direction, and force size from instance
        let boatData = boat.getForcePosition();
        // apply a force to the rigid body
        Body.applyForce(boatData[0], boatData[1], boatData[2]);

        boat.showDrawing(p)

        // if any boat body crosses over the left edge of the screen
        if (boat.body.position.x <= cameraX-20) { // (left screen-20) for some recovery chances
            console.log('closing function...');
            return 'loop terminated';
        }

        */
       for (const boat of boats) {
            // get rigid body, force direction, and force size from instance
            const boatData = boat.getForcePosition();
            Body.applyForce(boatData[0], boatData[1], boatData[2]);

            boat.showDrawing(p);

            if (boat.body.position.x <= cameraX - 20) {
                console.log('closing function...');
                p.noLoop();
                return 'loop terminated'; 
            }
        }
    // draw level
    level.draw(p);
    return 'loop not terminated';
}