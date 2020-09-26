var name = "Jay";
var name2 = new String("Piyush"); // Defining strings as objects

console.log(name, name2);

// Primitive behavior

var s1 = '2 + 2';
var s2 = new String('2 + 2');

console.log(eval(s1));
console.log(s2.valueOf());
console.log(eval(s2.valueOf()));

// Comparison behavior
var a = 'd';
var b = 'd';

if(a < b) {
    console.log("a is less than b!");
} else if (a > b) {
    console.log("a is greater than b!");
} else {
    console.log("a and b are equal!");
}