// Forward.js
import { Player } from './Player.js';

export class Forward extends Player {
    constructor(isUser, isOnUserTeam, fieldWidth, fieldLength, attackEnd, side) {
        super(isUser, isOnUserTeam, 'Forward', fieldWidth, fieldLength, attackEnd);
        this.side = side;  // Which side the forward is on (left, right, center)
    }

    // Method to calculate the ideal position for the forward
    calculateIdealPosition(ballX, ballY, teammates, opponents) {
        // Get attacking and defending goal positions from the Player class methods
        const attackingGoalY = this.getAttackingGoalY();

        // Step 1: Calculate approximate tempY using the weighted average approach
        let tempY = 0.6 * ballY + 0.4 * attackingGoalY;

        // Step 2: Calculate idealX with drift logic, allowing full drift to the ball if necessary
        let relativeX;
        if (this.side === 'left') {
            relativeX = 0.25;  // Left side relative zone
        } else if (this.side === 'right') {
            relativeX = 0.75;  // Right side relative zone
        } else {
            relativeX = 0.5;  // Center forward
        }

        // MaxDrift for controlled drifting towards the ball
        const maxDrift = 0.4;
        let tempX = this.fieldWidth * (relativeX * (1 - maxDrift) + (ballX / this.fieldWidth) * maxDrift);

        // Step 3: Check proximity to the ball; if closer than 0.1*fieldLength, move to ball position
        const distanceToBall = this.getDistance(tempX, tempY, ballX, ballY);
        if (distanceToBall < 0.1 * this.fieldLength) {
            tempX = ballX;
            tempY = ballY;
        }

        // Step 4: Adjust for spacing relative to other players
        const idealPosition = this.adjustPositionForSpacing(tempX, tempY, [...teammates, ...opponents], 5);

        return { x: idealPosition.x, y: idealPosition.y };
    }
}
