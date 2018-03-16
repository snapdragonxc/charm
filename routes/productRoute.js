// <--- API PRODUCT ---> //
var mongoose = require('mongoose');
var Product = require('../models/product.js');
var sessionCheck = require('./sessionCheck');
module.exports = function (router) { 
    // ************** THE FOUR CRUD OPERATIONS ****************** //
    // <--- CREATE PRODUCT --->
    router.post('/product', sessionCheck, function(req, res){
        var product = req.body;
        var newProduct = new Product({
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                saleprice: product.saleprice,
                img: product.img,
                inventory: product.inventory
            });
        newProduct.save( function(err, newProduct){
            if(err){
                return console.log(err);
            }
            return res.json(newProduct);
        })
    });
    // <--- RETRIEVE PRODUCTS --->
    router.get('/allProducts', function(req, res, next) {
        Product.find(function (err, products) {
            if(err){
                return console.log(err);
            }
            res.json(products);
        });
    });
    router.get('/products/:category/:page', function(req, res, next) {
        // paginate
        var filter = req.params.category;
        var query;
        if( filter == "all-items"){            
            query = {};
        }
        else{
            query = { category: { $eq: filter } }
        }
        var perPage = 6;
        var page = req.params.page;
        var pages = 1;
        Product.count(query).exec(function(err, count) {              
            if (err){
                return next(err);
            }     
            pages = Math.ceil(count/perPage);
            if(pages > 0){
                if( page > ( pages-1 ) ){               
                    page = pages - 1;
                }
            }
            Product.find(query).skip( perPage * page).limit( perPage ).exec(function(err, products) {           
                if (err){
                    return next(err);
                } 
                res.json({
                    products: products,
                    pages: pages
                });
            });
        });
    });
    // <--- RETRIEVE PRODUCT --->
    router.get('/product/:id', (req, res) => {
        var id = req.params.id;
        Product.findOne({
            _id: id    
        }, function( err, product ){
            if(err){
                return console.log(err);
            }
            return res.json(product)
        });
        
    }); 
    // <--- UPDATE PRODUCT --->
    router.put('/product/:_id', sessionCheck, function(req, res){
        var id = req.params._id;
        var update = {
            '$set': {
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
                saleprice: req.body.saleprice,
                img: req.body.img,
                inventory: req.body.inventory
            }
        };
        Product.findOneAndUpdate({
            _id: id
        }, update, {new: true}, function(err, product){           
            if(err){
                return console.log(err);
            }
            res.json(product);
        })
    })
    // <--- DELETE PRODUCT --->
    var fs = require('fs');
    router.delete('/product/:_id', sessionCheck, function(req, res){
        var id = req.params._id;      
        Product.findOne( { _id: id } ).exec( function(err, product) {
            if(err){
                return console.log(err);
            }
            Product.remove( { _id: id }, function(err){
                //
                fs.unlink('./public/images/products/' + product.img, function(err) {
                    if (err) {
                        return res.send("Something went wrong!");
                    }
                    res.json(product);                
                });          
            });
        });       
    });
}