export class Field {
    constructor(fieldWidth, fieldLength, cellSize, soccerField) {
        this.fieldWidth = fieldWidth; // Vertical space
        this.fieldLength = fieldLength; // Horizontal space
        this.cellSize = cellSize;
        this.soccerField = soccerField;  // Reference to the SVG element in the DOM
    }

    // Method to create the entire soccer field background, center line, and center circle
    createField() {
        const field = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        field.setAttribute('x', '0');
        field.setAttribute('y', '0');
        field.setAttribute('width', '100%'); // Use relative units
        field.setAttribute('height', '100%'); // Use relative units
        field.setAttribute('class', 'field-background');
        this.soccerField.appendChild(field);

        const centerLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        centerLine.setAttribute('x1', '50%'); // Use relative units
        centerLine.setAttribute('y1', '0');
        centerLine.setAttribute('x2', '50%'); // Use relative units
        centerLine.setAttribute('y2', '100%'); // Use relative units
        centerLine.setAttribute('class', 'field-line');
        this.soccerField.appendChild(centerLine);

        const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        centerCircle.setAttribute('cx', '50%'); // Use relative units
        centerCircle.setAttribute('cy', '50%'); // Use relative units
        centerCircle.setAttribute('r', '5%'); // Use relative units
        centerCircle.setAttribute('class', 'field-line');
        centerCircle.setAttribute('fill', 'none');
        this.soccerField.appendChild(centerCircle);
    }

    // Method to create a goal on the field
    createGoal(x, y, width, height) {
        const goal = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        goal.setAttribute('x', `${(x / this.fieldLength) * 100}%`); // Scale to fit container
        goal.setAttribute('y', `${(y / this.fieldWidth) * 100}%`); // Scale to fit container
        goal.setAttribute('width', `${(width / this.fieldLength) * 100}%`); // Scale to fit container
        goal.setAttribute('height', `${(height / this.fieldWidth) * 100}%`); // Scale to fit container
        goal.setAttribute('class', 'goal');
        this.soccerField.appendChild(goal);
    }

    // Method to create a grid on the soccer field for interactive positioning
    createGrid(handleCellClick) {
        for (let x = 0; x < this.fieldLength; x += this.cellSize) {
            for (let y = 0; y < this.fieldWidth; y += this.cellSize) {
                const cell = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                cell.setAttribute('x', `${(x / this.fieldLength) * 100}%`); // Scale to fit container
                cell.setAttribute('y', `${(y / this.fieldWidth) * 100}%`); // Scale to fit container
                cell.setAttribute('width', `${(this.cellSize / this.fieldLength) * 100}%`); // Scale to fit container
                cell.setAttribute('height', `${(this.cellSize / this.fieldWidth) * 100}%`); // Scale to fit container
                cell.setAttribute('class', 'grid-cell');
                cell.addEventListener('click', () => handleCellClick(x, y));
                this.soccerField.appendChild(cell);
            }
        }
    }
}