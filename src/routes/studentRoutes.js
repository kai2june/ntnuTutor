var express = require('express');
var studentRouter = express.Router();

var router = function(){

    studentRouter.route('/')
        .all(function(req,res, next){
            if(!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function(req,res){
            res.send('You are a valid user.');
        })

    return studentRouter;
};
module.exports = router;