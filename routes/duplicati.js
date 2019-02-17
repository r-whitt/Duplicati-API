var express = require('express');
var router = express.Router();
var path = require('path');

var user = require('../users/controllers/userController');
var duplicati = require('../duplicati/controllers/duplicatiController');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Duplicati Home Page');
});

router.get('/checkin', duplicati.backupTestCheckins)
router.post('/checkin', duplicati.backupTestCheckins)

module.exports = router;
