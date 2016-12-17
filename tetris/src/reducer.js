import { INITIAL_STATE } from './app';
import { placePiece, lowerActivePiece, dropPiece, moveLeft, moveRight, rotate } from './actions';
import TetrisPiece from './TetrisPiece';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'PLACE_PIECE':
    return placePiece(state, action.piece);
  case 'LOWER_PIECE':
    return lowerActivePiece(state);
  case 'DROP_PIECE':
    return dropPiece(state);
  case 'MOVE_LEFT':
    return moveLeft(state);
  case 'MOVE_RIGHT':
    return moveRight(state);
  case 'ROTATE_CLOCKWISE':
    return rotate(state, TetrisPiece.ROTATIONS.CLOCKWISE);
  case 'ROTATE_COUNTERCLOCKWISE':
    return rotate(state, TetrisPiece.ROTATIONS.COUNTERCLOCKWISE);
  case 'TOGGLE_PAUSE':
    return state.set('paused', !state.get('paused'));
  default:
    return state;
  }
}
