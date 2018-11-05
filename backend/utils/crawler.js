const rp = require('request-promise')
const cheerio = require('cheerio')
const config = require('../config/config')
const baseuri = config.TARGET_SITE
var product = require('../models/product')

module.exports = {
    refresh: function (type) {
        const options = {
            uri: baseuri,
            transform: function (body) {
                return cheerio.load(body)
            },
        }
        var bestsellingProducts = [];
        rp(options)
            .then(($) => {
                //delete selected products type 
                product.deleteMany({
                    type: type
                }, function (err) {
                    if (!err) {
                        console.log('products of type ' + type + ' cleared!')
                    } else {
                        console.log('cant delete product ' + type + '!')
                    }
                })
                //lookup selected products
                $("ul[data-list='" + type + "'] a").each(function (i, elem) {
                    // Here is when you loop every two elements   
                    if (i % 2 == 0) {
                        bestsellingProducts.push($(this).attr("href"));
                    }
                })
                return processArray(bestsellingProducts, type)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

function getProductInfo(uri, type) {
    const options = {
        uri: baseuri + uri,
        transform: function (body) {
            return cheerio.load(body);
        },

    };
    rp(options)
        .then(($) => {
            var name = ''
            var photo = ''
            var brand = ''
            var description = ''
            var ingredients = ''
            var price = ''
            //Name
            name = $("div.productTitle").text()
            //Photo (url de la photo principale)
            photo = $(".js-big-image").attr("src")
            //Brand
            brand = $("div.productBrandTitle").text()
            //Price
            price = $("li.productPrice").text()
            /*works whith jquery but not whith cherio
                        $(".productInfoInner div").each(function (i, elem) {
                            switch ($(".productInfoInner div")[i].innerText) {
                                case 'Description':
                                    //select next node to have text
                                    description = $(".productInfoInner div")[i + 1].innerHTML
                                    break;
                                case 'Full ingredients list':
                                    //select next node to have text
                                    ingredients = $(".productInfoInner div")[i + 1].innerHTML
                                    break;
                                default:
                            }
                        })
                        */

            $("div.itemContent").each(function (i, elem) {
                //console.log($("div.itemcontent")[i].innerText)
                switch (i) {
                    case 1: //description
                        description = $("p", elem).text()
                        break
                    case 3: //ingedients
                        ingredients = $("p", elem).text()
                        break
                    default:
                }


            })
            var newProduct = new product({
                name: name,
                photo: photo,
                brand: brand,
                description: description,
                ingredients: ingredients,
                price: price,
                type: type
            })

            newProduct.save(function (err, results) {
                console.log('Product ' + name + ' added');
            })
        })
}

async function processArray(array, type) {

    for (const item of array) {
        await sleep(2001)
        console.log(item)
        getProductInfo(item, type)

    }

    return true;

}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}