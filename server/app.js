var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/secure-sneakers');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
    console.log("Connection Succeeded");
});

var Product = require('./models/product');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);

//fetch products from MongoDB
app.get('/products', (req, res) => {
    Product.find({}, 'name brand description size price', function (error, products) {
        if (error) { console.error(error); }
        res.send({
            products: products
        })
    }).sort({_id:-1})
})

// Add new product
app.post('/products', (req, res) => {
    var db = req.db;
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
app.get('/product/:id', (req, res) => {
    var db = req.db;
    Product.findById(req.params.id, 'name brand description size price', function (error, product) {
        if (error) { console.error(error); }
        res.send(product)
    })
})

// Update product
app.put('/products/:id', (req, res) => {
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
app.delete('/products/:id', (req, res) => {
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
