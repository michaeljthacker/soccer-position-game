// Import the getDistance function from utilities.js
import { getDistance } from './utilities.js';

// Player.js
export class Player {
    constructor(isUser, isOnUserTeam, role, fieldWidth, fieldLength, attackEnd) {
        this.isUser = isUser;  // Boolean: Is this player the user?
        this.isOnUserTeam = isOnUserTeam;  // Boolean: Is this player on the user's team?
        this.role = role;  // Role: Goalkeeper, Defender, etc.
        this.fieldWidth = fieldWidth;  // Width of the field (stored as a property)
        this.fieldLength = fieldLength;  // Length of the field (stored as a property)
        this.attackEnd = attackEnd;  // "zero" or "length" based on attacking direction
        this.x = null; // position coordinate x (field width)
        this.y = null; // position coordinate y (field length)
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    // Method to render the player on the field
    render(svgElement) {
        // Create a unique identifier for the player
        const playerId = this.getUniqueId();

        // Remove any existing player element
        const existingPlayer = svgElement.querySelector(`#${playerId}`);
        if (existingPlayer) {
            existingPlayer.remove();
        }

        // Create a new player element
        const playerElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        playerElement.setAttribute('id', playerId);
        playerElement.setAttribute('class', `player player-${this.role}`);
        playerElement.setAttribute('cx', `${this.x}%`); // Use percentage for x position
        playerElement.setAttribute('cy', `${this.y}%`); // Use percentage for y position
        playerElement.setAttribute('r', '1%'); // Use percentage for radius
        playerElement.setAttribute('fill', this.isOnUserTeam ? '#63beff' : '#FFD700'); // Color based on team

        // Append the player element to the SVG
        svgElement.appendChild(playerElement);
    }

    // Method to get the attacking goal position (X coordinate) based on the attack end
    getAttackingGoalX() {
        return this.attackEnd === 'length' ? this.fieldLength : 0;
    }

    // Method to get the defending goal position (X coordinate)
    getDefendingGoalX() {
        return this.attackEnd === 'length' ? 0 : this.fieldLength;
    }

    // Method to adjust position based on proximity to other players
    adjustPositionForSpacing(currentX, currentY, otherPlayers, minDistance) {
        otherPlayers.forEach(player => {
            const distance = getDistance(currentX, currentY, player.x, player.y);
            if (distance < minDistance) {
                // Move away from other player based on current X and Y
                const angle = Math.atan2(player.y - currentY, player.x - currentX);
                currentX -= (distance - minDistance) * Math.cos(angle);
                currentY -= (distance - minDistance) * Math.sin(angle);
            }
        });
        return { x: currentX, y: currentY };
    }

    // Placeholder method to calculate the ideal position for the player (overwritten by subclasses)
    calculateIdealPosition(ballX, ballY, goalX, goalY) {
        // This should be overridden by subclasses
        return { x: 50, y: 50 };
    }

    // Method to get a unique identifier for the player
    getUniqueId() {
        return `player-${this.role}-${this.isOnUserTeam ? 'user' : 'opponent'}`;
    }
}