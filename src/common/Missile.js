import Serializer from 'lance/serialize/Serializer';
import DynamicObject from 'lance/serialize/DynamicObject';

export default class Missile extends DynamicObject {

    static get netScheme() {
        return Object.assign({
            inputId: { type: Serializer.TYPES.INT32 },
            ownerId: { type: Serializer.TYPES.INT32 }
        }, super.netScheme);
    }

    toString() {
        return `Missile::${super.toString()}`;
    }

    syncTo(other) {
        super.syncTo(other);
        this.inputId = other.inputId;
        this.ownerId = other.ownerId;
    }
}
