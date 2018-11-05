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
  dbServer = 'ds249873.mlab.com:49873/productsdb'
  dbusername = 'userproducts'
  dbpassword = '123soleil'
  targetsite = 'http://www.google.com/search?&q=cache%3Ahttps%3A//www.cultbeauty.co.uk'
  hostname = 'localhost'
  port = '3000'
}

module.exports = {
  DB_SERVER: dbServer,
  DB_USERNAME: dbusername,
  DB_PASSWORD: dbpassword,
  TARGET_SITE: targetsite,
  HOST_NAME: hostname,
  PORT: port
}