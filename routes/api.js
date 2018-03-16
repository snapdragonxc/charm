var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
// for image handling - start
var multer = require('multer'); 
var sessionCheck = require('./sessionCheck'); 
// for image handling - end
//
// <--- PASSPORT SESSION MANAGEMENT LOGIN/LOGOUT ---> //
router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        //console.log('passport username', req.user.username);        
        res.send(req.user.username);
    }
);
router.get('/logout', function(req, res){
    req.logout(); // passport added logout to req.
    res.send(401, 'User logged out');
});
// check login status
router.get('/status', sessionCheck, function(req, res){
    res.send('User logged in');
});
// <--- SHOPPING CART SESSION MANAGEMENT --->
// SAVE TO SESSION
router.post('/cart', function(req, res){ // overwrite existing for all operations
    var cart = req.body;
    console.log('This is the cart ', cart);
    req.session.cart = cart;
    req.session.save(function(err){
        if(err){
            throw err;
        }
        res.json(req.session.cart);
    })
})
// GET SESSION CART
router.get('/cart', function(req, res){
    if(typeof req.session.cart !== 'undefined'){        
        res.json(req.session.cart);
    }
});
// <--- IMAGE HANDLING --->
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
//
// <--- CREATE IMAGE ---> 
router.post("/upload", sessionCheck, function(req, res) {
    upload(req, res, function( err) {
        if (err) {
            return res.send("Something went wrong!");
        }
        return res.send(req.files[0].filename);
    }); 
});
// <--- UPDATE IMAGE --->
var fs = require('fs');
router.put('/upload/:name', sessionCheck, function(req, res){
    var name = req.params.name;
    // delete existing image using unlink
    fs.unlink('./public/images/products/' + name, function(err) {
        if (err) {
            return res.send("Something went wrong!");
        }
        // upload new image
        upload(req, res, function( err) {
            if (err) {
                return res.send("Something went wrong!");
            }
            return res.send(req.files[0].filename); // new file name
        });                
    }); 
})
// <--- END IMAGE HANDLING --->
// <--- ROUTES --->
var productRoute = require('./productRoute');
var categoryRoute = require('./categoryRoute');
var featuredRoute = require('./featuredRoute');
categoryRoute(router);
productRoute(router);
featuredRoute(router);
//
module.exports = router;