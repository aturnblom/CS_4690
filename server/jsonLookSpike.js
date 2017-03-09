var o = {
    "engine": "v8",
    color: "red",
    wheels: 4,
    tires: "bald",
    doors: "welded"
} // for true json, the keys should be in quotes as well

//console.log(o[engine]);
console.log(o['engine']);
console.log(o.engine);
//console.log(o.'engine']);

var str = JSON.stringify(o); // gets rid of json formatting
var str2 = JSON.stringify(o, null, 1);
console.log(str2);