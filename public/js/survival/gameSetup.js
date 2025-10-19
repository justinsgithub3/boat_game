import { Engine, Composite, Bodies, Body, Render, Vertices } from 'matter-js';
import MotorBoat from '../assets/boats/MotorBoatPentagon.js';
import LevelBuilder from './assets/LevelBuilder.js';
// create input layout
import createKeyLayout from '../utilities/keyLayout.js';

export default async function gameSetup(p, levelJson, level, boats, pointerType) {

    let canvas;
    // mobile
    if (pointerType == 'touchend') {
        canvas = p.createCanvas(window.innerWidth, window.innerHeight); // create canvas elelement
    }
    // computer
    else { 
        canvas = p.createCanvas(window.innerWidth, 675); // create canvas elelement
    }
    
    canvas.parent("canvas-target");         // append canvas to div element
    // create physics engine from matter
    let engine = Engine.create();
    let world = engine.world;

    // added ----------------- v
    /*
    const render = Render.create({
        element: document.body, // or a specific DOM element
        engine: engine,
        options: {
            width: window.innerWidth,
            height: 675,
            wireframes: true,       // Show outlines
            showAngleIndicator: true,
            background: 'transparent'
        }
    });
    Render.run(render);
    */
    // added ----------------- ^
                
    // set up physics
    engine.gravity.x = 0;
    engine.gravity.y  = 0;
    
    // make this dynamic later*
    // create boat instance : (width, height, up, down, left, right)
    let boat = new MotorBoat(50, 25, 38, 40, 37, 39);
    // add boat instance to array
    boats.push(boat);
    // creates rigid body for the boat1 object using Matter.Bodies module
    boats.forEach((boat) => {
            boat.createBody(Bodies);
    });
    // add body to world
    Composite.add(world, [boats[0].body]);


    // creating physical level
    level = new LevelBuilder(levelJson);

    level.buildBodies(Bodies);
    level.appendBodies(Composite, world);


    return [engine, world, level, boats];
}
