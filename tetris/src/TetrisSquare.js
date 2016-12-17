import { fromJS } from 'immutable'

function TetrisSquare(state) {
  return fromJS({ state });
}

TetrisSquare.EMPTY = 0;
TetrisSquare.ACTIVE = 1;
TetrisSquare.FROZEN = 2;

export default TetrisSquare;
