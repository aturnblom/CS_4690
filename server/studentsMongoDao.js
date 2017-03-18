let mongo = require('mongodb').MongoClient;

// Connection URL
const URL = `mongodb://${process.env.IP}:27017/studentList`;

// Use connect method to connect to the Server

var Client = function() {};

Client.prototype.connect = function() {
    return mongo.connect(URL);
};

Client.prototype.create = function create(db, student) {
    return db.collection('students').insertOne(student);
};

Client.prototype.read = function (db, id) {
    db.collection('students').findOne({'id': id}, function(err, res) {
        if (err) throw err;
    });
};

Client.prototype.update = function (db, id, student) {
    db.collection('students').updateOne({'id': id}, student, function(err, res) {
        if(err) throw err;
    });
};

Client.prototype.delete = function (db, id) {
    return db.collection('students').deleteOne({'id': id} , function(err, res) {
        if(err) throw err;
    });
};

Client.prototype.list = function (db) {
    return db.collection('students').find().toArray();
};

Client.prototype.getNextSequence = function(db) {
    return db.collection('counters').findAndModify({ _id: 'id' }, {}, { $inc: { seq: 1 } }, {new:true});
}

exports = module.exports = Client;