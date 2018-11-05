# La Louve Member Space Backend
Backend for La Louve member web portal.
## Quick Start
- Update DB_USERNAME and DB_PASSWORD in [configuration file](config/config.js)
- Run docker compose
```
docker-compose up -d
```
- Create user on ldap server with phpLDAPadmin
	- Go to http://hostname
	- Create new Posix Group
	- Create new User Account
- To authentify
```
POST http://hostname:3000/auth/login
```
with username and password in body
- To get all members
```
GET http://hostname:3000/api/member
```
with Authorization: "Bearer {token}" in header
- To get member by id
```
GET http://hostname:3000/api/member/:id
```
- To get member by member number
```
GET http://hostname:3000/api/member/number/:number
```
