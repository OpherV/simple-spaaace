'use strict';

const PIXI = require('pixi.js');
const Renderer = require('lance-gg').render.Renderer;

const Missile = require('../common/Missile');
const Ship = require('../common/Ship');

/**
 * Renderer for the Spaaace client - based on Pixi.js
 */
class SpaaaceRenderer extends Renderer {

    get ASSETPATHS() {
        return {
            ship: 'assets/ship1.png',
            missile: 'assets/shot.png',
            bg: 'assets/space3.png',
            smokeParticle: 'assets/smokeparticle.png'
        };
    }

    // TODO: document
    constructor(gameEngine, clientEngine) {
        super(gameEngine, clientEngine);
        this.sprites = {};
        this.isReady = false;
    }

    init() {
        this.viewportWidth = window.innerWidth;
        this.viewportHeight = window.innerHeight;

        this.stage = new PIXI.Container();
        this.layer1 = new PIXI.Container();
        this.layer2 = new PIXI.Container();

        this.stage.addChild(this.layer1, this.layer2);

        if (document.readyState === 'complete' || document.readyState === 'loaded' || document.readyState === 'interactive') {
            this.onDOMLoaded();
        } else {
            document.addEventListener('DOMContentLoaded', ()=>{
                this.onDOMLoaded();
            });
        }

        return new Promise((resolve, reject)=>{
            PIXI.loader.add(Object.keys(this.ASSETPATHS).map((x)=>{
                return{
                    name: x,
                    url: this.assetPathPrefix + this.ASSETPATHS[x]
                };
            }))
                .load(() => {
                    this.isReady = true;
                    this.setupStage();
                    this.gameEngine.emit('renderer.ready');

                    resolve();
                });
        });
    }

    onDOMLoaded() {
        this.renderer = PIXI.autoDetectRenderer(this.viewportWidth, this.viewportHeight);
        document.body.querySelector('.pixiContainer').appendChild(this.renderer.view);
    }

    setupStage() {

        this.bg = new PIXI.extras.TilingSprite(PIXI.loader.resources.bg.texture,
            this.viewportWidth, this.viewportHeight);

        this.stage.addChild(this.bg);

        // this.debugText = new PIXI.Text('DEBUG', {fontFamily:"arial", fontSize: "100px", fill:"white"});
        // this.debugText.anchor.set(0.5, 0.5);
        // this.debugText.x = this.gameEngine.worldSettings.width/2;
        // this.debugText.y = this.gameEngine.worldSettings.height/2;
        // this.camera.addChild(this.debugText);

    }

    draw() {
        super.draw();

        if (!this.isReady) return; // assets might not have been loaded yet

        for (let objId of Object.keys(this.sprites)) {
            let objData = this.gameEngine.world.objects[objId];
            let sprite = this.sprites[objId];

            if (objData) {
                sprite.x = objData.position.x;
                sprite.y = objData.position.y;
                sprite.rotation = this.gameEngine.world.objects[objId].angle * Math.PI/180;
            }
        }

        this.renderer.render(this.stage);
    }

    addObject(objData) {
        let sprite;

        if (objData.class == Ship) {
            sprite = new PIXI.Sprite(PIXI.loader.resources.missile.ship);
            this.sprites[objData.id] = sprite;

            sprite.anchor.set(0.5, 0.5);
            sprite.width = 50;
            sprite.height = 45;

            if (this.clientEngine.isOwnedByPlayer(objData)) {
                this.playerShip = sprite; // save reference to the player ship
                sprite.tint = 0XFF00FF; // color  player ship
            }

        } else if (objData.class == Missile) {
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

module.exports = SpaaaceRenderer;
