var express = require('express');
var router = express.Router();
var path = require('path');

var db = require('../puppy/controller/puppyController');
var cert = require('../Certs/controllers/certControllers');
var report = require('../reports/controllers/reportController');
var user = require('../users/controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/puppies', user.checkTokenAuth, db.getAllPuppies);
router.get('/api/puppies/:id', user.checkTokenAuth, db.getSinglePuppy);
router.post('/api/addPuppies', user.checkTokenAuth, db.createPuppy);
router.put('/api/updatePuppies/:id', user.checkTokenAuth, db.updatePuppy);
router.delete('/api/removePuppies/:id', user.checkTokenAuth, db.removePuppy);

//router.get('/create/puppies', db2.createPuppiesDB); -Creates Puppies DB

router.post('/api/addCert', user.checkTokenAuth, cert.createCert);
router.get('/api/getAllCerts', user.checkTokenAuth, cert.getAllCerts);
router.get('/report/getCertDog/:id', user.checkTokenAuth, report.getCertDogs);
//router.get('/report/getCertDog/:id', user.loginRequired, report.getCertDogs);

/* alternate way to make a route do different functions depending on the method
router('/create/puppies')
  .get(db2.getOnePuppy)
  .post(db2.createPuppiesDB)
*/

router.post('/auth/register', user.register);
router.post('/auth/sign_in', user.checkUser, user.issueJWT);

// Quick & Super Dirty API help page.
router.get('/api/help', function(req, res) {
  res.sendFile(path.resolve('./helpPage', 'index.html'));
});

module.exports = router;
