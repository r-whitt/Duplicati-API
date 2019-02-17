var promise = require('bluebird');
var pgdb = require('../../database');
var sql = require('../../queryFile').sql;

var options = {
    // Initialization Options
    promiseLib: promise
};

function getAllPuppies(req, res, next) {
    pgdb.any('select * from pups')
    .then(function (data) {
        res.status(200)
        .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL puppies'
        });
    })
    .catch(function (err) {
        return next(err);
    });
}

function getSinglePuppy(req, res, next) {
    var pupID = parseInt(req.params.id);
    pgdb.one(sql('../sql/getPuppy.sql'), pupID)
    .then(function (data) {
        res.status(200)
        .json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE puppy'
        });
    })
    .catch(function (err) {
        return next(err);
    });
}

//POST
function createPuppy(req, res, next) {
    pgdb.none(sql('../sql/pupInsert.sql'),
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

//PUT
function updatePuppy(req,res, next) {
    pgdb.none('update pups set dogName=$1, Breed=$2, Age=$3, Sex=$4, CertId=$5 where id=$6',
    [req.body.dogName, req.body.Breed, req.body.Age, req.body.Sex, req.body.CertId, req.params.id])
    .then(function () {
        res.status(200).json({
            status: 'success',
            message: 'Updated puppy'
        });
    })
    .catch(function (err) {
        return next(err);
    });
}

//Delete
function removePuppy(req, res, next) {
    var pupID = parseInt(req.params.id);
    pgdb.result('delete from pups where id = $1', pupID)
    .then(function (result) {
        res.status(200).json({
            status: 'success',
            message: 'Removed ${result.rowCount} puppy'
        });
    })
    .catch(function (err) {
        return next(err);
    });
}

// add query functions
module.exports = {
    getAllPuppies: getAllPuppies,
    getSinglePuppy: getSinglePuppy,
    createPuppy: createPuppy,
    updatePuppy: updatePuppy, 
    removePuppy: removePuppy
};