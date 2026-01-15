
import { GameTheme } from '../types';

export const spaceTheme = {
  key: 'SPACE' as GameTheme,
  name: 'Star Station',
  bg: 'bg-slate-900',
  grid: 'bg-slate-800',
  emoji: '💎',
  accent: 'text-indigo-400',
  desc: 'Collect space gems!',
  missions: [
    { // Level 1: Reorienting
      gridSize: 6, 
      items: [{x: 5, y: 0}], 
      robots: [{id: 'BLUE', pos: {x: 5, y: 5}, direction: 'UP', color: 'blue'}] 
    },
    { // Level 2: Zig Zag
      gridSize: 6, 
      items: [{x: 2, y: 0}, {x: 4, y: 2}], 
      robots: [{id: 'BLUE', pos: {x: 0, y: 2}, direction: 'RIGHT', color: 'blue'}] 
    },
    { // Level 3: Perimeter sweep
      gridSize: 6, 
      items: [{x: 0, y: 0}, {x: 5, y: 0}, {x: 5, y: 5}, {x: 0, y: 5}], 
      robots: [{id: 'BLUE', pos: {x: 0, y: 0}, direction: 'RIGHT', color: 'blue'}] 
    },
    { // Level 4: Spiral pattern
      gridSize: 7, 
      items: [{x: 0, y: 0}, {x: 6, y: 0}, {x: 6, y: 6}, {x: 3, y: 3}], 
      robots: [{id: 'BLUE', pos: {x: 0, y: 6}, direction: 'UP', color: 'blue'}] 
    },
    { // Level 5: Gem Constellation
      gridSize: 8, 
      items: [{x: 2, y: 2}, {x: 5, y: 2}, {x: 2, y: 5}, {x: 5, y: 5}], 
      robots: [{id: 'BLUE', pos: {x: 0, y: 0}, direction: 'DOWN', color: 'blue'}] 
    }
  ]
};
