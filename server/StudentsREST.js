let express = require('express');
let fs = require('fs');
let bodyParser = require('body-parser');
let Client = require('./studentsMongoDao');
let mongodb = new Client();
//create express app
let app = express.Router();

// REST API calls go here/ REST end points
// CREATE
app.post('/students.json', function(req, res){
    var data = req.body;
    mongodb.connect().then(function(db) {
        mongodb.getNextSequence(db, 'id').then(function(ret) {
            data.id = ret.value.seq;
            mongodb.create(db, data).then(function() {
                db.close();
                res.status(200).send('OK');
            });
        });
    });
});//end of app.post
    
// READ
app.get('/students/:id.json', function(req, res) { // ?name=foo /query string, :id is a variable that you can get us ing the below
    let id = req.params.id;
    mongodb.connect().then(function() {
        mongodb.read(db, id).then(function(student) {
            db.close();
            res.status(200).json(student);
        });
    });
});

// UPDATE
app.put('/students/:id.json', function(req, res){
    var id = req.params.id;
    var data = req.body;
    data.zip = data.zip * 1;
    data.year = data.year * 1;
    data = JSON.stringify(req.body, null, 2);
    mongodb.connect().then(function(db) {
        mongodb.update(db, id, data);
        db.close();
        res.status(204).send('OK');
    });
});

// DELETE
app.delete('/students/:id.json', function (req, res) {
    let id = req.params.id;
    mongodb.connect().then(function(db) {
        mongodb.delete(db, id);
        db.close();
        res.status(204).send('OK');
    });
});

// LIST
app.get('/students.json', function(req, res) {
    mongodb.connect().then(function(db) {
        mongodb.list(db).then(function(students) {
            db.close();
            res.status(200).json(students);
        });
    });
});

app.get('*', function(req, res) {
    res.status(404).sendFile(WEB + '/404.html');
});

exports = module.exports = app;