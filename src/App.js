import React, { Component } from 'react';
import './App.css';
import GameInstance from './components/GameInstance'

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      monsters: null,
      attacks: null,
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
      <GameInstance 
        monsters={this.state.monsters} 
        attacks={this.state.attacks}
      />
    );
  }
}

export default App;
