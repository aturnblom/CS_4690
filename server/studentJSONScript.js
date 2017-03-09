//console.log('hello world');

console.log(process.argv); //printing out all of the command line arguments that you pass to your program when you call it. or passing to node

var fs = require('fs');


//var fileName = 'students.json';

var students = JSON.parse(fs.readFileSync('students.json', 'utf8'));

//fs.writeFileSync(fileName, contents, 'utf8');

//var bravo = fs.readFileSync(fileName, 'utf8');

// var students = JSON.parse(fs.readFileSync (students.json', 'utf8'));
// students[0].id = '0001';

for (var i=0; i < students.length; i++) {   // zero padding stuff goes here
    students[i].id = ('0000' + (i + 1)).substr(-4, 4);
}

fs.writeFileSync(__dirname + '/studentsWithID.json', JSON.stringify(students, null, 2), 'utf8');

for (var i = 0; i < students.length; i++) {
    fs.writeFileSync(__dirname + '/studentFiles/' + students[i].id + '.json', JSON.stringify(students[i], null, 2), 'utf8');
}
// fs.writeFileSync(__dirname + '/studentFiles/test.txt', JSON.stringify(students, null, 2), 'utf8');

//fs.writeFileSync(__dirname + '/studentFiles/' + students[0].id + '.json', JSON.stringify(students[0], null, 2), 'utf8');


console.log('done');