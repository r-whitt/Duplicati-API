select * 
from pups p
inner join certs c
on p.CertId = c.CertId
where p.CertId = $1