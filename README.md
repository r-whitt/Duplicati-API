# Duplicati API

This is an API using Express, PostgreSQL, and JWT. This API is currently for testing to see what information you can get from Duplicati and possibly to be used with a future Front End for reporting. I created this to hopefully be able to scale the JWT/Users if needed to accomidate multiple organizations if I decide to go that route in the future.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This requires a database connection. I use it with a hosted PostgreSql database, but it *should* work with Microsoft SQL with little changes.

You also need to have Nodejs installed on the computer/server.

### Installing

Close this repo and run a command prompt in this directory. 

Enter: 
```
npm install
```

In [database.js](https://github.com/r-whitt/apiPostGres/blob/master/database.js), change the connectionString variable to include the new database connection path. You can get this from your hosting service

Then you have to setup your JWT encryption secret. For testing purposes only, I have it kept in ./config.json as a 'secret' variable. In production, it is best to keep this as an Environment Variable and should *NEVER* be shared or uploaded to Github.

Finally, you have to configure the database schema. In the ./setup folder, run the following scripts to create a database and tables. The User tables are needed for any database. However, the database name can be changed and the puppies tables are only needed if you want to test the current endpoints.

* createPuppyDB.sql
* createUserTables.sql
* createPupTables.sql - Only needed if you want to test current endpoints/behavior
* insertTestData.sql - This will add test user, roles, orgs, and puppies

## Running the App
Open a command prompt in the folder's root directory and enter:

```
node app.js
```
Open a browser and enter the following URL and you should see a welcome page.

```
http://localhost:3000/
```

To get an explination of the endpoints you can enter the following URL to get the endpoints, required variables, and an example. Please note that I threw this together for a *VERY* quick & dirty help section, please don't judge ;).

```
http://localhost:3000/api/help
```

To test the endpoints, I used Postman. 

## Known Issues/Bugs
* Need to add endpoints for adding Roles, adjusting Role/Endpoint permissions, and changing User Roles
* I plan on adding these features as they are needed for future projects

## Built With

* [Express](http://expressjs.com/) - The web application framework server
* [PG-Promise](http://vitaly-t.github.io/pg-promise/) - PostgreSql Database communication tool that uses promises to control the flow
* [Access Control](https://github.com/onury/accesscontrol#readme) - ACL contols
* [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [Json Web Token](https://github.com/auth0/node-jsonwebtoken#readme) - Json Web Tokens for authentication

## Authors

* **Richard Whitt** - *Just Playing Around!*

## Acknowledgments

* Thank you to everybody who game tips, helped, or ideas on libraries to use.