/**
 * Module dependencies.
 */

var express = require('express')
    , colors = require('colors')
    , h5bp = require('h5bp')
    , routes = require('./routes')
    , api = require('./routes/api')
    , cacheAge = 24 * 60 * 60 * 1000;
//angularlib = require('./js/lib'),
//bootstrap = require('bootstrap'),
//applib = require('./js');

var app = module.exports = express();

// Configuration

app.configure(function () {
    //app.use(h5bp({root: __dirname + '/public'}))

    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    //app.set('view engine', 'jade');
    app.engine('.html', require('ejs').__express);

    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
    app.use(express.logger(''
        + '\\n  ' + ':date'.bold.underline + '\\n\\n' + '  IP: '.cyan.bold
        + ' ' + ':remote-addr'.white + '\\n' + '  Method: '.red.bold
        + ':method'.white + '\\n' + '  URL: '.blue.bold + ':url'.white
        + '\\n' + '  Status: '.yellow.bold + ':status'.white + '\\n'
        + '  User Agent: '.magenta.bold + ':user-agent'.white)
        , express["static"](root, { maxAge: cacheAge }));

});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/404', function(req, res, next) {
    res.render("404.html");
});
app.get('*', function(req, res, next) {
    var url = req.url
        , ua = req.headers['user-agent'];
    if (url.match(/(^|\/)\./)) {
        res.end("Not allowed");
    }

    if(ua && ua.indexOf('MSIE') && /htm?l/.test(ua)) {
        res.setHeader('X-UA-Compatible', 'IE=Edge,chrome=1');
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");

    next();
});

// JSON API

app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(8888, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
