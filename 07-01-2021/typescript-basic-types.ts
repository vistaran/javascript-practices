// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK

console.log(x[0].substring(1));

console.log("ENUM EXAMPLE >> ");

enum Color {
    Red = "red",
    Green = "green",
    Blue = "blue",
}

let c: Color = Color.Green;

console.log(c);

console.log("OBJECT >>> ");

interface User {
    name: string,
    age: number,
    tshirt_color?: string
}

function runn(): User {

    let o: User = {
        name: "Jay",
        age: 23
    };
    
    o.tshirt_color = "white";

    return o;
}

runn();
