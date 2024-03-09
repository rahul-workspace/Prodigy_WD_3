const boxes = document.querySelectorAll(".box");
const restartBtn = document.querySelector(".restartBtn");
const title = document.querySelector(".title");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function result() {
    if (checkWin()) {
        gameActive = false;
        if (currentPlayer === "X") {
            title.textContent = `You Win!`;
        } else {
            title.textContent = `Computer Wins!`;
        }
        return;
    }

    if (checkDraw()) {
        gameActive = false;
        title.textContent = "It's a draw!";
        return;
    }
}
const handleBoxClick = (index) => {
    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    boxes[index].textContent = currentPlayer;

    result();

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (currentPlayer === "O") {
        setTimeout(makeComputerMove, 300);
    }
};

const makeComputerMove = () => {
    let emptyCells = gameState.reduce((acc, cell, index) => {
        if (cell === "") acc.push(index);
        return acc;
    }, []);

    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let computerMove = emptyCells[randomIndex];

    gameState[computerMove] = currentPlayer;
    boxes[computerMove].textContent = currentPlayer;

    result();

    currentPlayer = currentPlayer === "X" ? "O" : "X";
};

const checkWin = () => {
    return winningConditions.some((condition) => {
        return condition.every((index) => {
            return gameState[index] === currentPlayer;
        });
    });
};

const checkDraw = () => {
    return gameState.every((cell) => {
        return cell !== "";
    });
};

const restartGame = () => {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box) => (box.textContent = ""));
    title.textContent = "Tic Tac Toe";
};

restartBtn.addEventListener("click", restartGame);

boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleBoxClick(index));
});