import ServerEngine from 'lance/ServerEngine';
import Missile from '../common/Missile';
import Ship from '../common/Ship';

export default class SpaaaceServerEngine extends ServerEngine {
    constructor(io, gameEngine, inputOptions) {
        super(io, gameEngine, inputOptions);
        
        //todo add to gameEngine
        this.serializer.registerClass(Missile);
        this.serializer.registerClass(Ship);

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
                this.gameEngine.removeObjectFromWorld(obj.id);
            }
        }
    }
}