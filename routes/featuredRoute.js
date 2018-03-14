// <--- API FEATURED PRODUCT ---> //
var mongoose = require('mongoose');
var Featured = require('../models/featured.js');
var Product = require('../models/product.js');
var sessionCheck = require('./sessionCheck');
module.exports = function (router) {     
    // <--- CREATE FEATURED PRODUCT ---> 
    router.post('/featuredProduct', sessionCheck, function(req, res){
        var featured = req.body;
        var newFeatured = new Featured({
                index: featured.index,
                productId: mongoose.Types.ObjectId(featured.productId)
        });
        newFeatured.save( function(err, newFeatured){
            if(err){
                return console.log(err);
            }
            return res.json(newFeatured);
        })
    });
    // <--- RETRIEVE FEATURED PRODUCTS  --->
    router.get('/featuredProducts', function(req, res, next) {
        Featured.find(function (err, featuredProducts) {
            if(err){
                return console.log(err);
            }
            res.json(featuredProducts);
        });
    });
    // <--- RETRIEVE FEATURED PRODUCTS IN FULL --->
    function getProductRecursively( arr, src, index, res){
        // arr = return array of Featured Products in full.
        // src = array of Featured product ids sorted according to index
        if( index > (src.length - 1) ){
            return res.json(arr);
        } else {
            Product.findOne( {_id: src[index].productId }, function( err, product ){
                if(err){
                    return console.log(err);
                }
                arr.push(product);
                getProductRecursively(arr, src, index + 1, res);
            });
        }
    }
    router.get('/featuredProductsInFull', function(req, res, next) {
        Featured.find().sort( { index: 1 } ).exec( function (err, featuredProducts) {
            if(err){
                return console.log(err);
            }
            var index = 0;
            getProductRecursively( [], featuredProducts, index, res);
        });
    });
    // <--- RETRIEVE FEATURED PRODUCT BY INDEX --->
    router.get('/featuredProduct/:index', (req, res) => {
        var index = req.params.index;
        Featured.findOne({
            index: index    
        }, function( err, featuredProduct ){
            if(err){
                return console.log(err);
            }
            return res.json(featuredProduct);
        });
        
    }); 
    // <--- UPDATE FEATURED PRODUCT --->
    router.put('/featuredProduct/:index',  function(req, res){
        var index = req.params.index;
        var update = {
            '$set': {
                productId: mongoose.Types.ObjectId(req.body.productId)
            }
        };
        Featured.findOneAndUpdate({
            index: index
        }, update, {new: true}, function(err, featuredProduct){
            if(err){
                return console.log(err);
            }
            res.json(featuredProduct);
        })
    })
};