import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { start_color, end_color } from "../config/config";

function Pannel({ onSizeChange, onGenerate, onSolve, onAlgoChange, onSolverAlgoChange, onClear, onStartColor, onEndColor, onDelayChange }) {
  const [isOpen, setIsOpen] = useState(true);
  const [startColor, setStartColor] = useState(start_color);
  const [endColor, setEndColor] = useState(end_color);
  const [delay, setDelay] = useState(20);

  const togglePanel = () => setIsOpen(!isOpen);

  return (
    <div className={`transition-all duration-300 ${isOpen ? "w-96 h-full" : "w-0 h-0"}`}>
      <div className={`glass rounded-md shadow-md h-full ${isOpen ? "p-4" : "p-0"}`}>
        <button onClick={togglePanel} className="text-2xl p-2" aria-expanded={isOpen}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {isOpen && (
          <>
            <h2 className="text-lg font-bold mb-4">Maze Control Panel</h2>

            <div className="mb-4">
              <label htmlFor="generation-algo" className="block text-sm font-medium mb-2">Generation Algorithm</label>
              <select id="generation-algo" className="select select-bordered w-full" onChange={(e) => onAlgoChange(e.target.value)}>
                <option value="dfs">Randomized Depth-First</option>
                <option value="kruskal">Kruskal's Algorithm</option>
                <option value="prim">Prim's Algorithm</option>
                <option value="wilson">Wilson's Algorithm</option>
                <option value="aldous-broder">Aldous-Broder Algorithm</option>
                <option value="recursive-division">Recursive Division</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="solver-algo" className="block text-sm font-medium mb-2">Solver Algorithm</label>
              <select id="solver-algo" className="select select-bordered w-full" onChange={(e) => onSolverAlgoChange(e.target.value)}>
                <option value="bfs">Breadth-First</option>
                <option value="bidirectional-bfs">Bidirectional Breadth-First</option>
                <option value="greedy-best-first">Greedy Best-First</option>
                <option value="dijkstra">Dijkstra</option>
                <option value="a-star">A*</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="maze-size" className="block text-sm font-medium mb-2">Maze Size</label>
              <select id="maze-size" className="select select-bordered w-full" onChange={(e) => onSizeChange(e.target.value)}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div className="mb-4 flex justify-between">
              <div>
                <label className="block text-sm font-medium mb-2">Start Color</label>
                <input type="color" value={startColor} onChange={(e) => {
                  setStartColor(e.target.value);
                  onStartColor(e.target.value);
                }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Color</label>
                <input type="color" value={endColor} onChange={(e) => {
                  setEndColor(e.target.value);
                  onEndColor(e.target.value);
                }} />
              </div>
            </div>

            <div className="mb-4">
              <input type="range" min="10" max="50" value={delay} className="range" step="10" 
                onChange={(e) => {
                  const newDelay = Number(e.target.value);
                  console.log(newDelay);
                  setDelay(newDelay);
                  onDelayChange(newDelay);
                }} />
              <div className="flex w-full justify-between px-2 text-xs">
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
              </div>
            </div>

            <button className="btn btn-primary w-full mb-2" onClick={onGenerate}>Generate</button>
            <button className="btn btn-secondary w-full mb-2" onClick={onSolve}>Solve</button>
            <button className="btn btn-neutral w-full mb-2" onClick={onClear}>Clear</button>
          </>
        )}
      </div>
    </div>
  );
}


export default Pannel;
