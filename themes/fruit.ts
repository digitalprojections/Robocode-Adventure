
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
      items: [{ x: 0, y: 4 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'DOWN', color: 'blue' }]
    },
    { // Level 2: Simple Turn
      gridSize: 5,
      items: [{ x: 3, y: 3 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 3: Multiple Items (Sequence)
      gridSize: 6,
      items: [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 1 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 4: Introduction to Loops (Stairs)
      gridSize: 6,
      items: [{ x: 2, y: 2 }, { x: 4, y: 4 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 5: The Grand Harvest
      gridSize: 7,
      items: [{ x: 1, y: 1 }, { x: 5, y: 1 }, { x: 5, y: 5 }, { x: 1, y: 5 }],
      robots: [{ id: 'BLUE', pos: { x: 3, y: 3 }, direction: 'UP', color: 'blue' }]
    },
    { // Level 6: U-Turn Pattern
      gridSize: 5,
      items: [{ x: 0, y: 2 }],
      obstacles: [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 2 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 7: Zigzag Pattern
      gridSize: 6,
      items: [{ x: 5, y: 5 }],
      // Obstacles force a zig-zag path: Right 2, Down 1, Left 2, Down 1...
      obstacles: [{ x: 2, y: 0 }, { x: 3, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 5 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    {
      "gridSize": 8,
      "items": [
        {
          "x": 1,
          "y": 0
        },
        {
          "x": 4,
          "y": 0
        }
      ],
      "obstacles": [
        {
          "x": 2,
          "y": 0
        },
        {
          "x": 2,
          "y": 1
        },
        {
          "x": 2,
          "y": 2
        },
        {
          "x": 2,
          "y": 3
        },
        {
          "x": 3,
          "y": 3
        },
        {
          "x": 4,
          "y": 3
        },
        {
          "x": 5,
          "y": 3
        },
        {
          "x": 6,
          "y": 3
        }
      ],
      "robots": [
        {
          "id": "BLUE",
          "pos": {
            "x": 6,
            "y": 4
          },
          "direction": "RIGHT",
          "color": "blue"
        }
      ]
    },
    { // Level 9: Spiral Pattern
      gridSize: 7,
      items: [{ x: 3, y: 3 }],
      obstacles: [{ x: 2, y: 2 }, { x: 4, y: 2 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 10: Diagonal Challenge
      gridSize: 6,
      items: [{ x: 5, y: 5 }],
      obstacles: [{ x: 2, y: 2 }, { x: 3, y: 3 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 11: Loop with Counter (3 items in line)
      gridSize: 8,
      items: [{ x: 1, y: 3 }, { x: 3, y: 3 }, { x: 5, y: 3 }],
      // Obstacles between items to force "jump over" or "go around" logic if we had jump, but here just go around
      obstacles: [{ x: 2, y: 2 }, { x: 2, y: 4 }, { x: 4, y: 2 }, { x: 4, y: 4 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 3 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 12: Nested Loop Pattern
      gridSize: 7,
      items: [{ x: 1, y: 1 }, { x: 1, y: 3 }, { x: 1, y: 5 },
      { x: 3, y: 1 }, { x: 3, y: 3 }, { x: 3, y: 5 },
      { x: 5, y: 1 }, { x: 5, y: 3 }, { x: 5, y: 5 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 13: Loop with Decreasing Steps
      gridSize: 8,
      items: [{ x: 7, y: 7 }, { x: 7, y: 5 }, { x: 7, y: 3 }, { x: 7, y: 1 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 7 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 14: Checkerboard Pattern
      gridSize: 7,
      items: [{ x: 1, y: 1 }, { x: 1, y: 3 }, { x: 1, y: 5 },
      { x: 3, y: 2 }, { x: 3, y: 4 }, { x: 3, y: 6 },
      { x: 5, y: 1 }, { x: 5, y: 3 }, { x: 5, y: 5 }],
      // Checkerboard obstacles
      obstacles: [{ x: 2, y: 1 }, { x: 2, y: 3 }, { x: 2, y: 5 }, { x: 4, y: 1 }, { x: 4, y: 3 }, { x: 4, y: 5 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 15: Loop with Conditional Logic
      gridSize: 8,
      items: [{ x: 2, y: 2 }, { x: 4, y: 2 }, { x: 6, y: 2 },
      { x: 2, y: 4 }, { x: 6, y: 4 },
      { x: 2, y: 6 }, { x: 4, y: 6 }, { x: 6, y: 6 }],
      obstacles: [{ x: 3, y: 3 }, { x: 5, y: 5 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 16: Two Robots Parallel
      gridSize: 8,
      items: [{ x: 7, y: 3 }, { x: 7, y: 5 }],
      robots: [
        { id: 'BLUE', pos: { x: 0, y: 3 }, direction: 'RIGHT', color: 'blue' },
        { id: 'RED', pos: { x: 0, y: 5 }, direction: 'RIGHT', color: 'red' }
      ]
    },
    { // Level 17: Sequential Robot Activation
      gridSize: 7,
      items: [{ x: 6, y: 1 }, { x: 6, y: 5 }],
      // Wall separating the two lanes completely except for start
      obstacles: [{ x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }],
      robots: [
        { id: 'BLUE', pos: { x: 0, y: 1 }, direction: 'RIGHT', color: 'blue' },
        { id: 'RED', pos: { x: 0, y: 5 }, direction: 'RIGHT', color: 'red' }
      ]
    },
    { // Level 18: Robot Handoff
      gridSize: 8,
      items: [{ x: 7, y: 7 }],
      robots: [
        { id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' },
        { id: 'RED', pos: { x: 0, y: 7 }, direction: 'UP', color: 'red' }
      ]
    },
    { // Level 19: Coordinated Movement
      gridSize: 8,
      items: [{ x: 3, y: 3 }, { x: 5, y: 5 }],
      robots: [
        { id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' },
        { id: 'RED', pos: { x: 7, y: 7 }, direction: 'LEFT', color: 'red' }
      ]
    },
    { // Level 20: Robot Synchronization
      gridSize: 9,
      items: [{ x: 4, y: 4 }],
      robots: [
        { id: 'BLUE', pos: { x: 0, y: 4 }, direction: 'RIGHT', color: 'blue' },
        { id: 'RED', pos: { x: 8, y: 4 }, direction: 'LEFT', color: 'red' },
        { id: 'GREEN', pos: { x: 4, y: 0 }, direction: 'DOWN', color: 'green' }
      ]
    },
    { // Level 21: Repeatable Pattern (Square)
      gridSize: 8,
      items: [{ x: 2, y: 2 }, { x: 5, y: 2 }, { x: 5, y: 5 }, { x: 2, y: 5 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 22: Function with Parameters
      gridSize: 9,
      items: [{ x: 2, y: 2 }, { x: 6, y: 2 }, { x: 2, y: 6 }, { x: 6, y: 6 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 23: Nested Function Calls
      gridSize: 10,
      items: [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 }, { x: 7, y: 1 },
      { x: 1, y: 3 }, { x: 3, y: 3 }, { x: 5, y: 3 }, { x: 7, y: 3 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 24: Recursive Pattern
      gridSize: 9,
      items: [{ x: 4, y: 4 }, { x: 2, y: 2 }, { x: 6, y: 2 }, { x: 2, y: 6 }, { x: 6, y: 6 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 25: Modular Solution Required
      gridSize: 12,
      items: [{ x: 1, y: 1 }, { x: 1, y: 5 }, { x: 1, y: 9 },
      { x: 5, y: 1 }, { x: 5, y: 5 }, { x: 5, y: 9 },
      { x: 9, y: 1 }, { x: 9, y: 5 }, { x: 9, y: 9 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 26: Simple Obstacle
      gridSize: 7,
      items: [{ x: 6, y: 3 }],
      obstacles: [{ x: 3, y: 3 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 3 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 27: Maze Navigation
      gridSize: 8,
      items: [{ x: 7, y: 7 }],
      obstacles: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 },
      { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 }, { x: 4, y: 7 },
      { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 6, y: 3 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 28: Obstacle Course
      gridSize: 9,
      items: [{ x: 8, y: 0 }, { x: 8, y: 8 }],
      obstacles: [{ x: 4, y: 0 }, { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 },
      { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 29: Dead End Maze
      gridSize: 10,
      items: [{ x: 9, y: 9 }],
      obstacles: [{ x: 5, y: 0 }, { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 5, y: 4 },
      { x: 5, y: 5 }, { x: 5, y: 6 }, { x: 5, y: 7 }, { x: 5, y: 8 },
      { x: 0, y: 5 }, { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 30: Multi-Path Maze
      gridSize: 11,
      items: [{ x: 10, y: 5 }],
      obstacles: [
        { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 },
        { x: 3, y: 6 }, { x: 3, y: 7 }, { x: 3, y: 8 }, { x: 3, y: 9 }, { x: 3, y: 10 },
        { x: 7, y: 0 }, { x: 7, y: 1 }, { x: 7, y: 2 }, { x: 7, y: 3 }, { x: 7, y: 4 },
        { x: 7, y: 6 }, { x: 7, y: 7 }, { x: 7, y: 8 }, { x: 7, y: 9 }, { x: 7, y: 10 }
      ],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 5 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 31: Simple Condition
      gridSize: 8,
      items: [{ x: 7, y: 3 }],
      checkpoints: [{ x: 3, y: 3 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 3 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 32: Branching Path
      gridSize: 9,
      items: [{ x: 8, y: 8 }],
      checkpoints: [{ x: 4, y: 0 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 33: Conditional Loop
      gridSize: 10,
      items: [{ x: 9, y: 9 }, { x: 9, y: 0 }, { x: 0, y: 9 }],
      checkpoints: [{ x: 5, y: 5 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 34: Multiple Conditions
      gridSize: 11,
      items: [{ x: 10, y: 5 }],
      checkpoints: [{ x: 3, y: 5 }, { x: 7, y: 5 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 5 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 35: Nested Conditions
      gridSize: 12,
      items: [{ x: 11, y: 11 }, { x: 11, y: 0 }, { x: 0, y: 11 }],
      checkpoints: [{ x: 4, y: 4 }, { x: 8, y: 8 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 36: Robot Gates
      gridSize: 10,
      items: [{ x: 9, y: 9 }],
      obstacles: [{ x: 5, y: 0 }, { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 5, y: 4 }],
      robots: [
        { id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' },
        { id: 'RED', pos: { x: 5, y: 9 }, direction: 'UP', color: 'red' }
      ]
    },
    { // Level 37: Swarm Collection
      gridSize: 9,
      items: [{ x: 1, y: 1 }, { x: 7, y: 1 }, { x: 1, y: 7 }, { x: 7, y: 7 }],
      robots: [
        { id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' },
        { id: 'RED', pos: { x: 8, y: 0 }, direction: 'LEFT', color: 'red' },
        { id: 'GREEN', pos: { x: 0, y: 8 }, direction: 'RIGHT', color: 'green' },
        { id: 'YELLOW', pos: { x: 8, y: 8 }, direction: 'LEFT', color: 'yellow' }
      ]
    },
    { // Level 38: Sequential Dependencies
      gridSize: 11,
      items: [{ x: 10, y: 10 }],
      gates: [{ x: 5, y: 5, requires: 'BLUE' }],
      robots: [
        { id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' },
        { id: 'RED', pos: { x: 10, y: 0 }, direction: 'LEFT', color: 'red' }
      ]
    },
    { // Level 39: Robot Communication
      gridSize: 12,
      items: [{ x: 11, y: 11 }],
      buttons: [{ x: 3, y: 3, activates: 'gate1' }],
      gates: [{ x: 6, y: 6, id: 'gate1', initiallyClosed: true }],
      robots: [
        { id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' },
        { id: 'RED', pos: { x: 0, y: 11 }, direction: 'RIGHT', color: 'red' }
      ]
    },
    { // Level 40: Synchronized Dance
      gridSize: 10,
      items: [{ x: 9, y: 0 }, { x: 9, y: 9 }, { x: 0, y: 9 }],
      robots: [
        { id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' },
        { id: 'RED', pos: { x: 9, y: 0 }, direction: 'DOWN', color: 'red' },
        { id: 'GREEN', pos: { x: 9, y: 9 }, direction: 'LEFT', color: 'green' },
        { id: 'YELLOW', pos: { x: 0, y: 9 }, direction: 'UP', color: 'yellow' }
      ]
    },
    { // Level 41: Minimal Steps Challenge
      gridSize: 8,
      items: [{ x: 7, y: 7 }],
      maxSteps: 15,
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 42: Limited Instructions
      gridSize: 9,
      items: [{ x: 8, y: 8 }, { x: 0, y: 8 }, { x: 8, y: 0 }],
      maxInstructions: 20,
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 43: Memory Efficient Pattern
      gridSize: 10,
      items: [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 }, { x: 7, y: 1 }, { x: 9, y: 1 },
      { x: 1, y: 3 }, { x: 3, y: 3 }, { x: 5, y: 3 }, { x: 7, y: 3 }, { x: 9, y: 3 },
      { x: 1, y: 5 }, { x: 3, y: 5 }, { x: 5, y: 5 }, { x: 7, y: 5 }, { x: 9, y: 5 },
      { x: 1, y: 7 }, { x: 3, y: 7 }, { x: 5, y: 7 }, { x: 7, y: 7 }, { x: 9, y: 7 },
      { x: 1, y: 9 }, { x: 3, y: 9 }, { x: 5, y: 9 }, { x: 7, y: 9 }, { x: 9, y: 9 }],
      maxInstructions: 30,
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 44: Algorithm Efficiency Test
      gridSize: 12,
      items: [{ x: 11, y: 11 }, { x: 11, y: 0 }, { x: 0, y: 11 }, { x: 5, y: 5 }, { x: 6, y: 6 }],
      maxSteps: 40,
      maxInstructions: 25,
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 45: The Grand Optimization
      gridSize: 15,
      items: [{ x: 0, y: 14 }, { x: 14, y: 14 }, { x: 14, y: 0 }, { x: 7, y: 7 },
      { x: 1, y: 1 }, { x: 13, y: 1 }, { x: 1, y: 13 }, { x: 13, y: 13 }],
      obstacles: [{ x: 7, y: 0 }, { x: 7, y: 1 }, { x: 7, y: 2 }, { x: 7, y: 3 }, { x: 7, y: 4 },
      { x: 7, y: 10 }, { x: 7, y: 11 }, { x: 7, y: 12 }, { x: 7, y: 13 }, { x: 7, y: 14 },
      { x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 },
      { x: 10, y: 7 }, { x: 11, y: 7 }, { x: 12, y: 7 }, { x: 13, y: 7 }, { x: 14, y: 7 }],
      maxSteps: 60,
      maxInstructions: 35,
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 46: Dynamic Obstacles
      gridSize: 10,
      items: [{ x: 9, y: 9 }],
      obstacles: [{ x: 5, y: 5, appearsAtStep: 10 }],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 47: Moving Platforms
      gridSize: 10,
      items: [{ x: 9, y: 9 }],
      platforms: [
        { x: 0, y: 4, length: 5, direction: 'RIGHT', speed: 1 },
        { x: 5, y: 6, length: 5, direction: 'LEFT', speed: 1 }
      ],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 48: Teleporters
      gridSize: 10,
      items: [{ x: 9, y: 9 }],
      teleporters: [
        { x: 2, y: 2, target: { x: 7, y: 7 } },
        { x: 7, y: 7, target: { x: 2, y: 2 } }
      ],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 49: Gravity Wells
      gridSize: 10,
      items: [{ x: 9, y: 9 }],
      gravityWells: [
        { x: 5, y: 5, strength: 2, radius: 3 }
      ],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
    { // Level 50: The Ultimate Challenge
      gridSize: 15,
      items: [{ x: 14, y: 14 }, { x: 0, y: 14 }, { x: 14, y: 0 }, { x: 0, y: 0 }],
      obstacles: [
        { x: 7, y: 0, appearsAtStep: 10 },
        { x: 7, y: 14, appearsAtStep: 20 },
        { x: 0, y: 7, appearsAtStep: 30 },
        { x: 14, y: 7, appearsAtStep: 40 }
      ],
      platforms: [
        { x: 0, y: 7, length: 15, direction: 'RIGHT', speed: 1, appearsAtStep: 50 }
      ],
      teleporters: [
        { x: 2, y: 2, target: { x: 12, y: 12 }, appearsAtStep: 60 },
        { x: 12, y: 12, target: { x: 2, y: 2 }, appearsAtStep: 70 }
      ],
      gravityWells: [
        { x: 7, y: 7, strength: 3, radius: 5, appearsAtStep: 80 }
      ],
      robots: [{ id: 'BLUE', pos: { x: 0, y: 0 }, direction: 'RIGHT', color: 'blue' }]
    },
  ]
};
