import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameBoard from './components/GameBoard';
import DiceContainer from './components/DiceContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="playArea">
          <DiceContainer />
          <div className="gameContainer">
            <GameBoard />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
