import React, { Component } from 'react';
import Board from './Board';
import { generatePiece, makeGravity } from '../action_creators';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this._stateFromStore();
  }

  componentWillMount() {
    document.addEventListener("keydown", this._handleKeyDown.bind(this), false);

    const store = this.props.store;

    store.dispatch(generatePiece());
    store.dispatch(makeGravity());

    store.subscribe(() => {
      this.setState(this._stateFromStore());
    });
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown.bind(this), false);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Tetris, hot damn</h2>
        </div>
        <div className="App-scoreboard">
          <h3>{this._renderGameInfo()}</h3>
          <div>Score: { this.state.score }</div>
        </div>
        <Board store={this.props.store}/>
      </div>
    );
  }

  _renderGameInfo() {
    if (this.state.over) {
      return "Game Over";
    } else if (this.state.paused) {
      return "PAUSED";
    } else {
      return "---";
    }
  }

  _stateFromStore() {
    const state = this.props.store.getState();

    return {
      over: state.get('over'),
      paused: state.get('paused'),
      score: state.get('score')
    };
  }

  _handleKeyDown(event) {
    switch (event.key) {
      case "ArrowDown":
        return this._dispatch({ type: "LOWER_PIECE" });
      case " ":
        return this._dispatch({ type: "DROP_PIECE" });
      case "x":
      case "ArrowUp":
        return this._dispatch({ type: "ROTATE_CLOCKWISE" });
      case "z":
        return this._dispatch({ type: "ROTATE_COUNTERCLOCKWISE" });
      case "ArrowLeft":
        return this._dispatch({ type: "MOVE_LEFT" });
      case "ArrowRight":
        return this._dispatch({ type: "MOVE_RIGHT" });
      case "p":
        return this._dispatch({ type: "TOGGLE_PAUSE" });
      default:
    }
  }

  _dispatch(payload) {
    return this.props.store.dispatch(payload);
  }
}

App.propTypes = {
  board: React.PropTypes.instanceOf(Map)
}

export default App;
