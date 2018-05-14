var express = require('express');
var studentRouter = express.Router();

var router = function(){

    studentRouter.route('/')
        .all(function(req,res, next){
            if(!req.user) {
                res.redirect('/');
            }
            else{
                next();
            }
        })
        .get(function(req,res){
            res.send('You login with either local account or google account');
            //res.render('students', {user: {name: req.user.displayName, image: req.user._json.image.url}});
        });

    return studentRouter;
};
module.exports = router;