export function kruskal(rows, cols, setGrid, delay = 50, callback) {
    //TODO
}


export function randomizedDepthFirstStepByStep(rows, cols, setGrid, delay = 50, callback) {
    const grid = Array.from({ length: rows }, () => Array(cols).fill(1));
    const stack = [];
    const directions = [
        [0, -2], // Haut
        [0, 2],  // Bas
        [-2, 0], // Gauche
        [2, 0],  // Droite
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
            callback(); // Appelle le callback pour signaler la fin
            return;
        }
        if (stack.length > 0) {
            const [x, y] = stack[stack.length - 1];
            const shuffledDirections = directions.sort(() => Math.random() - 0.5);

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
