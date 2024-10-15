// Forward.js
import { Player } from './Player.js';
import { getDistance } from './utilities.js';

export class Forward extends Player {
    constructor(isUser, isOnUserTeam, fieldWidth, fieldLength, attackEnd, side) {
        super(isUser, isOnUserTeam, 'Forward', fieldWidth, fieldLength, attackEnd);
        this.side = side;  // Which side the forward is on (left, right, center)
    }

    // Method to calculate the ideal position for the forward
    calculateIdealPosition(ballX, ballY, players) {
        // ballX and ballY are coordinates in percentage of fieldLength and fieldWidth
        // Get attacking and defending goal positions from the Player class methods
        const attackingGoalX = 100 * this.getAttackingGoalX() / this.fieldLength;

        // Step 1: Calculate approximate tempX using the weighted average approach
        let tempX = 0.6 * ballX + 0.4 * attackingGoalX;

        // Step 2: Calculate idealY with drift logic, allowing full drift to the ball if necessary
        let relativeY;
        if (this.side === 'left') {
            relativeY = 25;  // Left side relative zone
        } else if (this.side === 'right') {
            relativeY = 75;  // Right side relative zone
        } else {
            relativeY = 50;  // Center forward
        }
        // Flip field if opposite attackEnd
        if (this.attackEnd === 'zero') {
            relativeY = 100 - relativeY;
        }

        // MaxDrift for controlled drifting towards the ball
        const maxDrift = 0.4;
        let tempY = relativeY * (1 - maxDrift) + ballY * maxDrift;

        // Step 3: Check proximity to the ball; if closer than 0.1*fieldLength, move to ball position
        const distanceToBall = getDistance(tempX, tempY, ballX, ballY);
        if (distanceToBall < 15) {
            tempX = ballX;
            tempY = ballY;
        }

        // Step 4: Adjust for spacing relative to other players
        const idealPosition = this.adjustPositionForSpacing(tempX, tempY, players, 5);

        return { x: idealPosition.x, y: idealPosition.y };
    }
}
