import { Engine, Composite, Bodies, Render, Body } from 'matter-js';
import MotorBoat from '../assets/boats/MotorBoat.js';
import LevelBuilder from './assets/LevelBuilder.js';
// create input layout
import createKeyLayout from '../utilities/keyLayout.js';

export default async function gameSetup(p, levelJson, level, boats, engine, world, pointerType) {

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
    engine = Engine.create();
    world = engine.world;

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
