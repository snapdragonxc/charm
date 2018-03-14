"use strict"
var mongoose = require('mongoose');
var categorySchema = mongoose.Schema({
    name: { type:String, index:{unique:true} }
});
var Category = mongoose.model('Category', categorySchema);
module.exports = Category;