import { fromJS } from 'immutable';
import { INITIAL_STATE } from './app';
import TetrisPiece from './TetrisPiece';

describe('TetrisPiece.rotate', () => {
  it('should return a clockwise rotated piece when passed clockwise rotation', () => {
    const piece = TetrisPiece(
      fromJS([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }]),
      fromJS({ x: 4, y: 5 })
    );

    const rotatedPiece = TetrisPiece.rotate(piece, TetrisPiece.ROTATIONS.CLOCKWISE);

    expect(rotatedPiece.get('shape').toJS()).toEqual([{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }]);
  });

  it('should return a clockwise rotated piece when passed clockwise rotation', () => {
    const piece = TetrisPiece(
      fromJS([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }]),
      fromJS({ x: 4, y: 5 })
    );

    const rotatedPiece = TetrisPiece.rotate(piece, TetrisPiece.ROTATIONS.COUNTERCLOCKWISE);

    expect(rotatedPiece.get('shape').toJS()).toEqual([{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }]);
  });
});
