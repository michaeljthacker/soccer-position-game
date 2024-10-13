// Goalkeeper.js
import { Player } from './Player.js';
import { getDistance } from './utilities.js';  // Import the utility function

export class Goalie extends Player {
    constructor(isUser, isOnUserTeam, fieldWidth, fieldLength) {
        super(isUser, isOnUserTeam, 'Goalkeeper', fieldWidth, fieldLength);  // Pass to parent class
    }

    // Method to calculate the ideal position for the goalie based on ball and goal location
    calculateIdealPosition(ballX, ballY, goalX, goalY) {
        const maxDistance = 0.2 * this.fieldLength;  // Max distance is 20% of field length
        const distanceToBall = getDistance(ballX, ballY, goalX, goalY);  // Use getDistance function;
        const goalieDistance = Math.min(distanceToBall * 0.25, maxDistance);  // Adjusted to 0.25

        // Calculate the ideal position along the line between the ball and the goal
        const idealX = goalX + (ballX - goalX) * (goalieDistance / distanceToBall);
        const idealY = goalY + (ballY - goalY) * (goalieDistance / distanceToBall);
        
        // Return the ideal position as an object
        return { x: idealX, y: idealY };
    }
}
