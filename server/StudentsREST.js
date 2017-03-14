var express = require('express');
var fs = require('fs');

//create express app
var app = express.Router();

// REST API calls go here/ REST end points
// CREATE
app.post('/students.json', function(req, res){
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
app.get('/students/:id.json', function(req, res) { // ?name=foo /query string, :id is a variable that you can get us ing the below
    var id = req.params.id;
    fs.readFile(`${__dirname}/studentFiles/${id}.json`,'utf8', function(err, data) {
        if (err) throw err;
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
    
    fs.writeFile(`${__dirname}/studentFiles/${id}.json`, data, 'utf8', function(err){
        if (err) throw err;
        //res.status(204).end();   DOES THE SAME AS TEXT BELOW
        res.status(204);
    });
});

// DELETE
app.delete('/students/:id.json', function (req, res) {
    var id = req.params.id;
    fs.unlink(`${__dirname}/studentFiles/${id}.json`, function(err) {
        if (err) throw err; 
        res.status(204);
    });
});

// LIST
app.get('/students.json', function(req, res) { 
    //console.log(this);
    fs.readdir(`${__dirname}/studentFiles`, function(err, files) {
        if (err) throw err;
        let studentData = [];
        //This is going to be accessing a database at a later time;
        files.forEach(function (file) {
            let data = fs.readFileSync(`${__dirname}/studentFiles/${file}`, 'utf8');
            studentData.push(JSON.parse(data));
        });
        // var fileList = files.map(fileName => fileName.replaces('.json', '')); - sometmes you want to process the variables, like strip the .json file ext off it, here is an example of how
        res.status(200).json(studentData); // res.sendStatus(200) //newline res.json(files); another formatting option
    });
});

exports = module.exports = app;