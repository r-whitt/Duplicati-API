const pgdb = require('../../database');
const sql = require('../../queryFile').sql;
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//var bcrypt = require('bcrypt-nodejs');
const config = require('../../config');
const auth = require('./authController');

function register (req, res, next) {
    req.body.hash_password = bcrypt.hashSync(req.body.password, 10);
    req.body.password = undefined;
    req.body.email = req.body.email.replace(/\s/g, "").toLowerCase();
    req.body.roleID = parseInt(req.body.roleID)
    req.body.orgid = parseInt(req.body.orgid)
    req.body.deleted = false;
    req.body.created = new Date()
    pgdb.none(sql('./users/sql/insertUser.sql'), req.body)
    .then(function (data) {
        req.body.hash_password = undefined
        res.status(200)
        .json({
            status: 'success',
            message: 'Inserted one user',
            data: req.body
        });
    })
    .catch(function (err) {
        console.log('user controller register catch')
        return next(err);
    });
};

function checkUser (req, res, next) {
    //conditioning properties
    console.log('user controller checkuser about to adjust email')
    req.body.email = req.body.email.replace(/\s/g, "").toLowerCase();
    req.body.hash_password = bcrypt.hashSync(req.body.password, 10);
    //querying db for user information
    pgdb.one('select * from users u inner join usersrole ur on ur.userId = u.email where u.email like $1 ', req.body.email)
    .then(function (data) {
        //Checking Password
        console.log('user controller checkUser ran query')
        const pwCheck = bcrypt.compareSync(req.body.password, data.hash_password)
        if (data.deleted === false && pwCheck === true) {
            //logic for good pw & valid user
            console.log('check user good user & pw')
            req.body.password = undefined;
            const dontDelete = req.body.dontDelete || false
            const d = data.id.toString().concat(Date.now())
            const jwtiat = new Date().getTime()/1000;
            const now = new Date();
            const jwtObj = {
                "jwtid": d,
                "datecreated": now,
                "email": data.email,
                "fullname": data.fullname,
                "id": data.id,
                "roleid": data.roleid || 0, 
                "orgID": data.orgid,
                "iat": jwtiat,
                "dontDelete": dontDelete
            }
            console.log('checkuser sending next(jwt)' + JSON.stringify(jwtObj)) //remove for production
            console.log('checkUser disable: ' + dontDelete)
            return next(jwtObj)
        } else {
            res.status(401).json({
                message: 'User is deleted, see your Administrator'
            });
        }
    })
    .catch(function (err) {
        console.log('checkuser catch')
        res.status(403).json({
            status: 'Fail',
            message: 'Unauthorized or User marked as deleted',
            data: err
        });
    })
}

function issueJWT (user, req, res, next) {
    var jwtObj = user;
    var userObj = user;
    console.log('userController issueJWT: ' + userObj + " user " + user)
    if (user.dontDelete === false) {
        console.log("issueJWT deleting old jwt")
        pgdb.tx('updatingToken', function (t) {
            console.log('issueJWT udpating deleted')
            return t.batch([
                //Delete old tokens from jwt table. makes sure it isn't the new one
                t.none(sql('./users/sql/deleteJWT.sql'), user),
                //t.none('update jwt set deleted = true where useremail = $1', user.email),
                //add token details to jwt token
                t.none(sql('./users/sql/insertjwt.sql'), user)
            ]);
        })
        .then(function (user) {
            console.log('creating new jwt ' + JSON.stringify(jwtObj))
            return res
            .json({
                token: jwt.sign({
                    jwtid: jwtObj.jwtid,
                    email: jwtObj.email,
                    fullname: jwtObj.fullname,
                    role: jwtObj.roleid,
                    orgid: jwtObj.orgID,
                    userid: jwtObj.id,
                    createdDate: jwtObj.datecreated,
                    iat: jwtObj.iat
                }, config.secret)
            });
        })
        .catch(function (err) {
            res.status(403).json({
                status: 'Fail',
                message: 'We encountered an issue disabling old tokens & issuing new token',
                data: err
            })
        })
       // }) Where old task finished
        .catch(function (err) {
            res.status(403).json({
                status: 'Fail',
                message: 'Unauthorized or Invalid Token',
                data: err
            });
        })
    } else {   
        console.log('issueJWT2 ' + JSON.stringify(jwtObj))
        console.log('skipping disabling old tokens. Insterting new token to table')
        pgdb.none(sql('./users/sql/insertjwt.sql'), jwtObj)
        .then(function (data) {
            console.log("issueJWT then user: " + JSON.stringify(jwtObj))
            // Issuing the new token
            return res
            .json({
                token: jwt.sign({
                    jwtid: jwtObj.jwtid,
                    email: jwtObj.email,
                    fullname: jwtObj.fullname,
                    role: jwtObj.roleid,
                    orgId: jwtObj.orgID,
                    userid: jwtObj.id,
                    createdDate: jwtObj.datecreated,
                    iat: jwtObj.iat
                }, config.secret)
            });
        });
    }   
}

function checkToken (req, res, next) {
    // Future - send to next function to get Role Permissions so we check authorization endpoint by endpoint
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    var decoded = jwt.decode(token);
    /*
    Sample Token: 
    {
        "jwtid": "21545006252703",
        "datecreated": "2018-12-17T00:24:12.703Z",
        "email": "ruser@fake.com",
        "fullname": "Richard User",
        "id": 2,
        "roleid": "2",
        "orgID": "1",
        "iat": 1545006252.703,
        "dontDelete": false
    }
    */
    pgdb.multi('select deleted from users where id = ${userid};select deleted from jwt where jwtid = ${jwtid}', decoded)
    .spread((u, j) => {
        //check if user or JWT is deleted
        if (j[0].deleted == false && u[0].deleted == false) {
            //token & user is valid
            //Going to next function -- FUTURE pass through decoded?
            next()
        } else {
            // user or token was deleted
            res.status(403).json({
                status: 'Fail',
                message: 'Invalid Token, get a new token or see your admin'
            })
        }
    })
    .catch(function (err) {
        res.status(403).json({
            status: 'Fail',
            message: 'Unauthorized or Invalid Token',
            data: err
        });
    })    
}

function checkTokenAuth(req, res, next) {
    //Getting Token & Decoding
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    var decoded = jwt.decode(token);
    var userPermissions = null;
    /*
    Sample Token: 
    {
        "jwtid": "21545006252703",
        "datecreated": "2018-12-17T00:24:12.703Z",
        "email": "ruser@fake.com",
        "fullname": "Richard User",
        "id": 2,
        "roleid": "2",
        "orgID": "1",
        "iat": 1545006252.703,
        "dontDelete": false
    }
    */
   //Querying db to check for Deleted users & deleted Tokens --If deleted, will fail
    pgdb.task(function (t) {
        return t.one('select deleted from users where id = ${userid}', decoded)
        .then(function (user) {
            console.log('ran deleted user query')
            if (user.deleted == true) {
                console.log('userController checkTokenAuth failed access')
                //Doesn't have permission to access this route
                res.status(403).json({
                    status: 'Fail',
                    message: "You don't have access"
                })
            }
        })
        .then(function (jwt) {
            return t.one('select deleted from jwt where jwtid = ${jwtid}', decoded)
            .then(function (token) {
                console.log('ran deleted jwt query')
                if (token.deleted === true) {
                    console.log('userController checkTokenAuth failed access')
                    res.status(403).json({
                        status: 'Fail',
                        message: "You don't have access"
                    })
                }
            })
        })
        .then(function (permissions) {
            return t.any(sql('./users/sql/getPermissions.sql'), decoded)
            .then(function (permissionObj) {
                //send to authController - token & user valid (not deleted)
                console.log('userController about to start authController')
                if (decoded.orgID != permissionObj.orgid || decoded.roleid != permissionObj.userroleid) {
                    console.log('userController checkTokenAuth org or role id didnt match')
                    res.status(403).json({
                        status: 'Fail',
                        message: "You're role or org changed. Please get a new token and try again"
                    })
                }
                console.log('userController starting granting')
                const userMessage = auth.grantingPermission(decoded.jwtid, permissionObj)
                console.log("UserController " + JSON.stringify(userMessage))
                console.log('userController finished with AuthController')
                userPermissions = permissionObj
            })
            .then(function () {
                console.log('userController checking then for permissionObj ' + JSON.stringify(userPermissions))
                const accessNew = auth.checkingPermission(decoded.jwtid, req.path, req.method, userPermissions)
                console.log('userController new access check: ' + JSON.stringify(accessNew))
                console.log(req.path)
                if (accessNew) {
                    return next()
                } else {
                    console.log('userController checkTokenAuth failed access')
                    //Doesn't have permission to access this route
                    res.status(403).json({
                        status: 'Fail',
                        message: "You don't have access"
                    })
                }
            })
        })
        .catch(function (err) {
            console.log('userController checkTokenAuth failed access3 ' + err)
            res.status(403).json({
                status: 'Fail',
                message: 'Unauthorized or Invalid Token',
                data: err.code
            });
        })
    })
}

module.exports = {
    register: register, 
    checkUser: checkUser,
    issueJWT: issueJWT,
    checkToken: checkToken,
    checkTokenAuth: checkTokenAuth
}