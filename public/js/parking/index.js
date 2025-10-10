// import p5 and game engine
import p5 from '../p5-wrapper.js';
import { Engine, Composite, Bodies, Body } from 'matter-js';

// testing levels
import LevelBuilder from './assets/LevelBuilder.js';

// import default boat
import MotorBoat from '../assets/boats/MotorBoat.js';

// create start button
import createKeyLayout from '../utilities/keyLayout.js';

// game loop
import gameLoop from './gameLoop.js';
// game setup
import gameSetup from './gameSetup.js';
// retrieve level data from file system with this import
import loadLevelData from './assets/loadLevel.js';

// element the game is in
//const canvasTarget = document.getElementById("canvas-target");

/*
async function loop(document) {
    try {
        await newButton(document);
        console.log('this run')

        await gameLoop();
    }
    catch (error) {
        return Promise.reject(error)
    }
}
*/

document.addEventListener("DOMContentLoaded", async () => {
    try {

        // create a list of buttons with each level
        // level data

        // get number of levels
        const response = await fetch('/levels');
        // convert response to json
        const jsonObj = await response.json()
        // get count field
        const levelCount = await jsonObj.count;

        // buttons are placed inside the element - canvasTarget
        const canvasTarget = document.getElementById("canvas-target");

        // create a button for each level. The level number will be the buttons id
        for (let i = 1; i <= levelCount; i++) {
            
            // create button - button is inside the canvas
            const buttonEle = document.createElement('button');
            // button text
            buttonEle.textContent = `Level ${i}`;
            // set button id
            buttonEle.setAttribute("id", `level-${i}`);
            // append element to element - canvasTarget
            canvasTarget.appendChild(buttonEle);
            // add a click event to every button
            buttonEle.addEventListener("click", async (e) => {
                await buttonClick(e);
            })
        }
    }
    catch (error) {
        return Promise.reject(error)
    }
})


async function buttonClick(e) {
            // level data
            let levelData;
            try {
                // get button Id             I left ids as level-# instead of just #. This makes styling the front-end easier.
                const buttonId = e.currentTarget.id;
                // parse id for level number
                const levelNumber = buttonId.substr(buttonId.length - 1);
                // json levelData
                levelData = await loadLevelData(levelNumber);
            }
            catch (error) {
                console.log(error, 'could not load level data');
            }

            // {..}

            // clear all game buttons
            const canvasTarget = document.getElementById("canvas-target");
            canvasTarget.innerHTML = "";
            
            let sketch = new p5((p) => {
                let boats = [];
                let engine, world;
                let level;
                p.setup = async function() {
                    [engine, world, level] = await gameSetup(p, levelData, level, boats, engine, world);
            

                    boats.forEach((boat) => {
                        createKeyLayout(document, e, boat);
                    })

                

                    console.log('level')
                    console.log(level)
                }
                
                
                

                console.log('boats array outside of game module:')
                console.log(boats)
                p.draw = async function() {
                    await gameLoop(p, engine, world, level, boats);
                }
            })  
}


/*
function async computerVersion() {
    console.log('this is only computer version')
    let sketch = new p5((p) => {
        // declare boat var.
        let boat1;

        // test - level
        let level;

        let levelNumber = 1;

        let levelJson = await loadLevel(levelNumber);
    
        console.log(levelJson)


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



            // testing level
            level = new LevelBuilder(levelJson);
            console.log('here are the docks from json level')
            for (let e of level.docks) {
                console.log('each x:')
                console.log(e.x)
            }

            level.buildBodies(Bodies);
            level.appendBodies(Composite, world);

        
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


            // test
            level.draw(p);
    
 
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
        // declare rigid body dock variables
        let dock1, dock2;

        // declare engine and composite vars;
        let engine, world;


        p.setup = function() {       // size of canvas

            let canvas = p.createCanvas(window.innerWidth, window.innerHeight); // create canvas elelement
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

            // add rigid body to docks
            // creates rigid body for the boat1 object using Matter.Bodies module
            dock1 = Bodies.rectangle(window.innerWidth/2, window.innerHeight/2, 400, 20, {isStatic: true}); // static param. makes the dock immovable
            dock2 = Bodies.rectangle(window.innerWidth/2, window.innerHeight/2, 20, 80, {isStatic: true});
            // add body to world
            Composite.add(world, [dock1, dock2]);
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
            p.translate(window.innerWidth/2, window.innerHeight/2);       // position of the dock center
            p.fill(150, 100, 60);
            p.rect(0, 0, 400, 20);
            p.pop();

            // Dock 2
            p.push();
            p.translate(window.innerWidth/2, window.innerHeight/2);       // position of the dock center
            p.fill(150, 100, 60);
            p.rect(0, 0, 20, 80);
            p.pop();


        }

        

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
            */ /*
    });
}


*/


