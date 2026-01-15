
import { GameTheme } from '../types';

export const oceanTheme = {
  key: 'OCEAN' as GameTheme,
  name: 'Deep Sea',
  bg: 'bg-blue-900',
  grid: 'bg-cyan-900',
  emoji: '🐚',
  accent: 'text-cyan-400',
  desc: 'Gather sea shells!',
  missions: [
    { // Level 1: Long distance
      gridSize: 8, 
      items: [{x: 7, y: 4}], 
      robots: [{id: 'BLUE', pos: {x: 0, y: 4}, direction: 'RIGHT', color: 'blue'}] 
    },
    { // Level 2: Two-stage trip
      gridSize: 8, 
      items: [{x: 4, y: 0}, {x: 4, y: 7}], 
      robots: [{id: 'BLUE', pos: {x: 4, y: 3}, direction: 'UP', color: 'blue'}] 
    },
    { // Level 3: Shell Rows (Loop candidate)
      gridSize: 9, 
      items: [{x: 1, y: 1}, {x: 3, y: 1}, {x: 5, y: 1}, {x: 7, y: 1}], 
      robots: [{id: 'BLUE', pos: {x: 0, y: 1}, direction: 'RIGHT', color: 'blue'}] 
    },
    { // Level 4: Ocean Current (Rectangle)
      gridSize: 10, 
      items: [{x: 2, y: 2}, {x: 7, y: 2}, {x: 7, y: 7}, {x: 2, y: 7}], 
      robots: [{id: 'BLUE', pos: {x: 2, y: 2}, direction: 'RIGHT', color: 'blue'}] 
    },
    { // Level 5: Deep Trench
      gridSize: 10, 
      items: Array.from({length: 5}).map((_, i) => ({x: 1, y: i*2})).concat(Array.from({length: 5}).map((_, i) => ({x: 8, y: i*2}))),
      robots: [{id: 'BLUE', pos: {x: 5, y: 5}, direction: 'UP', color: 'blue'}] 
    }
  ]
};
