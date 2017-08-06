import 'pixi.js';
import PixiRenderer from 'lance/render/PixiRenderer';

import Missile from '../common/Missile';
import Ship from '../common/Ship';

/**
 * Renderer for the Spaaace client - based on Pixi.js
 */
export default class SpaaaceRenderer extends PixiRenderer {

    get ASSETPATHS() {
        return {
            ship: 'assets/ship1.png',
            missile: 'assets/shot.png',
            bg: 'assets/space3.png',
            smokeParticle: 'assets/smokeparticle.png'
        };
    }

    constructor(gameEngine, clientEngine) {
        super(gameEngine, clientEngine);
        gameEngine.on('start', this.onGameEngineStart.bind(this));
    }

    onGameEngineStart() {
        this.layer1 = new PIXI.Container(); // for background
        this.layer2 = new PIXI.Container(); // for ships and missiles
        this.stage.addChild(this.layer1, this.layer2);

        this.bg = new PIXI.extras.TilingSprite(
            PIXI.loader.resources.bg.texture,
            this.gameEngine.worldSettings.width,
            this.gameEngine.worldSettings.width);

        this.layer1.addChild(this.bg);
    }

    addObject(objData) {
        let sprite;

        if (objData instanceof Ship) {
            sprite = new PIXI.Sprite(PIXI.loader.resources.ship.texture);
            this.sprites[objData.id] = sprite;

            sprite.anchor.set(0.5, 0.5);
            sprite.width = 50;
            sprite.height = 45;

            if (this.clientEngine.isOwnedByPlayer(objData)) {
                this.playerShip = sprite; // save reference to the player ship
                sprite.tint = 0XFF00FF; // color  player ship
            }

        } else if (objData instanceof Missile) {
            sprite = new PIXI.Sprite(PIXI.loader.resources.missile.texture);
            this.sprites[objData.id] = sprite;

            sprite.width = 81 * 0.5;
            sprite.height = 46 * 0.5;

            sprite.anchor.set(0.5, 0.5);
        }

        sprite.position.set(objData.position.x, objData.position.y);
        this.layer2.addChild(sprite);

        return sprite;
    }

    removeObject(obj) {
        console.log('remove obj', obj);
        if (this.playerShip && obj.id == this.playerShip.id) {
            this.playerShip = null;
        }

        let sprite = this.sprites[obj.id];
        if (sprite) {
            this.sprites[obj.id].destroy();
            delete this.sprites[obj.id];
        }
    }

}