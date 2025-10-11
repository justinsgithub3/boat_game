import createKeys from './computer/keys.js';
import createButtons from './mobile/buttons.js'

// function creates a new game button
export default async function createKeyLayout(document, e, boat) {
    console.log('in layout...:')
    console.log(e.pointerType)

    if (e.pointerType == 'touch') {
        console.log('creating buttons...')
        createButtons(document, boat);
    } 
    else { // already is laptop. Default
        console.log('creating keys...')
        createKeys(document, boat);
    } 

}

