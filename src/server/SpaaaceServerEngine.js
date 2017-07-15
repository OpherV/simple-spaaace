const ServerEngine = require('lance-gg').ServerEngine;

class SpaaaceServerEngine extends ServerEngine {
    constructor(io, gameEngine, inputOptions) {
        super(io, gameEngine, inputOptions);

    }

    onPlayerConnected(socket) {
        super.onPlayerConnected(socket);

    }

    onPlayerDisconnected(socketId, playerId) {
        super.onPlayerDisconnected(socketId, playerId);

    }
}

module.exports = SpaaaceServerEngine;
