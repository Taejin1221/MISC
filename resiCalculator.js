const colors = [
  { color: "black", textColor: "white" },
  { color: "brown", textColor: "white" },
  { color: "red", textColor: "white" },
  { color: "orange", textColor: "white" },
  { color: "yellow", textColor: "black" },
  { color: "green", textColor: "white" },
  { color: "blue", textColor: "white" },
  { color: "purple", textColor: "white" },
  { color: "gray", textColor: "white" },
  { color: "white", textColor: "black" },
  { color: "gold", textColor: "black" },
  { color: "silver", textColor: "black" },
];

let resistorColors = [undefined, undefined, undefined, undefined];
const calculateTable = {
  number: {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    purple: 7,
    gray: 8,
    white: 9,
    gold: -1,
    silver: -2,
  },
  error: {
    brown: 1,
    red: 2,
    green: 0.5,
    blue: 0.25,
    purple: 0.1,
    gray: 0.05,
    gold: 5,
    silver: 10,
  },
};

const buttonContainers = document.querySelectorAll(".buttonContainer"),
  calculateBtn = document.querySelector("#calculate"),
  tableColorList = [
    document.querySelector("#firstTableColor"),
    document.querySelector("#secondTableColor"),
    document.querySelector("#thirdTableColor"),
    document.querySelector("#fourthTableColor"),
  ],
  tableTextList = [
    document.querySelector("#firstTableText"),
    document.querySelector("#secondTableText"),
    document.querySelector("#thirdTableText"),
    document.querySelector("#fourthTableText"),
  ],
  display = document.querySelector("#display");

const run = () => {
  for (const bc of buttonContainers) {
    for (const { color, textColor } of colors) {
      if (color === "gold" || color === "silver") {
        if (bc.id === "firstColor" || bc.id === "secondColor") {
          continue;
        }
      }

      if (bc.id === "thirdColor") {
        if (color === "white" || color === "gray") {
          continue;
        }
      }

      if (bc.id === "fourthColor") {
        if (
          color === "black" ||
          color === "orange" ||
          color === "yellow" ||
          color === "white"
        ) {
          continue;
        }
      }

      const btn = document.createElement("button");
      btn.style.backgroundColor = color;
      btn.style.color = textColor;
      btn.innerText = color;
      btn.addEventListener("click", () => {
        if (bc.id === "firstColor") {
          resistorColors[0] = color;
        } else if (bc.id === "secondColor") {
          resistorColors[1] = color;
        } else if (bc.id === "thirdColor") {
          resistorColors[2] = color;
        } else if (bc.id === "fourthColor") {
          resistorColors[3] = color;
        }

        for (let i = 0; i < 4; i++) {
          tableColorList[i].style.backgroundColor =
            resistorColors[i] === undefined ? "black" : resistorColors[i];
          tableTextList[i].innerText =
            resistorColors[i] === undefined ? "black" : resistorColors[i];
        }
      });

      bc.appendChild(btn);
    }
  }

  calculateBtn.addEventListener("click", () => {
    const [first, second, third, fourth] = resistorColors;
    console.log(first, second, third, fourth);

    if (
      first === undefined ||
      second === undefined ||
      third === undefined ||
      fourth === undefined
    ) {
      alert("Choose 4 colors");
      return;
    }

    let result =
      (calculateTable.number[first] * 10 + calculateTable.number[second]) *
      Math.pow(10, calculateTable.number[third]);

    display.innerText =
      result >= 1000
        ? `${result / 1000}KΩ ± ${calculateTable.error[fourth]}%`
        : `${result}Ω ± ${calculateTable.error[fourth]}%`;
  });
};

run();
