
import React from 'react';
import { Home } from 'lucide-react';
import { GameTheme } from '../types';

interface GameHeaderProps {
  onHome: () => void;
  emoji: string;
  collectedItems: number;
  totalItems: number;
  level: number;
  themeKey: GameTheme;
  totalLevels?: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({ onHome, emoji, collectedItems, totalItems, level, themeKey, totalLevels }) => {
  return (
    <header className="bg-white px-4 py-2 flex justify-between items-center shadow-sm z-30 shrink-0">
      <div className="flex items-center gap-2">
        <button onClick={onHome} className="text-sky-500 font-bold bg-sky-50 w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-transform">
          <Home size={18} strokeWidth={3} />
        </button>
        <h1 className="text-lg font-game text-sky-600 uppercase tracking-tight">ROBOCODE</h1>
      </div>
      <div className="flex gap-2">
        <div className={`px-2 py-1 rounded-lg border text-xs font-bold ${themeKey === 'CONSTRUCTION' ? 'bg-amber-100 border-amber-200 text-amber-700' : 'bg-green-100 border-green-200 text-green-700'}`}>
          {emoji} {collectedItems}/{totalItems}
        </div>
        <div className="bg-amber-100 px-2 py-1 rounded-lg border border-amber-200 text-xs font-bold text-amber-700">
          L{level + 1}{totalLevels ? `/${totalLevels}` : ''}
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
