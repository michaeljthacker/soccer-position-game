// main.js
import { Field } from './Field.js';
import { PlayerManager } from './PlayerManager.js';

// Function to handle role selection and start the game
document.getElementById('role-selection-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedRole = document.getElementById('role').value;
    if (selectedRole) {
        document.getElementById('start-screen').classList.add('d-none');
        document.getElementById('game-screen').classList.remove('d-none');
        setupGame(selectedRole);
    } else {
        alert('Please select a role.');
    }
});

// Main function to set up the game
function setupGame(userRole) {
    const fieldWidth = 50;
    const fieldHeight = 100;
    const cellSize = 1;

    const soccerField = document.getElementById('soccer-field');
    const field = new Field(fieldWidth, fieldHeight, cellSize, soccerField);
    field.createField();
    field.createGoal((fieldWidth - 10) / 2, 0, 10, 1);
    field.createGoal((fieldWidth - 10) / 2, fieldHeight - 1, 10, 1);
    field.createGrid((x, y) => console.log(`Cell clicked at (${x}, ${y})`));

    const playerManager = new PlayerManager(fieldWidth, fieldHeight, userRole);
    playerManager.initializePlayers();
    playerManager.renderPlayers(soccerField);
}