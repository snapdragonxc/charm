"use strict"
var mongoose = require('mongoose');
var productSchema = mongoose.Schema({
    name: String,
    description: String,
    category: String,
    price: Number,
    saleprice: Number,
    img: String,
    inventory: Number
});
var Product = mongoose.model('Product', productSchema);
module.exports = Product;
