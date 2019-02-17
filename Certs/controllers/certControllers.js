var promise = require('bluebird');
var pgdb = require('../../database');
var sql = require('../../queryFile').sql;

var options = {
    // Initialization Options
    promiseLib: promise
};

function createCert(req, res, next) {
    pgdb.none(sql('./Certs/sql/addCert.sql'),
        req.body)
    .then(function () {
        res.status(200)
        .json({
            status: 'success',
            message: 'Inserted one puppy'
        });
    })
    .catch(function (err) {
        return next(err);
    });
}

function getAllCerts(req, res, next) {
    pgdb.any('select * from certs')
    .then(function (data) {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'Retrieved All Certs'
        });
    })
    .catch(function (err) {
        return next(err);
    });
}

module.exports = {
    createCert: createCert,
    getAllCerts: getAllCerts
}