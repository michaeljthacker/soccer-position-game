class Ball {
    constructor(fieldWidth, fieldLength) {
        this.fieldWidth = fieldWidth;
        this.fieldLength = fieldLength;
        this.x = null;
        this.y = null;
    }

    // Method to randomly place the ball on the field
    placeRandomly() {
        this.x = Math.random() * 100; // Percentage of field length
        this.y = Math.random() * 100; // Percentage of field width
    }

    // Method to render the ball on the field
    render(svgElement) {
        // Remove any existing ball element
        const existingBall = svgElement.querySelector('.ball');
        if (existingBall) {
            existingBall.remove();
        }

        // Create a new ball element
        const ballElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        ballElement.setAttribute('class', 'ball');
        ballElement.setAttribute('cx', `${this.x}%`); // Use percentage for x position
        ballElement.setAttribute('cy', `${this.y}%`); // Use percentage for y position
        ballElement.setAttribute('r', '1%'); // Use percentage for radius
        ballElement.setAttribute('fill', 'white'); // Adjust the color as needed

        // Append the ball element to the SVG
        svgElement.appendChild(ballElement);
    }
}

export { Ball };