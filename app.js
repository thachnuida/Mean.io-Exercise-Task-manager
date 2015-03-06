var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var task = require('./app/models/taskboard');

//var routes = require('./app/routes');
var routes = require('./app/routes/index');
// var users = require('./routes/users');

var app = express();

var ProjectModel = mongoose.model('Project')
var TaskModel = mongoose.model('Task');
var UserModel = mongoose.model('User');

// view engine setup
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// app.use('/users', users);

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

app.use('/', routes);

app.get('/task', routes);
app.get('task/id', routes);
app.post('task',routes);
app.put('task/id', routes);
app.delete('task/id', routes);

app.get('/user', routes);
app.get('user/id', routes);
app.post('user',routes);
app.put('user/id', routes);
app.delete('user/id', routes);

app.get('/project', routes);
app.get('project/id', routes);
app.post('project',routes);
app.put('project/id', routes);
app.delete('project/id', routes);


app.listen(4100);
console.log('Listening on port 4100...');

module.exports = app;
