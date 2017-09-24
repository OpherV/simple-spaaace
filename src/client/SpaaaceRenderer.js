import 'pixi.js';
import PixiRenderer from 'lance/render/pixi/PixiRenderer';

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
        this.layers.background = new PIXI.Container();
        this.stage.addChildAt(this.layers.background, 0);

        this.bg = new PIXI.extras.TilingSprite(
            PIXI.loader.resources.bg.texture,
            this.gameEngine.worldSettings.width,
            this.gameEngine.worldSettings.width);

        this.layers.background.addChild(this.bg);
    }
}