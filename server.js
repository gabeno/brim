
/**
 * Module dependencies.
 */


var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var hbs = require('express-hbs');
var mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('hbs', hbs.express3({
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layouts',
  contentHelperName: 'content'
}));
app.set('view engine', 'hbs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'dist')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  mongoose.connect('mongodb://localhost/brim');
}

// set production constant
app.set('PROD_MODE', ('production' === app.get('env')));

// GET
app.get('/', routes.index);
app.get('/plans', routes.plans);
app.get('/choose', routes.choose);
app.get('/thankyou', routes.thankyou);

// POST
app.post('/save', routes.save);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
