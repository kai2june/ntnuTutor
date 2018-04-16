var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var port = process.env.PORT || 3000;
var app = express();


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({secret: 'ntnuTutor'}));
require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

var authRouter = require('./src/routes/authRoutes')();
var studentRouter = require('./src/routes/studentRoutes')();
app.use('/Auth', authRouter);
app.use('/Students', studentRouter);
app.get('/', function(req,res){
    res.render('index');
});
app.listen(port, function(err){
    console.log('Running on port '+ port);
});