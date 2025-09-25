// imports
import MotorBoat from './MotorBoat.js';
import p5 from './p5-wrapper.js';
import { Engine, Composite, Bodies, Body } from 'matter-js';


let deviceType;

const canvasTarget = document.getElementById("canvas-target");

// create element
const buttonEle = document.createElement('button');
buttonEle.textContent = 'press continue';
canvasTarget.appendChild(buttonEle);

// add event
buttonEle.addEventListener("pointerup", (e) => {
    console.log(e.pointerType) // returns mouse or touch ( laptop or mobile )
    if (e.pointerType == 'touch') {
        deviceType = 'mobile';
        // remove button from canvas
        buttonEle.remove();
        // start game
        mobileVersion();
    } else { // already is laptop. Default
        deviceType = 'laptop';
        // remove button from canvas
        buttonEle.remove();
        // start game
        computerVersion();
    }
    
})

function computerVersion() {
    console.log('this is only computer version')
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
}

function mobileVersion() {
    console.log('this is only mobile version')
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

        // create buttons
        const forwardButton = document.createElement('button');
        forwardButton.textContent = '^';

        const reverseButton = document.createElement('button');
        reverseButton.textContent = 'v';

        const leftButton = document.createElement('button');
        leftButton.textContent = '<';

        const rightButton = document.createElement('button');
        rightButton.textContent = '>';

        canvasTarget.appendChild(forwardButton);
        canvasTarget.appendChild(reverseButton);
        canvasTarget.appendChild(leftButton);
        canvasTarget.appendChild(rightButton);
        
        console.log('right before events...')

        // ------- add event listeners to each button -------

        // forward press
        forwardButton.addEventListener('touchstart', () => {
            console.log(`pressed: ${p.UP_ARROW}`);
            boat1.checkForPress(p.UP_ARROW); // sending fake action to simulate forward key press
        });
        // forward release
        forwardButton.addEventListener('touchend', () => {
            console.log(`released: ${p.UP_ARROW}`);
            boat1.checkForRelease(p.UP_ARROW); // sending fake action to simulate forward key press
        });
        // reverse press
        reverseButton.addEventListener('touchstart', () => {
            console.log(`pressed: ${p.DOWN_ARROW}`);
            boat1.checkForPress(p.DOWN_ARROW); // sending fake action to simulate forward key press
        }); 
        // reverse release
        reverseButton.addEventListener('touchend', () => {
            console.log(`released: ${p.DOWN_ARROW}`);
            boat1.checkForRelease(p.DOWN_ARROW); // sending fake action to simulate forward key press
        });
        // left press
        leftButton.addEventListener('touchstart', () => {
            console.log(`pressed: ${p.LEFT_ARROW}`);
            boat1.checkForPress(p.LEFT_ARROW); // sending fake action to simulate forward key press
        }); 
        // left release
        leftButton.addEventListener('touchend', () => {
            console.log(`released: ${p.LEFT_ARROW}`);
            boat1.checkForRelease(p.LEFT_ARROW); // sending fake action to simulate forward key press
        });
        // right press
        rightButton.addEventListener('touchstart', () => {
            console.log(`pressed: ${p.RIGHT_ARROW}`);
            boat1.checkForPress(p.RIGHT_ARROW); // sending fake action to simulate forward key press
        }); 
        // right release
        rightButton.addEventListener('touchend', () => {
            console.log(`released: ${p.RIGHT_ARROW}`);
            boat1.checkForRelease(p.RIGHT_ARROW); // sending fake action to simulate forward key press
        });

        // ------ end of adding events for buttons ------


        reverseButton.addEventListener('touch', () => {
            boat1.checkForPress(p.DOWN_ARROW); // sending fake action to simulate forward key press
            console.log(`pressed: ${p.UP_ARROW}`);
        })
        leftButton.addEventListener('touch', () => {

        })
        rightButton.addEventListener('touch', () => {
            
        })



        // replace these buttons with event handlers
        /*
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
            */
    });
}








