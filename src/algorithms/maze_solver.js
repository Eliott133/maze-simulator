// Utility function to get neighbors
const getNeighbors = (grid, current) => {
    const [row, col] = current;
    const neighbors = [];
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (
            newRow >= 0 && newRow < grid.length &&
            newCol >= 0 && newCol < grid[0].length &&
            grid[newRow][newCol] === 0
        ) {
            neighbors.push([newRow, newCol]);
        }
    }
    return neighbors;
};

// Utility function to calculate Manhattan distance
const manhattanDistance = (point1, point2) => {
    return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
};

export function bfs(grid, start, end, setGrid, delay = 50, callback) {
    console.log("delay bfs: " + delay);
    const visited = new Set();
    const queue = [[start]];
    const path = new Set();
    const originalGrid = grid.map(row => [...row]);

    const step = () => {
        if (queue.length === 0) {
            callback();
            return;
        }

        const currentPath = queue.shift();
        const current = currentPath[currentPath.length - 1];
        const key = `${current[0]},${current[1]}`;

        if (current[0] === end[0] && current[1] === end[1]) {
            currentPath.forEach(([r, c]) => {
                if (!(r === start[0] && c === start[1]) && !(r === end[0] && c === end[1])) {
                    originalGrid[r][c] = 2; // Mark path
                }
            });
            setGrid([...originalGrid]);
            callback();
            return;
        }

        if (!visited.has(key)) {
            visited.add(key);
            const neighbors = getNeighbors(grid, current);

            for (const neighbor of neighbors) {
                if (!visited.has(`${neighbor[0]},${neighbor[1]}`)) {
                    queue.push([...currentPath, neighbor]);
                }
            }

            if (!(current[0] === start[0] && current[1] === start[1]) && 
                !(current[0] === end[0] && current[1] === end[1])) {
                originalGrid[current[0]][current[1]] = 3; // Mark visited
            }
            setGrid([...originalGrid]);
        }

        setTimeout(step, delay);
    };

    step();
}

export function bidirectionalBfs(grid, start, end, setGrid, delay = 50, callback) {
    const startVisited = new Map();
    const endVisited = new Map();
    const startQueue = [[start]];
    const endQueue = [[end]];
    const originalGrid = grid.map(row => [...row]);

    startVisited.set(`${start[0]},${start[1]}`, [start]);
    endVisited.set(`${end[0]},${end[1]}`, [end]);

    const step = () => {
        if (startQueue.length === 0 || endQueue.length === 0) {
            callback();
            return;
        }

        // Process start side
        const currentStartPath = startQueue.shift();
        const currentStart = currentStartPath[currentStartPath.length - 1];
        const startNeighbors = getNeighbors(grid, currentStart);

        for (const neighbor of startNeighbors) {
            const key = `${neighbor[0]},${neighbor[1]}`;
            if (!startVisited.has(key)) {
                const newPath = [...currentStartPath, neighbor];
                startVisited.set(key, newPath);
                startQueue.push(newPath);

                if (endVisited.has(key)) {
                    const completePath = [
                        ...startVisited.get(key).slice(0, -1),
                        ...endVisited.get(key).reverse()
                    ];
                    completePath.forEach(([r, c]) => {
                        if (!(r === start[0] && c === start[1]) && !(r === end[0] && c === end[1])) {
                            originalGrid[r][c] = 2;
                        }
                    });
                    setGrid([...originalGrid]);
                    callback();
                    return;
                }
            }
        }

        // Process end side
        const currentEndPath = endQueue.shift();
        const currentEnd = currentEndPath[currentEndPath.length - 1];
        const endNeighbors = getNeighbors(grid, currentEnd);

        for (const neighbor of endNeighbors) {
            const key = `${neighbor[0]},${neighbor[1]}`;
            if (!endVisited.has(key)) {
                const newPath = [...currentEndPath, neighbor];
                endVisited.set(key, newPath);
                endQueue.push(newPath);

                if (startVisited.has(key)) {
                    const completePath = [
                        ...startVisited.get(key),
                        ...endVisited.get(key).slice(1).reverse()
                    ];
                    completePath.forEach(([r, c]) => {
                        if (!(r === start[0] && c === start[1]) && !(r === end[0] && c === end[1])) {
                            originalGrid[r][c] = 2;
                        }
                    });
                    setGrid([...originalGrid]);
                    callback();
                    return;
                }
            }
        }

        setGrid([...originalGrid]);
        setTimeout(step, delay);
    };

    step();
}

export function greedyBestFirst(grid, start, end, setGrid, delay = 50, callback) {
    const visited = new Set();
    const queue = [[start]];
    const originalGrid = grid.map(row => [...row]);

    const step = () => {
        if (queue.length === 0) {
            callback();
            return;
        }

        // Sort queue based on Manhattan distance to end
        queue.sort((a, b) => {
            const distA = manhattanDistance(a[a.length - 1], end);
            const distB = manhattanDistance(b[b.length - 1], end);
            return distA - distB;
        });

        const currentPath = queue.shift();
        const current = currentPath[currentPath.length - 1];
        const key = `${current[0]},${current[1]}`;

        if (current[0] === end[0] && current[1] === end[1]) {
            currentPath.forEach(([r, c]) => {
                if (!(r === start[0] && c === start[1]) && !(r === end[0] && c === end[1])) {
                    originalGrid[r][c] = 2;
                }
            });
            setGrid([...originalGrid]);
            callback();
            return;
        }

        if (!visited.has(key)) {
            visited.add(key);
            const neighbors = getNeighbors(grid, current);

            for (const neighbor of neighbors) {
                if (!visited.has(`${neighbor[0]},${neighbor[1]}`)) {
                    queue.push([...currentPath, neighbor]);
                }
            }

            if (!(current[0] === start[0] && current[1] === start[1]) && 
                !(current[0] === end[0] && current[1] === end[1])) {
                originalGrid[current[0]][current[1]] = 3;
            }
            setGrid([...originalGrid]);
        }

        setTimeout(step, delay);
    };

    step();
}

export function dijkstra(grid, start, end, setGrid, delay = 50, callback) {
    const distances = new Map();
    const previous = new Map();
    const unvisited = new Set();
    const originalGrid = grid.map(row => [...row]);

    // Initialize distances
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 0) {
                const key = `${i},${j}`;
                distances.set(key, Infinity);
                unvisited.add(key);
            }
        }
    }
    distances.set(`${start[0]},${start[1]}`, 0);

    const step = () => {
        if (unvisited.size === 0) {
            callback();
            return;
        }

        // Find vertex with minimum distance
        let minDistance = Infinity;
        let current = null;
        for (const vertex of unvisited) {
            const distance = distances.get(vertex);
            if (distance < minDistance) {
                minDistance = distance;
                current = vertex;
            }
        }

        if (!current || minDistance === Infinity) {
            callback();
            return;
        }

        const [currentRow, currentCol] = current.split(',').map(Number);
        unvisited.delete(current);

        if (currentRow === end[0] && currentCol === end[1]) {
            // Reconstruct path
            let curr = `${end[0]},${end[1]}`;
            while (curr !== `${start[0]},${start[1]}`) {
                const [r, c] = curr.split(',').map(Number);
                if (!(r === start[0] && c === start[1]) && !(r === end[0] && c === end[1])) {
                    originalGrid[r][c] = 2;
                }
                curr = previous.get(curr);
            }
            setGrid([...originalGrid]);
            callback();
            return;
        }

        // Update distances to neighbors
        const neighbors = getNeighbors(grid, [currentRow, currentCol]);
        for (const [nRow, nCol] of neighbors) {
            const neighborKey = `${nRow},${nCol}`;
            if (unvisited.has(neighborKey)) {
                const newDistance = distances.get(current) + 1;
                if (newDistance < distances.get(neighborKey)) {
                    distances.set(neighborKey, newDistance);
                    previous.set(neighborKey, current);
                }
            }
        }

        if (!(currentRow === start[0] && currentCol === start[1]) && 
            !(currentRow === end[0] && currentCol === end[1])) {
            originalGrid[currentRow][currentCol] = 3;
        }
        setGrid([...originalGrid]);

        setTimeout(step, delay);
    };

    step();
}

export function aStar(grid, start, end, setGrid, delay = 50, callback) {
    const openSet = new Set([`${start[0]},${start[1]}`]);
    const closedSet = new Set();
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();
    const originalGrid = grid.map(row => [...row]);

    gScore.set(`${start[0]},${start[1]}`, 0);
    fScore.set(`${start[0]},${start[1]}`, manhattanDistance(start, end));

    const step = () => {
        if (openSet.size === 0) {
            callback();
            return;
        }

        // Find node with lowest fScore
        let current = null;
        let lowestFScore = Infinity;
        for (const node of openSet) {
            const score = fScore.get(node) || Infinity;
            if (score < lowestFScore) {
                lowestFScore = score;
                current = node;
            }
        }

        const [currentRow, currentCol] = current.split(',').map(Number);

        if (currentRow === end[0] && currentCol === end[1]) {
            // Reconstruct path
            let curr = current;
            while (curr) {
                const [r, c] = curr.split(',').map(Number);
                if (!(r === start[0] && c === start[1]) && !(r === end[0] && c === end[1])) {
                    originalGrid[r][c] = 2;
                }
                curr = cameFrom.get(curr);
            }
            setGrid([...originalGrid]);
            callback();
            return;
        }

        openSet.delete(current);
        closedSet.add(current);

        const neighbors = getNeighbors(grid, [currentRow, currentCol]);
        for (const [nRow, nCol] of neighbors) {
            const neighborKey = `${nRow},${nCol}`;
            if (closedSet.has(neighborKey)) continue;

            const tentativeGScore = (gScore.get(current) || 0) + 1;

            if (!openSet.has(neighborKey)) {
                openSet.add(neighborKey);
            } else if (tentativeGScore >= (gScore.get(neighborKey) || Infinity)) {
                continue;
            }

            cameFrom.set(neighborKey, current);
            gScore.set(neighborKey, tentativeGScore);
            fScore.set(neighborKey, tentativeGScore + manhattanDistance([nRow, nCol], end));
        }

        if (!(currentRow === start[0] && currentCol === start[1]) && 
            !(currentRow === end[0] && currentCol === end[1])) {
            originalGrid[currentRow][currentCol] = 3;
        }
        setGrid([...originalGrid]);

        setTimeout(step, delay);
    };

    step();
}