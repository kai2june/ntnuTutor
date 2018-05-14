var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
const mysql = require('mysql');

var router = function(){

    const con = mysql.createConnection({
        host: "us-cdbr-iron-east-05.cleardb.net",
        user: "bf21490598786b",
        password: "9ce3bbcf",
        database: "heroku_0825199c0f3d37a"
    });
    con.connect( (err) => {
        if(err) throw err;
        else{
            console.log('mysql connected!!');
            let sql = "CREATE TABLE IF NOT EXISTS backendStaff (userName VARCHAR(255), password VARCHAR(255), id INT AUTO_INCREMENT PRIMARY KEY)";
            con.query(sql, (err, result) => {
                if(err) throw err;
                else{
                    console.log('I create table backendStaff');
                }
            });
            con.end();
        }
    });
    
    
    authRouter.route('/signUp')
        .post(function(req,res){
            const con = mysql.createConnection({
                host: "us-cdbr-iron-east-05.cleardb.net",
                user: "bf21490598786b",
                password: "9ce3bbcf",
                database: "heroku_0825199c0f3d37a"
            });
            con.connect( (err) => {
                if(err) throw err;
                else{
                    console.log('Connected in signUp');
                    let sql = `INSERT INTO backendStaff (userName, password) VALUES ('${req.body.userName}', '${req.body.password}')`;
                    con.query(sql, (err,result) => {
                        if(err) throw err;
                        else{
                            console.log(result);
                            req.login(result, function(){
                                res.redirect('/Auth/profile');
                            });
                        }
                    });
                    con.end();
                } 
            });
        });
    authRouter.route('/signIn')
        .post(
            passport.authenticate('local', {
                successRedirect: '/Auth/profile',
                failureRedirect: '/'
            })
        );
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

// var express = require('express');
// var authRouter = express.Router();
// var passport = require('passport');
// var mongodb = require('mongodb').MongoClient;
//
// var router = function(){
//
//     authRouter.route('/signUp')
//         .post(function(req,res){
//             var url = 'mongodb://localhost:27017/ntnuTutor';
//             mongodb.connect(url, function(err,db){
//                 var user = {
//                     userName: req.body.userName,
//                     password: req.body.password
//                 };
//                 var collection = db.collection('users');
//                 collection.insertOne(user,
//                     function(err,results){
//                         req.login(results, function(){
//                             res.redirect('/Auth/profile');
//                         });
//                     });
//             });
//         });
//     authRouter.route('/signIn')
//         .post(passport.authenticate('local', {
//             failureRedirect: '/'
//         }), function(req,res){
//             res.redirect('/Auth/profile');
//         });
//     authRouter.route('/profile')
//         .all(function(req,res,next){
//             if(!req.user) {
//                 res.redirect('/');
//             }
//             next();
//         })
//         .get(function(req,res){
//             res.json(req.user);
//         });
//
//
//     return authRouter;
// };
// module.exports = router;