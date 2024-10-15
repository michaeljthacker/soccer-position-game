// Midfielder.js
import { Player } from './Player.js';
import { getDistance } from './utilities.js';  // Import the utility function

export class Midfielder extends Player {
    constructor(isUser, isOnUserTeam, fieldWidth, fieldLength, attackEnd) {
        super(isUser, isOnUserTeam, 'Midfielder', fieldWidth, fieldLength, attackEnd);
    }

    // Method to calculate the ideal position for the midfielder
    calculateIdealPosition(ballX, ballY, teammates, opponents) {
        // Get attacking and defending goal positions from the Player class methods
        const attackingGoalX = this.getAttackingGoalX();
        const defendingGoalX = this.getDefendingGoalX();
        const goalX = 25;  // The x-coordinate for both goals (center of the field width-wise)

        // Step 1: Calculate the defender's Y closest to the defending goal
        const defenderY = Math.min(...teammates
            .filter(player => player.role === 'Defender')
            .map(player => getDistance(player.x, player.y, goalX, defendingGoalX)));  // Find closest defender to defending goal

        // Step 2: Calculate the forward's Y closest to the attacking goal
        const forwardY = Math.min(...teammates
            .filter(player => player.role === 'Forward')
            .map(player => getDistance(player.x, player.y, goalX, attackingGoalX)));  // Find closest forward to attacking goal

        // Calculate the average Y position between defenders and forwards
        let tempY = (defenderY + forwardY) / 2;

        // Ensure midfielder doesn't push too far ahead of the center forward based on attackEnd
        if (this.attackEnd === 'length') {
            // Team is attacking the end at Y = fieldLength
            tempY = Math.min(tempY, ballY - (0.1 * this.fieldLength));  // Midfielder stays behind the ball on the attacking side
        } else {
            // Team is attacking the end at Y = 0
            tempY = Math.max(tempY, ballY + (0.1 * this.fieldLength));  // Midfielder stays behind the ball on the attacking side
        }

        // Step 3: Calculate the midfielder's X position - centered but drifting towards the ball
        const maxDrift = 0.6;
        let tempX = this.fieldWidth * (0.5 * (1 - maxDrift) + (ballX / this.fieldWidth) * maxDrift);

        // Step 4: Check if midfielder is within 10% of field length of the ball and go directly to the ball if so
        if (getDistance(tempX, tempY, ballX, ballY) < 0.1 * this.fieldLength) {
            tempX = ballX;
            tempY = ballY;
        }

        // Step 5: Adjust for spacing relative to teammates (ignore opponents for simplicity here)
        const idealPosition = this.adjustPositionForSpacing(tempX, tempY, teammates, 10);  // Keep 10 units away from teammates

        return { x: idealPosition.x, y: idealPosition.y };
    }
}
