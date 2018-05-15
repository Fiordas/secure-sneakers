var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var ProductSchema = new Schema({
    name: String,
    brand: String,
    description: String,
    size: Number,
    price: Number
});

var Product = mongoose.model("Product", ProductSchema);
module.exports = Product;