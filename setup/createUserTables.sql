/* remember to remove white spaces (full name,email), send to Lower case for email, unique for email
trim() postsql to remove white spaces -- in sql query
lower() postql to make all lowecase -- in sql query
*/

CREATE TABLE users (
    ID SERIAL,
    fullname VARCHAR NOT NULL,
    email VARCHAR UNIQUE PRIMARY KEY, /* Change to user id for duplicati? */
    roleID INTEGER, /* Adding to practive foreign keys */
    hash_password VARCHAR NOT NULL,
    deleted BOOLEAN NOT NULL,
    created  timestamp NOT NULL
    /* Add org number to duplicati */
);

/* we will log keys that are generated so we can disable them one by one or in a group */
CREATE TABLE jwt (
    ID SERIAL NOT NULL,
    userEmail VARCHAR NOT NULL REFERENCES users(email),
    jwtid bigint PRIMARY KEY, /* user id + date created */
    deleted BOOLEAN NOT NULL, /* default is false */
    datecreated TIMESTAMP NOT NULL
)

/* New Tables/Adjustments */
CREATE TABLE orgs (
    ID SERIAL NOT NULL,
    orgId SERIAL PRIMARY KEY,
    orgName VARCHAR NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE, /*So you can disable an entire org later (pay?) */
)

ALTER TABLE users
    ADD orgId bigint

ALTER TABLE users 
   ADD CONSTRAINT fk_userOrg
   FOREIGN KEY (orgId) 
   REFERENCES orgs(orgId);

ALTER TABLE jwt 
    ALTER COLUMN datecreated 
    TYPE TIMESTAMP WITH TIME ZONE;

CREATE TABLE roles (
    ID SERIAL NOT NULL,
    roleId SERIAL PRIMARY KEY,
    roleName VARCHAR NOT NULL,
    orgId bigint REFERENCES orgs(orgId)
)

CREATE TABLE usersRole (
    ID SERIAL NOT NULL PRIMARY KEY,
    userId VARCHAR NOT NULL REFERENCES users(email),
    roleId BIGINT NOT NULL REFERENCES roles(roleId),
    dateAdded TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE endPoints (
    ID SERIAL NOT NULL PRIMARY KEY,
    urlPath VARCHAR NOT NULL,
    privateURL BOOLEAN DEFAULT NULL, /*future to diable or make endpoints private */
    description VARCHAR /*Either a brief desc. or tutorials for future api guide */
    /* Add CRUD type? */
)

CREATE TABLE apiRolePermissions (
    ID SERIAL NOT NULL,
    endPointID INTEGER REFERENCES endPoints(ID),
    userRoleID INTEGER REFERENCES roles(ROLEiD),
    crudAllowed VARCHAR /*Get, Put, Delete, Post, all*/
)