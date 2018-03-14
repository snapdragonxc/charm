"use strict"
// This model stores the id of the products on the home page, 'Featured Froducts'
var mongoose = require('mongoose');
var featuredSchema = mongoose.Schema({
    index: Number,
    productId: mongoose.Schema.Types.ObjectId
});
var Featured = mongoose.model('Featured', featuredSchema);
module.exports = Featured;