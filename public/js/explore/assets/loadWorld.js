export default async function loadWorldData(levelNumber) {
    // fetch json data of level
    const response = await fetch(`/explore/${levelNumber}`)
    // convert response to json data
    const jsonData = await response.json()
    
    return jsonData;
}