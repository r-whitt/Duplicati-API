INSERT INTO orgs (orgName)
    VALUES ('Dick Enterprise');

/* updating current user */
update users set orgid = 1 where id = 1 

INSERT INTO roles (roleName, OrgId)
    VALUES ('admin', 1), ('user', 1) 
    /* use OrgId from Dick Enterprise */

INSERT INTO endPoints (urlPath, description)
    VALUES ('index', 'Home Page'),
            ('/api/puppies', 'Get All Puppies'),
            ('/api/puppies/:id', 'Get 1 Puppy'),
            ('/api/addPuppies', 'Add a Puppy'),
            ('/api/updatePuppies/:id', 'Adjust a Puppy'),
            ('/api/removePuppies/:id', 'Remove a Puppy'),
            ('/api/addCert', 'Add Certs'),
            ('/api/getAllCerts', 'Get list of all certs'),
            ('report/getCertaDog/:id', 'Report for all Certs a dog has'),
            ('/auth/register', 'Register a user for JWT'),
            ('/auth/sign_in', 'User Signs in to get a JWT Token'),
            ('/api/help', 'API Help Guide'),
            ('ALL', 'For Admin roles access') /* might have to check only admin has this to prevent bad issues */
INSERT INTO endpoints (urlPath, description, privateURL)
    VALUES ('/create/pupTable', 'Create Puppy Table', True) 

/* Get the Ids after adding endpoints & roles */
INSERT INTO apiRolePermissions (endpointID, userRoleID, crudAllowed)
    VALUES (14, 1, '*'), /* endPointID is a integer, so for now 0 = all */
            (8 , 2, 'GET'),
            (11, 2, 'POST'),
            (2, 2, 'GET')

INSERT INTO users (fullname, email, roleID, hash_password, deleted, created)
VALUES ('Richard User', 'rUser@fake.com', 2, )

INSERT INTO usersRole (userId, roleId)
VALUES ('rtester@fake.com', 1),
        ('ruser@fake.com', 2)


/* Getting Data */

/* get user info w/ role id */
select *
from users u
    inner join usersrole ur
    on ur.userId = u.email
where u.email like'rtester@fake.com'

/* Getting Role/user/endpoint info */
select *
from apiRolePermissions arp
    inner join endPoints ep
    on arp.endpointID = ep.id
    inner join roles r
    on arp.userroleid = r.id
    inner join usersRole ur
    on r.id = ur.roleid
    inner join users u
    on u.email = ur.userid
where u.email like 'ruser@fake.com' and
    u.deleted = false