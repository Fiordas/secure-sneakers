var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var multer  = require('multer');
var path = require('path');
const { check, validationResult } = require('express-validator/check');

// multer configuration
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage });

// upload image
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });
    }
    else {
        console.log('file received');
        return res.send({
            success: true
        })
    }
});

//fetch products from MongoDB
router.get('/', (req, res) => {
    Product.find({}, 'name brand description stock price filename', function (error, products) {
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
    var stock = req.body.stock;
    var price = req.body.price;
    var filename = req.body.filename;
    var new_product = new Product({
        name: name,
        brand: brand,
        description: description,
        stock: stock,
        price: price,
        filename: filename
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
router.get('/edit/:id', check('id').isMongoId(), (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    Product.findById(req.params.id, 'name brand description stock price filename', function (error, product) {
        if (error) { console.error(error); }
        res.send(product)
    })
})

// Update product
router.put('/:id', (req, res) => {
    var db = req.db;
    Product.findById(req.params.id, 'name brand description stock price filename', function (error, product) {
        if (error) { console.error(error); }

        product.name = req.body.name
        product.brand = req.body.brand
        product.description = req.body.description
        product.stock = req.body.stock
        product.price = req.body.price
        product.filename = req.body.filename
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