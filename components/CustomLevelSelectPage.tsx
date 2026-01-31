import React, { useEffect, useState } from 'react';
import { ArrowLeft, Play, Trash2 } from 'lucide-react';
import { CustomLevel, getCustomLevels, deleteCustomLevel } from '../utils/db';

interface CustomLevelSelectPageProps {
    onBack: () => void;
    onPlayLevel: (level: CustomLevel) => void;
}

const CustomLevelSelectPage: React.FC<CustomLevelSelectPageProps> = ({ onBack, onPlayLevel }) => {
    const [levels, setLevels] = useState<CustomLevel[]>([]);

    useEffect(() => {
        loadLevels();
    }, []);

    const loadLevels = async () => {
        const loaded = await getCustomLevels();
        setLevels(loaded.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)));
    };

    const handleDelete = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (confirm("Delete this level?")) {
            await deleteCustomLevel(id);
            loadLevels();
        }
    };

    return (
        <div className="fixed inset-0 flex flex-col bg-slate-50 safe-area-inset overflow-hidden">
            <header className="bg-white/90 px-4 py-3 flex items-center shadow-sm z-30 shrink-0 backdrop-blur-sm sticky top-0">
                <button
                    onClick={onBack}
                    className="text-slate-500 hover:text-slate-700 bg-white border border-slate-200 w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-transform shadow-sm mr-4"
                >
                    <ArrowLeft size={20} className="stroke-[3]" />
                </button>
                <div>
                    <h1 className="text-xl font-game text-sky-600 uppercase tracking-tight">My Levels</h1>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{levels.length} Custom Levels</p>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {levels.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                        <p className="text-4xl mb-4">🏜️</p>
                        <p className="font-bold">No custom levels yet.</p>
                        <p className="text-xs mt-2">Use the Builder to create one!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-safe">
                        {levels.map((level) => (
                            <button
                                key={level.id}
                                onClick={() => onPlayLevel(level)}
                                className="bg-white p-4 rounded-2xl shadow-sm border-b-4 border-slate-200 active:scale-95 transition-transform group hover:border-sky-300 text-left relative"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center text-2xl font-game text-sky-500">
                                        {level.id}
                                    </div>
                                    <div
                                        onClick={(e) => handleDelete(e, level.id!)}
                                        className="text-slate-300 hover:text-rose-500 p-2 -mr-2 -mt-2 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </div>
                                </div>

                                <h3 className="font-bold text-slate-700 truncate pr-4">{level.name}</h3>
                                <p className="text-xs text-slate-400 font-bold uppercase mt-1">
                                    {new Date(level.createdAt || 0).toLocaleDateString()} • {level.gridSize}x{level.gridSize}
                                </p>

                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-sky-500">
                                    <Play size={24} fill="currentColor" />
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomLevelSelectPage;
