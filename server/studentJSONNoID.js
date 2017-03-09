//console.log('hello world');

console.log(process.argv); //printing out all of the command line arguments that you pass to your program when you call it. or passing to node

var fs = require('fs');

var students = JSON.parse(fs.readFileSync('studentsWithID.json', 'utf8'));

for (var i=0; i < students.length; i++) {   
    var x = students[i].id;
    delete students[i].id;
    fs.writeFileSync(`${__dirname}/studentFiles/${x}.json`, JSON.stringify(students[i], null, 2), 'utf8');
}


console.log('done');