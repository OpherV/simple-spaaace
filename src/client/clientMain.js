import SpaaaceClientEngine from './SpaaaceClientEngine';
import SpaaaceGameEngine from '../common/SpaaaceGameEngine';

// sent to both game engine and client engine
const options  = {
    delayInputCount: 3,
    clientIDSpace: 1000000, //todo shouldn't be here
    syncOptions: {
        sync: 'extrapolate',
        localObjBending: 0.0,
        remoteObjBending: 0.8,
        bendingIncrements: 6,
    }
};
// create a client engine and a game engine
const gameEngine = new SpaaaceGameEngine(options);
const clientEngine = new SpaaaceClientEngine(gameEngine, options);

clientEngine.start();
