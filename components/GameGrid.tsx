
import React from 'react';
import RoboCar from './RoboCar';
import { GameState, Position, RobotState, BASE_CELL_SIZE } from '../types';

interface GameGridProps {
  gameState: GameState;
  cellSize: number;
  theme: any;
}

const GameGrid: React.FC<GameGridProps> = ({ gameState, cellSize, theme }) => {
  return (
    <div 
      className={`grid-pattern border-4 ${gameState.theme === 'SPACE' ? 'border-indigo-900' : gameState.theme === 'CONSTRUCTION' ? 'border-slate-600' : 'border-slate-300'} rounded-2xl relative shadow-2xl overflow-hidden ${theme.grid}`} 
      style={{ 
          width: gameState.gridSize * cellSize + 4, 
          height: gameState.gridSize * cellSize + 4,
          backgroundSize: `${cellSize}px ${cellSize}px`,
          backgroundImage: `linear-gradient(to right, ${gameState.theme === 'SPACE' ? '#334155' : gameState.theme === 'CONSTRUCTION' ? '#94a3b8' : '#cbd5e1'} 1px, transparent 1px), linear-gradient(to bottom, ${gameState.theme === 'SPACE' ? '#334155' : gameState.theme === 'CONSTRUCTION' ? '#94a3b8' : '#cbd5e1'} 1px, transparent 1px)`
      }}
    >
        {gameState.items.map((item, i) => (
            <div key={i} className="absolute z-10 text-xl animate-bounce-slow flex items-center justify-center" 
              style={{ left: item.x * cellSize, top: item.y * cellSize, width: cellSize, height: cellSize }}>{theme.emoji}</div>
        ))}
        {gameState.robots.map(robot => (
            <RoboCar key={robot.id} pos={robot.pos} direction={robot.direction} cellSize={cellSize} id={robot.id} />
        ))}
    </div>
  );
};

export default GameGrid;
