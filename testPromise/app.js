var Promise = require("bluebird");
var external = require('./test.js');


//--Normal non-promise flow
function test () {
    console.log('start')
    private();
    external.external();
};

function private() {
    console.log('private')
};
//test();


//Promise flow
//NOTE: all functions called inside a then has a new Promise called
//with their own resolve/rejct that passes values back to the main call
//If you don't end a .then() by returning a resolve (either in called function or in the then)
//the Promise function will NOT proceed to the next function.
function promiseTest (params) {
    console.log('start promise')
    return new Promise(function (resolve, reject) {
        console.log('Promise')
        return resolve(console.log('finished inside 1st promise'))
    }).then(function(data) {
        promisePrivate();
        //return resolve(console.log('finished inside then promise'))
    }).then(function(data) {
        external.externalPromise();
    })
    .catch(function (err) {
        console.log("there was an error: " + err)
    })
};

function promisePrivate () {
    return new Promise(function (resolve, reject) {
        return resolve(console.log('promise private'))
    });
}

promiseTest();