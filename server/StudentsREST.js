let express = require('express');
let fs = require('fs');
let bodyParser = require('body-parser');
let Client = require('./studentsMongoDao');
let mongodb = new Client();
var winston = require('winston');
require('colors').enabled = true;

//create express app
let app = express.Router();

// REST API calls go here/ REST end points
// CREATE
app.post('/students.json', function(req, res){
    var data = req.body;
    mongodb.connect(function(db) {
        mongodb.create(db, data, function() {
            db.close();
            res.status(200).send('OK');
        });
    });
});//end of app.post
    
// READ
app.get('/students/:id.json', function(req, res) { // ?name=foo /query string, :id is a variable that you can get us ing the below
    let id = parseInt(req.params.id);
    mongodb.connect(function(db) {
        mongodb.read(db, id, function(student) {
            db.close();
            res.status(200).json(student);
        });
    });
});

// UPDATE
app.put('/students/:id.json', function(req, res){
    let id = parseInt(req.params.id);
    let data = req.body;
    mongodb.connect(function(db) {
        mongodb.update(db, id, data, function() {
            db.close();
            res.status(204).send('OK');
        });
    });
});

// DELETE
app.delete('/students/:id.json', function (req, res) {
    let id = parseInt(req.params.id);
    mongodb.connect(function(db) {
        mongodb.delete(db, id, function() {
            db.close();
            res.status(204).send('OK');
        });
    });
});

// LIST
app.get('/students.json', function(req, res) {
    mongodb.connect(function(db) {
        mongodb.list(db, function(students) {
            db.close();
            res.status(200).json(students);
        });
    });
});

app.get('*', function(req, res) {
    res.status(404).sendFile(WEB + '/404.html');
});

exports = module.exports = app;