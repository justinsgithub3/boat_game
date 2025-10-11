export default async function loadLevelData(levelNumber) {
    // fetch json data of level
    const response = await fetch(`/level/${levelNumber}`)
    // convert response to json data
    const jsonData = await response.json()
    
    return jsonData;
}