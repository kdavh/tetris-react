import { Map, fromJS } from 'immutable'

const TetrisPiece = (shape, center, rotation = TetrisPiece.ROTATIONS.NONE, swapped = false) => {
  shape = rotateShape(shape, rotation);

  return fromJS({ shape, center, swapped });
}

TetrisPiece.ROTATIONS = {
  NONE: 0,
  CLOCKWISE: 1,
  COUNTERCLOCKWISE: 2
}

// pieces are represented by x, y vectors from the center
TetrisPiece.SHAPES = fromJS([
  [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }],
  [{ x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }],
  [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }],
  [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }],
  [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }],
  [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }],
  [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }],
])

TetrisPiece.lower = (piece) => {
  return move(piece, 0, 1);
}

TetrisPiece.moveLeft = (piece) => {
  return move(piece, -1, 0);
}

TetrisPiece.moveRight = (piece) => {
  return move(piece, 1, 0);
}

TetrisPiece.coordsOnBoard = (piece) => {
  const pieceCenterX = piece.getIn(['center', 'x']);
  const pieceCenterY = piece.getIn(['center', 'y']);

  return piece.get('shape').map((coord) => {
    return coord.set('x', pieceCenterX + coord.get('x'))
      .set('y', pieceCenterY + coord.get('y'))
  })
}

TetrisPiece.rotate = (piece, direction) => {
  return piece.set('shape', rotateShape(piece.get('shape'), direction));
}

function move(piece, cx, cy) {
  return piece.setIn(['center', 'x'], piece.getIn(['center', 'x']) + cx)
    .setIn(['center', 'y'], piece.getIn(['center', 'y']) + cy)
}

function rotateShape(shape, direction) {
  switch (direction) {
    case TetrisPiece.ROTATIONS.CLOCKWISE :
      return shape.map((coord) => {
        const oldY = coord.get('y');

        return Map({ x: oldY === 0 ? oldY : oldY * -1, y: coord.get('x')});
      });
    case TetrisPiece.ROTATIONS.COUNTERCLOCKWISE :
      return shape.map((coord) => {
        const oldX = coord.get('x');

        return Map({ x: coord.get('y'), y: oldX === 0 ? oldX : oldX * -1});
      });
    default:
      return shape;
  }
}

export default TetrisPiece;
