// <--- API CATEGORY ---> //
var mongoose = require('mongoose');
var Category = require('../models/category.js');
var passport = require('passport');
var sessionCheck = require('./sessionCheck');
// Add some  dummy category
/*
var category = {
        name: 'necklace',
    };
Category.create(category, function(err, category){ });
var category = {
        name: 'brooches',
    };
Category.create(category, function(err, category){ });
var category = {
        name: 'ear rings',
    };
Category.create(category, function(err, category){ });
var category = {
        name: 'tiaras',
    };
Category.create(category, function(err, category){ });
var category = {
        name: 'bracelets',
    };
Category.create(category, function(err, category){ });
*/
module.exports = function (router) { 
    // <--- CREATE CATEGORY --->
    router.post('/category', sessionCheck, function(req, res){
        var category = req.body;
        var newCategory = new Category({
                name: category.name.toLowerCase()
        });
        newCategory.save( function(err, newCategory){
            if(err){
                return console.log(err);
            }
            return res.json(newCategory);
        })
    });
    // <--- RETRIEVE CATEGORIES --->
    router.get('/categories', function(req, res, next) {
        Category.find(function (err, categories) {
            if(err){
                return console.log(err);
            }
            res.json(categories);
        });
    });
    // <--- RETRIEVE CATEGORY --->
    router.get('/category/:id', (req, res) => {
        var id = req.params.id;
        Category.findOne({
            _id: id    
        }, function( err, category ){
            if(err){
                return console.log(err);
            }
            return res.json(category);
        });        
    }); 
    // <--- RETRIEVE CATEGORY BY NAME --->
    router.get('/category/byname/:name', (req, res) => {
        var name = req.params.name.toLowerCase();
        Category.findOne({
            name: name    
        }, function( err, category ){
            if(err){
                return console.log(err);
            }
            return res.json(category);
        });        
    }); 
    // <--- UPDATE CATEGORY --->
    router.put('/category/:_id', sessionCheck, function(req, res){
        var id = req.params._id;
        var update = {
            '$set': {
                name: req.body.name.toLowerCase()
            }
        };
        Category.findOneAndUpdate({
            _id: id
        }, update, {new: true}, function(err, category){
            if(err){
                return console.log(err);
            }
            res.json(category);
        })
    })
    // <--- DELETE CATEGORY --->
    router.delete('/category/:_id', sessionCheck, function(req, res){
        var query = {_id: req.params._id};
        Category.remove(query, function(err){
            if(err){
                console.log(err);
            }
            res.json(query);
        });
    });
}