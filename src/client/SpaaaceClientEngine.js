const ClientEngine = require('lance-gg').ClientEngine;
const SpaaaceRenderer = require('../client/SpaaaceRenderer');
const KeyboardControls = require('lance-gg').controls.Keyboard;

class SpaaaceClientEngine extends ClientEngine {

    constructor(gameEngine, options) {
        super(gameEngine, options, SpaaaceRenderer);

    }
}

module.exports = SpaaaceClientEngine;
