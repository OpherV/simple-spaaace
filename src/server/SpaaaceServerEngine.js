import ServerEngine from 'lance/ServerEngine';

export default class SpaaaceServerEngine extends ServerEngine {
    constructor(io, gameEngine, inputOptions) {
        super(io, gameEngine, inputOptions);

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

        // iterate through all objects, delete those that are associated with the player (ship and missiles)
        let playerObjects = this.gameEngine.world.queryObjects({ playerId: playerId});
        playerObjects.forEach( obj => this.gameEngine.removeObjectFromWorld(obj.id) );
    }
}