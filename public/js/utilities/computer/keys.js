export default async function createKeys(document, boat) {
    console.log('in create keys function')
    // if key press, send key code to 
    document.addEventListener('keydown', function(event) {
        console.log(`pressed: ${event.which}`);
        boat.checkForPress(event.which);
    })

    document.addEventListener('keyup', function(event) {
        console.log(`released: ${event.which}`);
        boat.checkForRelease(event.which);
    })
}