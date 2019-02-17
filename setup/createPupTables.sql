CREATE TABLE pups (
    ID SERIAL PRIMARY KEY, 
    dogName VARCHAR,
    Breed VARCHAR,
    Age Integer,
    Sex VARCHAR,
    CertId Integer /* Adding to practive foreign keys */
);

/*Created!*/
CREATE TABLE certs (
    ID SERIAL,
    CertId SERIAL PRIMARY KEY, 
    certName VARCHAR,
    Description  VARCHAR
);

INSERT INTO pups (dogName, breed, age, sex, CertId)
    VALUES ('Tyler', 'Retrieved', 3, 'M', 1);