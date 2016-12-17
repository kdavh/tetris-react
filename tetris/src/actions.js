import { BOARD_HEIGHT, BOARD_WIDTH } from './app';
import { Range } from 'immutable'
import TetrisBoard from './TetrisBoard';
import TetrisSquare from './TetrisSquare';
import TetrisPiece from './TetrisPiece';

export function placePiece(state, piece) {
  if (illegalPosition(state, piece)) {
    return state.set('over', true);
  } else {
    return state.update(
      'board',
      (b) => { return TetrisBoard.setSquares(b, piece, TetrisSquare.ACTIVE) }
    ).set('activePiece', piece);
  }
}

export function lowerActivePiece(state) {
  const piece = state.get('activePiece');

  if (!piece) return state;

  if (illegalPosition(state, TetrisPiece.lower(piece))) {
    const newState = freezePiece(state, piece);

    return newState.set('activePiece', null);
  } else {
    return placePiece(
      removePiece(state, piece),
      TetrisPiece.lower(piece)
    );
  }
}

export function dropPiece(state) {
  const piece = state.get('activePiece');

  if (!piece) return state;

  var newPiece = piece;

  while (!illegalPosition(state, TetrisPiece.lower(newPiece))) {
    newPiece = TetrisPiece.lower(newPiece);
  }

  return placePiece(
    removePiece(state, piece),
    newPiece
  );
}

export function rotate(state, direction) {
  const oldPiece = state.get('activePiece');
  if (!oldPiece) return state;

  const newPiece = TetrisPiece.rotate(oldPiece, direction);

  if (illegalPosition(state, newPiece)) {
    return state;
  } else {
    return placePiece(
      removePiece(state, oldPiece),
      newPiece
    );
  }
}

export function moveLeft(state) {
  const piece = state.get('activePiece');
  if (!piece) return state;

  return move(state, piece, TetrisPiece.moveLeft(piece));
}

export function moveRight(state) {
  const piece = state.get('activePiece');
  if (!piece) return state;

  return move(state, piece, TetrisPiece.moveRight(piece));
}

function move(state, oldPiece, newPiece) {
  if (illegalPosition(state, newPiece)) {
    return state;
  } else {
    state = removePiece(state, oldPiece);
    return placePiece(state, newPiece);
  }
}

function removePiece(state, piece) {
  return state.update(
    'board',
    (b) => { return TetrisBoard.setSquares(b, piece, TetrisSquare.EMPTY) }
  );
}

function freezePiece(state, piece) {
  var newState = state.update(
    'board',
    (b) => { return TetrisBoard.setSquares(b, piece, TetrisSquare.FROZEN) }
  );

  const relevantYCoords = TetrisPiece.coordsOnBoard(piece).map((coord) => {
    return coord.get('y');
  }).toSet().toList().sort()

  var rowsRemoved = 0;

  relevantYCoords.forEach((yCoord) => {
    if (TetrisBoard.rowIsFilled(newState.get('board'), yCoord)) {
      rowsRemoved += 1;
      // scan rows above and copy them downwards
      Range(0, BOARD_WIDTH).toList().forEach((x) => {
        newState = newState.updateIn(['board', x], (col) => {
          return col.delete(yCoord).unshift(TetrisSquare(TetrisSquare.EMPTY));
        });
      });
    }
  });

  return newState.update(
    'score',
    (s) => { return s + (rowsRemoved ? Math.pow(2, rowsRemoved - 1) * 100 : 0) }
  );
}

function illegalPosition(state, piece) {
  var board = state.get('board');

  return !!TetrisPiece.coordsOnBoard(piece).find((coord) => {
    if (coord.get('y') >= BOARD_HEIGHT) {
      return true;
    }

    const boardSquare = board.getIn([coord.get('x'), coord.get('y')])

    return !boardSquare ||
      boardSquare.get('state') === TetrisSquare.FROZEN ||
      coord.get('x') < 0 ||
      coord.get('x') > BOARD_WIDTH
  });
}
