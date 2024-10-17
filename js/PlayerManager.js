import { Player } from './Player.js';
import { Goalie } from './Goalie.js';
import { Defender } from './Defender.js';
import { Midfielder } from './Midfielder.js';
import { Forward } from './Forward.js';
import { getDistance, generateNormalRandom, clamp } from './utilities.js';

class PlayerManager {
    constructor(fieldWidth, fieldLength, userRole) {
        this.fieldWidth = fieldWidth;
        this.fieldLength = fieldLength;
        this.userRole = userRole;
        this.players = []; // Array to hold all player objects
        this.userPlayer = null; // Reference to the user-player object
        this.ball = null; // Reference to the ball object
        this.scores = []; // Array to hold scores for each turn
    }

    initializePlayers() {
        const userTeam = [
            new Goalie(this.userRole === 'goalie', true, 'Goalie', this.fieldWidth, this.fieldLength),
            new Defender(this.userRole === 'left-defender', true, 'Defender', this.fieldWidth, this.fieldLength, 'left'),
            new Defender(this.userRole === 'right-defender', true, 'Defender', this.fieldWidth, this.fieldLength, 'right'),
            new Midfielder(this.userRole === 'midfielder', true, 'Midfielder', this.fieldWidth, this.fieldLength),
            new Forward(this.userRole === 'left-forward', true, 'Forward', this.fieldWidth, this.fieldLength, 'left'),
            new Forward(this.userRole === 'center-forward', true, 'Forward', this.fieldWidth, this.fieldLength, 'center'),
            new Forward(this.userRole === 'right-forward', true, 'Forward', this.fieldWidth, this.fieldLength, 'right')
        ];

        const opposingTeam = [
            new Goalie(false, false, 'Goalie', this.fieldWidth, this.fieldLength),
            new Defender(false, false, 'Defender', this.fieldWidth, this.fieldLength, 'left'),
            new Defender(false, false, 'Defender', this.fieldWidth, this.fieldLength, 'right'),
            new Midfielder(false, false, 'Midfielder', this.fieldWidth, this.fieldLength),
            new Forward(false, false, 'Forward', this.fieldWidth, this.fieldLength, 'left'),
            new Forward(false, false, 'Forward', this.fieldWidth, this.fieldLength, 'center'),
            new Forward(false, false, 'Forward', this.fieldWidth, this.fieldLength, 'right')
        ];

        this.players = [...userTeam, ...opposingTeam];

        // Identify and store the user-player object
        this.players.forEach(player => {
            if (player.isUser) {
                this.userPlayer = player;
            }
        });
    }

    // Method to update the attack end for each player
    updateAttackEnd(userAttackDirection) {
        this.players.forEach(player => {
            if (player.isOnUserTeam) {
                player.attackEnd = userAttackDirection;
            } else {
                player.attackEnd = userAttackDirection === 'length' ? 'zero' : 'length';
            }
        });
    }

    // Method to place goalies on the field
    placeGoalies() {
        this.players.forEach(player => {
            if (player.role === 'Goalie' && !player.isUser) {
                const idealPosition = player.calculateIdealPosition(this.ball.x, this.ball.y);
                const variedX = clamp(idealPosition.x + generateNormalRandom(0, 2), 0, 100);
                const variedY = clamp(idealPosition.y + generateNormalRandom(0, 2), 0, 100);
                player.setPosition(variedX, variedY);
            }
        });
    }

    // Method to place forwards on the field
    placeForwards() {
        this.players.forEach(player => {
            if (player.role === 'Forward' && !player.isUser) {
                const idealPosition = player.calculateIdealPosition(this.ball.x, this.ball.y, this.players);
                const variedX = clamp(idealPosition.x + generateNormalRandom(0, 6), 0, 100);
                const variedY = clamp(idealPosition.y + generateNormalRandom(0, 3), 0, 100);
                player.setPosition(variedX, variedY);
            }
        });
    }

    // Method to place defenders on the field
    placeDefenders() {
        this.players.forEach(player => {
            if (player.role === 'Defender' && !player.isUser) {
                const idealPosition = player.calculateIdealPosition(this.ball.x, this.ball.y, this.players);
                const variedX = clamp(idealPosition.x + generateNormalRandom(0, 6), 0, 100);
                const variedY = clamp(idealPosition.y + generateNormalRandom(0, 3), 0, 100);
                player.setPosition(variedX, variedY);
            }
        });
    }

    // Method to place midfielders on the field
    placeMidfielders() {
        this.players.forEach(player => {
            if (player.role === 'Midfielder' && !player.isUser) {
                const idealPosition = player.calculateIdealPosition(this.ball.x, this.ball.y, this.players);
                const variedX = clamp(idealPosition.x + generateNormalRandom(0, 6), 0, 100);
                const variedY = clamp(idealPosition.y + generateNormalRandom(0, 3), 0, 100);
                player.setPosition(variedX, variedY);
            }
        });
    }

    // Method to render non-user players on the field
    renderNonUserPlayers(soccerField) {
        this.players.forEach(player => {
            if (!player.isUser) {
                // Ensure the player's position is set before rendering
                if (player.x !== null && player.y !== null) {
                    player.render(soccerField);
                } else {
                    console.error(`Player ${player.getUniqueId()} position is not set.`);
                }
            }
        });
    }

    updateUserPosition(x, y) {
        if (this.userPlayer) {
            const newX = clamp(100 * (x + 0.5) / this.fieldLength, 0, 100);
            const newY = clamp(100 * (y + 0.5) / this.fieldWidth, 0, 100);
            this.userPlayer.setPosition(newX, newY);
            this.renderUserPosition();
        } else {
            console.error('User player not found.');
        }
    }

    renderUserPosition() {
        if (this.userPlayer) {
            const soccerField = document.getElementById('soccer-field');
            this.userPlayer.render(soccerField);
        } else {
            console.error('User player not found.');
        }
    }

    scorePosition() {
        if (!this.userPlayer) {
            console.error('User player not found.');
            return;
        }

        // Calculate the distance between the user player, ideal, and the ball
        let idealPosition;
        if ((this.userPlayer.role === 'Defender') || (this.userPlayer.role === 'Midfielder') || (this.userPlayer.role === 'Forward')) {
            idealPosition = this.userPlayer.calculateIdealPosition(this.ball.x, this.ball.y, this.players);
        } else {
            idealPosition = this.userPlayer.calculateIdealPosition(this.ball.x, this.ball.y);
        }

        const idealToUserDistance = getDistance(this.userPlayer.x, this.userPlayer.y, idealPosition.x, idealPosition.y);
        const idealToBallDistance = getDistance(this.ball.x, this.ball.y, idealPosition.x, idealPosition.y);

        const score = Math.max(0, Math.ceil(10 - (idealToUserDistance / Math.min(5, Math.max(1, idealToBallDistance)))));

        this.displayScore(score);
        this.saveTurnScore(score); // Save the score for the turn
    }

    displayScore(score) {
        const gameTitleElement = document.getElementById('game-title');
        if (gameTitleElement) {
            gameTitleElement.textContent = `Score: ${score} / 10`;
        } else {
            console.error('Game title element not found.');
        }
    }

    saveTurnScore(score) {
        this.scores.push(score);
    }

    getTotalScore() {
        return this.scores.reduce((total, score) => total + score, 0);
    }

    updateBall(ball) {
        this.ball = ball;
    }

    // Reset all player positions
    resetPlayerPositions() {
        this.players.forEach(player => {
            player.resetPosition();
        });
    }
}

export { PlayerManager };