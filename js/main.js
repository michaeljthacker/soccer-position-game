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
    const fieldWidth = 50; // Vertical space
    const fieldLength = 100; // Horizontal space
    const cellSize = 1;

    const soccerField = document.getElementById('soccer-field');
    const field = new Field(fieldWidth, fieldLength, cellSize, soccerField);
    field.createField();
    field.createGoal(0, (fieldWidth - 10) / 2, 1, 10); // Corrected goal position
    field.createGoal(fieldLength - 1, (fieldWidth - 10) / 2, 1, 10); // Corrected goal position
    field.createGrid((x, y) => console.log(`Cell clicked at (${x}, ${y})`));

    const playerManager = new PlayerManager(fieldWidth, fieldLength, userRole);
    playerManager.initializePlayers();
    playerManager.renderPlayers(soccerField);
}