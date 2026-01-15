
import React from 'react';

interface GameOverlayProps {
  isVictory: boolean;
  showFail: boolean;
  onNext: () => void;
  onFix: () => void;
  onClear: () => void;
}

const GameOverlay: React.FC<GameOverlayProps> = ({ isVictory, showFail, onNext, onFix, onClear }) => {
  if (isVictory) {
    return (
      <div className="absolute inset-0 bg-white/80 z-40 flex items-center justify-center flex-col gap-4 animate-in fade-in duration-300">
          <div className="text-6xl mb-2">🌟</div>
          <h3 className="font-game text-green-600 text-xl uppercase">Success!</h3>
          <button onClick={onNext} className="bg-yellow-400 text-white font-game px-8 py-3 rounded-2xl shadow-xl active:scale-95">NEXT ➜</button>
      </div>
    );
  }

  if (showFail) {
    return (
      <div className="absolute inset-0 bg-sky-900/40 z-40 flex items-center justify-center flex-col gap-4 animate-in zoom-in duration-300 backdrop-blur-sm">
          <div className="text-5xl mb-2">⚡</div>
          <div className="flex gap-4">
              <button onClick={onFix} className="bg-white text-sky-600 font-game px-6 py-2 rounded-xl shadow-lg active:scale-95 uppercase text-sm">Fix</button>
              <button onClick={onClear} className="bg-rose-500 text-white font-game px-6 py-2 rounded-xl shadow-lg active:scale-95 uppercase text-sm">Clear</button>
          </div>
      </div>
    );
  }

  return null;
};

export default GameOverlay;
