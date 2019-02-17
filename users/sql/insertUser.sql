INSERT INTO users (fullname, email, hash_password, deleted, created, orgid)
    VALUES (${fullname}, ${email}, ${hash_password}, ${deleted}, ${created}, ${orgid});
    /* Add org info for duplicati */