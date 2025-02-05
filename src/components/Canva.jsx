import React, { useEffect, useRef, useState } from "react";
import UserFeedback from "./common/UserFeedback";

function Canva({
    id,
    grid,
    minCellSize,
    maxCellSize,
    wallColor,
    pathColor,
    startPointCord,
    endPointCord,
    startColor,
    endColor,
    onCellClick,
}) {
    const canvasRef = useRef(null);
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (grid && context) {
            const rows = grid.length;
            const cols = grid[0].length;

            const canvasWidth = canvas.parentElement.clientWidth;
            const canvasHeight = canvas.parentElement.clientHeight;
            const cellSize = Math.max(
                minCellSize,
                Math.min(maxCellSize, Math.min(canvasWidth / cols, canvasHeight / rows))
            );

            canvas.width = cols * cellSize;
            canvas.height = rows * cellSize;

            context.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the grid
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    context.fillStyle = grid[row][col] === 0 ? pathColor : wallColor;
                    context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
                    context.strokeStyle = "#000000";
                    context.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
                }
            }

            // Draw the start point
            if (startPointCord) {
                const [startX, startY] = startPointCord;
                context.fillStyle = startColor;
                context.fillRect(startY * cellSize, startX * cellSize, cellSize, cellSize);
            }

            // Draw the end point
            if (endPointCord) {
                const [endX, endY] = endPointCord;
                context.fillStyle = endColor;
                context.fillRect(endY * cellSize, endX * cellSize, cellSize, cellSize);
            }
        }
    }, [grid, minCellSize, maxCellSize, wallColor, pathColor, startPointCord, endPointCord]);

    // Handle canvas click
    const handleClick = (event) => {
        const canvas = canvasRef.current;
        if (!canvas || !grid) return;

        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientY - rect.top) / (canvas.height / grid.length));
        const y = Math.floor((event.clientX - rect.left) / (canvas.width / grid[0].length));

        if (onCellClick && grid[x] && grid[x][y] === 0) {
            onCellClick(x, y);
        } else {
            setShowWarning(true);
        }
    };

    const handleCloseWarning = () => {
        setShowWarning(false);  // Ferme la pop-up
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            {grid && grid.length > 0 ? (
                <canvas
                    ref={canvasRef}
                    className="border-2 border-gray-400"
                    id={id}
                    onClick={handleClick}
                />
            ) : (
                <p className="text-lg font-bold text-gray-500">
                    No maze to display. Generate one to start.
                </p>
            )}

            {showWarning && (
                <UserFeedback
                    lvl_error="Attention"
                    message="Vous ne pouvez pas placer le point de départ ou d'arrivée sur un mur."
                    onClose={handleCloseWarning}
                />
            )}
        </div>
    );
}

export default Canva