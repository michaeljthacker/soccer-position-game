// main.js
import { Field } from './Field.js';
import { PlayerManager } from './PlayerManager.js';
import { Ball } from './Ball.js';

let userAttackDirection; // Public constant for attack direction
let currentTurn = 1; // Initial turn
let playerManager; // Player manager object

// Function to handle role selection and start the game
document.getElementById('role-selection-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedRole = document.getElementById('role').value;
    if (selectedRole) {
        document.getElementById('start-screen').classList.add('d-none');
        document.getElementById('game-screen').classList.remove('d-none');
        document.getElementById('attack-direction').classList.remove('d-none'); // Show attack direction
        startGame(selectedRole);
    } else {
        alert('Please select a role.');
    }
});

// Main function to set up the game
function setupGame(userRole) {
    const fieldWidth = 50; // Vertical space
    const fieldLength = 100; // Horizontal space
    const cellSize = 1;

    const soccerField = document.getElementById('soccer-field');
    const field = new Field(fieldWidth, fieldLength, cellSize, soccerField);
    field.createField();
    field.createGoal(0, (fieldWidth - 10) / 2, 1, 10); // Corrected goal position
    field.createGoal(fieldLength - 1, (fieldWidth - 10) / 2, 1, 10); // Corrected goal position

    playerManager = new PlayerManager(fieldWidth, fieldLength, userRole);
    playerManager.initializePlayers();

    field.createGrid((x, y) => {
        playerManager.updateUserPosition(x, y);
        document.getElementById('submit-position').style.display = 'block';
    });

    // Determine the attack direction once at the beginning of the game
    const initialUserAttackDirection = Math.random() < 0.5 ? 'zero' : 'length';

    return { soccerField, fieldWidth, fieldLength, initialUserAttackDirection };
}

document.getElementById('submit-position').addEventListener('click', () => {
    playerManager.scorePosition();
});

// Function to setup each turn
function setupTurn(soccerField, fieldWidth, fieldLength, initialUserAttackDirection) {
    // Display the user's attack direction
    userAttackDirection = updateUserAttackDirection(initialUserAttackDirection, currentTurn) // Update attack direction for user
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
}

// Main function to start the game
function startGame(userRole) {
    const { soccerField, fieldWidth, fieldLength, initialUserAttackDirection } = setupGame(userRole);
    setupTurn(soccerField, fieldWidth, fieldLength, initialUserAttackDirection);
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
function updateUserAttackDirection(initialUserAttackDirection, currentTurn) {
    if (currentTurn >= 1 && currentTurn <= 5) {
        return initialUserAttackDirection;
    } else if (currentTurn >= 6 && currentTurn <= 10) {
        return initialUserAttackDirection === 'zero' ? 'length' : 'zero';
    }
}
