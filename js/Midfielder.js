// Midfielder.js
import { Player } from './Player.js';
import { getDistance } from './utilities.js';  // Import the utility function

export class Midfielder extends Player {
    constructor(isUser, isOnUserTeam, fieldWidth, fieldLength, attackEnd) {
        super(isUser, isOnUserTeam, 'Midfielder', fieldWidth, fieldLength, attackEnd);
    }

    // Method to calculate the ideal position for the midfielder
    calculateIdealPosition(ballX, ballY, players) {
        // Get attacking and defending goal positions from the Player class methods
        const attackingGoalX = 100 * this.getAttackingGoalX() / this.fieldLength;
        const defendingGoalX = 100 * this.getDefendingGoalX() / this.fieldLength;
        const goalY = 50;  // The y-coordinate for both goals (center of the field width-wise)

        // Separate teammates and opponents for positioning calculations
        const teammates = players.filter(player => player.isOnUserTeam === true);
        const opponents = players.filter(player => player.isOnUserTeam === false);

        // Step 1: Calculate the defender's X closest to the defending goal
        const defenderX = Math.min(...teammates
            .filter(player => player.role === 'Defender')
            .map(player => getDistance(player.x, player.y, defendingGoalX, player.y)));  // Find closest defender to defending goal

        // Step 2: Calculate the forward's X closest to the attacking goal
        const forwardX = Math.min(...teammates
            .filter(player => player.role === 'Forward')
            .map(player => getDistance(player.x, player.y, attackingGoalX, player.y)));  // Find closest forward to attacking goal

        // Calculate the average X position between defenders and forwards and ensure midfielder doesn't push too far ahead
        let tempX;
        if (this.attackEnd === 'length') {
            // Team is attacking the end at X = fieldLength
            tempX = (100 + defenderX - forwardX) / 2;
            tempX = Math.min(tempX, ballX - 5);  // Midfielder stays behind the ball on the attacking side
        } else {
            // Team is attacking the end at X = 0
            tempX = (100 - defenderX + forwardX) / 2;
            tempX = Math.max(tempX, ballX + 5);  // Midfielder stays behind the ball on the attacking side
        }
        console.log(`Midfielder tempX: ${tempX}`);

        // Step 3: Calculate the midfielder's Y position - centered but drifting towards the ball
        const maxDrift = 0.6;
        let tempY = 50 * (1 - maxDrift) + ballY * maxDrift;

        // Step 4: Check if midfielder is within 10% of field length of the ball and go directly to the ball if so
        if (getDistance(tempX, tempX, ballX, ballY) < 10) {
            tempX = ballX;
            tempY = ballY;
        }
        
        // Step 5: Adjust for spacing relative to teammates (ignore opponents for simplicity here)
        const idealPosition = this.adjustPositionForSpacing(tempX, tempY, teammates, 10);  // Keep 10 units away from teammates
        console.log(`Midfielder ideal position: (${idealPosition.x}, ${idealPosition.y})`);
        return { x: idealPosition.x, y: idealPosition.y };
    }
}
