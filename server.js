// requires
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var passport = require('./strategies/user.strategy');
var session = require('express-session');

// route includes
var index = require('./routes/index');
var user = require('./routes/user');
var register = require('./routes/register');
var questions = require('./routes/questions');
var box = require ('./routes/box');
var points = require ('./routes/points');
var pending = require('./routes/pending');
var submit = require ('./routes/submit');

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// serve back static files
app.use(express.static(path.join(__dirname, './public')));

// passport session configuration
app.use(session({
   secret: 'secret',
   key: 'user', // this is the name of the req.variable. 'user' is convention
   resave: 'true',
   saveUninitialized: false,
   cookie: { maxage: 600000, secure: false }
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/register', register);
app.use('/user/', user);
app.use('/box/',box);
app.use('/questions/', questions);
app.use('/points', points);
app.use('/pending/', pending);
app.use('/submit', submit);
app.use('/*', index);

// mongo connection
var mongoURI = '';
// process.env.MONGODB_URI will only be defined if you are running on Heroku
if(process.env.MONGODB_URI != undefined) {
    // use the string value of the environment variable
    mongoURI = process.env.MONGODB_URI;
} else {
    // use the local database server
    mongoURI = 'mongodb://localhost:27017/sci123Solo';
}

var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function(err){
   if(err) {
     console.log("MONGO ERROR: ", err);
   }
   res.sendStatus(500);
});

mongoDB.once('open', function(){
   console.log("Connected to Mongo, we are ALL scientists!");
});

// app set
app.set('port', (process.env.PORT || 3444));

// app listen
app.listen(app.get('port'), function(){
   console.log('Listening on port: ' + app.get('port'));
});
