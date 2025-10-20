import DockBuilder from './DockBuilder.js';
import IslandBuilder from './IslandBuilder.js';
import RockBuilder from './RockBuilder.js';

export default class LevelBuilder {

    // constructor
    // attributes
    constructor(levelJson) {
        this.level = levelJson.id;
        this.name = levelJson.name;
        this.levelSize = levelJson.level_size;
        this.startLocation = levelJson.start_location;
        this.endLocation = levelJson.end_location;

        this.docks = levelJson.dock_locations.map(dockData => {
            return new DockBuilder(dockData);
        });
        
        this.islands = levelJson.island_locations.map(islandData => {
            return new IslandBuilder(islandData);
        })

        this.rocks = levelJson.rock_locations.map(rockData => {
            return new RockBuilder(rockData);
        })



    }


    // methods
    // draw
    buildBodies(bodies) {
        // iterate over each dock and create rigid body
        this.docks.forEach((dock) => dock.getBody(bodies));
        this.islands.forEach((island) => island.getBody(bodies))
        this.rocks.forEach((rock) => rock.getBody(bodies))
    }
    appendBodies(composite, world) {
        this.docks.forEach((dock) => {
            composite.add(world, dock.body)
        });
        this.islands.forEach((island) => {
            composite.add(world, island.body)
        })
        this.rocks.forEach((rock) => {
            composite.add(world, rock.body)
        })
    }

    draw(p) {
        this.islands.forEach((island) => {
            island.draw(p);
        })
        this.rocks.forEach((rock) => {
            rock.draw(p);
        })
        this.docks.forEach((dock) => {
            dock.draw(p)
        })

    }
}