# Maze Simulator

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white) ![DaisyUI](https://img.shields.io/badge/DaisyUI-UI_Framework-FF00FF?style=for-the-badge&logo=daisyui&logoColor=white)

**Demo online** : https://maze-simulator-eliott.netlify.app/

A React-based maze generation and solving simulator that visualizes various maze algorithms in real-time.

![Maze Simulator](https://raw.githubusercontent.com/Eliott133/maze-simulator/refs/heads/main/src/screen/screen.png)

## Features

### Maze Generation Algorithms
- **Randomized Depth-First Search (DFS)**: Creates a maze using a randomized DFS approach
- **Kruskal's Algorithm**: Generates a maze using a randomized version of Kruskal's algorithm
- **Prim's Algorithm**: Creates a maze using a randomized version of Prim's algorithm
- **Wilson's Algorithm**: Implements Wilson's loop-erased random walk algorithm
- **Aldous-Broder Algorithm**: Creates a uniform spanning tree maze
- **Recursive Division**: Recursively divides the space into chambers

### Maze Solving Algorithms
- **Breadth-First Search (BFS)**: Finds the shortest path using BFS
- **Bidirectional BFS**: Searches from both start and end points simultaneously
- **Greedy Best-First Search**: Uses a heuristic to guide the search towards the goal
- **Dijkstra's Algorithm**: Finds the shortest path using Dijkstra's algorithm
- **A* (A-Star)**: Uses heuristics to find the optimal path efficiently

### Additional Features
- Adjustable maze size (Small, Medium, Large)
- Customizable start and end point colors
- Real-time visualization of maze generation and solving
- Print functionality for generated mazes
- Interactive point selection for start and end positions
- Adjust the delay solving

## How to Use

1. **Generate a Maze**
   - Select a maze size from the dropdown (Small, Medium, Large)
   - Choose a generation algorithm
   - Click "Generate" to create the maze

2. **Set Start and End Points**
   - Click on any path (white cell) to set the start point
   - Click again to set the end point
   - Customize colors using the color pickers

3. **Solve the Maze**
   - Select a solving algorithm
   - Click "Solve" to find the path
   - Watch the algorithm work in real-time

4. **Additional Controls**
   - Use "Clear" to reset points
   - Click the print icon to print the current maze

## Technical Details

### Grid Values
- `0`: Path (default white)
- `1`: Wall (default gray)
- `2`: Solution path (default yellow)
- `3`: Visited cells during solving (default orange)

### Algorithm Implementations
All algorithms are implemented with:
- Step-by-step visualization
- Configurable delay for animation
- Progress tracking
- Error handling
- Callback support for completion

## Development

### Prerequisites
- Node.js
- npm/yarn

### Setup
1) Clone the repository
```bash
git clone https://github.com/Eliott133/maze-simulator.git
```

2) Install dependencies
```bash
npm install
```

3) Start development server
```bash
npm run dev
```

4) Open your browser at the following address 
```bash
http://localhost:5173/
```

### Project Structure
```
src/
├── algorithms/
│   ├── maze_generator.js    # Maze generation algorithms
│   └── maze_solver.js       # Maze solving algorithms
├── components/
│   ├── Canva.tsx           # Maze rendering component
│   ├── Pannel.tsx          # Control panel component
│   └── common/             # Shared components
├── config/
│   └── config.js           # Configuration and mappings
└── App.tsx                 # Main application component
```