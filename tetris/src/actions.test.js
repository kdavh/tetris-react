import { placePiece, lowerActivePiece } from './actions';
import { fromJS } from 'immutable';
import { INITIAL_STATE } from './app';
import TetrisSquare from './TetrisSquare';
import TetrisPiece from './TetrisPiece';

describe('placePiece', () => {
  it('should change applicable board squares to active', () => {
    const newState = placePiece(
      INITIAL_STATE,
      TetrisPiece(
        fromJS([{ x: 0, y: 0 }, { x: 1, y: 0 }]),
        fromJS({ x: 4, y: 5 })
      )
    );

    expect(newState.getIn(['board', 4, 5]).get('state')).toEqual(TetrisSquare.ACTIVE);
  });
});

describe('lowerActivePiece', () => {
  it('should remove active squares and make one higher y axis squares active', () => {
    const initialState = placePiece(
      INITIAL_STATE,
      TetrisPiece(
        fromJS([{ x: 0, y: 0 }, { x: 1, y: 0 }]),
        fromJS({ x: 4, y: 5 })
      )
    );

    expect(initialState.getIn(['board', 4, 5]).get('state')).toEqual(TetrisSquare.ACTIVE);
    expect(initialState.getIn(['board', 4, 6]).get('state')).toEqual(TetrisSquare.EMPTY);

    const newState = lowerActivePiece(initialState);

    expect(newState.getIn(['board', 4, 5]).get('state')).toEqual(TetrisSquare.EMPTY);
    expect(newState.getIn(['board', 4, 6]).get('state')).toEqual(TetrisSquare.ACTIVE);
  });
});
