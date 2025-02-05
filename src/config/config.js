import { kruskal, randomizedDepthFirstStepByStep } from "../algorithms/maze_generator";
// Importez d'autres algorithmes si nécessaire

export const default_grid = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Mapping des tailles à leurs dimensions
export const sizeMapping = {
    small: [10, 10],
    medium: [20, 20],
    large: [30, 30],
};

// Mapping des algorithmes à leurs fonctions
export const algoMapping = {
    dfs: randomizedDepthFirstStepByStep,
    kruskal: kruskal,
};

export const start_color = "#00FF00";
export const end_color = "#FF0000";
