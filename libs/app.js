var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var libs = process.cwd() + '/libs/';

var config = require('./config');
var log = require('./log')(module);
var channels = require('./routes/channels');

var app = express();
////////////////////////////////////

app.use(function(req, res, next) {
		res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', '*');
  	res.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Content-Range, Accept");
    res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time, X-Uid, X-Authentication, WWW-Authenticate');
	if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }

});

app.use(bodyParser.json({ type: 'application/vnd.api+json' }) );

app.use('/channels/', channels);

// catch 404 and forward to error handler
app.use(function(req, res, next){
    res.status(404);
    log.debug('%s %d %s', req.method, res.statusCode, req.url);
    res.json({
    	error: 'Not found'
    });
    return;
});

// error handlers
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('%s %d %s', req.method, res.statusCode, err.message);
    res.json({
    	error: err.message
    });
    return;
});

module.exports = app;
