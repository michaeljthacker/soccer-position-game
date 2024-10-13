// main.js
document.getElementById('role-selection-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedRole = document.getElementById('role').value;
    if (selectedRole) {
        console.log('Selected Role:', selectedRole);
        // Store the selected role or proceed with the next steps
        // For example, hide the start screen and show the game screen
        document.getElementById('start-screen').classList.add('d-none');
        document.getElementById('game-screen').classList.remove('d-none');
    } else {
        alert('Please select a role.');
    }
});