import React, { Component } from 'react';
import TetrisSquare from '../TetrisSquare';
import classNames from 'classnames';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { board: this.props.store.getState().toJS().board };
  }

  componentDidMount() {
    const store = this.props.store;

    this.props.store.subscribe(() => {
      this.setState({ board: store.getState().toJS().board });
    });
  }

  render() {
    const board = this.state.board;

    return (
      <div className="Board">{
        board.map((col, x) => {
          return <div key={x} className="Board-col">{
            col.map((sq, y) => {
              const classes = classNames(
                'Board-sq',
                { 'Board-sq-active': TetrisSquare.ACTIVE === board[x][y].state },
                { 'Board-sq-frozen': TetrisSquare.FROZEN === board[x][y].state },
                { 'Board-sq-ghost': TetrisSquare.GHOST === board[x][y].state },
                { 'Board-sq-obscured': y <= 1 }
              );
              return <div key={y} className={classes}></div>
            })
          }</div>
        })
      }</div>
    );
  }
}

export default Board;
