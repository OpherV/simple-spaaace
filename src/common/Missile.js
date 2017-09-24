import Serializer from 'lance/serialize/Serializer';
import DynamicObject from 'lance/serialize/DynamicObject';
import PixiRenderableComponent from 'lance/render/pixi/PixiRenderableComponent';

export default class Missile extends DynamicObject {

    constructor(gameEngine, options, props){
        super(gameEngine, options, props);

        this.addComponent(new PixiRenderableComponent({
            assetName: 'missile',
            width: 40,
            height: 23
        }));
    }

    static get netScheme() {
        return Object.assign({
            inputId: { type: Serializer.TYPES.INT32 },
            ownerId: { type: Serializer.TYPES.INT32 }
        }, super.netScheme);
    }

    syncTo(other) {
        super.syncTo(other);
        this.inputId = other.inputId;
        this.ownerId = other.ownerId;
    }
}
