import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { start_color, end_color } from "../config/config";

function Pannel({ onSizeChange, onGenerate, onSolve, onAlgoChange, onSolverAlgoChange, onClear, onStartColor, onEndColor }) {
  const [isOpen, setIsOpen] = useState(true);
  const [startColor, setStartColor] = useState(start_color);
  const [endColor, setEndColor] = useState(end_color);

  useEffect(() => {
    onStartColor(startColor);
  }, [startColor]);

  useEffect(() => {
    onEndColor(endColor);
  }, [endColor]);


  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`transition-all duration-300 ${isOpen ? "w-96 h-full" : "w-0 h-0 "}`}>
      <div className={`glass rounded-md shadow-md h-full ${isOpen ? "p-4" : "p-0"}`}>
        <button
          onClick={togglePanel}
          className={`text-2xl ${isOpen ? "p-0" : "p-4"}`}
        >
          {isOpen ? <FiX /> : <FiMenu />} {/* Affiche l'icône en fonction de l'état */}
        </button>

        {isOpen && (
          <>
            <h2 className="text-lg font-bold mb-4">Maze Control Panel</h2>

            <div className="mb-4">
              <label htmlFor="generation-algo" className="block text-sm font-medium mb-2">
                Generation Algorithm
              </label>
              <select
                id="generation-algo"
                className="select select-bordered w-full"
                onChange={(e) => onAlgoChange(e.target.value)}
              >
                <option value="dfs">Randomized Depth-First</option>
                <option value="kruskal">Kruskal's Algorithm</option>
                <option value="prim">Prim's Algorithm</option>
                <option value="wilson">Wilson's Algorithm</option>
                <option value="aldous-broder">Aldous-Broder Algorithm</option>
                <option value="recursive-division">Recursive Division</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="solver-algo" className="block text-sm font-medium mb-2">
                Solver Algorithm
              </label>
              <select
                id="solver-algo"
                className="select select-bordered w-full"
                onChange={(e) => onSolverAlgoChange(e.target.value)}
              >
                <option value="bfs">Breadth-First</option>
                <option value="bidirectional-bfs">Bidirectional Breadth-First</option>
                <option value="greedy-best-first">Greedy Best-First</option>
                <option value="dijkstra">Dijkstra</option>
                <option value="a-star">A*</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="maze-size" className="block text-sm font-medium mb-2">
                Maze Size
              </label>
              <select
                id="maze-size"
                className="select select-bordered w-full"
                onChange={(e) => onSizeChange(e.target.value)}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div className="mb-4 flex justify-between">
              <div className="flex flex-col justify-center">
                <label htmlFor="hs-color-input" className="block text-sm font-medium mb-2">Starting point color</label>
                <input
                  type="color"
                  value={startColor}
                  onChange={(e) => setStartColor(e.target.value)}
                  title="Choose your color" />
              </div>
              <div className="flex flex-col justify-center">
                <label htmlFor="hs-color-input" className="block text-sm font-medium mb-2">Ending point color</label>
                <input
                  type="color"
                  value={endColor}
                  onChange={(e) => setEndColor(e.target.value)}
                  className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                  title="Choose your color" />
              </div>
            </div>

            <button
              className="btn btn-primary w-full mb-2"
              onClick={onGenerate}
            >
              Generate
            </button>
            <button
              className="btn btn-secondary w-full mb-2"
              onClick={onSolve}
            >
              Solve
            </button>
            <button
              className="btn btn-neutral w-full mb-2"
              onClick={onClear}
            >
              Clear
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Pannel;
