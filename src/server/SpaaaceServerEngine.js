const ServerEngine = require('lance-gg').ServerEngine;

class SpaaaceServerEngine extends ServerEngine {
    constructor(io, gameEngine, inputOptions) {
        super(io, gameEngine, inputOptions);

        this.serializer.registerClass(require('../common/Missile'));
        this.serializer.registerClass(require('../common/Ship'));

        this.gameEngine.on('missileHit', (e) => {
            console.log(`ship killed: ${e.ship.toString()}`);
            this.gameEngine.removeObjectFromWorld(e.ship.id);
        });
    }

    onPlayerConnected(socket) {
        super.onPlayerConnected(socket);

        this.gameEngine.makeShip(socket.playerId);
    }

    onPlayerDisconnected(socketId, playerId) {
        super.onPlayerDisconnected(socketId, playerId);

        // iterate through all objects, delete those that are associated with the player
        for (let objId of Object.keys(this.gameEngine.world.objects)) {
            let obj = this.gameEngine.world.objects[objId];
            if (obj.playerId == playerId) {
                delete this.gameEngine.world.objects[objId];
            }
        }
    }
}

module.exports = SpaaaceServerEngine;