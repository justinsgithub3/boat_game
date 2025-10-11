// document is the object buttons are being added and removed from
export default async function createButtons(document, boat) {

    console.log('in create buttons function')
    // create elements
    const forwardButton = document.createElement('button');
    forwardButton.textContent = '^';

    const reverseButton = document.createElement('button');
    reverseButton.textContent = 'v';

    const leftButton = document.createElement('button');
    leftButton.textContent = '<';

    const rightButton = document.createElement('button');
    rightButton.textContent = '>';

    // the element the game is in
    const canvasTarget = document.getElementById("canvas-target");

    // add buttons to document 
    canvasTarget.appendChild(forwardButton);
    canvasTarget.appendChild(reverseButton);
    canvasTarget.appendChild(leftButton);
    canvasTarget.appendChild(rightButton);
    
    // add id atttributes
    forwardButton.setAttribute("id", "forward-button");
    reverseButton.setAttribute("id", "reverse-button");
    leftButton.setAttribute("id", "left-button");
    rightButton.setAttribute("id", "right-button");

    // add class attributes
    forwardButton.setAttribute("class", "game-button");
    reverseButton.setAttribute("class", "game-button");
    leftButton.setAttribute("class", "game-button");
    rightButton.setAttribute("class", "game-button");


    // add press and release event listeners to each button
    // forward press
    forwardButton.addEventListener('touchstart', (event) => {    
        event.preventDefault(); // no right-click dialog comes up to mess up the experience
        boat.checkForPress(boat.forwardKey); // sending fake action to simulate forward key press
    });
    // forward release
    forwardButton.addEventListener('touchend', () => {
        boat.checkForRelease(boat.forwardKey); // sending fake action to simulate forward key press
    });
    // reverse press
    reverseButton.addEventListener('touchstart', (event) => {
        event.preventDefault();
        boat.checkForPress(boat.reverseKey); // sending fake action to simulate forward key press
    }); 
    // reverse release
    reverseButton.addEventListener('touchend', () => {
        boat.checkForRelease(boat.reverseKey); // sending fake action to simulate forward key press
    });
    // left press
    leftButton.addEventListener('touchstart', (event) => {
        event.preventDefault();
        boat.checkForPress(boat.leftKey); // sending fake action to simulate forward key press
    }); 
    // left release
    leftButton.addEventListener('touchend', () => {
        boat.checkForRelease(boat.leftKey); // sending fake action to simulate forward key press
    });
    // right press
    rightButton.addEventListener('touchstart', (event) => {
        event.preventDefault();
        boat.checkForPress(boat.rightKey); // sending fake action to simulate forward key press
    }); 
    // right release
    rightButton.addEventListener('touchend', () => {
        boat.checkForRelease(boat.rightKey); // sending fake action to simulate forward key press
    });

}
