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

DeviceMotionEvent.requestPermission();
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
                    [engine, world, level, boats] = await gameSetup(p, levelData, level, boats, engine, world);


                    console.log('boats length in setup:', boats.length)

                    console.log('********** current test location: ************')
                    console.log("boat array: ", boats)

                    let event = e; // makes it possible to pass touch or click event into loop below:
                    console.log(event)
                    console.log('array length:', boats.length)
                    
                    boats.forEach((boat) => {
                        console.log('in boat loop...')
                        createKeyLayout(document, event, boat);
                    });

                }
                p.draw = async function() {
                    await gameLoop(p, engine, world, level, boats);
                }
            })  
}

