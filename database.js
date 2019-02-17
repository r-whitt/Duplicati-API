var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://pihfwsjx:bgfcsOSHDjoBz9fyg4YESVL77z_7lmV-@nutty-custard-apple.db.elephantsql.com:5432/pihfwsjx';
var db = pgp(connectionString);


module.exports = db