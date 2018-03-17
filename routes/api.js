var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var sessionCheck = require('./sessionCheck'); 
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
// <--- ROUTES --->
var productRoute = require('./productRoute');
var categoryRoute = require('./categoryRoute');
var featuredRoute = require('./featuredRoute');
categoryRoute(router);
productRoute(router);
featuredRoute(router);
//
module.exports = router;