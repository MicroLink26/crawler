const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config')
const cors = require('cors')
const  ProductRouter = require('./routes/products')


var mongoose = require('mongoose')


// Nous définissons ici les paramètres du serveur.
var hostname = config.HOST_NAME
var port = config.PORT 
 
// Ces options sont recommandées par mLab pour une connexion à la base
const options = {
    keepAlive: 300000, 
    connectTimeoutMS: 30000,
    useNewUrlParser: true
}
//URL de notre base
var urlmongo = 'mongodb://'+config.DB_USERNAME+':'+config.DB_PASSWORD+'@'+config.DB_SERVER 
 
// Nous connectons l'API à notre base de données
mongoose.connect(urlmongo, options)
 
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Database connexion ERROR'))
db.once('open', function (){
    console.log("Database connexion DONE")
}); 
 
// Nous créons un objet de type Express. 
var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/V1/products', ProductRouter)

app.get(['/*'], function (req, res) {
    return res.status(404).json({
      title: 'URL Not Found',
      status: 404,
      description: 'URL Not Found'
    })
  })

  
  module.exports = app.listen(port, hostname, function(){
	console.log("Server listen on http://"+ hostname +":"+port)
})