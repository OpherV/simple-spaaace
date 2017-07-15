const Serializer = require('lance-gg').serialize.Serializer;
const DynamicObject= require('lance-gg').serialize.DynamicObject;

class Missile extends DynamicObject {

    constructor(id, position) {
        super(id, position);
        this.class = Missile;
    };

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

module.exports = Missile;
