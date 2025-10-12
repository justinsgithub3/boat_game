import createKeys from './computer/keys.js';
import createButtons from './mobile/buttons.js'

// function creates a new game button
export default async function createKeyLayout(pointerType, boat) {
    console.log('in layout...:')
    console.log(pointerType)
    console.log(boat)

    if (pointerType == 'touchend') {
        console.log('creating buttons...')
        createButtons(boat);
    } 
    else { // already is laptop. Default
        console.log('creating keys...')
        createKeys(boat);
    } 

}

