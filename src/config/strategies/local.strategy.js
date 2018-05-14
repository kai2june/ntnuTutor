const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');

module.exports = function (){
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    }, (userName, password, done) => {
        const con = mysql.createConnection({
            host: "us-cdbr-iron-east-05.cleardb.net",
            user: "bf21490598786b",
            password: "9ce3bbcf",
            database: "heroku_0825199c0f3d37a"
        });
        con.connect( (err) => {
            if(err)
                throw err;
            else{
                console.log('mysql connected!!');
                let sql = `SELECT * FROM backendStaff WHERE userName = '${userName}'`;
                con.query(sql, (err, result) => {
                    if(err) throw err;
                    else{
                        console.log(result[0].userName);
                        console.log(result[0].password);
                        console.log(password);
                        if(!result){
                            console.log('No this user');
                            done(false, null, {message: 'Input an existing user'});
                        }
                        else if(result[0].password == password){
                            console.log(`result.password=${result[0].password}, password=${password}`);
                            done(null, result);
                        }
                        else{
                            console.log('We are in Else');
                            done(null, false, {message: 'Wrong password'});
                        }
                    }
                });
            }
        })
    }));
};


// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var mongodb = require('mongodb').MongoClient;
//
// module.exports = function(){
//     passport.use(new LocalStrategy({
//         usernameField: 'userName',
//         passwordField: 'password'
//     }, function(userName, password, done){
//         var url = 'mongodb://localhost:27017/ntnuTutor';
//         mongodb.connect(url, function(err,db){
//             var collection = db.collection('users');
//             collection.findOne({userName: userName},
//                 function (err, results) {
//                     if(!results) {
//                         console.log('No this user');
//                         done(null, false, {message: 'No this user'});
//                     }
//                     else if (results.password === password) {
//                         var user = results;
//                         done(null, results);
//                     }
//                     else {
//                         done(null, false, {message: 'Bad password'});
//                     }
//                 });
//         });
//     }));
// };