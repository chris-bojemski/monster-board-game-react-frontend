import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameBoard from './components/GameBoard';
import PlayerOneDiceContainer from './components/PlayerOneDiceContainer';
import PlayerTwoDiceContainer from './components/PlayerTwoDiceContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="playArea">
          <PlayerOneDiceContainer />
          <div className="gameContainer">
            <GameBoard />
          </div>
          <PlayerTwoDiceContainer />
        </div>
      </div>
    );
  }
}

export default App;
