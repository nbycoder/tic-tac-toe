const boxes = Array.from(document.getElementsByClassName("box"));
const restartBtn = document.getElementById("restart")
const playText = document.getElementById('play')

const spaces =  [];
const P1_TEXT = "0";
const P2_TEXT = "X";
let currentPlayer;

const drawBoard = () => {
    boxes.forEach((box, index) => {
        let styleString = "";
        if (index < 3) { //? box is on the top
            styleString += `border-bottom: 3px solid var(--primary);`;
        }
        if (index % 3 === 0) { //? box is on the left
            styleString += `border-right: 3px solid var(--primary);`;
        }
        if (index % 3 === 2) { //? box is on the right
            styleString += `border-left: 3px solid var(--primary);`;
        }
        if (index > 5) { //? box is on the top
            styleString += `border-top: 3px solid var(--primary);`;
        }
        box.style = styleString;
        box.addEventListener("click", boxClicked)
    })
}

const boxClicked = (e) => {
    const id = e.target.id;
    console.log(id);
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon()) {
            playText.innerText = `${currentPlayer} has won!`
            return;
        }
        currentPlayer = currentPlayer === P1_TEXT ? P2_TEXT : P1_TEXT;
    }
}

//! determine which player won
const playerHasWon = () => {
    if (spaces[0] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
            console.log(`${currentPlayer} wins up top`)
            return true;
        }
        if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
            console.log(`${currentPlayer} wins on the left`)
            return true;
        }
        if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
            console.log(`${currentPlayer} wins diagonally`)
            return true;
        }
    }
    if (spaces[8] === currentPlayer) {
        if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
            console.log(`${currentPlayer} wins up the right`)
            return true;
        }
        if (spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
            console.log(`${currentPlayer} wins on the bottom`)
            return true;
        }
    }
    if (spaces[4] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
            console.log(`${currentPlayer} wins vertically in the middle`)
            return true;
        }
        if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
            console.log(`${currentPlayer} wins horizontally in the middle`)
            return true;
        }
        if (spaces[2] === currentPlayer && spaces[6] === currentPlayer) {
            console.log(`${currentPlayer} wins diagonally`)
            return true;
        }
    }
}

const restart = () => {
    //! clear each space
    spaces.forEach((space, index) => {
        spaces[index] = null
    })
    
    //! clear each box (text)
    boxes.forEach((box => {
        box.innerText = "";
    }))
    
    //! reset play text & update current player
    playText.innerText = "Let's play!"
    currentPlayer = P1_TEXT;
}

restartBtn.addEventListener('click', restart)
restart();
drawBoard();

