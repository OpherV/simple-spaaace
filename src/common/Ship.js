const DynamicObject = require('lance-gg').serialize.DynamicObject;

class Ship extends DynamicObject {

    constructor(id, position) {
        super(id, position);
        this.class = Ship;
    };

    toString() {
        return `Ship::${super.toString()}`;
    }

    get maxSpeed() { return 3.0; }

    // ship rotation is input-deterministic, no bending needed
    get bendingAngleLocalMultiple() { return 0.0; }

}

module.exports = Ship;
