const ClientEngine = require('lance-gg').ClientEngine;
const SpaaaceRenderer = require('../client/SpaaaceRenderer');
const KeyboardControls = require('lance-gg').controls.Keyboard;

class SpaaaceClientEngine extends ClientEngine {

    constructor(gameEngine, options) {
        super(gameEngine, options, SpaaaceRenderer);

        this.serializer.registerClass(require('../common/Ship'));

        this.controls = new KeyboardControls(this);
        this.controls.bindKey('left', 'left', { repeat: true });
        this.controls.bindKey('right', 'right', { repeat: true });
        this.controls.bindKey('up', 'up', { repeat: true } );
    }
}

module.exports = SpaaaceClientEngine;
