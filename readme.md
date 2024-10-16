# Soccer Positioning Game

## Overview

The **Soccer Positioning Game** is a web-based game designed to teach players, especially young kids, about ideal positioning on a soccer field based on different roles (goalkeeper, defender, midfielder, forward). The game offers a fun, interactive way to visualize soccer strategy and decision-making by allowing users to choose a specific role and position their player relative to the ball and other players on the field.

### New Feature: Relative Positioning on Either End of the Field

In this version of the game, players can now be assigned to either end of the field, and their role (e.g., right defender, left forward) is adjusted accordingly. For example, if the user is assigned as a "right defender" but is defending the left side of the field, the same functions will be used for positioning as if they were defending the right side of the field. This ensures a consistent logic system and simplifies how roles are handled, regardless of which side of the field the user is on.

## Features

- **Role Selection**: Players can select a specific role from a list, such as goalkeeper, defender, midfielder, or forward. This role dictates where the player should position themselves on the field in relation to the ball.
  
- **Relative Positioning**: Users can be assigned to defend either end of the field (left or right), and the system will adjust the positioning of all players accordingly. For example, a right defender assigned to defend the left side of the field will function identically to a right defender on the right side.

- **Random Ball Placement**: In each turn, the ball is placed randomly on the field, which impacts the positioning of all players.

- **Player Positioning**: Based on the user's role, they must choose the best position on the field. Each role has specific rules for ideal positioning, depending on the ball’s location and the other players on the field.

- **Turn-based Gameplay**: The game is turn-based, with each turn starting with random ball placement, followed by the user's input to position their player.

- **Feedback and Scoring**: After each turn, feedback is given on the user’s placement, comparing it to the optimal position for that role, with scoring based on proximity to the ideal location.

## Project Intent

The primary intent of this project is to provide an educational tool for teaching soccer strategy, focusing on field positioning and spatial awareness. By letting the user take control of a specific player on the field, they can learn how their positioning impacts the team’s defense and attack.

This tool is particularly geared toward young soccer players (e.g., 8-year-olds) who are learning the basics of field play in a simple 7v7 format. The game simulates realistic scenarios and encourages the user to think critically about positioning relative to the ball and opponents.

## Key Algorithms

The project employs several algorithms for determining player positioning, each tailored to the selected role, the position of the ball, and the user's assignment on either end of the field.

### 1. **Role Selection**

At the beginning of each game, the user selects a role:
- **Goalkeeper**: Protects the goal and should stay close to the goal line.
- **Defender (Left/Right)**: Should stay between the ball and the goal while covering their respective side.
- **Midfielder**: Stays centrally between defenders and forwards, helping both defensively and offensively.
- **Forward (Left/Center/Right)**: Positioned closer to the opponent’s goal, ready to receive passes and score.

### 2. **Ball Placement**

The ball is randomly placed within the bounds of the field (width 0 to 50 units, length 0 to 100 units). The ball’s position is crucial in determining where all players should ideally be located.

### 3. **Player Positioning Logic (Relative to the End of the Field)**

#### New Relative Positioning Feature:
Regardless of which side of the field the user is assigned to defend, the logic for positioning players is consistent. For example, if a right defender is assigned to defend the left side, the same positioning rules apply, but the field is mirrored to reflect the change in sides.

- **Goalkeeper Positioning**:
  The goalkeeper is positioned on the line between the ball and the goal, typically 40% of the distance between the goal line and the ball but never more than 20 units from the goal.
  
- **Defender Positioning**:
  Defenders are responsible for covering their respective half (left or right) of the field. If the ball is on their side, they position themselves between the ball and their goal. Otherwise, they maintain a position closer to their goal than any opposing player in their area.

- **Midfielder Positioning**:
  Midfielders operate between defenders and forwards. If the ball is in the attacking half, they move closer to support the forwards. If the ball is in the defensive half, they help the defenders by staying between the ball and the forwards.

- **Forward Positioning**:
  Forwards should always position themselves between the ball and the opponent’s goal when on the attacking side, or around midfield if the ball is in the defensive half. They are divided into left, center, and right forwards, depending on the area they cover.

### 4. **Scoring Mechanism**

After the user selects their position, the game evaluates the placement based on the role-specific algorithms:
- **50% of the score** is based on whether the player is within the correct general area (zone).
- **50% of the score** is based on how close the player’s position is to the ideal position within that area.

The game provides feedback at the end of each turn, showing the correct placement and scoring the user based on their proximity to the optimal spot.

## Technologies Used

- **HTML/CSS**: For basic web layout and styling.
- **JavaScript**: Core functionality of the game, including player placement, ball placement, and scoring.
- **ESLint**: Used for maintaining code quality and consistency.
- **GitHub Copilot**: Integrated as an AI assistant to help with code suggestions during development.

## Installation

To run the project locally:
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/soccer-position-game.git
   ```
2. Navigate to the project directory:
   ```bash
   cd soccer-position-game
   ```
3. Install dependencies (if any):
   ```bash
   npm install
   ```
4. Open `index.html` in the browser using Live Server or another local web server.

## Future Enhancements

- **Real-time feedback**: Providing instant feedback after each move.
- **Multiple difficulty levels**: Adjust the difficulty for different age groups or skill levels.
- **Support for multiplayer**: Allow two players to compete, each controlling a different role.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Project Roadmap: Soccer Positioning Game

This section outlines the key steps and the recommended order of operations for building out the functionality of the soccer positioning game. The goal is to complete each of these steps incrementally, ensuring that each part of the game functions properly before moving on to the next.

### 1. Role Selection (Completed)
- **Objective**: Allow the user to select their role (Goalkeeper, Left/Right Defender, Left/Right/Center Forward, or Midfielder) before starting the game.
- **Tasks**:
  - Create a simple dropdown or button set in **index.html** for role selection.
  - Capture the user's role selection and store it for the game session.

### 2. Set Up the Field and Initialize All Players (Completed)
- **Objective**: Initialize and display the soccer field, its boundaries, grid, goals, and instantiate all players (both user and non-user players).
- **Tasks**:
  - Use **script.js** to render the field with the appropriate dimensions, grid, and goals at both ends of the field.
  - Ensure the goals are placed at x = 25, and at the y-coordinates for each end (either 0 or fieldLength).
  - Create instances of the **Player** subclasses for each role (Goalkeeper, Defender, Forward, Midfielder).
  - Separate players into the user’s team and the opposing team.

### 3. Determine and clearly label the Attacking Side (Completed)
- **Objective**: Randomly determine which side the user's team will be attacking and clearly label it on the interface.
- **Tasks**:
  - Randomly choose between "zero" and "length" as the attack end.
  - Display an arrow and label indicating the direction of attack above the field and below the game title.

### 4. Place the Ball (Completed)
- **Objective**: Randomly place the ball on the field at the start of each turn.
- **Tasks**:
  - Generate random coordinates for the ball’s initial position within the bounds of the field.

### 5. Place the Goalkeepers (Completed)
- **Objective**: Place the goalkeepers for both teams based on their calculated ideal positions.
- **Tasks**:
  - Position the goalkeepers based on the ball's position, ensuring they are on the line between the ball and the goal.
  - Include random variation around the ideal position.
  - Ensure the player is in the bounds of the field.
  - Implement this to place all goalkeeper(s) that are not the user's chosen player.

### 6. Place the Forwards (Completed)
- **Objective**: Position the forwards on both teams using the logic from the **Forward** class.
- **Tasks**:
  - Position the forwards relative to the ball and their designated side (left, center, or right).
  - Include random variation around the ideal position.
  - Ensure the player is in the bounds of the field.
  - Implement this to place all Forwards that are not the user's chosen player.

### 7. Place the Defenders (Completed)
- **Objective**: Position the defenders on both teams using the logic from the **Defender** class.
- **Tasks**:
  - Place the defenders between the ball and the defending goal, ensuring that they are closer to the defending goal than the nearest opposing player.
  - Include random variation around the ideal position.
  - Ensure the player is in the bounds of the field.
  - Implement this to place all Forwards that are not the user's chosen player.

### 8. Place the Midfielders (Completed)
- **Objective**: Position the midfielders for both teams using the logic from the **Midfielder** class.
- **Tasks**:
  - Position the midfielders based on the defenders and forwards’ positions.
  - Include random variation around the ideal position.
  - Ensure the player is in the bounds of the field.
  - Implement this to place all Forwards that are not the user's chosen player.

### 9. User Interaction: Position Themselves
- **Objective**: Allow the user to position their player on the field.
- **Tasks**:
  - Display a clickable grid for the user to select their position based on the current layout.
  - Provide visual feedback to show the user's selected position.
  - Capture the coordinates of the clicked cell.
  - Update the player's position based on the captured coordinates.
  - Provide a "Submit Position" button to confirm the position.

#### Implementation Details
- **Field Class**: Responsible for rendering the clickable grid and handling click events.
  - Method: `createGrid(clickHandler)`: Renders the grid and sets up click event listeners.
  - Event Handling: Captures the coordinates of the clicked cell and calls the provided `clickHandler`.
- **PlayerManager Class**: Responsible for updating the player's position and scoring.
  - Method: `updatePlayerPosition(x, y)`: Updates the player's position based on the captured coordinates.
  - Method: `renderUserPosition()`: Visually updates the user's position on the field using the `render()` method from the `Player` class.
  - Method: `scorePosition(idealPosition)`: Compares the user's position to the ideal position and calculates a score.

### 10. Position Scoring
- **Objective**: Score the user’s positioning for each turn based on how close they are to their calculated ideal position.
- **Tasks**:
  - Compare the user’s chosen position to the ideal position (calculated based on the logic for their role).
  - Provide a score (e.g., 0-10) based on proximity and some measure of how critical positioning is (e.g., proximity to ball as a modifier of how precise positioning needs to be).
  - Display the score to the user.

### 11. Repeat for First Half
- **Objective**: Run multiple turns for the first half of the game.
- **Tasks**:
  - When moving to next turn, clear field and player positions.
  - Repeat steps 4 through 10 for each turn, simulating a sequence of plays in the first half.
  - Track cumulative scores.

### 12. Switch Sides for the Second Half
- **Objective**: Automatically switch the user's attacking side for the second half of the game.
- **Tasks**:
  - Reverse the attacking direction and update the team’s roles accordingly.
  - Repeat steps 4 through 10 for the second half.

### 13. End Game
- **Objective**: Display the total score and trigger an end-of-game celebration.
- **Tasks**:
  - Show the final score and display celebratory animations based on the user’s total score.
  - Provide a “Restart Game” button to allow the user to play again.

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
- Refactor calculateIdealPosition() so every Player subclass takes the same inputs, then replace placeGoalies(), placeForwards(), etc. with a single reusable function.
---

### Notes:
- **Responsive Design**: As you build out the functionality, ensure that the UI is responsive and user-friendly across devices. You can progressively style **style.css** as you implement the different components.
- **Testing**: Test each step in isolation to ensure functionality before moving on to the next.
- **Adjust Logic as Needed**: You may encounter the need to tweak the positioning logic or user interactions based on feedback or testing results. Keep the architecture flexible.
