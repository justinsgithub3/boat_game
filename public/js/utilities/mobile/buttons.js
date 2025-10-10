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
    forwardButton.addEventListener('touchstart', (e) => {
        console.log(`pressed: ${p.UP_ARROW}`);
        e.preventDefault(); // no right-click dialog comes up to mess up the experience
        boat.checkForPress(p.UP_ARROW); // sending fake action to simulate forward key press
    });
    // forward release
    forwardButton.addEventListener('touchend', () => {
        console.log(`released: ${p.UP_ARROW}`);
        boat.checkForRelease(p.UP_ARROW); // sending fake action to simulate forward key press
    });
    // reverse press
    reverseButton.addEventListener('touchstart', (e) => {
        console.log(`pressed: ${p.DOWN_ARROW}`);
        e.preventDefault();
        boat.checkForPress(p.DOWN_ARROW); // sending fake action to simulate forward key press
    }); 
    // reverse release
    reverseButton.addEventListener('touchend', () => {
        console.log(`released: ${p.DOWN_ARROW}`);
        boat.checkForRelease(p.DOWN_ARROW); // sending fake action to simulate forward key press
    });
    // left press
    leftButton.addEventListener('touchstart', (e) => {
        console.log(`pressed: ${p.LEFT_ARROW}`);
        e.preventDefault();
        boat.checkForPress(p.LEFT_ARROW); // sending fake action to simulate forward key press
    }); 
    // left release
    leftButton.addEventListener('touchend', () => {
        console.log(`released: ${p.LEFT_ARROW}`);
        boat.checkForRelease(p.LEFT_ARROW); // sending fake action to simulate forward key press
    });
    // right press
    rightButton.addEventListener('touchstart', (e) => {
        console.log(`pressed: ${p.RIGHT_ARROW}`);
        e.preventDefault();
        boat.checkForPress(p.RIGHT_ARROW); // sending fake action to simulate forward key press
    }); 
    // right release
    rightButton.addEventListener('touchend', () => {
        console.log(`released: ${p.RIGHT_ARROW}`);
        boat.checkForRelease(p.RIGHT_ARROW); // sending fake action to simulate forward key press
    });

}
