import DynamicObject from 'lance/serialize/DynamicObject';

export default class Ship extends DynamicObject {
    
    get maxSpeed() { return 3.0; }

    // ship rotation is input-deterministic, no bending needed
    get bendingAngleLocalMultiple() { return 0.0; }

}