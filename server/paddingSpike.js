var x = 1585;
var y = '0000' + x;
var output = y.slice(-4);
// THIS WORKS - var output = y.substr(-4, 4); // postive is from start of string, negative goes from end of string, use negative to go from end of string and go back 4 spaces
console.log (output);

// THIS ALSO WORKS
// wagstaff code
var array = [6, 23, 145, 5421];
var z2 = function(num) {
    var y = '0000' + num;
    return y.slice(-4);
};
console.log(array.map(z2));


// EXAMPLE 3
var foo = 23;
var zeroPads = ['0000', '000', '00', '0', ''];
var index = ('' + foo).length;
console.log(zeroPads[index] + foo);
