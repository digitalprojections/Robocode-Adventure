
export enum BlockType {
  MOVE_FORWARD = 'MOVE_FORWARD',
  TURN_LEFT = 'TURN_LEFT',
  TURN_RIGHT = 'TURN_RIGHT',
  COLLECT = 'COLLECT',
  REPEAT = 'REPEAT'
}

export type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';
export type RobotId = 'BLUE' | 'RUBY';
export type GameTheme = 'FRUIT' | 'SPACE' | 'OCEAN' | 'CONSTRUCTION';

export interface Position {
  x: number;
  y: number;
}

export interface RobotState {
  id: RobotId;
  pos: Position;
  direction: Direction;
  color: string;
}

export interface GameState {
  robots: RobotState[];
  collectedItems: number;
  isExecuting: boolean;
  message: string;
  level: number;
  items: Position[];
  gridSize: number;
  theme: GameTheme;
}

export interface CodeBlock {
  id: string;
  type: BlockType;
  value?: number; // for repeat
  subBlocks?: CodeBlock[]; // for nested blocks in repeat
}

export const BASE_CELL_SIZE = 50;
