# 2D Soccer Positioning Game

## Project Intent
This project aims to create a simple 2D soccer positioning game where players can select a role, position themselves on the field, and receive a score based on their positioning. Note: I have no idea about soccer, so it is possible this is terrible advice.

## How the Game Works
1. **Select a Role**: Choose a role from the available options (Goalie, Defender, Midfielder, Forward).
2. **Initialize a Turn**: The game sets up the field and players.
3. **Pick a Position**: Click on the field to position your player.
4. **Get a Score**: Receive a score based on your positioning relative to the ball and other players.
5. **Repeat**: Continue for 10 turns to complete the game.

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/michaeljthacker/soccer-position-game.git
    ```
2. Navigate to the project directory:
    ```sh
    cd soccer-position-game
    ```
3. Open `index.html` in your browser to start the game.

## Implementation Details

### File Structure
assets/
css/
    style.css
index.html
js/
    Ball.js
    Defender.js
    Field.js
    Forward.js
    Goalie.js
    main.js
    Midfielder.js
    Player.js
    PlayerManager.js
    utilities.js
LICENSE
package.json
readme.md

### Key Classes and Files

- **`Player.js`**: Defines the base `Player` class with methods for setting position, rendering, and calculating ideal positions.
- **`Goalie.js`, `Defender.js`, `Midfielder.js`, `Forward.js`**: Subclasses of `Player` that override the `calculateIdealPosition` method to provide role-specific positioning logic.
- **`Field.js`**: Manages the creation and rendering of the soccer field, including goals and grid.
- **`PlayerManager.js`**: Handles player initialization, positioning, rendering, and scoring. Key methods include:
  - `initializePlayers()`: Sets up the user and opposing teams.
  - `placeGoalies()`, `placeDefenders()`, `placeMidfielders()`, `placeForwards()`: Position players on the field.
  - `updateUserPosition(x, y)`: Updates the user's position based on click events.
  - `scorePosition()`: Calculates and displays the score for the user's position.
- **`main.js`**: Contains the main function to set up the game, including field creation and player initialization.

### Event Handling and Turn Management
- **Event Handling**:
  - The `Field` class handles click events on the grid and captures the coordinates of the clicked cell.
  - The `PlayerManager` class updates the player's position based on the captured coordinates and scores the position.
- **Turn Management**:
  - Each turn involves capturing the user's position, scoring it, and moving to the next turn.
  - A "Next Turn" button can be provided to allow the user to proceed to the next turn.
  - The game runs multiple turns for the first half, switches sides for the second half, and ends with a final score display.

## Backlog & Potential Features
- Design / Fill of the ball (vs. plain white)
- Description of the role / instructions before clicking "Start Game"
- Give feedback on the correct location, *e.g.*, "Keep your spacing away from teammates!"
- I think we can delete Player class properties related to field size
- Customize player icons
- Refactor `calculateIdealPosition()` so every Player subclass takes the same inputs, then replace `placeGoalies()`, `placeForwards()`, etc. with a single reusable function.

## Notes
- **Responsive Design**: Ensure that the UI is responsive and user-friendly across devices. Progressively style `style.css` as you implement the different components.
- **Testing**: Test each step in isolation to ensure functionality before moving on to the next.
- **Adjust Logic as Needed**: Be prepared to tweak the positioning logic or user interactions based on feedback or testing results. Keep the architecture flexible.

## License
This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.