// Declare a tuple type
var x;
// Initialize it
x = ["hello", 10]; // OK
console.log(x[0].substring(1));
console.log("ENUM EXAMPLE >> ");
var Color;
(function (Color) {
    Color["Red"] = "red";
    Color["Green"] = "green";
    Color["Blue"] = "blue";
})(Color || (Color = {}));
var c = Color.Green;
console.log(c);
console.log("OBJECT >>> ");
function run() {
    var o = {
        name: "Jay",
        age: 23
    };
    o.tshirt_color = "white";
    console.log(o);
}
run();
