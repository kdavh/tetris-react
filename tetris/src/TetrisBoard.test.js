import { fromJS } from 'immutable';
import TetrisBoard from './TetrisBoard';
import TetrisPiece from './TetrisPiece';
import TetrisSquare from './TetrisSquare';

describe('TetrisBoard.rowIsFilled', () => {
  it('should return false if right hand x is not filled', () => {
    const piece = TetrisPiece(
      fromJS([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }]),
      fromJS({ x: 0, y: 3 })
    );

    var board = TetrisBoard.setSquares(
      TetrisBoard(4, 4), piece, TetrisSquare.FROZEN
    )

    expect(TetrisBoard.rowIsFilled(board, 3)).toBe(false)
  });

  it('should return false if left hand x is not filled', () => {
    const piece = TetrisPiece(
      fromJS([{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }]),
      fromJS({ x: 0, y: 3 })
    );

    var board = TetrisBoard.setSquares(
      TetrisBoard(4, 4), piece, TetrisSquare.FROZEN
    )

    expect(TetrisBoard.rowIsFilled(board, 3)).toBe(false)
  });

  it('should return true if the row is filled', () => {
    const piece = TetrisPiece(
      fromJS([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }]),
      fromJS({ x: 0, y: 3 })
    );

    var board = TetrisBoard.setSquares(
      TetrisBoard(4, 4), piece, TetrisSquare.FROZEN
    )

    expect(TetrisBoard.rowIsFilled(board, 3)).toBe(true)
  });
});
