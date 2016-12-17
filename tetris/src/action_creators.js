import { BOARD_TOP_CENTER, GRAVITY_PULL_INTERVAL } from './app.js';
import TetrisPiece from './TetrisPiece';
import Random from 'random-js';

export function generatePiece() {
  return (dispatch) => {
    const i = Random.integer(0, TetrisPiece.SHAPES.size - 1)(Random.engines.nativeMath)

    dispatch({
      type: 'PLACE_PIECE',
      piece: TetrisPiece(TetrisPiece.SHAPES.get(i), BOARD_TOP_CENTER)
    });
  }
}

export function makeGravity() {
  return (dispatch, getState) => {
    setTimeout(() => {
      const state = getState()

      if (!state.get('over')) {
        if (!state.get('paused')) {
          dispatch({
            type: 'LOWER_PIECE'
          });
        }

        if (!state.get('activePiece')) {
          dispatch(generatePiece());
        }

        dispatch(makeGravity());
      }
    }, GRAVITY_PULL_INTERVAL);
  }
}
