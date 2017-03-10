const PORT = process.env.PORT;
const IP = process.env.IP;
var path = require('path');
console.log('Loading Server');
const WEB = path.join((__dirname + '/../web'));


//load main modules
var express = require('express');
var fs = require('fs');

//load middleware modules
var logger = require('morgan');
var compression = require('compression');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');


//create express app
var app = express();

//insert middleware
app.use(logger('dev'));
app.use(compression());
app.use(favicon(WEB + '/favicon.ico'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true})); // for parsing application

// REST API calls go here/ REST end points
// CREATE
app.post('/api/v1/students.json', function(req, res){
    var data = req.body;
    var id;
    //console.log(data);
    
     fs.readdir(__dirname + '/studentFiles', function(err, files){
        if (err) throw err;
        
      var lastFile = files.pop(); //example would be 0005.json
      lastFile =/\d*/.exec(lastFile); 
        //   lastFile.replace('.json', ''); // makes replacement 
         //   lastFile.slice(-4);
      
      id = lastFile = ('000' + (+lastFile + 1)).slice(-4); // make last file a number then add 1
      data.id = id;
      data.zip = data.zip * 1;
      data.year = data.year * 1;
      data = JSON.stringify(data, null, 2);
      
     
       fs.writeFile(`${__dirname}/studentFiles/${id}.json`, data, 'utf8', function(err){
        if (err) throw err;
        
          res.status(201).json(id); //return the id of the new resource
        }); //ENd  of fs.writeFIle
    });//end of fs.readdir
});//end of app.post
    
    

// READ
    app.get('/api/v1/students/:id.json', function(req, res) { // ?name=foo /query string, :id is a variable that you can get us ing the below
        var id = req.params.id;
        fs.readFile(`${__dirname}/studentFiles/${id}.json`,'utf8', function(err, data) {
            if (err) throw err;
            
            var fileContentJSON = JSON.parse(data); // legal, but not very nice
            res.status(200).json(fileContentJSON);
        });
    });


// UPDATE
app.put('/api/v1/students/:id.json', function(req, res){
    var id = req.params.id;
    var data = req.body;
    data.zip = data.zip * 1;
    data.year = data.year * 1;
    data = JSON.stringify(req.body, null, 2);
    
    fs.writeFile(`${__dirname}/studentFiles/${id}.json`, data, 'utf8', function(err){
        if (err) throw err;
        
        //res.status(204).end();   DOES THE SAME AS TEXT BELOW
        res.status(204);
    });
});

// DELETE
app.delete('/api/v1/students/:id.json', function (req, res) {
    
    var id = req.params.id;
    fs.unlink(`${__dirname}/studentFiles/${id}.json`, function(err) {
            if (err) throw err;
            
            res.status(204);
        });
});

// LIST
app.get('/api/v1/students.json', function(req, res) { 
    //console.log(this);
    fs.readdir(`${__dirname}/studentFiles`, function(err, files) {
        if (err) throw err;
        let studentData = [];
        //This is going to be accessing a database at a later time;
        files.forEach(function (file) {
            let data = fs.readFileSync(`studentFiles/${file}`, 'utf8');
            studentData.push(JSON.parse(data));
        });
        // var fileList = files.map(fileName => fileName.replaces('.json', '')); - sometmes you want to process the variables, like strip the .json file ext off it, here is an example of how
        res.status(200).json(studentData); // res.sendStatus(200) //newline res.json(files); another formatting option
    });
});



//traditional webserver stuff for serving static files
 // __dirname built in constant, gives you default directory name that this node is working on
app.use(express.static(WEB));
app.get('*', function(req, res) { //404 responses/functions must come last
    res.status(404).sendFile(WEB + '/404.html');
    });
console.log(WEB);

var server = app.listen(PORT, IP);

function gracefullShutdown() {
    console.log('\nStarting Shutdown');
    server.close(function() {
        console.log('\nShutdown Complete');
    });
}

// process.on('SIGTERM', function() {
//     gracefullShutdown();
// });

// process.on('SIGINT', function(){
//     gracefullShutdown();
// });

console.log(`Listening on port ${PORT}`)