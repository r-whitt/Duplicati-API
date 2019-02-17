select ep.urlpath
    , arp.crudallowed
    , arp.userRoleID
    , u.orgid
from apiRolePermissions arp
    inner join endPoints ep
    on arp.endpointID = ep.id
    inner join roles r
    on arp.userroleid = r.id
    inner join usersRole ur
    on r.id = ur.roleid
    inner join users u
    on u.email = ur.userid
where u.email like ${email} and
    u.deleted = false

/* Refine query to only pull what is needed */