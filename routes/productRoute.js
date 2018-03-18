// <--- API PRODUCT ---> //
var mongoose = require('mongoose');
var Product = require('../models/product.js');
var sessionCheck = require('./sessionCheck');
//
// <--- IMAGE HANDLING --->
var fs = require('fs');
var multer = require('multer'); 
var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/images/products");
    },
    filename: function(req, file, callback) {
        callback(null,  Date.now() + "_" + file.originalname );
    }
});
var upload = multer({
    storage: Storage
}).array("imgUploader", 1); //Field name and max count
// <--- END IMAGE HANDLING --->
//
module.exports = function (router) { 
    // ************** THE FOUR CRUD OPERATIONS ****************** //
    // <--- CREATE PRODUCT --->
    router.post('/product', sessionCheck, function(req, res){

        //console.log(req.body);

        var img = '';

        upload(req, res, function( err) {

            console.log(req.body);
            if (err) {
                return res.send("image upload err:", err);
            }
            if(req.files[0] != undefined){
                img = req.files[0].filename;
            }
            var newProduct = new Product({
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
                saleprice: req.body.saleprice,
                img: img,
                inventory: req.body.inventory
            });
            newProduct.save( function(err, newProduct){
                if(err){
                    return console.log("product save error: ", err);
                }
                return res.json(newProduct);
            })
        }); 
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
        upload(req, res, function( err) {
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
            if (err) {
                return res.send(err);
            }           
            if(req.body.updateImage === 'true'){
                // new image, remove existing image
                fs.unlink('./public/images/products/' + req.body.img, function(err) { 
                    if (err) {
                        return res.send(err);
                    }
                    update.$set.img = req.files[0].filename;
                    Product.findOneAndUpdate({
                        _id: id
                    }, update, {new: true}, function(err, product){           
                        if(err){
                            return console.log(err);
                        }
                        res.json(product);
                    })
                });
            } else {
                Product.findOneAndUpdate({
                    _id: id
                }, update, {new: true}, function(err, product){           
                    if(err){
                        return console.log(err);
                    }
                    res.json(product);
                })
            }
        });                
 
    })
    // <--- DELETE PRODUCT --->
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