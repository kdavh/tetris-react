import { List } from 'immutable'
import TetrisSquare from './TetrisSquare'

function TetrisBoard(width, height) {
  return List(Array(width)).map((x) => {
    return List(Array(height)).map((y) => {
      return TetrisSquare(TetrisSquare.EMPTY);
    });
  });
}

TetrisBoard.setSquares = (board, piece, square_state) => {
  const pieceCenterX = piece.getIn(['center', 'x']);
  const pieceCenterY = piece.getIn(['center', 'y']);

  piece.get('shape').forEach((coord) => {
    board = board.setIn(
      [pieceCenterX + coord.get('x'), pieceCenterY + coord.get('y')],
      TetrisSquare(square_state)
    )
  });

  return board;
}

TetrisBoard.rowIsFilled = (board, yCoord) => {
  return !board.find((col) => {
    return col.get(yCoord).get('state') !== TetrisSquare.FROZEN;
  });
}

export default TetrisBoard;
