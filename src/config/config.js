import { 
    kruskal, 
    randomizedDepthFirstStepByStep,
    prim,
    wilson,
    aldousBroder,
    recursiveDivision
} from "../algorithms/maze_generator";

import {
    bfs,
    bidirectionalBfs,
    greedyBestFirst,
    dijkstra,
    aStar
} from "../algorithms/maze_solver";

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

// Size mapping
export const sizeMapping = {
    small: [10, 10],
    medium: [20, 20],
    large: [30, 30],
};

// Algorithm mapping for maze generation
export const algoMapping = {
    dfs: randomizedDepthFirstStepByStep,
    kruskal: kruskal,
    prim: prim,
    wilson: wilson,
    'aldous-broder': aldousBroder,
    'recursive-division': recursiveDivision
};

// Algorithm mapping for maze solving
export const solverMapping = {
    bfs: bfs,
    'bidirectional-bfs': bidirectionalBfs,
    'greedy-best-first': greedyBestFirst,
    dijkstra: dijkstra,
    'a-star': aStar
};

export const start_color = "#00FF00";
export const end_color = "#FF0000";