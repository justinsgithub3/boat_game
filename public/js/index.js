// imports
import MotorBoat from './MotorBoat.js';
import p5 from './p5-wrapper.js';
// import as Objects
import { Engine, Composite, Bodies, Body } from 'matter-js';


let sketch = new p5((p) => {
    // declare boat var.
    let boat1;

    // declare engine and composite vars;
    let engine, world;


    p.setup = function() {       // size of canvas

        let canvas = p.createCanvas(1000, 700); // create canvas elelement
        canvas.parent("canvas-target");         // append canvas to div element
        // create physics engine from matter
        engine = Engine.create();
        world = engine.world;
                     
        // set up physics
        engine.gravity.x = 0;
        engine.gravity.y  = 0;
        
        // create boat instance : (width, height, up, down, left, right)
        boat1 = new MotorBoat(50, 25, p.UP_ARROW, p.DOWN_ARROW, p.LEFT_ARROW, p.RIGHT_ARROW);
     
        // creates rigid body for the boat1 object using Matter.Bodies module
        boat1.createBody(Bodies);
        // add body to world
        Composite.add(world, [boat1.body]);
    }

    p.draw = function() {
        p.background(30, 80, 160); // color background of canvas : light blue

        // update physics
        Engine.update(engine);

        // actual stuff here
        // get rigid body, force direction, and force size from instance
        let boatData = boat1.getForcePosition();
        // apply a force to the rigid body
        Body.applyForce(boatData[0], boatData[1], boatData[2]);

        // draw boat with this p5 instance
        boat1.showDrawing(p);


        // docks!

        // docks
        p.push();
        p.translate(500, 400);       // position of the dock center
        p.fill(150, 100, 60);
        p.rect(0, 0, 400, 20);
        p.pop();

        // Dock 2
        p.push();
        p.translate(500, 485);       // position of the dock center
        p.fill(150, 100, 60);
        p.rect(0, 0, 20, 150);
        p.pop();




        
    }

    // handle key press
    p.keyPressed = function() { 
        boat1.checkForPress(p.keyCode);
        console.log(`pressed: ${p.keyCode}`);
    }
    // handle key release
    p.keyReleased = function(event) {
        // event.which is what p5 uses to populate the keyCode value
        boat1.checkForRelease(event.which);
        console.log(`released: ${event.which}`)
    }
                
});

