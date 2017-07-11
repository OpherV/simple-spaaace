'use strict';

const SimplePhysicsEngine = require('lance-gg').physics.SimplePhysicsEngine;
const GameEngine = require('lance-gg').GameEngine;
const Missile= require('./Missile');
const Ship = require('./Ship');
const TwoVector = require('lance-gg').serialize.TwoVector;
const Timer = require('lance-gg').game.Timer;

class SpaaaceGameEngine extends GameEngine {

    constructor() {
        super(SimplePhysicsEngine);
    }

    start() {
        super.start();

        this.timer = new Timer();
        this.timer.play();
        this.on('server__postStep', ()=>{
            this.timer.tick();
        });

        this.worldSettings = {
            worldWrap: true,
            width: 1000,
            height: 1000
        };

        this.on('collisionStart', (e)=> {
            let collisionObjects = Object.keys(e).map(k => e[k]);
            let ship = collisionObjects.find(o => o.class === Ship);
            let missile = collisionObjects.find(o => o.class === Missile);

            if (!ship || !missile)
                return;

            if (missile.ownerId !== ship.id) {
                this.destroyMissile(missile.id);
                this.trace.info(`missile by ship=${missile.ownerId} hit ship=${ship.id}`);
                this.emit('missileHit', { missile, ship });
            }
        });
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
            } else if (inputData.input == 'space') {
                this.makeMissile(playerShip, inputData.messageIndex);
                this.emit('fireMissile');
            }
        }
    };

    // Makes a new ship, places it randomly and adds it to the game world
    makeShip(playerId) {
        let newShipX = Math.floor(Math.random()*(this.worldSettings.width-200)) + 200;
        let newShipY = Math.floor(Math.random()*(this.worldSettings.height-200)) + 200;

        let ship = new Ship(++this.world.idCount, this, new TwoVector(newShipX, newShipY));
        ship.playerId = playerId;
        this.addObjectToWorld(ship);
        console.log(`ship added: ${ship.toString()}`);

        return ship;
    };

    makeMissile(playerShip, inputId) {
        let missile = new Missile(++this.world.idCount);
        missile.position.copy(playerShip.position);
        missile.velocity.copy(playerShip.velocity);
        missile.angle = playerShip.angle;
        missile.playerId = playerShip.playerId;
        missile.ownerId = playerShip.id;
        missile.inputId = inputId;
        missile.velocity.x += Math.cos(missile.angle * (Math.PI / 180)) * 10;
        missile.velocity.y += Math.sin(missile.angle * (Math.PI / 180)) * 10;

        this.trace.trace(`missile[${missile.id}] created vel=${missile.velocity}`);

        let obj = this.addObjectToWorld(missile);
        if (obj)
            this.timer.add(40, this.destroyMissile, this, [obj.id]);

        return missile;
    }

    // destroy the missile if it still exists
    destroyMissile(missileId) {
        if (this.world.objects[missileId]) {
            this.trace.trace(`missile[${missileId}] destroyed`);
            this.removeObjectFromWorld(missileId);
        }
    }
}

module.exports = SpaaaceGameEngine;