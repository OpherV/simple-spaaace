const qsOptions = require('query-string').parse(location.search);
const SpaaaceClientEngine = require('./SpaaaceClientEngine');
const SpaaaceGameEngine = require('../common/SpaaaceGameEngine');

// default options, overwritten by query-string options
// is sent to both game engine and client engine
const defaults = {
    traceLevel: 0,
    delayInputCount: 3,
    clientIDSpace: 1000000,
    syncOptions: {
        sync: qsOptions.sync || 'extrapolate',
        localObjBending: 0.0,
        remoteObjBending: 0.8,
        bendingIncrements: 6
    }
};
let options = Object.assign(defaults, qsOptions);

// create a client engine and a game engine
const gameEngine = new SpaaaceGameEngine(options);
const clientEngine = new SpaaaceClientEngine(gameEngine, options);

document.addEventListener('DOMContentLoaded', e => clientEngine.start());
