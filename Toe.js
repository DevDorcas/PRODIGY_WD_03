let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

let playerScore = 0;
let computerScore = 0;
let draws = 0;

let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

let xTurn = true; // Player's turn
let count = 0;

const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    popupRef.classList.remove("hide");
};

const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    popupRef.classList.add("hide");
    xTurn = true; // Player always starts first
};

const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        playerScore++;
        document.getElementById("player-score").innerText = playerScore;
        msgRef.innerHTML = "&#x1F389; <br> 'Player' Wins";
    } else {
        computerScore++;
        document.getElementById("computer-score").innerText = computerScore;
        msgRef.innerHTML = "&#x1F389; <br> 'Computer' Wins";
    }
};

const drawFunction = () => {
    disableButtons();
    draws++;
    document.getElementById("draws-score").innerText = draws;
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

document.getElementById("reset").addEventListener("click", () => {
    btnRef.forEach((btn) => {
        btn.innerText = "";
        btn.disabled = false;
    });
    popupRef.classList.add("hide");

    playerScore = 0;
    computerScore = 0;
    draws = 0;

    document.getElementById("player-score").innerText = playerScore;
    document.getElementById("computer-score").innerText = computerScore;
    document.getElementById("draws-score").innerText = draws;


    count = 0;
    xTurn = true;
});


// Function to check for a winner
const winChecker = () => {
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];

        if (element1 != "" && element2 != "" && element3 != "") {
            if (element1 == element2 && element2 == element3) {
                winFunction(element1);
                return true;
            }
        }
    }
    if (count == 9) {
        drawFunction();
        return true;
    }
    return false;
};

// Computer's move
const computerMove = () => {
    let availableCells = [];
    btnRef.forEach((btn, index) => {
        if (btn.innerText === "") availableCells.push(index);
    });

    if (availableCells.length > 0) {
        let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        btnRef[randomIndex].innerText = "O";
        btnRef[randomIndex].disabled = true;
        count += 1;

        // Check for a win or draw after the computer's move
        if (!winChecker() && count < 9) {
            xTurn = true; // Give the turn back to the player
        }
    }
};

// Event listener for player moves
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            element.innerText = "X";
            element.disabled = true;
            count += 1;
            xTurn = false;

            // Check for a win or draw before the computer's turn
            if (!winChecker() && count < 9) {
                setTimeout(computerMove, 500); // Add a delay for realism
            }
        }
    });
});

window.onload = enableButtons;