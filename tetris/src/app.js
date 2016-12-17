import { Map } from "immutable";
import TetrisBoard from './TetrisBoard'

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 22;
export const BOARD_TOP_CENTER = Map({ x: BOARD_WIDTH / 2 - 1, y: 1 });
export const GRAVITY_PULL_INTERVAL = 250;

// board is x going right increases
// y going up increases
// origin (0, 0) is visually the bottom left
export const INITIAL_STATE = Map({
  board: TetrisBoard(BOARD_WIDTH, BOARD_HEIGHT),
  paused: false,
  over: false,
  score: 0
});
