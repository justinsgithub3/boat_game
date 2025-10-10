import DockBuilder from './DockBuilder.js';

export default class LevelBuilder {

    // constructor
    // attributes
    constructor(levelJson) {
        console.log(levelJson)
        this.level = levelJson.id;
        this.name = levelJson.name;
        this.levelSize = levelJson.level_size;
        this.startLocation = levelJson.start_location;
        this.endLocation = levelJson.end_location;

        this.docks = levelJson.dock_locations.map(dockData => {
            console.log('DockData:', dockData);
            return new DockBuilder(dockData);
        });
        
    }
    // methods
    // draw
    buildBodies(bodies) {
        // iterate over each dock and create rigid body
        this.docks.forEach((dock) => dock.getBody(bodies));
    }
    appendBodies(composite, world) {
        this.docks.forEach((dock) => {
            console.log('Appending:', dock.body);
            composite.add(world, dock.body)
        });
            
    }

    draw(p) {
        this.docks.forEach((dock) => {
            dock.draw(p)
        })
    }
}