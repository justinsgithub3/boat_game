export default async function loadGameData(levelNumber) {
    // fetch json data of level
    const response = await fetch(`/survival/${levelNumber}`)
    // convert response to json data
    const jsonData = await response.json()
    
    return jsonData;
}