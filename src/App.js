import React, { Component } from 'react';
import './App.css';
import GameInstance from './components/GameInstance'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      monsters: [],
      attacks: [],
    }
  }

  monstersURL = 'http://localhost:4000/monsters'
  attacksURL = 'http://localhost:4000/attacks'
  // monsterAttacksURL = 'http://localhost:4000/monster_attacks'

  componentDidMount() {
    fetch(this.monstersURL)
    .then(r=>r.json())
    .then(monsters=>this.setState({ monsters }))

    fetch(this.attacksURL)
    .then(r=>r.json())
    .then(attacks=>this.setState({ attacks }))
  }
  
  render() {
    return (
      <GameInstance />
      // <div className="App">
      //   <div className="playArea">
      //     <PlayerOneDiceContainer />
      //     <div className="gameContainer">
      //       <GameBoard />
      //     </div>
      //     <PlayerTwoDiceContainer />
      //   </div>
      // </div>
    );
  }
}

export default App;
