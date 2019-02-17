var promise = require('bluebird');
var pgdb = require('../../database');
var sql = require('../../queryFile').sql;

function getCertDogs (req, res, next) {
    req.params.id = parseInt(req.params.id)
    pgdb.result(sql('./reports/sql/getCertDog.sql'), req.params.id)
    .then(function (data) {
        res.status(200).json({
            status: 'Success',
            data: data.rows,
            message: '${data.rowCount} affected' 
        });
    })
    .catch(function (err) {
        return next(err);
    });
}

module.exports = {
    getCertDogs: getCertDogs
}