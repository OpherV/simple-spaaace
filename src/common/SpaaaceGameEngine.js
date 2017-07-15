const SimplePhysicsEngine = require('lance-gg').physics.SimplePhysicsEngine;
const GameEngine = require('lance-gg').GameEngine;


class SpaaaceGameEngine extends GameEngine {

    constructor(options) {
        super(SimplePhysicsEngine, options);
    }
    
}

module.exports = SpaaaceGameEngine;