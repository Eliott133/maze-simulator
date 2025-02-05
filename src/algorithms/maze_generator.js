// Utility functions
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

class DisjointSet {
    constructor(size) {
        this.parent = Array.from({ length: size }, (_, i) => i);
        this.rank = Array(size).fill(0);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if (rootX !== rootY) {
            if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
        }
    }
}

export function randomizedDepthFirstStepByStep(rows, cols, setGrid, delay = 50, callback) {
    const grid = Array.from({ length: rows }, () => Array(cols).fill(1));
    const stack = [];
    const directions = [
        [0, -2], // Up
        [0, 2],  // Down
        [-2, 0], // Left
        [2, 0],  // Right
    ];

    const isValid = (x, y) =>
        x >= 0 && x < rows && y >= 0 && y < cols && grid[x][y] === 1;

    const carvePath = (x, y, nx, ny) => {
        grid[(x + nx) / 2][(y + ny) / 2] = 0;
        grid[nx][ny] = 0;
    };

    stack.push([0, 0]);
    grid[0][0] = 0;

    const step = () => {
        if (stack.length === 0) {
            setGrid(grid);
            callback();
            return;
        }
        if (stack.length > 0) {
            const [x, y] = stack[stack.length - 1];
            const shuffledDirections = shuffleArray([...directions]);

            let carved = false;

            for (const [dx, dy] of shuffledDirections) {
                const nx = x + dx;
                const ny = y + dy;

                if (isValid(nx, ny)) {
                    carvePath(x, y, nx, ny);
                    stack.push([nx, ny]);
                    carved = true;
                    break;
                }
            }

            if (!carved) stack.pop();

            setGrid([...grid]);

            setTimeout(step, delay);
        }
    };

    step();
}

export function kruskal(rows, cols, setGrid, delay = 50, callback) {
    const grid = Array.from({ length: rows }, () => Array(cols).fill(1));
    const edges = [];
    const ds = new DisjointSet(rows * cols);

    // Generate all possible edges
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (c + 2 < cols) edges.push([r, c, r, c + 2]); // Horizontal edges
            if (r + 2 < rows) edges.push([r, c, r + 2, c]); // Vertical edges
        }
    }

    shuffleArray(edges);
    let currentEdge = 0;

    const step = () => {
        if (currentEdge >= edges.length) {
            setGrid(grid);
            callback();
            return;
        }

        const [r1, c1, r2, c2] = edges[currentEdge];
        const cell1 = r1 * cols + c1;
        const cell2 = r2 * cols + c2;

        if (ds.find(cell1) !== ds.find(cell2)) {
            ds.union(cell1, cell2);
            grid[r1][c1] = 0;
            grid[r2][c2] = 0;
            grid[(r1 + r2) / 2][(c1 + c2) / 2] = 0;
        }

        currentEdge++;
        setGrid([...grid]);
        setTimeout(step, delay);
    };

    step();
}

export function prim(rows, cols, setGrid, delay = 50, callback) {
    const grid = Array.from({ length: rows }, () => Array(cols).fill(1));
    const walls = new Set();
    const visited = new Set();
    const directions = [[0, -2], [0, 2], [-2, 0], [2, 0]];

    const addWalls = (r, c) => {
        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                walls.add(`${r},${c},${nr},${nc}`);
            }
        }
    };

    // Start from (0,0)
    grid[0][0] = 0;
    visited.add('0,0');
    addWalls(0, 0);

    const step = () => {
        if (walls.size === 0) {
            setGrid(grid);
            callback();
            return;
        }

        const wallArray = Array.from(walls);
        const wallIndex = Math.floor(Math.random() * wallArray.length);
        const [r1, c1, r2, c2] = wallArray[wallIndex].split(',').map(Number);
        walls.delete(wallArray[wallIndex]);

        const cell2Key = `${r2},${c2}`;
        if (!visited.has(cell2Key)) {
            grid[r2][c2] = 0;
            grid[(r1 + r2) / 2][(c1 + c2) / 2] = 0;
            visited.add(cell2Key);
            addWalls(r2, c2);
        }

        setGrid([...grid]);
        setTimeout(step, delay);
    };

    step();
}

export function wilson(rows, cols, setGrid, delay = 50, callback) {
    const grid = Array.from({ length: rows }, () => Array(cols).fill(1));
    const visited = new Set();
    const directions = [[0, -2], [0, 2], [-2, 0], [2, 0]];

    // Start with a random cell
    const startCell = [0, 0];
    grid[startCell[0]][startCell[1]] = 0;
    visited.add(`${startCell[0]},${startCell[1]}`);

    const performRandomWalk = (current, path) => {
        if (visited.has(`${current[0]},${current[1]}`)) {
            return path;
        }

        const shuffledDirs = shuffleArray([...directions]);
        for (const [dr, dc] of shuffledDirs) {
            const nr = current[0] + dr;
            const nc = current[1] + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                path.push([current[0], current[1], nr, nc]);
                return performRandomWalk([nr, nc], path);
            }
        }
        return path;
    };

    let unvisitedCells = [];
    for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
            if (!visited.has(`${r},${c}`)) {
                unvisitedCells.push([r, c]);
            }
        }
    }

    const step = () => {
        if (unvisitedCells.length === 0) {
            setGrid(grid);
            callback();
            return;
        }

        const startIdx = Math.floor(Math.random() * unvisitedCells.length);
        const start = unvisitedCells[startIdx];
        const path = performRandomWalk(start, []);

        for (const [r1, c1, r2, c2] of path) {
            grid[r1][c1] = 0;
            grid[r2][c2] = 0;
            grid[(r1 + r2) / 2][(c1 + c2) / 2] = 0;
            visited.add(`${r1},${c1}`);
        }

        unvisitedCells = unvisitedCells.filter(([r, c]) => !visited.has(`${r},${c}`));
        setGrid([...grid]);
        setTimeout(step, delay);
    };

    step();
}

export function aldousBroder(rows, cols, setGrid, delay = 50, callback) {
    const grid = Array.from({ length: rows }, () => Array(cols).fill(1));
    const visited = new Set();
    const directions = [[0, -2], [0, 2], [-2, 0], [2, 0]];
    let current = [0, 0];
    let unvisitedCount = (rows * cols) / 4; // Count of cells that should be visited

    grid[current[0]][current[1]] = 0;
    visited.add(`${current[0]},${current[1]}`);
    unvisitedCount--;

    const step = () => {
        if (unvisitedCount === 0) {
            setGrid(grid);
            callback();
            return;
        }

        const [dr, dc] = directions[Math.floor(Math.random() * directions.length)];
        const next = [current[0] + dr, current[1] + dc];

        if (next[0] >= 0 && next[0] < rows && next[1] >= 0 && next[1] < cols) {
            if (!visited.has(`${next[0]},${next[1]}`)) {
                grid[next[0]][next[1]] = 0;
                grid[(current[0] + next[0]) / 2][(current[1] + next[1]) / 2] = 0;
                visited.add(`${next[0]},${next[1]}`);
                unvisitedCount--;
            }
            current = next;
        }

        setGrid([...grid]);
        setTimeout(step, delay);
    };

    step();
}

export function recursiveDivision(rows, cols, setGrid, delay = 50, callback) {
    const grid = Array.from({ length: rows }, () => Array(cols).fill(0));
    
    // Initialize borders
    for (let i = 0; i < rows; i++) {
        grid[i][0] = 1;
        grid[i][cols - 1] = 1;
    }
    for (let i = 0; i < cols; i++) {
        grid[0][i] = 1;
        grid[rows - 1][i] = 1;
    }

    const divide = async (x, y, width, height, orientation) => {
        if (width < 2 || height < 2) return;

        const horizontal = orientation === 'horizontal';

        // Where will the wall be drawn?
        const wx = x + (horizontal ? 0 : Math.floor(Math.random() * (width - 2)));
        const wy = y + (horizontal ? Math.floor(Math.random() * (height - 2)) : 0);

        // Where will the passage through the wall be?
        const px = wx + (horizontal ? Math.floor(Math.random() * width) : 0);
        const py = wy + (horizontal ? 0 : Math.floor(Math.random() * height));

        // Direction of the wall
        const dx = horizontal ? 1 : 0;
        const dy = horizontal ? 0 : 1;

        // Length of the wall
        const length = horizontal ? width : height;

        // Draw the wall
        for (let i = 0; i < length; i++) {
            if (wx + i * dx !== px || wy + i * dy !== py) {
                grid[wx + i * dx][wy + i * dy] = 1;
            }
        }

        setGrid([...grid]);
        await new Promise(resolve => setTimeout(resolve, delay));

        // Recursively divide the sub-chambers
        const [nx, ny, w, h] = horizontal
            ? [x, y, width, wy - y]
            : [x, y, wx - x, height];
        const [nx2, ny2, w2, h2] = horizontal
            ? [x, wy + 1, width, y + height - wy - 1]
            : [wx + 1, y, x + width - wx - 1, height];

        const nextOrientation = horizontal ? 'vertical' : 'horizontal';
        
        if (w > 1 && h > 1) await divide(nx, ny, w, h, nextOrientation);
        if (w2 > 1 && h2 > 1) await divide(nx2, ny2, w2, h2, nextOrientation);
    };

    divide(1, 1, cols - 2, rows - 2, Math.random() < 0.5 ? 'horizontal' : 'vertical')
        .then(() => {
            callback();
        });
}