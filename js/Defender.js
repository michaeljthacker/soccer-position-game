// Defender.js
import { Player } from './Player.js';
import { getDistance } from './utilities.js';  // Import the utility function

export class Defender extends Player {
    constructor(isUser, isOnUserTeam, fieldWidth, fieldLength, attackEnd, side) {
        super(isUser, isOnUserTeam, 'Defender', fieldWidth, fieldLength, attackEnd);
        this.side = side;  // 'left' or 'right' to denote the side of the field they defend
    }

    // Method to calculate the ideal position for the defender
    calculateIdealPosition(ballX, ballY, teammates, opponents) {
        // Get attacking and defending goal positions from the Player class methods
        const defendingGoalX = this.getDefendingGoalX();
        const defendingGoalY = 25;  // The X-coordinate of the defending goal (assumed to be 0 for simplicity)

        // Step 1: Calculate the defender's Y position - closer to the defending goal than the ball
        let tempY = 0.6 * defendingGoalX + 0.4 * ballY;

        // Step 2: Calculate the defender's X position - restricted to their side (left or right)
        let relativeX;
        if (this.side === 'left') {
            relativeX = 0.25;  // Left side of the field
        } else if (this.side === 'right') {
            relativeX = 0.75;  // Right side of the field
        }

        // Ensure the defender can move toward the ball but stay within their side
        const maxDrift = 0.4;
        let tempX = this.fieldWidth * (relativeX * (1 - maxDrift) + (ballX / this.fieldWidth) * maxDrift);

        // Step 3: Ensure the defender is closer to the defending goal than the nearest opponent is to the goal
        opponents.forEach(opponent => {
            // Calculate distances to the defending goal (use getDistance)
            const defenderDistanceToGoalLine = getDistance(tempX, tempY, defendingGoalY, defendingGoalX);
            const opponentDistanceToGoalLine = getDistance(opponent.x, opponent.y, defendingGoalY, defendingGoalX);
            
            // If the opponent is closer to the goal, move the defender closer than the opponent
            if (opponentDistanceToGoalLine < defenderDistanceToGoalLine) {
                const angle = Math.atan2(defendingGoalX - tempY, defendingGoalY - tempX);
                tempX -= 0.2 * getDistance(tempX, tempY, defendingGoalY, defendingGoalX) * Math.cos(angle);  // Move 20% closer to the goal
                tempY -= 0.2 * getDistance(tempX, tempY, defendingGoalY, defendingGoalX) * Math.sin(angle);  // Adjust both X and Y towards the goal
            }
        });

        // Step 4: Adjust for spacing relative to teammates only (ignoring opponents)
        const idealPosition = this.adjustPositionForSpacing(tempX, tempY, teammates, 5);  // Only teammates

        return { x: idealPosition.x, y: idealPosition.y };
    }
}
