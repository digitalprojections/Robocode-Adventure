
import React from 'react';
import { Direction, Position, RobotId } from '../types';

interface RoboCarProps {
  pos: Position;
  direction: Direction;
  cellSize: number;
  id: RobotId;
}

const RoboCar: React.FC<RoboCarProps> = ({ pos, direction, cellSize, id }) => {
  const getRotation = () => {
    switch (direction) {
      case 'UP': return 'rotate(0deg)';
      case 'RIGHT': return 'rotate(90deg)';
      case 'DOWN': return 'rotate(180deg)';
      case 'LEFT': return 'rotate(270deg)';
      default: return 'rotate(0deg)';
    }
  };

  const colorClasses = id === 'BLUE' ? 'bg-blue-400 border-blue-600' : 'bg-rose-400 border-rose-600';
  const eyeClasses = id === 'BLUE' ? 'border-blue-300' : 'border-rose-300';

  return (
    <div
      className="absolute transition-all duration-500 ease-in-out z-20 flex items-center justify-center"
      style={{
        left: pos.x * cellSize,
        top: pos.y * cellSize,
        width: cellSize,
        height: cellSize,
        transform: getRotation()
      }}
    >
      <div
        className={`relative w-4/5 h-4/5 ${colorClasses} rounded-xl shadow-xl overflow-hidden flex items-center justify-center`}
        style={{ borderWidth: Math.max(2, cellSize * 0.08) }}
      >
        {/* Wheels */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-gray-800 rounded-full"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-gray-800 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-gray-800 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-gray-800 rounded-full"></div>
        {/* Eyes/Windshield */}
        <div className={`w-3/4 h-1/4 bg-cyan-100 rounded-sm mb-2 border ${eyeClasses} flex justify-around px-1`}>
          <div className="w-1 h-1 bg-black rounded-full self-center"></div>
          <div className="w-1 h-1 bg-black rounded-full self-center"></div>
        </div>
      </div>
    </div>
  );
};

export default RoboCar;
