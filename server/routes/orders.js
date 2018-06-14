var express = require('express');
var router = express.Router();
var Order = require('../models/order');
const { check, validationResult } = require('express-validator/check');

// Add new order
router.post('/', [
    check('customerName')
        .not().isEmpty()
        .trim()
        .escape(),
    check('customerAdress')
        .not().isEmpty()
        .trim()
        .escape()
    ], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    var customerName = req.body.customerName;
    var customerAdress = req.body.customerAdress;
    var items = req.body.items;
    var totalPrice = req.body.totalPrice;
    if (req.body.customerId) {
        var customerId = req.body.customerId;
        var new_order = new Order({
            customerId: customerId,
            customerName: customerName,
            customerAdress: customerAdress,
            items: items,
            totalPrice: totalPrice
        })
    } else {
        var new_order = new Order({
            customerName: customerName,
            customerAdress: customerAdress,
            items: items,
            totalPrice: totalPrice
        })
    }

    new_order.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true,
            message: 'Order added successfully!'
        })
    })
})

// Update order
router.put('/:id', (req, res) => {
    Order.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { items: req.body.items }, totalToPay: req.body.totalToPay },
        function (error) {
            if (error) {
                console.log(error);
            } else {
                res.send({
                    success: true
                })
            }
    })
})

// Fetch single order
router.get('/:userId', (req, res) => {
    Order.findOne({ 'ordererId': req.params.userId }, 'ordererId items totalToPay isPaid', function (error, order) {
        if (error || !order) {
            res.send({
                success: false,
                message: 'Order was not found!'
            })
        } else {
            res.send({
                success: true,
                message: 'Order fetched successfully!',
                order: order
            })
        }
    })
})

module.exports = router;