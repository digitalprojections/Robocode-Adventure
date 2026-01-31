import { MissionConfig, Position, RobotId, Direction, RobotState } from '../types';

/**
 * Generates a list of game levels (MissionConfig) from an arbitrary dataset.
 * 
 * @param dataSet The source data array.
 * @param strategy A function that transforms a single data item into a MissionConfig.
 * @returns An array of MissionConfig objects ready to be used in a theme.
 */
export function generateLevelsFromData<T>(
    dataSet: T[],
    strategy: (data: T, index: number) => MissionConfig
): MissionConfig[] {
    return dataSet.map((data, index) => strategy(data, index));
}

/**
 * Helper to create a simple level from a list of item positions.
 * Assumes a default robot starting at (0,0) facing RIGHT.
 * 
 * @param points List of positions where items should be placed.
 * @param gridSize Size of the grid (default: 6).
 * @param robotStart Optional custom robot start configuration.
 */
export function createLevelFromPoints(
    points: Position[],
    gridSize: number = 6,
    robotStart?: RobotState
): MissionConfig {
    const defaultRobot: RobotState = {
        id: 'BLUE',
        pos: { x: 0, y: 0 },
        direction: 'RIGHT',
        color: 'blue'
    };

    return {
        gridSize,
        items: points,
        robots: [robotStart || defaultRobot]
    };
}
