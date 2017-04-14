const Sequelize = require('sequelize');
let nconf = require('nconf');
nconf.argv()
    .env()
    .file({file:'config.json'});

// Connection URL
const uri = nconf.get('mysql-url');
let sequelize = new Sequelize(uri);

let Student = sequelize.define('student', {
    "id": { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    "state": { type: Sequelize.STRING(2) },
    "year": { type: Sequelize.INTEGER },
    "zip": { type: Sequelize.INTEGER },
    "startDate": { type: Sequelize.DATE },
    "fname": { type: Sequelize.STRING },
    "lname": { type: Sequelize.STRING },
    "phone": { type: Sequelize.STRING },
    "city": { type: Sequelize.STRING },
    "street": { type: Sequelize.STRING }
});

exports = module.exports = Student;