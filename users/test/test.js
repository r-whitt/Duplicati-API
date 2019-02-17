const testUser = {
    /* admin part of org 1 */
    email: 'rtester@fake.com',
    password: 'testPassword',
    role: 'admin',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ0ZXN0ZXJAZmFrZS5jb20iLCJmdWxsbmFtZSI6IlJpY2hhcmQgVGVzdGVyIiwiaWQiOjEsImlhdCI6MTU0MTkwODY2OS41MzZ9.vifxUpx-yqle2qSPKGhFyDakphFSREmp83AAodFbgFY",
    //updatedToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjExNTQxOTc0ODkxMzUyIiwiZW1haWwiOiJydGVzdGVyQGZha2UuY29tIiwiZnVsbG5hbWUiOiJSaWNoYXJkIFRlc3RlciIsInVzZXJpZCI6MSwiY3JlYXRlZERhdGUiOiIyMDE4LTExLTExVDIyOjIxOjMxLjM1MloiLCJpYXQiOjE1NDE5NzQ4OTEuMzUyfQ.Kojx8bpC6UJhgKGAZdXHhMrWmDlqx9H2Yj6DtCnA-ls"
    updatedDeletedToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjExNTQyNTE0MjYyNjA3IiwiZW1haWwiOiJydGVzdGVyQGZha2UuY29tIiwiZnVsbG5hbWUiOiJSaWNoYXJkIFRlc3RlciIsInVzZXJpZCI6MSwiY3JlYXRlZERhdGUiOiIyMDE4LTExLTE4VDA0OjExOjAyLjYwOFoiLCJpYXQiOjE1NDI1MTQyNjIuNjA4fQ.Mm71H264qqCrsYnN6OoJmUJmYXX2Lbwvr8O2hJhdlLw",
    updatedToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjExNTQyNTkzNDE4ODM2IiwiZW1haWwiOiJydGVzdGVyQGZha2UuY29tIiwiZnVsbG5hbWUiOiJSaWNoYXJkIFRlc3RlciIsInJvbGUiOjEsInVzZXJpZCI6MSwiY3JlYXRlZERhdGUiOiIyMDE4LTExLTE5VDAyOjEwOjE4LjgzNloiLCJpYXQiOjE1NDI1OTM0MTguODM2fQ.DYVDdELYiQWm-d5B2elen1pJTqDNStkuBQTYx5QpVxk",
    TokenWOrg: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjExNTQ1MDA2MTg5ODM1IiwiZW1haWwiOiJydGVzdGVyQGZha2UuY29tIiwiZnVsbG5hbWUiOiJSaWNoYXJkIFRlc3RlciIsInJvbGUiOiIxIiwib3JnaWQiOiIxIiwidXNlcmlkIjoxLCJjcmVhdGVkRGF0ZSI6IjIwMTgtMTItMTdUMDA6MjM6MDkuODM1WiIsImlhdCI6MTU0NTAwNjE4OS44MzV9.weoXVmi_xGhK0hICOh4lwUehenxYAFplqVVmu0vjK6Y"
}

const testUser = {
    email: 'ruser@fake.com',
    password: 'fakePassword',
    role: 'user',
    TokenWOrg: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjIxNTQ1MDA2MjUyNzAzIiwiZW1haWwiOiJydXNlckBmYWtlLmNvbSIsImZ1bGxuYW1lIjoiUmljaGFyZCBVc2VyIiwicm9sZSI6IjIiLCJvcmdpZCI6IjEiLCJ1c2VyaWQiOjIsImNyZWF0ZWREYXRlIjoiMjAxOC0xMi0xN1QwMDoyNDoxMi43MDNaIiwiaWF0IjoxNTQ1MDA2MjUyLjcwM30.iU2jKSuVlsS2mXPIGpII--m3Mo53lVoujh5iAqNaBe8"
    NewToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjIxNTQ5MjM4MTEzMzU4IiwiZW1haWwiOiJydXNlckBmYWtlLmNvbSIsImZ1bGxuYW1lIjoiUmljaGFyZCBVc2VyIiwicm9sZSI6IjIiLCJvcmdJZCI6IjEiLCJ1c2VyaWQiOjIsImNyZWF0ZWREYXRlIjoiMjAxOS0wMi0wM1QyMzo1NToxMy4zNThaIiwiaWF0IjoxNTQ5MjM4MTEzLjM1OH0.U2bJao9FWjKGQuHH-Ql9h6I8htz6fchwT5m_Oo_7Mpw"
}


To duplicate fail (in postman)

Method GET:
URL: localhost:3000/api/getAllCerts
jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjIxNTQ1MDA2MjUyNzAzIiwiZW1haWwiOiJydXNlckBmYWtlLmNvbSIsImZ1bGxuYW1lIjoiUmljaGFyZCBVc2VyIiwicm9sZSI6IjIiLCJvcmdpZCI6IjEiLCJ1c2VyaWQiOjIsImNyZWF0ZWREYXRlIjoiMjAxOC0xMi0xN1QwMDoyNDoxMi43MDNaIiwiaWF0IjoxNTQ1MDA2MjUyLjcwM30.iU2jKSuVlsS2mXPIGpII--m3Mo53lVoujh5iAqNaBe8