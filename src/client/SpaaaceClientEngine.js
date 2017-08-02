import ClientEngine from 'lance/ClientEngine';
import SpaaaceRenderer from '../client/SpaaaceRenderer';
import KeyboardControls from 'lance/controls/KeyboardControls';
import Ship from '../common/Ship';
import Missile from '../common/Missile';

export default class SpaaaceClientEngine extends ClientEngine {

    constructor(gameEngine, options) {
        super(gameEngine, options, SpaaaceRenderer);

        this.serializer.registerClass(Ship);
        this.serializer.registerClass(Missile);

        this.controls = new KeyboardControls(this);
        this.controls.bindKey('left', 'left', { repeat: true });
        this.controls.bindKey('right', 'right', { repeat: true });
        this.controls.bindKey('up', 'up', { repeat: true } );
        this.controls.bindKey('space', 'space');
    }
}