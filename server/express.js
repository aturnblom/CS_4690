const PORT = process.env.PORT;
const IP = process.env.IP;
var path = require('path');
console.log('Loading Server');
const WEB = path.join((__dirname + '/../web'));

//load main modules
let express = require('express');

//load middleware modules
var logger = require('morgan');
var compression = require('compression');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var rest = require('./StudentsREST');

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

var server = app.listen(PORT, IP);

function gracefullShutdown() {
    console.log('\nStarting Shutdown');
    server.close(function() {
        console.log('\nShutdown Complete');
    });
}

//Commented out temporarily for development need to uncomment these when done
// process.on('SIGTERM', function() {
//     gracefullShutdown();
// });

// process.on('SIGINT', function(){
//     gracefullShutdown();
// });

console.log(`Listening on port ${PORT}`);