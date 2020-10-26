// installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');


// modules for authentication
let session = require('express-session');
let passport = require('passport');


//authentication strategy
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy; // Alias for the local strategy
//authentication messaging
let flash = require('connect-flash');

// database setup
let mongoose = require('mongoose');
let DB = require('./DB');

//point mongoose to the DB URL
mongoose.connect(DB.URL, {useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection Open...");
});
db.once('connected', function() {
  console.log("Connected to MongoDB...");
});
db.on('reconnected', function() {
  console.log("Reconnected to MongoDB...");
});

db.on('disconnected', function() {
  console.log("Disconnected from MongoDB...");
});


//Routing modules
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let movieRouter = require('../routes/movie')

let app = express();


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs'); //express -e

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// initialize flash
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//create a User Model Instance
let userModel = require('../models/user');
let User = userModel.User;

//implement a User Auth Strategy
passport.use(User.createStrategy());

//serialize and deserialize the User Info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movie-list', movieRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error'});
});

module.exports = app;
