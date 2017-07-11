'use strict';

const DynamicObject = require('lance-gg').serialize.DynamicObject;

class Ship extends DynamicObject {

    constructor(id, gameEngine, x, y) {
        super(id, x, y);
        this.class = Ship;
        this.gameEngine = gameEngine;
    };

    toString() {
        return `${this.isBot?'Bot':'Player'}::Ship::${super.toString()}`;
    }

    get bendingAngleLocalMultiple() { return 0.0; }

    get maxSpeed() { return 3.0; }

}

module.exports = Ship;