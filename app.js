var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');
var api = require('./routes/api');
var authenticate = require('./routes/authenticate')(passport);
var logout = require('express-passport-logout');
var mongoose=require('mongoose');
var MongoStore = require('connect-mongo')(session);
//connect to mongodb
var app = express();
var db= mongoose.connect("mongodb://localhost:27017/coffeeshop");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(session({
    secret:'super duper secret',
    saveUninitialized: true,
    resave: false,
    maxAge: new Date(Date.now() + 3600000),
    store: new MongoStore(
        {mongooseConnection:mongoose.connection}
    )

  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


//Initialize Models
require('./models/models.js');

//Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);


app.use('/api', api);
app.use('/auth', authenticate);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
