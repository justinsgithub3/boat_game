export default async function createKeys(boat) {
    console.log('in create keys function')
    // if key press, send key code to 
    document.addEventListener('keydown', function(event) {
        event.preventDefault();
        boat.checkForPress(event.which);
    })

    document.addEventListener('keyup', function(event) {
        event.preventDefault();
        boat.checkForRelease(event.which);
    })
}