var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var ProductSchema = new Schema({
    name: String,
    brand: String,
    description: String,
    stock: [{ size: Number, quantity: Number }],
    price: Number,
    filename: String
});

var Product = mongoose.model("Product", ProductSchema);
module.exports = Product;