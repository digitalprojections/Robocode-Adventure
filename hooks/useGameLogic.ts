
import { useState, useEffect, useRef, useCallback } from 'react';
import { BlockType, CodeBlock, GameState, Position, Direction, RobotState, GameTheme } from '../types';

const MAX_SLOTS = 48;

export const playSound = (type: 'move' | 'turn' | 'collect' | 'success' | 'fail' | 'wall' | 'undo' | 'click') => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;

    switch (type) {
      case 'move':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now); osc.stop(now + 0.2);
        break;
      case 'turn':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now); osc.stop(now + 0.05);
        break;
      case 'collect':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now); osc.stop(now + 0.3);
        break;
      case 'success':
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const o = ctx.createOscillator(); const g = ctx.createGain();
          o.type = 'square'; o.connect(g); g.connect(ctx.destination);
          o.frequency.setValueAtTime(freq, now + i * 0.1);
          g.gain.setValueAtTime(0.05, now + i * 0.1);
          g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.3);
          o.start(now + i * 0.1); o.stop(now + i * 0.1 + 0.3);
        });
        break;
      case 'fail':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.linearRampToValueAtTime(50, now + 0.4);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
        osc.start(now); osc.stop(now + 0.4);
        break;
      case 'wall':
        osc.type = 'square';
        osc.frequency.setValueAtTime(80, now);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now); osc.stop(now + 0.1);
        break;
      case 'undo':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now); osc.stop(now + 0.1);
        break;
      case 'click':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now); osc.stop(now + 0.05);
        break;
    }
  } catch (e) {
    console.warn("Audio context blocked or unavailable", e);
  }
};

export const useGameLogic = (themeKey: GameTheme, currentMissionSet: any[], level: number, onComplete: () => void) => {
  const [program, setProgram] = useState<CodeBlock[]>([]);
  const [history, setHistory] = useState<CodeBlock[][]>([]);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [selectedRepeatId, setSelectedRepeatId] = useState<string | null>(null);
  const [showFailOverlay, setShowFailOverlay] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    robots: JSON.parse(JSON.stringify(currentMissionSet[level].robots)),
    collectedItems: 0,
    isExecuting: false,
    message: "Lvl " + (level + 1),
    level: level,
    items: [...currentMissionSet[level].items],
    gridSize: currentMissionSet[level].gridSize,
    theme: themeKey
  });

  const abortControllerRef = useRef<boolean>(false);

  useEffect(() => {
    const currentLvl = currentMissionSet[level];
    setGameState({
        robots: JSON.parse(JSON.stringify(currentLvl.robots)),
        collectedItems: 0,
        isExecuting: false,
        message: "Lvl " + (level + 1),
        level: level,
        items: [...currentLvl.items],
        gridSize: currentLvl.gridSize,
        theme: themeKey
    });
    setProgram([]);
    setHistory([]);
    setSelectedRepeatId(null);
    setShowFailOverlay(false);
  }, [level, themeKey]);

  const saveToHistory = (newProgram: CodeBlock[]) => {
    setHistory(prev => [...prev, program]);
    setProgram(newProgram);
  };

  const handleUndo = useCallback(() => {
    if (history.length === 0 || gameState.isExecuting) return;
    const previous = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setProgram(previous);
    playSound('undo');
  }, [history, program, gameState.isExecuting]);

  const resetLevel = (clearProgram: boolean = false) => {
    abortControllerRef.current = true;
    setActiveBlockId(null);
    setSelectedRepeatId(null);
    setShowFailOverlay(false);
    
    const currentLvl = currentMissionSet[level];
    setGameState(prev => ({
      ...prev,
      robots: JSON.parse(JSON.stringify(currentLvl.robots)),
      collectedItems: 0,
      isExecuting: false,
      message: clearProgram ? "Restart!" : "Ready!",
      items: [...currentLvl.items]
    }));

    if (clearProgram) {
        setHistory([]);
        setProgram([]);
    }
    playSound('undo');
  };

  const addBlock = (type: BlockType, forceParentId?: string) => {
    if (gameState.isExecuting) return;
    const targetParentId = forceParentId || selectedRepeatId;
    if (!targetParentId && program.length >= MAX_SLOTS) {
        playSound('wall');
        return;
    }

    const newBlock: CodeBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      value: type === BlockType.REPEAT ? 2 : undefined,
      subBlocks: type === BlockType.REPEAT ? [] : undefined,
    };

    let newProgram: CodeBlock[];
    if (targetParentId) {
      newProgram = program.map(b => {
        if (b.id === targetParentId) {
            if ((b.subBlocks?.length || 0) >= 3) return b;
            return { ...b, subBlocks: [...(b.subBlocks || []), newBlock] };
        }
        return b;
      });
    } else {
      newProgram = [...program, newBlock];
    }
    saveToHistory(newProgram);
    playSound('turn');
    if (type === BlockType.REPEAT && !targetParentId) {
        setSelectedRepeatId(newBlock.id);
    }
  };

  const removeBlock = (id: string, parentId?: string) => {
    if (gameState.isExecuting) return;
    let newProgram: CodeBlock[];
    if (parentId) {
      newProgram = program.map(b => {
        if (b.id === parentId) return { ...b, subBlocks: b.subBlocks?.filter(sb => sb.id !== id) };
        return b;
      });
    } else {
      newProgram = program.filter(b => b.id !== id);
      if (id === selectedRepeatId) setSelectedRepeatId(null);
    }
    saveToHistory(newProgram);
    playSound('wall');
  };

  const updateRepeatValue = (id: string, value: number) => {
    if (gameState.isExecuting) return;
    const newProgram = program.map(b => b.id === id ? { ...b, value } : b);
    saveToHistory(newProgram);
  };

  const toggleSelectRepeat = (id: string) => {
      if (gameState.isExecuting) return;
      setSelectedRepeatId(prev => prev === id ? null : id);
      playSound('click');
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const executeAction = async (block: CodeBlock, sharedState: { robots: RobotState[], items: Position[], count: number, gridSize: number }): Promise<boolean> => {
    if (abortControllerRef.current) return false;
    setActiveBlockId(block.id);
    await sleep(350);

    if (block.type === BlockType.REPEAT) {
        const times = block.value || 2;
        const sub = block.subBlocks || [];
        for (let t = 0; t < times; t++) {
          for (const subBlock of sub) {
            if (abortControllerRef.current) return false;
            const success = await executeAction(subBlock, sharedState);
            if (!success) return false;
            setGameState(prev => ({
              ...prev,
              robots: [...sharedState.robots],
              items: [...sharedState.items],
              collectedItems: sharedState.count
            }));
          }
        }
    } else {
        for (const robot of sharedState.robots) {
            if (abortControllerRef.current) return false;
            switch (block.type) {
                case BlockType.MOVE_FORWARD: {
                  const nextPos = { ...robot.pos };
                  if (robot.direction === 'UP') nextPos.y -= 1;
                  if (robot.direction === 'DOWN') nextPos.y += 1;
                  if (robot.direction === 'LEFT') nextPos.x -= 1;
                  if (robot.direction === 'RIGHT') nextPos.x += 1;

                  if (nextPos.x >= 0 && nextPos.x < sharedState.gridSize && nextPos.y >= 0 && nextPos.y < sharedState.gridSize) {
                    robot.pos = nextPos;
                    playSound('move');
                  } else {
                    playSound('wall');
                    abortControllerRef.current = true;
                    return false;
                  }
                  break;
                }
                case BlockType.TURN_LEFT:
                case BlockType.TURN_RIGHT: {
                  const dirs: Direction[] = block.type === BlockType.TURN_LEFT 
                    ? ['UP', 'LEFT', 'DOWN', 'RIGHT']
                    : ['UP', 'RIGHT', 'DOWN', 'LEFT'];
                  robot.direction = dirs[(dirs.indexOf(robot.direction) + 1) % 4];
                  playSound('turn');
                  break;
                }
                case BlockType.COLLECT: {
                  const itemIdx = sharedState.items.findIndex(item => item.x === robot.pos.x && item.y === robot.pos.y);
                  if (itemIdx !== -1) {
                    sharedState.items = sharedState.items.filter((_, idx) => idx !== itemIdx);
                    sharedState.count++;
                    playSound('collect');
                  }
                  break;
                }
            }
        }
    }
    return true;
  };

  const runProgram = async () => {
    if (program.length === 0 || gameState.isExecuting) return;
    abortControllerRef.current = false;
    setShowFailOverlay(false);
    setSelectedRepeatId(null);
    const currentLvl = currentMissionSet[level];
    
    setGameState(prev => ({ 
        ...prev, 
        isExecuting: true, 
        items: [...currentLvl.items], 
        robots: JSON.parse(JSON.stringify(currentLvl.robots)),
        collectedItems: 0
    }));

    const executionState = {
      robots: JSON.parse(JSON.stringify(currentLvl.robots)),
      items: [...currentLvl.items],
      count: 0,
      gridSize: currentLvl.gridSize
    };

    for (const block of program) {
      if (abortControllerRef.current) break;
      const ok = await executeAction(block, executionState);
      setGameState(prev => ({
        ...prev,
        robots: [...executionState.robots],
        items: [...executionState.items],
        collectedItems: executionState.count
      }));
      if (!ok) break;
    }

    if (!abortControllerRef.current) {
        await sleep(300);
        setActiveBlockId(null);
        const win = executionState.items.length === 0 && executionState.count > 0;
        setGameState(prev => ({ ...prev, isExecuting: false, message: win ? "YAY!" : "OOPS!" }));
        if (win) playSound('success'); else { playSound('fail'); setShowFailOverlay(true); }
    } else {
        setGameState(prev => ({ ...prev, isExecuting: false }));
        setActiveBlockId(null);
    }
  };

  return {
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
  };
};
