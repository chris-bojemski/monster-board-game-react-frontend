import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import PlayerOneDiceContainer from './components/PlayerOneDiceContainer';
import PlayerTwoDiceContainer from './components/PlayerTwoDiceContainer';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      monsters: []
    }
  }

  monstersURL = 'http://localhost:4000/monsters'

  setInitialMonsterState = monsters => {
    this.setState({ monsters })
  }

  componentDidMount() {
    fetch(this.monstersURL)
    .then(r=>r.json())
    .then(j=>this.setInitialMonsterState(j))
  }
  
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
