const options = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;
let roundCount = 0;

const buttons = document.querySelectorAll("button");
const resultDiv = document.getElementById("result");
const roundCountDiv = document.getElementById("round-count");
const scoreDiv = document.getElementById("score");
const winSound = new Audio("src/audio/win-sound.mp3");
const loseSound = new Audio("src/audio/lose-sound.mp3");

winSound.volume = 0.1;
loseSound.volume = 0.05;

buttons.forEach((button) => {
    button.addEventListener("click", playRound);
});

function computerPlay() {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

function playRound(e) {
    const playerSelection = e.target.id;
    const computerSelection = computerPlay();

    const result = getResult(playerSelection, computerSelection);

    buttons.forEach(button => {
        button.classList.remove("win", "lose");
    });

    if (result === "won") {
        roundCount++;
        playerScore++;
        e.target.classList.add("win");
        winSound.play();
    } else if (result === "lost") {
        roundCount++;
        computerScore++;
        e.target.classList.add("lose");
        loseSound.play();
    } else {
        roundCount++;
    }

    updateScore();

    roundCountDiv.textContent = `Round: ${roundCount}`;

    displayResult(playerSelection, computerSelection, result);
    checkGameEnd();
}

function getResult(player, computer) {
    if (player === computer) {
        return "draw";
    } else if (
        (player === "rock" && computer === "scissors") ||
        (player === "scissors" && computer === "paper") ||
        (player === "paper" && computer === "rock")
    ) {
        return "won";
    } else {
        return "lost";
    }
}

function displayResult(player, computer, result) {
    let playerChoice = player;
    let computerChoice = computer;

    if (player === "paper") {
        playerChoice = "a paper";
    }

    let message = `You chose ${playerChoice}, and the computer chose ${computerChoice}. It's a draw!`;
    if (result === "won") {
        message = `You chose ${playerChoice}, and the computer chose ${computerChoice}. You won!`;
    } else if (result === "lost") {
        message = `You chose ${playerChoice}, and the computer chose ${computerChoice}. You lost!`;
    }
    resultDiv.textContent = message;
}

function checkGameEnd() {
    if (playerScore === 5 || computerScore === 5) {
        endGame();
    }
}

function endGame() {
    const finalResult = playerScore > computerScore ? "Victory!" : "Defeat!";
    resultDiv.textContent = `Game over. ${finalResult} Score: Player ${playerScore}, Computer ${computerScore}.`;
    roundCount = 0;
    saveResult(playerScore);
    resetGame();
}

function saveResult() {
    const gameResults = JSON.parse(localStorage.getItem("gameResults")) || [];

    const gameResult = {
        playerScore: playerScore,
        computerScore: computerScore,
    };

    gameResults.push(gameResult);

    if (gameResults.length > 10) {
        gameResults.pop();
    }

    localStorage.setItem("gameResults", JSON.stringify(gameResults));
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
}

function updateScore() {
    scoreDiv.textContent = `You: ${playerScore}, Computer: ${computerScore}`;
}