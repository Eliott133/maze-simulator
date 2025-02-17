import React, { useState } from "react";
import Pannel from "./components/Pannel";
import Canva from "./components/Canva";
import UserFeedback from "./components/common/UserFeedback";
import { sizeMapping, algoMapping, default_grid, solverMapping, start_color, end_color } from "./config/config";

function App() {

  const [grid, setGrid] = useState([]);
  const [size, setSize] = useState("small"); // Default  maze size
  const [generationAlgo, setGenerationAlgo] = useState("dfs");
  const [solverAlgo, setSolverAlgo] = useState("bfs");
  const [feedbackMessages, setFeedbackMessages] = useState([]);


  const [startPoint, setStartPoint] = useState(null); // Start point coordinates
  const [endPoint, setEndPoint] = useState(null);
  const [startPointColor, setStartPointColor] = useState(start_color);
  const [endPointColor, setEndPointColor] = useState(end_color);
  const [delaySolver, setDelaySolver] = useState(10);
  const [isSelectingStart, setIsSelectingStart] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const minCellSize = 10;
  const maxCellSize = 50;

  // Function to handle maze size change
  const handleSizeChange = (newSize) => {
    setSize(newSize);
    console.log("Taille choisi : " + newSize);
  };

  const handleAlgoChange = (newAlgo) => {
    setGenerationAlgo(newAlgo);
    console.log("Algo de génération choisi : " + newAlgo);
  }

  const handleSolverChange = (newAlgo) => {
    setSolverAlgo(newAlgo);
    console.log("Algo de résolution choisi : " + newAlgo);
  }

  const handlePrintClick = () => {
    const canvas = document.getElementById("maze-canva");
    if (!canvas) {
      console.error("Canevas introuvable !");
      addFeedbackMessage("Erreur", "Veuillez générer un labyrinthe avant d'imprimer.");
      return;
    }

    const dataUrl = canvas.toDataURL("image/png");
    const windowContent = `<img src="${dataUrl}" style="width:100%; height: 100%"/>`;
    const printWindow = window.open("", "");
    printWindow.document.open();
    printWindow.document.write(windowContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };


  // Function to generate a grid based on the selected size
  const generateMaze = () => {
    const dimensions = sizeMapping[size];
    const algorithm = algoMapping[generationAlgo];

    if (!dimensions || !algorithm) {
      addFeedbackMessage("Erreur", "Veuillez selectionner un algorithme de génération et une taille de labyrinthe valide.");
      return;
    }

    setIsLoading(true);
    algorithm(dimensions[0], dimensions[1], setGrid, 10, () => {
      setIsLoading(false);
    });
  };

  // Function to handle maze generation
  const handleGenerate = () => {
    handleClear();
    generateMaze();
  };

  const handleSolve = () => {
    const algoSolver = solverMapping[solverAlgo];

    if(!algoSolver){
      addFeedbackMessage("Erreur", "Veuillez selectionner un algorithme de résolution valide.");
      return;
    }
    if(!startPoint && !endPoint){
      addFeedbackMessage("Erreur", "Veuillez ajouter un point de départ et un point d'arriver. Il suffit de cliquer sur une case du labyrinthes");
      return;
    }
    algoSolver(grid, startPoint, endPoint, setGrid, delaySolver, () =>{})
  };

  const handleClear = () => {
    setStartPoint(null);
    setEndPoint(null);
  }

  const handleCellClick = (x, y) => {
    if (isSelectingStart) {
      setStartPoint([x, y]);
      setIsSelectingStart(false); // Next click will select the end point
    } else {
      setEndPoint([x, y]);
      setIsSelectingStart(true); // Reset to start point selection
    }
  };

  const addFeedbackMessage = (lvl_error, message) => {
    setFeedbackMessages(prevMessages => [
      ...prevMessages,
      { id: Date.now(), lvl_error, message },
    ]);
  };

  const closeFeedbackMessage = (id) => {
    setFeedbackMessages(prevMessages =>
      prevMessages.filter(msg => msg.id !== id)
    );
  };  
  
  return (
    <>
      {feedbackMessages.map((msg) => (
        <UserFeedback
          key={msg.id}
          lvl_error={msg.lvl_error}
          message={msg.message}
          onClose={() => closeFeedbackMessage(msg.id)}
        />
      ))}
      <div className="flex h-screen">
        <div className="p-4">
          <Pannel
            onSizeChange={handleSizeChange}
            onAlgoChange={handleAlgoChange}
            onSolverAlgoChange={handleSolverChange}
            onGenerate={handleGenerate}
            onSolve={handleSolve}
            onClear={handleClear}
            onStartColor={(color) => setStartPointColor(color)}
            onEndColor={(color) => setEndPointColor(color)}
            onDelayChange={(delay) => setDelaySolver(delay)}
          />
        </div>

        <div className="w-full p-4 flex items-center justify-center relative">
          <button
            className="btn btn-primary absolute bottom-0 right-0 m-4"
            onClick={handlePrintClick}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M18 16.75H16C15.8011 16.75 15.6103 16.671 15.4697 16.5303C15.329 16.3897 15.25 16.1989 15.25 16C15.25 15.8011 15.329 15.6103 15.4697 15.4697C15.6103 15.329 15.8011 15.25 16 15.25H18C18.3315 15.25 18.6495 15.1183 18.8839 14.8839C19.1183 14.6495 19.25 14.3315 19.25 14V10C19.25 9.66848 19.1183 9.35054 18.8839 9.11612C18.6495 8.8817 18.3315 8.75 18 8.75H6C5.66848 8.75 5.35054 8.8817 5.11612 9.11612C4.8817 9.35054 4.75 9.66848 4.75 10V14C4.75 14.3315 4.8817 14.6495 5.11612 14.8839C5.35054 15.1183 5.66848 15.25 6 15.25H8C8.19891 15.25 8.38968 15.329 8.53033 15.4697C8.67098 15.6103 8.75 15.8011 8.75 16C8.75 16.1989 8.67098 16.3897 8.53033 16.5303C8.38968 16.671 8.19891 16.75 8 16.75H6C5.27065 16.75 4.57118 16.4603 4.05546 15.9445C3.53973 15.4288 3.25 14.7293 3.25 14V10C3.25 9.27065 3.53973 8.57118 4.05546 8.05546C4.57118 7.53973 5.27065 7.25 6 7.25H18C18.7293 7.25 19.4288 7.53973 19.9445 8.05546C20.4603 8.57118 20.75 9.27065 20.75 10V14C20.75 14.7293 20.4603 15.4288 19.9445 15.9445C19.4288 16.4603 18.7293 16.75 18 16.75Z" fill="#000000" />
              <path d="M16 8.75C15.8019 8.74741 15.6126 8.66756 15.4725 8.52747C15.3324 8.38737 15.2526 8.19811 15.25 8V4.75H8.75V8C8.75 8.19891 8.67098 8.38968 8.53033 8.53033C8.38968 8.67098 8.19891 8.75 8 8.75C7.80109 8.75 7.61032 8.67098 7.46967 8.53033C7.32902 8.38968 7.25 8.19891 7.25 8V4.5C7.25 4.16848 7.3817 3.85054 7.61612 3.61612C7.85054 3.3817 8.16848 3.25 8.5 3.25H15.5C15.8315 3.25 16.1495 3.3817 16.3839 3.61612C16.6183 3.85054 16.75 4.16848 16.75 4.5V8C16.7474 8.19811 16.6676 8.38737 16.5275 8.52747C16.3874 8.66756 16.1981 8.74741 16 8.75Z" fill="#000000" />
              <path d="M15.5 20.75H8.5C8.16848 20.75 7.85054 20.6183 7.61612 20.3839C7.3817 20.1495 7.25 19.8315 7.25 19.5V12.5C7.25 12.1685 7.3817 11.8505 7.61612 11.6161C7.85054 11.3817 8.16848 11.25 8.5 11.25H15.5C15.8315 11.25 16.1495 11.3817 16.3839 11.6161C16.6183 11.8505 16.75 12.1685 16.75 12.5V19.5C16.75 19.8315 16.6183 20.1495 16.3839 20.3839C16.1495 20.6183 15.8315 20.75 15.5 20.75ZM8.75 19.25H15.25V12.75H8.75V19.25Z" fill="#000000" />
            </svg>
            Imprimer le labyrinthe
          </button>

          {isLoading && (
            <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-10">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}

          <Canva
            id="maze-canva"
            grid={grid}
            minCellSize={minCellSize}
            maxCellSize={maxCellSize}
            wallColor={"#aaaaaa"}
            pathColor={"#ffffff"}
            startPointCord={startPoint}
            endPointCord={endPoint}
            startColor={startPointColor}
            endColor={endPointColor}
            onCellClick={handleCellClick} />
        </div>
      </div>
    </>
  );
}

export default App;
