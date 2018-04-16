var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

module.exports = function(){
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    }, function(userName, password, done){
        var url = 'mongodb://localhost:27017/ntnuTutor';
        mongodb.connect(url, function(err,db){
            var collection = db.collection('users');
            collection.findOne({userName: userName},
                function(err,results){
                    if(!results) {
                        console.log('No this user');
                        done(null, false, {message: 'No this user'});
                    }
                    else if(results.password === password){
                        var user = results;
                        done(null,results);
                    }
                    else{
                        done(null, false, {message: 'Bad password'});
                    }
            });
        });
    }));
};