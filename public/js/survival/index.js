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

let displayTime;

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
            startTimer();
        })
        buttonEle.addEventListener("click", (e) => { // only works on mobile *******
            e.preventDefault();
            buttonClick(e);
            // restart world page
            addRestartButton();
            // start a timer
            startTimer();


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
                let gameLoopStatus = 'not terminated';


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
                let gameStatus;
                // p.draw is being called before p.setup is done running
                p.draw = async function() {
                    if (gameReady) {
                        // run game loop
                        gameStatus = await gameLoop(p, engine, world, level, boats);
                        console.log(`gameStatus: ${gameStatus}`)

                        if (gameStatus == 'loop terminated') {

                            // prompt for username
                            let username = prompt(`Enter your name for the leaderboard with a score of ${displayTime}`);
                                              
                            while (username == null || username == '') {
                                username = prompt(`Re-Enter your name for the leaderboard with a score of ${displayTime}`);
                            }
                            const response = await sendScore(username, displayTime);
                            console.log(response);
                            /*
                            if (response.ok) {
                                alert('You score has been uploaded!');
                            }
                            */
                            
                        }
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



/* thrown together... */
let timerEle = document.querySelector("#stopwatch");
let elapsedTime = 0;
let stopwatchInterval;
let startTime;
async function startTimer() {
    startTime = new Date().getTime(); // get the starting time by subtracting the elapsed paused time from the current time
    stopwatchInterval = setInterval(updateStopwatch, 1000); // update every second
}

async function updateStopwatch() {
    let currentTime = new Date().getTime(); // get current time in milliseconds
    let elapsedTime = currentTime - startTime;
    let seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
    let minutes = Math.floor(elapsedTime / 1000 / 60) % 60; // calculate minutes
    let hours = Math.floor(elapsedTime / 1000 / 60 / 60); // calculate hours
    displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds); // format display time
    document.getElementById("stopwatch").innerHTML = displayTime;
}
function pad(number) {
// add a leading zero if the number is less than 10
return (number < 10 ? "0" : "") + number;
}


// post user data to server
async function sendScore(username, survivaltime) {
    const data = { 
                    name : username,
                    time : survivaltime
                };

    try {
        const response = await fetch('/survival', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
        );
        console.log(`response in sendScore(): ${response}`);
        return response;
    }
    catch {
        console.log('Error trying to send results to server.')
    }
}
