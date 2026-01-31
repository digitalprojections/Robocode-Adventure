import { MissionConfig, GameTheme } from '../types';

const DB_NAME = 'RobocodeDB';
const DB_VERSION = 1;
const STORE_PROGRESS = 'progress';
const STORE_CUSTOM_LEVELS = 'custom_levels';

export interface CustomLevel extends MissionConfig {
    id?: number;
    name: string;
    createdAt: number;
}

export const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_PROGRESS)) {
                db.createObjectStore(STORE_PROGRESS, { keyPath: 'theme' });
            }
            if (!db.objectStoreNames.contains(STORE_CUSTOM_LEVELS)) {
                db.createObjectStore(STORE_CUSTOM_LEVELS, { keyPath: 'id', autoIncrement: true });
            }
        };
    });
};

export const saveProgressToDB = async (theme: GameTheme, level: number) => {
    const db = await initDB();
    return new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_PROGRESS, 'readwrite');
        const store = tx.objectStore(STORE_PROGRESS);
        store.put({ theme, level });
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
};

export const getProgressFromDB = async (theme: GameTheme): Promise<number> => {
    const db = await initDB();
    return new Promise<number>((resolve) => {
        const tx = db.transaction(STORE_PROGRESS, 'readonly');
        const store = tx.objectStore(STORE_PROGRESS);
        const request = store.get(theme);
        request.onsuccess = () => {
            resolve(request.result ? request.result.level : 0);
        };
        request.onerror = () => resolve(0);
    });
};

export const saveCustomLevel = async (level: CustomLevel): Promise<number> => {
    const db = await initDB();
    return new Promise<number>((resolve, reject) => {
        const tx = db.transaction(STORE_CUSTOM_LEVELS, 'readwrite');
        const store = tx.objectStore(STORE_CUSTOM_LEVELS);
        const request = store.add(level);
        tx.oncomplete = () => resolve(request.result as number);
        tx.onerror = () => reject(tx.error);
    });
};

export const getCustomLevels = async (): Promise<CustomLevel[]> => {
    const db = await initDB();
    return new Promise<CustomLevel[]>((resolve) => {
        const tx = db.transaction(STORE_CUSTOM_LEVELS, 'readonly');
        const store = tx.objectStore(STORE_CUSTOM_LEVELS);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => resolve([]);
    });
};

export const deleteCustomLevel = async (id: number): Promise<void> => {
    const db = await initDB();
    return new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_CUSTOM_LEVELS, 'readwrite');
        const store = tx.objectStore(STORE_CUSTOM_LEVELS);
        store.delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
};
