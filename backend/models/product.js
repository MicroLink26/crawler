const mongoose = require('mongoose')
var Schema = mongoose.Schema;
var productSchema = new Schema({
    name: String, 
    photo: String, 
    brand: String, 
    description: String, 
    ingredients: String, 
    price: String, 
    type: String
}); 
 
module.exports  = mongoose.model('Product', productSchema)

