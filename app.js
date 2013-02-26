/**
 * Module dependencies.
 */

var express = require('express'),
  //bootstrap = require('bootstrap'),
  routes = require('./routes'),
  api = require('./routes/api');
  //angularlib = require('./js/lib'),
  //applib = require('./js');

var app = module.exports = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  app.set('view engine', 'html');
  app.engine('.html', require('ejs').__express);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API

app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(8888, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});