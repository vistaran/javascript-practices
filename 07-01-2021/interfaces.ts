console.log("Interfaces Example >>> ")

interface LabeledValue {
    label: string;
  }

function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
}
  
let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

console.log("Interface Example 2 >> ");

interface SquareConfig {
    color?: string;
    width?: number;
  }
  
  function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: "white", area: 100 };
    if (config.color) {
      newSquare.color = config.color;
    }
    if (config.width) {
      newSquare.area = config.width * config.width;
    }
    return newSquare;
  }

  let mySquare = createSquare({ color: "black" });

  console.log(mySquare);
  