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
var demo = require('./routes/demo');




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
app.use('/demo', demo);




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

    // seajs_demo.test_seajs();

    res.send('<h1>' + name + '</h1><p>test success!</p>');
});


/**
 *
 * Socket.io usage
 * --listen different port
 */
var io = require('socket.io').listen(3333);
var chat = io
        .of('/socket')
        .on('connection',function(socket){

          console.log('one user connect to port 3333');

          socket.emit('message from 3333',{
            data: 'data from 3333 socket',
            me: 'libo'
          });

          chat.emit('message from 3333 chat',{
            data: 'data from 3333 chat',
            me: 'libo'
          });

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
