import { Engine, Composite, Bodies, Body } from 'matter-js';
import MotorBoat from '../assets/boats/MotorBoat.js';
import LevelBuilder from './assets/LevelBuilder.js';
// create input layout
import createKeyLayout from '../utilities/keyLayout.js';

export default async function gameSetup(p, levelJson, level, boats, engine, world) {
    console.log('level data in game setup: ', levelJson)

    console.log('creating canvas')
    let canvas = p.createCanvas(1000, 700); // create canvas elelement
    console.log('appending canvas')
    canvas.parent("canvas-target");         // append canvas to div element
    // create physics engine from matter
    console.log('creating matter js stuff')
    engine = Engine.create();
    world = engine.world;
    console.log('created matter js stuff!')
                
    // set up physics
    engine.gravity.x = 0;
    engine.gravity.y  = 0;
    console.log('removed gravity!')
    
    // make this dynamic later*
    // create boat instance : (width, height, up, down, left, right)
    let boat = new MotorBoat(50, 25, p.UP_ARROW, p.DOWN_ARROW, p.LEFT_ARROW, p.RIGHT_ARROW);
    // add boat instance to array
    boats.push(boat);
    // creates rigid body for the boat1 object using Matter.Bodies module
    boats.forEach((boat) => {
            boat.createBody(Bodies);
    });
    console.log('boat 0 in array in setup')
    console.log(boats[0])
    // add body to world
    Composite.add(world, [boats[0].body]);


    // creating physical level
    level = new LevelBuilder(levelJson);
    for (let e of level.docks) {
        console.log('each x:')
        console.log(e.x)
    }

    level.buildBodies(Bodies);
    level.appendBodies(Composite, world);


    return [engine, world, level];

}
