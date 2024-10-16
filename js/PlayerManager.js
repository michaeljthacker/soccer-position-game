import { Player } from './Player.js';
import { Goalie } from './Goalie.js';
import { Defender } from './Defender.js';
import { Midfielder } from './Midfielder.js';
import { Forward } from './Forward.js';
import { generateNormalRandom, clamp } from './utilities.js';

class PlayerManager {
    constructor(fieldWidth, fieldLength, userRole) {
        this.fieldWidth = fieldWidth;
        this.fieldLength = fieldLength;
        this.userRole = userRole;
        this.players = [];
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
    placeGoalies(ballX, ballY) {
        this.players.forEach(player => {
            if (player.role === 'Goalie' && !player.isUser) {
                const idealPosition = player.calculateIdealPosition(ballX, ballY);
                const variedX = clamp(idealPosition.x + generateNormalRandom(0, 2), 0, 100);
                const variedY = clamp(idealPosition.y + generateNormalRandom(0, 2), 0, 100);
                console.log(`Placing goalie ${ player.getUniqueId() } at (${ variedX }, ${ variedY })`);
                player.setPosition(variedX, variedY);
            }
        });
    }

    // Method to place forwards on the field
    placeForwards(ballX, ballY) {
        this.players.forEach(player => {
            if (player.role === 'Forward' && !player.isUser) {
                const idealPosition = player.calculateIdealPosition(ballX, ballY, this.players);
                const variedX = clamp(idealPosition.x + generateNormalRandom(0, 6), 0, 100);
                const variedY = clamp(idealPosition.y + generateNormalRandom(0, 3), 0, 100);
                console.log(`Placing forward ${ player.getUniqueId() } at (${ variedX }, ${ variedY })`);
                player.setPosition(variedX, variedY);
            }
        });
    }

    // Method to place defenders on the field
    placeDefenders(ballX, ballY) {
        this.players.forEach(player => {
            if (player.role === 'Defender' && !player.isUser) {
                const idealPosition = player.calculateIdealPosition(ballX, ballY, this.players);
                const variedX = clamp(idealPosition.x + generateNormalRandom(0, 6), 0, 100);
                const variedY = clamp(idealPosition.y + generateNormalRandom(0, 3), 0, 100);
                console.log(`Placing defender ${ player.getUniqueId() } at (${ variedX }, ${ variedY })`);
                player.setPosition(variedX, variedY);
            }
        });
    }

    // Method to place midfielders on the field
    placeMidfielders(ballX, ballY) {
        this.players.forEach(player => {
            if (player.role === 'Midfielder' && !player.isUser) {
                const idealPosition = player.calculateIdealPosition(ballX, ballY, this.players);
                const variedX = clamp(idealPosition.x + generateNormalRandom(0, 6), 0, 100);
                const variedY = clamp(idealPosition.y + generateNormalRandom(0, 3), 0, 100);
                console.log(`Placing midfielder ${ player.getUniqueId() } at (${ variedX }, ${ variedY })`);
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
}

export { PlayerManager };