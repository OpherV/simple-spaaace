const PIXI = require('pixi.js');
const Renderer = require('lance-gg').render.Renderer;

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

    constructor(gameEngine, clientEngine) {
        super(gameEngine, clientEngine);
    }

    init() {

    }


    draw() {
        super.draw();

        this.renderer.render(this.stage);
    }

    addObject(objData) {

    }

    removeObject(obj) {

    }

}

module.exports = SpaaaceRenderer;
