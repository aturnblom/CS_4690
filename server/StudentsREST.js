let express = require('express');
let fs = require('fs');
let bodyParser = require('body-parser');
var winston = require('winston');
require('colors').enabled = true;
// let colors = require('colors');
// colors.setTheme({
//     error: 'red',
//     test: 'blue'
// });
//create express app
var app = express.Router();

// REST API calls go here/ REST end points
// CREATE
app.post('/students.json', function(req, res){
    var data = req.body;
    var id;
    fs.readdir('studentFiles', function(err, files){
        if (err) winston.error(err.red);
        
        var lastFile = files.pop(); //example would be 0005.json
        lastFile = /\d*/.exec(lastFile);
        id = lastFile = ('000' + (+lastFile + 1)).slice(-4); // make last file a number then add 1
        data.id = id;
        data.zip = data.zip * 1;
        data.year = data.year * 1;
        data = JSON.stringify(data, null, 2);
        
        fs.writeFile(`studentFiles/${id}.json`, data, 'utf8', function(err){
            if (err) winston.error(err.red);
            res.status(201).json(id); //return the id of the new resource
        }); //End of fs.writeFIle
    });//end of fs.readdir
});//end of app.post
    
// READ
app.get('/students/:id.json', function(req, res) { // ?name=foo /query string, :id is a variable that you can get us ing the below
    var id = req.params.id;
    fs.readFile(`studentFiles/${id}.json`,'utf8', function(err, data) {
        if (err) winston.error(err.red );
        var fileContentJSON = JSON.parse(data); // legal, but not very nice
        res.status(200).json(fileContentJSON);
    });
});

// UPDATE
app.put('/students/:id.json', function(req, res){
    var id = req.params.id;
    var data = req.body;
    data.zip = data.zip * 1;
    data.year = data.year * 1;
    data = JSON.stringify(req.body, null, 2);
    
    fs.writeFile(`studentFiles/${id}.json`, data, 'utf8', function(err){
        if (err) winston.error(err.red);
        res.status(204);
    });
});

// DELETE
app.delete('/students/:id.json', function (req, res) {
    var id = req.params.id;
    fs.unlink(`studentFiles/${id}.json`, function(err) {
        if (err) winston.error(err.red);
        res.status(204);
    });
});

// LIST
app.get('/students.json', function(req, res) {
    fs.readdir(`studentFiles`, function(err, files) {
        if (err) winston.error(err.red);
        let studentData = [];
        //This is going to be accessing a database at a later time;
        files.forEach(function (file) {
            let data = fs.readFileSync(`studentFiles/${file}`, 'utf8');
            studentData.push(JSON.parse(data));
        });
        res.status(200).json(studentData);
    });
});

app.get('*', function(req, res) {
    res.status(404).sendFile(WEB + '/404.html');
});

exports = module.exports = app;