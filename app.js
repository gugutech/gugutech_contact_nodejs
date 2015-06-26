var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var seajs = require('seajs');


var routes = require('./routes/index');
var users = require('./routes/users');
var gugutech = require('./routes/gugutech');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use(session({
    cookie: {
        maxAge: 60 * 1000
    },
    store: new redisStore({
        host: "127.0.0.1",
        port: 6379
    }),
    resave: false,
    saveUninitialized: true,
    secret: 'gugutech'

}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/gugutech', gugutech);

app.use('/testCookie', function(req, res, next) {
    if (req.cookies.isVisit) {
        console.log(req.cookies);
        res.send("再次欢迎访问");
    } else {
        res.cookie('isVisit', 1, {
            maxAge: 60 * 1000
        });
        res.send("欢迎第一次访问");
    }
});

app.use('/redisses', function(req, res, next) {
    console.log(req);
    if (req.session.isVisit) {
        req.session.isVisit++;
        res.send('<p>第 ' + req.session.isVisit + '次来到此页面</p>');
    } else {
        req.session.isVisit = 1;
        res.send('欢迎第一次来这里');
    }
});


/**
 *
 * seajs combine into node
 *
 */

app.use('/seajstest', function(req, res, next) {

    if (typeof define === "function" && define.cmd) {
        console.log('seajs cmd module load success');
    }


    var seajs_demo = require('./routes/seajs_demo');
    var name = seajs_demo.name;

    seajs_demo.test_seajs();

    res.send('<h1>' + name + '</h1><p>test success!</p>');
});





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
