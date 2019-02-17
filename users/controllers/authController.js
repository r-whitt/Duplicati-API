const AccessControl = require('accesscontrol');
const ac = new AccessControl();

var permissions = false;
//Test scenario
ac.grant('user') //Can take an array
        .createOwn('cert')
        .deleteOwn('cert')
        .readAny('cert')
    .grant('admin')
        .extend('user')
        .updateAny('cert', ['title'])
        .readAny('/api/getAllCerts')
        .deleteAny('cert');

function grantingPermission(jwtid, dbPermissions) {
    //Granting permissions to JWTID because that is unique to the token & userController is checking to see if the jwt token is deleted before passing to Authorize
    console.log('auth grantintPermissions: ' + ac.hasRole(jwtid))
    if (ac.hasRole(jwtid)){
        //The goal is not to re-create permissions that already exist
        var message = "Granting Permssion found user already granted"
        console.log("auth grantingPermssions" + jwtid + ' already created')
        return message;
    }
    console.log('grantingPermissions promise, going into for loop')
    var i
    //have to use for loop in order to have proper promise flow
    for (i = 0; i < dbPermissions.length; i++) {
        switch (dbPermissions[i].crudallowed) {
            case 'GET':
                console.log("GET: " + dbPermissions[i].urlpath + " " + dbPermissions[i].crudallowed);
                ac.grant(jwtid).readAny(dbPermissions[i].urlpath);
                break;
            case 'POST':
                console.log("POST: " + dbPermissions[i].urlpath + " " + dbPermissions[i].crudallowed);
                ac.grant(jwtid).createAny(dbPermissions[i].urlpath);
                break;
            case 'DELETE':
                console.log("DELETE: " + dbPermissions[i].urlpath + " " + dbPermissions[i].crudallowed);
                ac.grant(jwtid).deleteAny(dbPermissions[i].urlpath);
                break;
            case '*':
                console.log("*: " + dbPermissions[i].urlpath + " " + dbPermissions[i].crudallowed);
                break;
            case 'PUT':
                console.log("PUT: " + dbPermissions[i].urlpath + " " + dbPermissions[i].crudallowed);
                ac.grant(jwtid).updateAny(dbPermissions[i].urlpath);
                break;
            default:
                console.log("permissions switch ran into a problem")
                return false;
                break;
        }
    }
    console.log('grantingPerission finished for loop')
}

function checkingPermission (jwtid, path, method, data) {
    //We have to check & adjust paths that are designed to check by ID (param) because it doesn't match what is saved in the endpoint table in db 
    console.log('checking permission starting')
    const doesURLEndWithNumber = Number(path.slice(path.lastIndexOf('/') + 1));
    const newURL = path.slice(0, path.lastIndexOf('/')) + '/:id'
    console.log('auth check permission does url end # ' + doesURLEndWithNumber + " " + newURL)
    const URLtoCheck = doesURLEndWithNumber > 0 ? newURL : path;
    console.log('auth chck permissions url to check ' + URLtoCheck)
    var access = false;
    var admin = false;
    //Checking for Admin users who can do everything
    method = data[0].crudallowed == '*' ? '*' : method
    //Will have to add OrgID checks after we create endpoints that are have multiple Orgs information (or OrgID may be a search param in the endpoint's query)
    switch (method) {
        case 'GET':
            console.log('Checking GET')
            access = ac.can(jwtid).readAny(URLtoCheck)
            break;
        case 'POST': 
            console.log('Checking POST')
            access = ac.can(jwtid).createAny(URLtoCheck)
            break;
        case 'PUT': 
            console.log('Checking PUT')
            access = ac.can(jwtid).updateAny(URLtoCheck)
            break;
        case 'DELETE': 
            console.log('Checking DELETE')
            access = ac.can(jwtid).deleteAny(URLtoCheck)
            break;
        case '*': 
            //Admin and can do everything for their org
            console.log('Checking *')
            admin = true
            break;
        default:
            break;
    }
    permissions = admin ? admin : access.granted;
    console.log('checking permissions canAccess ' + permissions)
    return permissions
}

function checkReadAccess(role, path) {
    //This is just to test access control & flow, not for production
    const roleName = (role == 2) ? 'admin' : 'user'
    const permission = ac.can(roleName).readAny(path);
    console.log('permission from authController ' + JSON.stringify(permission));
    return permission.granted;
}

module.exports = {
    checkReadAccess: checkReadAccess,
    grantingPermission: grantingPermission,
    checkingPermission: checkingPermission
}