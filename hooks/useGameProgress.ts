import { useState, useEffect } from 'react';
import { GameTheme } from '../types';
import { saveProgressToDB, getProgressFromDB } from '../utils/db'; // Ensure imports are correct

const STORAGE_KEY = 'robocode_progress';

interface ProgressData {
    [key: string]: number;
}

export const useGameProgress = () => {
    // Keep local state for immediate UI updates
    const [progress, setProgress] = useState<Record<string, number>>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch {
            return {};
        }
    });

    // Check DB on mount to sync
    useEffect(() => {
        const syncMap: Record<string, number> = { ...progress };
        const themes: GameTheme[] = ['FRUIT', 'SPACE', 'OCEAN', 'CONSTRUCTION'];

        const load = async () => {
            let changed = false;
            for (const t of themes) {
                const dbLevel = await getProgressFromDB(t);
                if (dbLevel > (syncMap[t] || 0)) {
                    syncMap[t] = dbLevel;
                    changed = true;
                }
            }
            if (changed) {
                setProgress(syncMap);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(syncMap));
            }
        };
        load();
    }, []);

    const saveProgress = (theme: GameTheme, level: number) => {
        setProgress(prev => {
            const currentMax = prev[theme] || 0;
            if (level > currentMax) {
                const newProgress = { ...prev, [theme]: level };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
                saveProgressToDB(theme, level).catch(console.error);
                return newProgress;
            }
            return prev;
        });
    };

    const getSavedLevel = (theme: GameTheme): number => {
        return progress[theme] || 0;
    };

    return { getSavedLevel, saveProgress };
};
