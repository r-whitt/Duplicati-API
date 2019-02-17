var promise = require('bluebird');
var pgdb = require('./database');

var options = {
    // Initialization Options
    promiseLib: promise
};

const QueryFile = require('pg-promise').QueryFile;
const path = require('path')


// Helper for linking to external query files
function sql(file) {
    const fullPath = path.join(__dirname, file);
    return new QueryFile(fullPath, {minify: true});
}

module.exports = {
    sql: sql
};