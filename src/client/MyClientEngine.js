const ClientEngine = require('lance-gg').ClientEngine;
const SpaaaceRenderer = require('../client/SpaaaceRenderer');
const KeyboardControls = require('lance-gg').controls.Keyboard;
const Ship = require('../common/Ship');

class SpaaaceClientEngine extends ClientEngine {

    constructor(gameEngine, options) {
        super(gameEngine, options, SpaaaceRenderer);

        this.controls = new KeyboardControls(this);
        this.controls.bindKey('left', 'left', { repeat: true });
        this.controls.bindKey('right', 'right', { repeat: true });
        this.controls.bindKey('up', 'up', { repeat: true } );
        this.controls.bindKey('space', 'space', { repeat: true } );
    }
}

module.exports = SpaaaceClientEngine;