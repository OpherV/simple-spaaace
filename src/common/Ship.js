import DynamicObject from 'lance/serialize/DynamicObject';
import PixiRenderableComponent from 'lance/render/pixi/PixiRenderableComponent';

export default class Ship extends DynamicObject {

    constructor(gameEngine, options, props){
        super(gameEngine, options, props);
        
        this.addComponent(new PixiRenderableComponent({
            assetName: 'ship',
            width: 50,
            height: 45,
            onRenderableCreated: (sprite, component) => {
                if (gameEngine && gameEngine.isOwnedByPlayer(component.parentObject)) {
                        sprite.tint = 0XFF00FF; // color  player ship
                    }
                    return sprite;
                }
        }));                     
    }

    get maxSpeed() { return 3.0; }

    // ship rotation is input-deterministic, no bending needed
    get bendingAngleLocalMultiple() { return 0.0; }

}