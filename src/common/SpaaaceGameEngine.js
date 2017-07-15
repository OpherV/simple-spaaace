const SimplePhysicsEngine = require('lance-gg').physics.SimplePhysicsEngine;
const GameEngine = require('lance-gg').GameEngine;
const Ship = require('./Ship');
const TwoVector = require('lance-gg').serialize.TwoVector;

class SpaaaceGameEngine extends GameEngine {

    constructor(options) {
        super(SimplePhysicsEngine, options);
    }

    start() {
        super.start();

        this.worldSettings = {
            worldWrap: true,
            width: 500,
            height: 500
        };

    };

    processInput(inputData, playerId) {

        super.processInput(inputData, playerId);

        // get the player ship tied to the player socket
        let playerShip;

        for (let objId in this.world.objects) {
            let o = this.world.objects[objId];
            if (o.playerId == playerId && o.class == Ship) {
                playerShip = o;
                break;
            }
        }

        if (playerShip) {
            if (inputData.input == 'up') {
                playerShip.isAccelerating = true;
            } else if (inputData.input == 'right') {
                playerShip.isRotatingRight = true;
            } else if (inputData.input == 'left') {
                playerShip.isRotatingLeft = true;
            }
        }
    };

    // Makes a new ship, places it randomly and adds it to the game world
    makeShip(playerId) {
        let newShipX = Math.floor(Math.random()*(this.worldSettings.width-200)) + 200;
        let newShipY = Math.floor(Math.random()*(this.worldSettings.height-200)) + 200;

        let ship = new Ship(++this.world.idCount, new TwoVector(newShipX, newShipY));
        ship.playerId = playerId;
        this.addObjectToWorld(ship);
        console.log(`ship added: ${ship.toString()}`);

        return ship;
    };

}

module.exports = SpaaaceGameEngine;