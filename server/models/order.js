var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var OrderSchema = new Schema({
    customerId: String,
    customerName: String,
    customerAdress: String,
    items: [{ productId: String, name: String, amount: [{ size: Number, quantity: Number }], price: Number }],
    orderDate: {
        type: Date,
        default: Date.now
    },
    totalPrice: Number,
    isPaid: {
        type: Boolean,
        default: false
    }
});

var Order = mongoose.model("Order", OrderSchema);
module.exports = Order;