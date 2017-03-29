let path = require('path');
let fs = require('fs');
let nconf = require('nconf');
nconf.argv()
    .env()
    .file({file:'config.json'});
require('colors').enabled = true;


const WEB = nconf.get('WEB');
const PORT = nconf.get('PORT');
const IP = nconf.get('IP');

//load main modules
let express = require('express');

//load middleware modules
var logger = require('morgan');
var winston = require('winston');
var compression = require('compression');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var rest = require('./StudentsREST');

winston.info('Loading Server');

//create express app
var app = express();

//insert middleware
app.use(logger('dev'));
app.use(compression());
app.use(favicon(WEB + '/favicon.ico'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application
app.use('/api/v1', rest);

//traditional webserver stuff for serving static files
 // __dirname built in constant, gives you default directory name that this node is working on
app.use(express.static(WEB));
//404 responses/functions must come last

winston.info(WEB);

var server = app.listen(PORT, IP);

function gracefullShutdown() {
    winston.info('\nStarting Shutdown');
    server.close(function() {
        winston.info('\nShutdown Complete');
    });
}

//Commented out temporarily for development need to uncomment these when done
// process.on('SIGTERM', function() {
//     gracefullShutdown();
// });

// process.on('SIGINT', function(){
//     gracefullShutdown();
// });

winston.info(`Listening on port ${PORT}`);
