import React, { useState, useEffect } from 'react';
import { ArrowLeft, Grip, Trash2, Save, Play, RefreshCw, Copy } from 'lucide-react';
import { Position, RobotState, Direction, BASE_CELL_SIZE } from '../types';
import RoboCar from './RoboCar';

import { saveCustomLevel } from '../utils/db';

interface LevelDesignerPageProps {
    onBack: () => void;
}

type ToolType = 'eraser' | 'blue_robot' | 'item' | 'obstacle_rock' | 'obstacle_wall';

const LevelDesignerPage: React.FC<LevelDesignerPageProps> = ({ onBack }) => {
    const [gridSize, setGridSize] = useState(8);
    const [items, setItems] = useState<Position[]>([]);
    const [obstacles, setObstacles] = useState<Position[]>([]);
    const [robots, setRobots] = useState<RobotState[]>([]);
    const [selectedTool, setSelectedTool] = useState<ToolType>('item');
    const [isDragging, setIsDragging] = useState(false);
    const [jsonOutput, setJsonOutput] = useState('');

    // Update JSON whenever state changes
    useEffect(() => {
        const config = {
            gridSize,
            items,
            obstacles: obstacles.length > 0 ? obstacles : undefined,
            robots
        };
        setJsonOutput(JSON.stringify(config, null, 2));
    }, [gridSize, items, obstacles, robots]);

    const handleSaveLevel = async () => {
        const name = prompt("Enter a name for your level:");
        if (!name) return;

        try {
            await saveCustomLevel({
                name,
                createdAt: Date.now(),
                gridSize,
                items,
                obstacles,
                robots
            });
            alert("Level saved successfully!");
        } catch (e) {
            console.error(e);
            alert("Failed to save level.");
        }
    };

    const handleCellAction = (x: number, y: number) => {
        // Remove existing at this position first (except for robots logic handling below)
        const newItems = items.filter(p => p.x !== x || p.y !== y);
        const newObstacles = obstacles.filter(p => p.x !== x || p.y !== y);
        // Don't filter robots yet, special handling

        if (selectedTool === 'eraser') {
            setItems(newItems);
            setObstacles(newObstacles);
            setRobots(robots.filter(r => r.pos.x !== x || r.pos.y !== y));
            return;
        }

        // Add new
        if (selectedTool === 'item') {
            setItems([...newItems, { x, y }]);
            setObstacles(newObstacles);
            setRobots(robots.filter(r => r.pos.x !== x || r.pos.y !== y));
        } else if (selectedTool.startsWith('obstacle')) {
            setObstacles([...newObstacles, { x, y }]);
            setItems(newItems);
            setRobots(robots.filter(r => r.pos.x !== x || r.pos.y !== y));
        } else if (selectedTool === 'blue_robot') {
            // If clicking existing robot, rotate it
            const existingRobotIdx = robots.findIndex(r => r.pos.x === x && r.pos.y === y);
            if (existingRobotIdx !== -1) {
                const newRobots = [...robots];
                const dirs: Direction[] = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
                const currentDirIdx = dirs.indexOf(newRobots[existingRobotIdx].direction);
                newRobots[existingRobotIdx].direction = dirs[(currentDirIdx + 1) % 4];
                setRobots(newRobots);
                return;
            }

            // Ensure single robot of this ID (simple logic: one BLUE robot max for now)
            // Remove any existing robot at this cell
            const cleanRobots = robots.filter(r => (r.pos.x !== x || r.pos.y !== y) && r.id !== 'BLUE');
            setRobots([...cleanRobots, { id: 'BLUE', pos: { x, y }, direction: 'RIGHT', color: 'blue' }]);
            setItems(newItems);
            setObstacles(newObstacles);
        }
    };

    const handleCopyJson = () => {
        navigator.clipboard.writeText(jsonOutput);
        // Could add toast here
        alert("JSON Copied to clipboard!");
    };

    const loadFromJson = () => {
        try {
            const data = JSON.parse(jsonOutput);
            if (data.gridSize) setGridSize(data.gridSize);
            if (data.items) setItems(data.items);
            if (data.obstacles) setObstacles(data.obstacles);
            if (data.robots) setRobots(data.robots);
        } catch (e) {
            alert("Invalid JSON format");
        }
    };

    const cellSize = Math.min(40, (Math.min(window.innerWidth, window.innerHeight) - 40) / gridSize); // Responsive cell size

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        document.body.style.overflow = '';
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && element.hasAttribute('data-cell-x')) {
            const x = parseInt(element.getAttribute('data-cell-x')!);
            const y = parseInt(element.getAttribute('data-cell-y')!);
            handleCellAction(x, y);
        }
    };

    return (
        <div className="fixed inset-0 flex flex-col md:flex-row bg-slate-50 safe-area-inset overflow-hidden">
            {/* Sidebar / Tools */}
            <div className="w-full md:w-80 bg-white shadow-xl flex flex-col z-20 overflow-y-auto border-r border-slate-200 shrink-0 h-[35vh] md:h-full order-last md:order-first">
                <header className="p-4 bg-sky-50 border-b border-sky-100 flex items-center justify-between">
                    <h1 className="font-game text-sky-600">Level Builder</h1>
                    <div className="flex gap-2">
                        <button onClick={handleSaveLevel} className="p-2 hover:bg-sky-100 rounded-full text-sky-500 font-bold flex items-center gap-1">
                            <Save size={18} /> <span className="text-xs uppercase">Save</span>
                        </button>
                        <button onClick={onBack} className="p-2 hover:bg-sky-100 rounded-full text-slate-500"><ArrowLeft size={18} /></button>
                    </div>
                </header>

                <div className="p-4 flex-1 flex flex-col gap-6">
                    {/* Grid Settings */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Grid Size: {gridSize}</label>
                        <input
                            type="range" min="4" max="15" value={gridSize}
                            onChange={(e) => setGridSize(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
                        />
                    </div>

                    {/* Tools Palette */}
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Tools</label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => setSelectedTool('item')}
                                className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1 ${selectedTool === 'item' ? 'border-sky-500 bg-sky-50' : 'border-slate-200 hover:border-slate-300'}`}
                            >
                                <div className="text-2xl animate-bounce">🍎</div>
                                <span className="text-[10px] font-bold uppercase text-slate-500">Item</span>
                            </button>
                            <button
                                onClick={() => setSelectedTool('obstacle_rock')}
                                className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1 ${selectedTool === 'obstacle_rock' ? 'border-sky-500 bg-sky-50' : 'border-slate-200 hover:border-slate-300'}`}
                            >
                                <div className="text-2xl grayscale contrast-125">🪨</div>
                                <span className="text-[10px] font-bold uppercase text-slate-500">Rock</span>
                            </button>
                            <button
                                onClick={() => setSelectedTool('blue_robot')}
                                className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1 ${selectedTool === 'blue_robot' ? 'border-sky-500 bg-sky-50' : 'border-slate-200 hover:border-slate-300'}`}
                            >
                                <div className="text-2xl">🤖</div>
                                <span className="text-[10px] font-bold uppercase text-slate-500">Bot</span>
                            </button>
                            <button
                                onClick={() => setSelectedTool('eraser')}
                                className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1 ${selectedTool === 'eraser' ? 'border-rose-500 bg-rose-50' : 'border-slate-200 hover:border-slate-300'}`}
                            >
                                <Trash2 size={24} className="text-rose-500" />
                                <span className="text-[10px] font-bold uppercase text-rose-500">Erase</span>
                            </button>
                        </div>
                    </div>

                    {/* JSON Export */}
                    <div className="flex-1 flex flex-col min-h-[200px]">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-slate-400 uppercase">Level JSON</label>
                            <div className="flex gap-2">
                                <button onClick={loadFromJson} className="text-xs bg-slate-100 px-2 py-1 rounded hover:bg-slate-200 text-slate-600 font-bold">Import</button>
                                <button onClick={handleCopyJson} className="text-xs bg-sky-100 px-2 py-1 rounded hover:bg-sky-200 text-sky-600 font-bold flex items-center gap-1"><Copy size={12} /> Copy</button>
                            </div>
                        </div>
                        <textarea
                            value={jsonOutput}
                            onChange={(e) => setJsonOutput(e.target.value)}
                            className="w-full flex-1 p-2 font-mono text-xs bg-slate-800 text-green-400 rounded-lg resize-none border border-slate-700"
                        />
                    </div>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 overflow-auto bg-slate-50 flex items-center justify-center p-8 grid-pattern"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="bg-white shadow-2xl border-4 border-slate-300 rounded-xl relative select-none"
                    style={{
                        width: gridSize * cellSize + 4,
                        height: gridSize * cellSize + 4,
                        backgroundSize: `${cellSize}px ${cellSize}px`,
                        backgroundImage: 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)'
                    }}
                    onMouseLeave={() => setIsDragging(false)}
                >
                    {/* Render Grid Cells for Interaction */}
                    {Array.from({ length: gridSize * gridSize }).map((_, i) => {
                        const x = i % gridSize;
                        const y = Math.floor(i / gridSize);
                        return (
                            <div
                                key={i}
                                data-cell-x={x}
                                data-cell-y={y}
                                className="absolute hover:bg-sky-500/10 cursor-crosshair active:bg-sky-500/20"
                                style={{ left: x * cellSize, top: y * cellSize, width: cellSize, height: cellSize }}
                                onMouseDown={() => { setIsDragging(true); handleCellAction(x, y); }}
                                onMouseEnter={() => { if (isDragging) handleCellAction(x, y); }}
                                onMouseUp={() => setIsDragging(false)}
                            />
                        );
                    })}

                    {/* Objects */}
                    {items.map((item, i) => (
                        <div key={`item-${i}`} className="absolute pointer-events-none flex items-center justify-center text-3xl"
                            style={{ left: item.x * cellSize, top: item.y * cellSize, width: cellSize, height: cellSize }}>
                            🍎
                        </div>
                    ))}
                    {obstacles.map((obs, i) => (
                        <div key={`obs-${i}`} className="absolute pointer-events-none flex items-center justify-center grayscale contrast-125 text-3xl"
                            style={{ left: obs.x * cellSize, top: obs.y * cellSize, width: cellSize, height: cellSize }}>
                            🪨
                        </div>
                    ))}
                    {robots.map((robot, i) => (
                        <RoboCar
                            key={`bot-${i}`}
                            id={robot.id}
                            pos={robot.pos}
                            direction={robot.direction}
                            cellSize={cellSize}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LevelDesignerPage;
