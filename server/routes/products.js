var express = require('express');
var router = express.Router();
var Product = require('../models/product');

//fetch products from MongoDB
router.get('/', (req, res) => {
    Product.find({}, 'name brand description size price', function (error, products) {
        if (error) { console.error(error); }
        res.send({
            products: products
        })
    }).sort({_id:-1})
})

// Add new product
router.post('/', (req, res) => {
    var name = req.body.name;
    var brand = req.body.brand;
    var description = req.body.description;
    var size = req.body.size;
    var price = req.body.price;
    var new_product = new Product({
        name: name,
        brand: brand,
        description: description,
        size: size,
        price: price
    })

    new_product.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true,
            message: 'Product saved successfully!'
        })
    })
})

// Fetch single product
router.get('/edit/:id', (req, res) => {
    var db = req.db;
    Product.findById(req.params.id, 'name brand description size price', function (error, product) {
        if (error) { console.error(error); }
        res.send(product)
    })
})

// Update product
router.put('/:id', (req, res) => {
    var db = req.db;
    Product.findById(req.params.id, 'name brand description size price', function (error, product) {
        if (error) { console.error(error); }

        product.name = req.body.name
        product.brand = req.body.brand
        product.description = req.body.description
        product.size = req.body.size
        product.price = req.body.price
        product.save(function (error) {
            if (error) {
                console.log(error)
            }
            res.send({
                success: true
            })
        })
    })
})

// Delete product
router.delete('/:id', (req, res) => {
    var db = req.db;
    Product.remove({
        _id: req.params.id
    }, function(err, product){
        if (err)
            res.send(err)
        res.send({
            success: true
        })
    })
})

module.exports = router;