var Promise = require('bluebird')

function external () {
    console.log('external')
}

function externalPromise () {
    return new Promise(function (resolve, rejct) {
        return resolve(console.log('external Promise'))
    });
}

module.exports = {
    external: external,
    externalPromise: externalPromise
}