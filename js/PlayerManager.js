import { Player } from './Player.js';
import { Goalie } from './Goalie.js';
import { Defender } from './Defender.js';
import { Midfielder } from './Midfielder.js';
import { Forward } from './Forward.js';

export class PlayerManager {
    constructor(fieldWidth, fieldLength, userRole) {
        this.fieldWidth = fieldWidth;
        this.fieldLength = fieldLength;
        this.userRole = userRole;
        this.players = [];
    }

    initializePlayers() {
        // Example positions (initially set to null)
        const positions = [
            { role: 'Goalie', isUser: this.userRole === 'Goalie', isOnUserTeam: true, x: null, y: null },
            { role: 'Defender', isUser: this.userRole === 'Defender', isOnUserTeam: true, x: null, y: null, side: 'left' },
            { role: 'Defender', isUser: this.userRole === 'Defender', isOnUserTeam: true, x: null, y: null, side: 'right' },
            { role: 'Midfielder', isUser: this.userRole === 'Midfielder', isOnUserTeam: true, x: null, y: null },
            { role: 'Forward', isUser: this.userRole === 'Forward', isOnUserTeam: true, x: null, y: null },
            // Add more players as needed
        ];

        positions.forEach(pos => {
            let player;
            switch (pos.role) {
                case 'Goalie':
                    player = new Goalie(pos.isUser, pos.isOnUserTeam, this.fieldWidth, this.fieldLength, 'zero');
                    break;
                case 'Defender':
                    player = new Defender(pos.isUser, pos.isOnUserTeam, this.fieldWidth, this.fieldLength, 'zero', pos.side);
                    break;
                case 'Midfielder':
                    player = new Midfielder(pos.isUser, pos.isOnUserTeam, this.fieldWidth, this.fieldLength, 'zero');
                    break;
                case 'Forward':
                    player = new Forward(pos.isUser, pos.isOnUserTeam, this.fieldWidth, this.fieldLength, 'zero');
                    break;
                default:
                    player = new Player(pos.isUser, pos.isOnUserTeam, pos.role, this.fieldWidth, this.fieldLength, 'zero');
            }
            player.setPosition(pos.x, pos.y);
            this.players.push(player);
        });
    }

    renderPlayers(soccerField) {
        this.players.forEach(player => {
            const playerElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            playerElement.setAttribute('cx', player.x || 0); // Default to 0 if null
            playerElement.setAttribute('cy', player.y || 0); // Default to 0 if null
            playerElement.setAttribute('r', 10);
            playerElement.setAttribute('class', 'player');
            soccerField.appendChild(playerElement);
        });
    }

    movePlayer(playerIndex, newX, newY) {
        const player = this.players[playerIndex];
        player.setPosition(newX, newY);
    }
}