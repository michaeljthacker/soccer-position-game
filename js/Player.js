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
    }
    
    // Each subclass will define its own positioning and movement logic

    // Method to get the attacking goal position (Y coordinate) based on the attack end
    getAttackingGoalY() {
        return this.attackEnd === 'length' ? this.fieldLength : 0;
    }

    // Method to get the defending goal position (Y coordinate)
    getDefendingGoalY() {
        return this.attackEnd === 'length' ? 0 : this.fieldLength;
    }

    // Method to adjust position based on proximity to other players
    adjustPositionForSpacing(currentX, currentY, otherPlayers, minDistance) {
        otherPlayers.forEach(player => {
            const distance = getDistance(currentX, currentY, player.x, player.y);
            if (distance < minDistance) {
                // Move away from other player based on current X and Y
                const angle = Math.atan2(player.y - currentY, player.x - currentX);
                currentX -= minDistance * Math.cos(angle);
                currentY -= minDistance * Math.sin(angle);
            }
        });
        return { x: currentX, y: currentY };
    }
}