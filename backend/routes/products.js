const express = require('express')
var ProductRouter = express.Router()
var product = require('../models/product')

//get products by type (best-selling or trending)
ProductRouter.get('/:type', (req, res) => {
    product.find((err, products) => {
        if (err) {
            res.send(err);
        }
        res.json(products);
    }).where('type').equals(req.params.type)
})


ProductRouter.get('/refresh/:type', (req, res) => {
    var crawler = require("./utils/crawler.js")

    if (crawler.refresh(req.params.type)) {
        return res.status(200).json({
            title: 'OK',
            status: 200,
            description: 'refresh done'
        })
    } else {
        return res.status(500).json({
            title: 'Internal Server Error',
            status: 500,
            description: 'Error during refresh'
        })
    }
})

module.exports = ProductRouter