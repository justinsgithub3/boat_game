// import p5 and game engine
//import p5 from '../p5-wrapper.js';
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
import loadGameData from './assets/loadGame.js';


document.addEventListener("DOMContentLoaded", async () => {
    try {

        // buttons are placed inside the element - canvasTarget
        const canvasTarget = document.getElementById("canvas-target");

        // create button - button is inside the canvas
        const buttonEle = document.createElement('button');
        // button text
        buttonEle.textContent = `begin game`;
        // set button id
        buttonEle.setAttribute("id", `begin-game`);
        // append element to element - canvasTarget
        canvasTarget.appendChild(buttonEle);
        // add a click event to every button
        buttonEle.addEventListener("touchend", (e) => { // only works on mobile *******
            e.preventDefault();
            buttonClick(e);
            addRestartButton();
        })
        buttonEle.addEventListener("click", (e) => { // only works on mobile *******
            e.preventDefault();
            buttonClick(e);
            // restart world page
            addRestartButton();

        })
    }
    catch (error) {
        return Promise.reject(error)
    }
    
})

// try to pass event
async function buttonClick(e) {
            
            // world data
            let worldData;
            try {
                // get button Id             I left ids as level-# instead of just #. This makes styling the front-end easier.
                const buttonId = e.currentTarget.id;
                // parse id for level number
                // const levelNumber = buttonId.split('-')[1];
                // json worldData
                const levelNumber = 1;
                worldData = await loadGameData(levelNumber); // defaults to always return file "1.json", change in ./assets/loadWorld.js.
                                                              // also changed in server.js
            }
            catch (error) {
                console.log(error, 'could not load level data');
            }
            
            // clear all game buttons
            const canvasTarget = document.getElementById("canvas-target");

            canvasTarget.innerHTML = "";

            let sketch = new p5((p) => {
                let boats = [];
                let engine, world;
                let level;
                let gameReady = false; // flag to ensure setup function is done before draw function can run
    
            
                p.setup = async function() {
                    const pointerType = e.type;
                    console.log(pointerType);
                    [engine, world, level, boats] = await gameSetup(p, worldData, level, boats, pointerType);
                    //add button calls here
                    for (const boat of boats) {
                        await createKeyLayout(pointerType, boat);
                    }
                    gameReady = true;
                }
                // p.draw is being called before p.setup is done running
                p.draw = async function() {
                    if (gameReady) {
                        await gameLoop(p, engine, world, level, boats);
                    }
                }

            })      

}

async function addRestartButton() {
    let menu = document.querySelector(".menu");

    let restartButton = document.createElement("a");
    restartButton.href = "/survival"
    restartButton.textContent = "restart";

    menu.appendChild(restartButton);
}
