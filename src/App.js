import React, { Component, Fragment } from 'react';
import './App.css';
import GameInstance from './components/GameInstance'
import ViewButtons from './components/ViewButtons'
import TeamSelector from './components/TeamSelector'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      panel: 'gameInstance',
      monsters: null,
      attacks: null,
      team1: null,
      team2: null,
      assignments: null,
    }
  }

  monstersURL = 'http://localhost:4000/monsters'
  attacksURL = 'http://localhost:4000/attacks'
  teamsURL = 'http://localhost:4000/teams'
  teamAssignmentURL = 'http://localhost:4000/team_assignments'

  componentDidMount() {
    fetch(this.monstersURL)
    .then(r=>r.json())
    .then(monsters=>this.setState({ monsters }))

    fetch(this.attacksURL)
    .then(r=>r.json())
    .then(attacks=>this.setState({ attacks }))

    fetch(this.teamsURL)
    .then(r=>r.json())
    .then(teams=>this.setState({ teams }))

    fetch(this.teamAssignmentURL)
    .then(r=>r.json())
    .then(assignments=>this.setState({ assignments }))
  }

  findMonster = monsterId => {
    return this.state.monsters.find( monster => {
      return monster.id === monsterId
    })
  }

  changePanel = panel => {
    this.setState({ panel })
  }
  
  render() {
    const showGame = this.state.panel === 'gameInstance'
    return (
      <Fragment>
        {showGame ?  <GameInstance 
            monsters={this.state.monsters} 
            attacks={this.state.attacks}
            findMonster={this.findMonster}
            team1={this.state.team1}
            team2={this.state.team2}
          />
        : <TeamSelector 
            monsters={this.state.monsters}
            attacks={this.state.attacks}
            teams={this.state.teams}
            assignments={this.state.assignments}
            changePanel={this.changePanel}
          />}
        <ViewButtons changePanel={this.changePanel}/>
      </Fragment>
    );
  }
}

export default App;
