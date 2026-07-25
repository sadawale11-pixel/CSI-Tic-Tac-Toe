let boxes = document.querySelectorAll(".box");
let msg = document.querySelector("#msg");
let msgcontainer = document.querySelector(".msgcontainer");
let newBtn = document.querySelector("#new-btn");

let turnX = true;
let count = 0;

const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
];


// Handle box clicks
boxes.forEach((box) => {

    box.addEventListener("click", () => {

        if (turnX) {
            box.innerText = "X";
            turnX = false;
        } else {
            box.innerText = "O";
            turnX = true;
        }

        box.disabled = true;

        count++;

        let isWinner = checkWinner();

        // Check for draw
        if (count === 9 && !isWinner) {
            showDraw();
        }

    });

});


// Check winner
const checkWinner = () => {

    for (let pattern of winPattern) {

        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (
            pos1 !== "" &&
            pos1 === pos2 &&
            pos2 === pos3
        ) {

            showWinner(pos1);

            return true;
        }

    }

    return false;
};


// Show winner
const showWinner = (winner) => {

    msg.innerText = `${winner} Won!`;

    msgcontainer.classList.remove("hide");

    disableBoxes();
};


// Show draw
const showDraw = () => {

    msg.innerText = "It's a Draw!";

    msgcontainer.classList.remove("hide");

    disableBoxes();
};


// Disable all boxes
const disableBoxes = () => {

    boxes.forEach((box) => {
        box.disabled = true;
    });

};


// Enable all boxes
const enableBoxes = () => {

    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });

};


// New game
const resetGame = () => {

    turnX = true;

    count = 0;

    enableBoxes();

    msgcontainer.classList.add("hide");
};


// New Game button
newBtn.addEventListener("click", resetGame);