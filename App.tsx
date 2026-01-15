
import React, { useState } from 'react';
import { GameTheme } from './types';
import { fruitTheme } from './themes/fruit';
import { spaceTheme } from './themes/space';
import { oceanTheme } from './themes/ocean';
import { constructionTheme } from './themes/construction';
import FruitGame from './games/FruitGame';
import SpaceGame from './games/SpaceGame';
import OceanGame from './games/OceanGame';
import ConstructionGame from './games/ConstructionGame';
import { playSound } from './hooks/useGameLogic';

const THEME_DATA = {
  FRUIT: fruitTheme,
  SPACE: spaceTheme,
  OCEAN: oceanTheme,
  CONSTRUCTION: constructionTheme,
};

const App: React.FC = () => {
  const [view, setView] = useState<'MENU' | 'GAME'>('MENU');
  const [activeTheme, setActiveTheme] = useState<GameTheme>('FRUIT');
  const [level, setLevel] = useState(0);

  const selectTheme = (themeKey: GameTheme) => {
    playSound('click');
    setActiveTheme(themeKey);
    setLevel(0);
    setView('GAME');
  };

  const handleHome = () => {
    playSound('click');
    setView('MENU');
  };

  if (view === 'MENU') {
    return (
      <div className="fixed inset-0 bg-sky-50 flex flex-col items-center justify-center p-6 safe-area-inset overflow-hidden">
        <h1 className="text-4xl font-game text-sky-600 mb-2 drop-shadow-md tracking-wider">ROBOCODE</h1>
        <p className="text-sky-400 font-bold mb-8 uppercase tracking-widest text-sm">Choose Your Adventure</p>
        <div className="grid grid-cols-1 gap-4 w-full max-w-md overflow-y-auto max-h-[70vh] p-2 custom-scrollbar">
          {(Object.entries(THEME_DATA) as [GameTheme, any][]).map(([key, config]) => (
            <button key={key} onClick={() => selectTheme(key)} className="bg-white p-4 rounded-3xl shadow-lg border-b-4 border-slate-200 active:scale-95 transition-all flex items-center gap-4 group hover:border-sky-300 w-full">
              <div className="text-4xl bg-sky-50 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:rotate-12 transition-transform shrink-0">
                {config.emoji}
              </div>
              <div className="text-left overflow-hidden">
                <h3 className="text-xl font-game text-slate-700">{config.name}</h3>
                <p className="text-xs text-slate-400 font-bold uppercase truncate">{config.desc}</p>
              </div>
              <div className="ml-auto text-sky-200 group-hover:text-sky-400 transition-colors">➜</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Render specific game components based on theme
  switch (activeTheme) {
    case 'FRUIT':
      return <FruitGame level={level} setLevel={setLevel} onHome={handleHome} />;
    case 'SPACE':
      return <SpaceGame level={level} setLevel={setLevel} onHome={handleHome} />;
    case 'OCEAN':
      return <OceanGame level={level} setLevel={setLevel} onHome={handleHome} />;
    case 'CONSTRUCTION':
      return <ConstructionGame level={level} setLevel={setLevel} onHome={handleHome} />;
    default:
      return null;
  }
};

export default App;
