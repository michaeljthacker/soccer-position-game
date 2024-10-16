// Defender.js
import { Player } from './Player.js';
import { getDistance } from './utilities.js';  // Import the utility function

export class Defender extends Player {
    constructor(isUser, isOnUserTeam, fieldWidth, fieldLength, attackEnd, side) {
        super(isUser, isOnUserTeam, 'Defender', fieldWidth, fieldLength, attackEnd);
        this.side = side;  // 'left' or 'right' to denote the side of the field they defend
    }

    // Override getUniqueId to include the forward position
    getUniqueId() {
        return `player-${this.role}-${this.side}-${this.isOnUserTeam ? 'user' : 'opponent'}`;
    }

    // Method to calculate the ideal position for the defender
    calculateIdealPosition(ballX, ballY, players) {
        // Get attacking and defending goal positions from the Player class methods
        const defendingGoalX = 100 * this.getDefendingGoalX() / this.fieldLength;
        const defendingGoalY = 50;  // The Y-coordinate of the defending goal

        // Step 1: Calculate the defender's X position - closer to the defending goal than the ball
        let tempX;
        if ((defendingGoalX > 50 && ballX > 50) || (defendingGoalX < 50 && ballX < 50)) {
            // If the ball and defending goal are on the same side of the field
            tempX = 0.9 * ballX + 0.1 * defendingGoalX;
        } else {
            // If the ball and defending goal are on opposite sides of the field
            tempX = 0.6 * defendingGoalX + 0.4 * ballX;
        }

        // Step 2: Calculate the defender's X position - restricted to their side (left or right)
        let relativeY;
        if (this.side === 'left') {
            relativeY = 20;  // Left side of the field
        } else if (this.side === 'right') {
            relativeY = 80;  // Right side of the field
        }
        
        // Flip field if opposite attackEnd
        if (this.attackEnd === 'zero') {
            relativeY = 100 - relativeY;
        }

        // Ensure the defender can move toward the ball but stay within their side
        const maxDrift = 0.4;
        let tempY = relativeY * (1 - maxDrift) + ballY * maxDrift;

        // Step 3: Ensure the defender is closer to the defending goal than the nearest opponent is to the goal
        const opponents = players.filter(player => player.isOnUserTeam === false)
        opponents.forEach(opponent => {
            // Calculate distances to the defending goal (use getDistance)
            const defenderDistanceToGoalLine = getDistance(tempX, tempY, defendingGoalX, defendingGoalY);
            const opponentDistanceToGoalLine = getDistance(opponent.x, opponent.y, defendingGoalX, defendingGoalY);
            
            // If the opponent is closer to the goal, move the defender closer than the opponent
            if (opponentDistanceToGoalLine < defenderDistanceToGoalLine) {
                const angle = Math.atan2(defendingGoalX - tempY, defendingGoalY - tempX);
                tempX -= 0.2 * getDistance(tempX, tempY, defendingGoalX, defendingGoalY) * Math.cos(angle);  // Move 20% closer to the goal
                tempY -= 0.2 * getDistance(tempX, tempY, defendingGoalX, defendingGoalY) * Math.sin(angle);  // Adjust both X and Y towards the goal
            }
        });

        // Step 4: Adjust for spacing relative to teammates only (ignoring opponents)
        const teammates = players.filter(player => player.isOnUserTeam === false)
        const idealPosition = this.adjustPositionForSpacing(tempX, tempY, teammates, 5);  // Only teammates

        return { x: idealPosition.x, y: idealPosition.y };
    }
}
