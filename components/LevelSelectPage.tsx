import React from 'react';
import { ArrowLeft, Lock } from 'lucide-react';
import { GameTheme } from '../types';

interface LevelSelectPageProps {
    theme: any;
    themeKey: GameTheme;
    unlockedLevel: number;
    onSelectLevel: (level: number) => void;
    onBack: () => void;
}

const LevelSelectPage: React.FC<LevelSelectPageProps> = ({ theme, themeKey, unlockedLevel, onSelectLevel, onBack }) => {
    const totalLevels = theme.missions.length;
    // Ensure we don't exceed the total number of levels
    const maxUnlocked = Math.min(unlockedLevel, totalLevels - 1);

    return (
        <div className={`fixed inset-0 flex flex-col ${theme.bg} safe-area-inset overflow-hidden`}>
            <header className="bg-white/90 px-4 py-3 flex items-center shadow-sm z-30 shrink-0 backdrop-blur-sm sticky top-0">
                <button
                    onClick={onBack}
                    className="text-slate-500 hover:text-slate-700 bg-white border border-slate-200 w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-transform shadow-sm mr-4"
                >
                    <ArrowLeft size={20} className="stroke-[3]" />
                </button>
                <div>
                    <h1 className={`text-xl font-game ${theme.accent} uppercase tracking-tight`}>{theme.name}</h1>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Select Level</p>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 content-start pb-safe">
                    {Array.from({ length: totalLevels }).map((_, idx) => {
                        const isLocked = idx > maxUnlocked;
                        const isCompleted = idx < maxUnlocked;
                        const isCurrent = idx === maxUnlocked;

                        return (
                            <button
                                key={idx}
                                disabled={isLocked}
                                onClick={() => onSelectLevel(idx)}
                                className={`
                  aspect-square rounded-2xl flex flex-col items-center justify-center font-game text-lg shadow-md transition-all
                  ${isLocked
                                        ? 'bg-slate-200/50 text-slate-400 border-2 border-slate-300 cursor-not-allowed'
                                        : isCurrent
                                            ? 'bg-white text-sky-600 border-4 border-sky-400 scale-105 shadow-xl z-10'
                                            : 'bg-white text-slate-600 border-b-4 border-slate-200 active:scale-95 active:border-b-0 active:translate-y-[4px]'
                                    }
                `}
                            >
                                {isLocked ? (
                                    <Lock size={16} className="text-slate-400" />
                                ) : (
                                    <span>{idx + 1}</span>
                                )}
                                {isCompleted && !isLocked && (
                                    <div className="mt-1 flex gap-0.5">
                                        <div className="w-1 h-1 rounded-full bg-yellow-400"></div>
                                        <div className="w-1 h-1 rounded-full bg-yellow-400"></div>
                                        <div className="w-1 h-1 rounded-full bg-yellow-400"></div>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LevelSelectPage;
