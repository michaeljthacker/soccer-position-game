export class Field {
    constructor(fieldWidth, fieldHeight, cellSize, soccerField) {
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;
        this.cellSize = cellSize;
        this.soccerField = soccerField;  // Reference to the SVG element in the DOM
    }

    // Method to create the entire soccer field background, center line, and center circle
    createField() {
        const field = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        field.setAttribute('x', '0');
        field.setAttribute('y', '0');
        field.setAttribute('width', this.fieldWidth);
        field.setAttribute('height', this.fieldHeight);
        field.setAttribute('class', 'field-background');
        this.soccerField.appendChild(field);

        const centerLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        centerLine.setAttribute('x1', this.fieldWidth / 2);
        centerLine.setAttribute('y1', '0');
        centerLine.setAttribute('x2', this.fieldWidth / 2);
        centerLine.setAttribute('y2', this.fieldHeight);
        centerLine.setAttribute('class', 'field-line');
        this.soccerField.appendChild(centerLine);

        const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        centerCircle.setAttribute('cx', this.fieldWidth / 2);
        centerCircle.setAttribute('cy', this.fieldHeight / 2);
        centerCircle.setAttribute('r', 5);
        centerCircle.setAttribute('class', 'field-line');
        centerCircle.setAttribute('fill', 'none');
        this.soccerField.appendChild(centerCircle);
    }

    // Method to create a goal on the field
    createGoal(x, y, width, height) {
        const goal = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        goal.setAttribute('x', x);
        goal.setAttribute('y', y);
        goal.setAttribute('width', width);
        goal.setAttribute('height', height);
        goal.setAttribute('class', 'goal');
        this.soccerField.appendChild(goal);
    }

    // Method to create a grid on the soccer field for interactive positioning
    createGrid(handleCellClick) {
        for (let x = 0; x < this.fieldWidth; x += this.cellSize) {
            for (let y = 0; y < this.fieldHeight; y += this.cellSize) {
                const cell = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                cell.setAttribute('x', x);
                cell.setAttribute('y', y);
                cell.setAttribute('width', this.cellSize);
                cell.setAttribute('height', this.cellSize);
                cell.setAttribute('class', 'grid-cell');
                cell.addEventListener('click', () => handleCellClick(x, y));
                this.soccerField.appendChild(cell);
            }
        }
    }

    // Method to handle the role selector creation
    createRoleSelector(playerRoles, handleRoleSelection) {
        const roleSelector = document.getElementById('role-selector');
        playerRoles.forEach(role => {
            const option = document.createElement('option');
            option.value = role;
            option.textContent = role.charAt(0).toUpperCase() + role.slice(1);
            roleSelector.appendChild(option);
        });
        document.getElementById('start-game-btn').addEventListener('click', handleRoleSelection);
    }
}