
import React from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import { fruitTheme } from '../themes/fruit';
import GameHeader from '../components/GameHeader';
import GameGrid from '../components/GameGrid';
import SequenceArea from '../components/SequenceArea';
import CodePalette from '../components/CodePalette';
import GameOverlay from '../components/GameOverlay';
import { BASE_CELL_SIZE } from '../types';

interface FruitGameProps {
  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  onHome: () => void;
}

const FruitGame: React.FC<FruitGameProps> = ({ level, setLevel, onHome }) => {
  const {
    program,
    gameState,
    activeBlockId,
    selectedRepeatId,
    showFailOverlay,
    history,
    addBlock,
    removeBlock,
    updateRepeatValue,
    toggleSelectRepeat,
    handleUndo,
    resetLevel,
    runProgram
  } = useGameLogic('FRUIT', fruitTheme.missions, level, () => {});

  const cellSize = Math.min(BASE_CELL_SIZE, (window.innerWidth - 40) / gameState.gridSize);
  const totalItems = fruitTheme.missions[level].items.length;

  return (
    <div className={`fixed inset-0 flex flex-col ${fruitTheme.bg} overflow-hidden safe-area-inset`}>
      <GameHeader 
        onHome={onHome} 
        emoji={fruitTheme.emoji} 
        collectedItems={gameState.collectedItems} 
        totalItems={totalItems} 
        level={level} 
        themeKey="FRUIT"
      />

      <div className="h-[48%] w-full relative flex items-center justify-center p-2 border-b-2 border-white/50 overflow-hidden shrink-0 bg-white/30 shadow-inner">
        <div className="absolute top-2 left-2 z-10">
          <div className="bg-white/90 rounded-lg px-2 py-0.5 shadow-sm border border-sky-100">
            <p className="text-sky-700 text-[10px] font-bold uppercase tracking-wider">{gameState.message}</p>
          </div>
        </div>
        
        <GameGrid gameState={gameState} cellSize={cellSize} theme={fruitTheme} />
        
        <GameOverlay 
          isVictory={gameState.items.length === 0 && !gameState.isExecuting && !showFailOverlay && gameState.collectedItems > 0} 
          showFail={showFailOverlay && !gameState.isExecuting} 
          onNext={() => level < fruitTheme.missions.length - 1 ? setLevel(l => l + 1) : onHome()}
          onFix={() => resetLevel(false)}
          onClear={() => resetLevel(true)}
        />
      </div>

      <SequenceArea 
        program={program}
        maxSlots={48}
        activeBlockId={activeBlockId}
        selectedRepeatId={selectedRepeatId}
        isExecuting={gameState.isExecuting}
        historyLength={history.length}
        onRemoveBlock={removeBlock}
        onUpdateRepeatValue={updateRepeatValue}
        onToggleSelectRepeat={toggleSelectRepeat}
        onUndo={handleUndo}
        onRun={runProgram}
        onReset={resetLevel}
      />

      <CodePalette onAddBlock={(t) => addBlock(t)} />
    </div>
  );
};

export default FruitGame;
