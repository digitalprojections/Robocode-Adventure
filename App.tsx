
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
import { useGameProgress } from './hooks/useGameProgress';

import LevelSelectPage from './components/LevelSelectPage';

import LevelDesignerPage from './components/LevelDesignerPage';
import CustomLevelSelectPage from './components/CustomLevelSelectPage';
import { CustomLevel } from './utils/db';

const THEME_DATA = {
  FRUIT: fruitTheme,
  SPACE: spaceTheme,
  OCEAN: oceanTheme,
  CONSTRUCTION: constructionTheme,
};

const App: React.FC = () => {
  const [view, setView] = useState<'MENU' | 'LEVEL_SELECT' | 'GAME' | 'BUILDER' | 'MY_LEVELS'>('MENU');
  const [activeTheme, setActiveTheme] = useState<GameTheme>('FRUIT');
  const [level, setLevel] = useState(0);
  const [customLevelData, setCustomLevelData] = useState<CustomLevel | null>(null);
  const { getSavedLevel, saveProgress } = useGameProgress();

  React.useEffect(() => {
    if (view === 'GAME' && !customLevelData) {
      saveProgress(activeTheme, level);
    }
  }, [level, activeTheme, view, customLevelData]);

  const selectTheme = (themeKey: GameTheme) => {
    playSound('click');
    setActiveTheme(themeKey);
    setCustomLevelData(null);
    setView('LEVEL_SELECT');
  };

  const startGameAtLevel = (lvl: number) => {
    playSound('click');
    setLevel(lvl);
    setCustomLevelData(null);
    setView('GAME');
  };

  const playCustomLevel = (cLevel: CustomLevel) => {
    playSound('click');
    setCustomLevelData(cLevel);
    setActiveTheme('FRUIT'); // Default theme for custom levels for now
    setView('GAME');
  };

  const handleBackToSelect = () => {
    playSound('click');
    if (customLevelData) {
      setView('MY_LEVELS');
    } else {
      setView('LEVEL_SELECT');
    }
  };

  const handleHome = () => {
    playSound('click');
    setView('MENU');
    setCustomLevelData(null);
  };

  if (view === 'MENU') {
    return (
      <div className="fixed inset-0 bg-sky-50 flex flex-col items-center justify-center p-6 safe-area-inset overflow-hidden">
        <h1 className="text-4xl font-game text-sky-600 mb-2 drop-shadow-md tracking-wider">ROBOCODE</h1>
        <p className="text-sky-400 font-bold mb-8 uppercase tracking-widest text-sm">Choose Your Adventure</p>
        {(Object.entries(THEME_DATA) as [GameTheme, any][]).map(([key, config]) => (
          <button key={key} onClick={() => selectTheme(key)} className="bg-white p-4 rounded-3xl shadow-lg border-b-4 border-slate-200 active:scale-95 transition-all flex items-center gap-4 group hover:border-sky-300 w-full mb-4">
            <div className="text-4xl bg-sky-50 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:rotate-12 transition-transform shrink-0">
              {config.emoji}
            </div>
            <div className="text-left overflow-hidden">
              <h3 className="text-xl font-game text-slate-700">{config.name}</h3>
              <p className="text-xs text-slate-400 font-bold uppercase truncate">
                {config.missions?.length || 0} Levels • {config.desc}
              </p>
            </div>
            <div className="ml-auto text-sky-200 group-hover:text-sky-400 transition-colors">➜</div>
          </button>
        ))}

        <div className="mt-8 flex gap-4">
          <button onClick={() => setView('MY_LEVELS')} className="text-sky-400 bg-sky-100 hover:bg-sky-200 px-6 py-2 rounded-full font-bold text-sm transition-colors uppercase">
            📂 My Levels
          </button>
          <button onClick={() => setView('BUILDER')} className="text-sky-400 bg-sky-100 hover:bg-sky-200 px-6 py-2 rounded-full font-bold text-sm transition-colors uppercase">
            🛠️ Builder
          </button>
        </div>
      </div>
    );
  }

  if (view === 'BUILDER') {
    return <LevelDesignerPage onBack={handleHome} />;
  }

  if (view === 'MY_LEVELS') {
    return <CustomLevelSelectPage onBack={handleHome} onPlayLevel={playCustomLevel} />;
  }

  if (view === 'LEVEL_SELECT') {
    return (
      <LevelSelectPage
        theme={THEME_DATA[activeTheme]}
        themeKey={activeTheme}
        unlockedLevel={getSavedLevel(activeTheme)}
        onSelectLevel={startGameAtLevel}
        onBack={handleHome}
      />
    );
  }

  // Render specific game components based on theme
  const gameProps = {
    level,
    setLevel,
    onHome: handleBackToSelect
  };

  // If playing custom level, we override the FruitGame to use custom missions
  if (customLevelData) {
    // Create a temporary theme config wrapper for the single level
    // We pass level=0 because it's a single level "mission list"
    return (
      <FruitGame
        level={0}
        setLevel={() => { }} // No next level for custom
        onHome={handleBackToSelect}
        // We need to injection mechanism or specific prop for custom data
        // Since FruitGame uses useGameLogic internally with fruitTheme.missions, 
        // we should probably modify FruitGame or create a specialized CustomGameWrapper
        // For now, let's just make FruitGame accept a "customMission" prop override.
        customMission={customLevelData}
      />
    );
  }

  switch (activeTheme) {
    case 'FRUIT':
      return <FruitGame {...gameProps} />;
    case 'SPACE':
      return <SpaceGame {...gameProps} />;
    case 'OCEAN':
      return <OceanGame {...gameProps} />;
    case 'CONSTRUCTION':
      return <ConstructionGame {...gameProps} />;
    default:
      return null;
  }
};

export default App;
