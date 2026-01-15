
import { GameTheme } from '../types';

export const fruitTheme = {
  key: 'FRUIT' as GameTheme,
  name: 'Fruit Garden',
  bg: 'bg-green-50',
  grid: 'bg-emerald-50',
  emoji: '🍎',
  accent: 'text-green-600',
  desc: 'Harvest tasty apples!',
  missions: [
    { // Level 1: Straight line
      gridSize: 5, 
      items: [{x: 0, y: 4}], 
      robots: [{id: 'BLUE', pos: {x: 0, y: 0}, direction: 'DOWN', color: 'blue'}] 
    },
    { // Level 2: Simple Turn
      gridSize: 5, 
      items: [{x: 3, y: 3}], 
      robots: [{id: 'BLUE', pos: {x: 0, y: 0}, direction: 'RIGHT', color: 'blue'}] 
    },
    { // Level 3: Multiple Items (Sequence)
      gridSize: 6, 
      items: [{x: 1, y: 1}, {x: 3, y: 1}, {x: 5, y: 1}], 
      robots: [{id: 'BLUE', pos: {x: 0, y: 1}, direction: 'RIGHT', color: 'blue'}] 
    },
    { // Level 4: Introduction to Loops (Stairs)
      gridSize: 6, 
      items: [{x: 2, y: 2}, {x: 4, y: 4}], 
      robots: [{id: 'BLUE', pos: {x: 0, y: 0}, direction: 'RIGHT', color: 'blue'}] 
    },
    { // Level 5: The Grand Harvest
      gridSize: 7, 
      items: [{x: 1, y: 1}, {x: 5, y: 1}, {x: 5, y: 5}, {x: 1, y: 5}], 
      robots: [{id: 'BLUE', pos: {x: 3, y: 3}, direction: 'UP', color: 'blue'}] 
    }
  ]
};
