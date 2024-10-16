// main.js
import { Field } from './Field.js';
import { PlayerManager } from './PlayerManager.js';
import { Ball } from './Ball.js';

let userAttackDirection; // Public constant for attack direction
let currentTurn = 1; // Initial turn
let playerManager; // Player manager object
let selectedUserRole; // Selected user role

// Declare variables for soccer field setup
let soccerField;
let fieldWidth;
let fieldLength;
let initialUserAttackDirection;
let isGridClickable = false; // Flag to track grid clickability

// Function to handle role selection and start the game
document.getElementById('role-selection-form').addEventListener('submit', function(event) {
    event.preventDefault();
    selectedUserRole = document.getElementById('role').value;
    if (selectedUserRole) {
        document.getElementById('start-screen').classList.add('d-none');
        document.getElementById('game-screen').classList.remove('d-none');
        document.getElementById('attack-direction').classList.remove('d-none'); // Show attack direction
        startGame();
    } else {
        alert('Please select a role.');
    }
});

// Main function to set up the game
function setupGame() {
    fieldWidth = 50; // Vertical space
    fieldLength = 100; // Horizontal space
    const cellSize = 1;

    soccerField = document.getElementById('soccer-field');
    const field = new Field(fieldWidth, fieldLength, cellSize, soccerField);
    field.createField();
    field.createGoal(0, (fieldWidth - 10) / 2, 1, 10); // Corrected goal position
    field.createGoal(fieldLength - 1, (fieldWidth - 10) / 2, 1, 10); // Corrected goal position

    playerManager = new PlayerManager(fieldWidth, fieldLength, selectedUserRole);
    playerManager.initializePlayers();

    field.createGrid((x, y) => {
        if (isGridClickable) {
            playerManager.updateUserPosition(x, y);
            document.getElementById('submit-position').style.display = 'block';
        }
    });

    // Determine the attack direction once at the beginning of the game
    initialUserAttackDirection = Math.random() < 0.5 ? 'zero' : 'length';
}

document.getElementById('submit-position').addEventListener('click', () => {
    playerManager.scorePosition();
    isGridClickable = false; // Disable grid clicks after submitting position
    hideSubmitPosition();
    if (currentTurn === 10) {
        showFinishGame();
    } else {
        showNextTurn();
    }
});

// Function to setup each turn
function setupTurn() {
    // Display the user's attack direction
    userAttackDirection = updateUserAttackDirection() // Update attack direction for user
    displayUserAttackDirection(userAttackDirection); // Display attack direction for user
    playerManager.updateAttackEnd(userAttackDirection); // Update attack end for each player

    // Place the ball randomly on the field
    const ball = new Ball(fieldWidth, fieldLength);
    ball.placeRandomly();
    ball.render(soccerField);
    playerManager.updateBall(ball);

    // Position and render non-user players
    playerManager.placeGoalies();
    playerManager.placeForwards();
    playerManager.placeDefenders();
    playerManager.placeMidfielders();
    playerManager.renderNonUserPlayers(soccerField);

    isGridClickable = true; // Enable grid clicks at the start of each turn
}

// Function to clear the field and setup the next turn
function resetTurnElements() {
    const soccerField = document.getElementById('soccer-field');

    // Remove any existing ball element
    const existingBall = soccerField.querySelector('.ball');
    if (existingBall) {
        existingBall.remove();
    }

    // Remove all player elements
    const allPlayers = soccerField.querySelectorAll('.player');
    allPlayers.forEach(player => player.remove());

    // Reset player positions
    playerManager.resetPlayerPositions();
}

// Main function to start the game
function startGame() {
    setupGame();
    setupTurn();
}

// Function to clean up previous turn
function startNextTurn() {
    resetTurnElements();
    hideTurnUIElements();
    incrementTurn();
    if (currentTurn > 10) {
        document.getElementById('finish-game').style.display = 'block';
    } else {
        setupTurn();
    }
}

// Function to finish the game
function finishGame() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('attack-direction').style.display = 'none';
    document.getElementById('finish-game').style.display = 'none';
    document.getElementById('score').style.display = 'none';
    const totalScore = playerManager.getTotalScore();
    const scoreElement = document.getElementById('final-score');
    scoreElement.innerHTML = `Total score: ${totalScore} of 100!`;
    scoreElement.style.display = 'block';
    document.getElementById('new-game').style.display = 'block';
}

// Function to display the user's attack direction
function displayUserAttackDirection(attackEnd) {
    const attackDirection = document.getElementById('attack-direction');
    if (attackEnd === 'length') {
        attackDirection.innerHTML = 'ATTACK →';
    } else {
        attackDirection.innerHTML = '← ATTACK';
    }
}

// Function to update the user's attack direction based on the current turn
function updateUserAttackDirection() {
    if (currentTurn >= 1 && currentTurn <= 5) {
        return initialUserAttackDirection;
    } else if (currentTurn >= 6 && currentTurn <= 10) {
        return initialUserAttackDirection === 'zero' ? 'length' : 'zero';
    }
}

// Function to hide the turn UI elements
function hideTurnUIElements() {
    document.getElementById('next-turn').style.display = 'none';
    document.getElementById('submit-position').style.display = 'none';
    document.getElementById('score').style.display = 'none';
}

// Function to increment next turn
function incrementTurn() {
    currentTurn++;
}

// Add event listener for the "Next Turn" button
document.getElementById('next-turn').addEventListener('click', startNextTurn);

// Add event listener for the "Finish Game" button
document.getElementById('finish-game').addEventListener('click', finishGame);

// Add event listener for the "New Game" button
document.getElementById('new-game').addEventListener('click', () => {
    location.reload();
});

// Hide Submit Position Button
function hideSubmitPosition() {
    const submitPositionButton = document.getElementById('submit-position');
    if (submitPositionButton) {
        submitPositionButton.style.display = 'none';
    } else {
        console.error('Submit position button not found.');
    }
}

// Show Next Turn Button
function showNextTurn() {
    const nextTurnButton = document.getElementById('next-turn');
    if (nextTurnButton) {
        nextTurnButton.style.display = 'block';
    } else {
        console.error('Next turn button not found.');
    }
}

// Show Finish Game Button
function showFinishGame() {
    const finishGameButton = document.getElementById('finish-game');
    if (finishGameButton) {
        finishGameButton.style.display = 'block';
    } else {
        console.error('Finish game button not found.');
    }
}