
import { GameTheme } from '../types';

export const constructionTheme = {
  key: 'CONSTRUCTION' as GameTheme,
  name: 'Work Zone',
  bg: 'bg-amber-50',
  grid: 'bg-slate-200',
  emoji: '🔩',
  accent: 'text-amber-600',
  desc: 'Clean up the site!',
  missions: [
    { // Level 1: Basic Sync
      gridSize: 8, 
      items: [{x: 0, y: 0}, {x: 7, y: 0}], 
      robots: [
        {id: 'BLUE', pos: {x: 0, y: 4}, direction: 'UP', color: 'blue'},
        {id: 'RUBY', pos: {x: 7, y: 4}, direction: 'UP', color: 'rose'}
      ] 
    },
    { // Level 2: Crossing paths
      gridSize: 8, 
      items: [{x: 4, y: 2}, {x: 3, y: 5}], 
      robots: [
        {id: 'BLUE', pos: {x: 0, y: 2}, direction: 'RIGHT', color: 'blue'},
        {id: 'RUBY', pos: {x: 7, y: 5}, direction: 'LEFT', color: 'rose'}
      ] 
    },
    { // Level 3: Converging on center
      gridSize: 9, 
      items: [{x: 4, y: 4}], 
      robots: [
        {id: 'BLUE', pos: {x: 0, y: 0}, direction: 'RIGHT', color: 'blue'},
        {id: 'RUBY', pos: {x: 8, y: 8}, direction: 'LEFT', color: 'rose'}
      ] 
    },
    { // Level 4: The Construction Line
      gridSize: 9, 
      items: [{x: 1, y: 1}, {x: 3, y: 3}, {x: 5, y: 5}, {x: 7, y: 7}], 
      robots: [
        {id: 'BLUE', pos: {x: 0, y: 0}, direction: 'RIGHT', color: 'blue'},
        {id: 'RUBY', pos: {x: 8, y: 8}, direction: 'LEFT', color: 'rose'}
      ] 
    },
    { // Level 5: Logistics Nightmare
      gridSize: 10, 
      items: [{x: 0, y: 9}, {x: 9, y: 0}, {x: 4, y: 4}, {x: 5, y: 5}], 
      robots: [
          {id: 'BLUE', pos: {x: 0, y: 0}, direction: 'DOWN', color: 'blue'},
          {id: 'RUBY', pos: {x: 9, y: 9}, direction: 'UP', color: 'rose'}
      ] 
    }
  ]
};
