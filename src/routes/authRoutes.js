var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
var mongodb = require('mongodb').MongoClient;

var router = function(){

    authRouter.route('/signUp')
        .post(function(req,res){
            var url = 'mongodb://localhost:27017/ntnuTutor';
            mongodb.connect(url, function(err,db){
                var user = {
                    userName: req.body.userName,
                    password: req.body.password
                };
                var collection = db.collection('users');
                collection.insertOne(user,
                    function(err,results){
                        req.login(results, function(){
                            res.redirect('/Auth/profile');
                        });
                    });
            });
        });
    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function(req,res){
            res.redirect('/Auth/profile');
        });
    authRouter.route('/profile')
        .all(function(req,res,next){
            if(!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function(req,res){
            res.json(req.user);
        });


    return authRouter;
};
module.exports = router;