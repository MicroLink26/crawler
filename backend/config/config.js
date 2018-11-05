var dbServer
var dbusername
var dbpassword
var targetsite
var hostname
var port

if (process.env.NODE_ENV === 'production') {
  //to configure
  dbServer = ''
  dbusername = ''
  dbpassword = ''
  targetsite = ''
  hostname = ''
  port = ''
} else if (process.env.NODE_ENV === 'uat') {
  //to configure
  dbServer = ''
  dbusername = ''
  dbpassword = ''
  targetsite = ''
  hostname = ''
  port = ''
} else {
  dbServer = ''
  dbusername = ''
  dbpassword = ''
  targetsite = ''
  hostname = ''
  port = ''
}

module.exports = {
  DB_SERVER: dbServer,
  DB_USERNAME: dbusername,
  DB_PASSWORD: dbpassword,
  TARGET_SITE: targetsite,
  HOST_NAME: hostname,
  PORT: port
}