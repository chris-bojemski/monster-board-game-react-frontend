import React, { Component, Fragment } from 'react';
import './App.css';
import GameInstance from './components/GameInstance'
import TeamSelector from './components/TeamSelector'
import GameOver from './components/GameOver'
import BackgroundVideo from './components/BackgroundVideo'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      panel: 'gameInstance',
      monsters: null,
      attacks: null,
      teams: null,
      team1: null,
      team2: null,
      team1Roster: null,
      team2Roster: null,
      assignments: [],
      gameWonBy: null
    }
  }

  monstersURL = 'http://localhost:4000/monsters'
  attacksURL = 'http://localhost:4000/attacks'
  teamsURL = 'http://localhost:4000/teams'
  teamAssignmentURL = 'http://localhost:4000/team_assignments'

  componentDidMount() {
    fetch(this.monstersURL)
    .then(r=>r.json())
    .then(monsters=>this.setState({ monsters }), this.setState({
      gameWonBy: [1, this.findTeamMonsters(1)]
    }))

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

  findTeamMonsters = teamId => {
    if (!this.state.teams) {
      return []
    }
    const team = this.state.teams.find( team => {
      return team.id === teamId
    })

    return this.state.assignments.filter( assignment => assignment.team_id === team.id).map( assignment => {
      return this.state.monsters.find( monster => monster.id === assignment.monster_id )
    })
  }

  selectTeam = teamId => {
    if (this.state.team1 === null) {
      this.setState({ team1: teamId, team1Roster: this.findTeamMonsters(teamId) })

    } else if (this.state.team2 === null) {
      this.setState({ team2: teamId, team2Roster: this.findTeamMonsters(teamId) }, () => {
        this.changePanel('gameInstance')
      })
    }
  }

  setWin = (playerId, teamId) => {
    this.setState({ gameWonBy: [playerId, this.findTeamMonsters(teamId)] })
  }

  render() {
    const showGame = this.state.team1 && this.state.team2 ? true : false
    return (
      <Fragment>
      <div className="fullscreen-bg">
        <BackgroundVideo />
      </div>
      <img className="logo" src="https://i.imgur.com/IIxo52q.png" alt=""/>
      {showGame && !this.state.gameWonBy ?  <GameInstance
          monsters={this.state.monsters}
          attacks={this.state.attacks}
          findMonster={this.findMonster}
          team1={this.state.team1}
          team2={this.state.team2}
          team1Roster={this.state.team1Roster}
          team2Roster={this.state.team2Roster}
          findTeamMonsters={this.findTeamMonsters}
        />
      : !showGame && !this.state.gameWonBy ? <TeamSelector
          monsters={this.state.monsters}
          attacks={this.state.attacks}
          teams={this.state.teams}
          assignments={this.state.assignments}
          changePanel={this.changePanel}
          findTeamMonsters={this.findTeamMonsters}
          team1={this.state.team1}
          team2={this.state.team2}
          selectTeam={this.selectTeam}
        />
      : null}
      {this.state.gameWonBy
        ?
      <GameOver
        wonBy={this.state.gameWonBy[0]}
        team={this.state.gameWonBy[1]}
      />
        :
      null}
      </Fragment>
    );
  }
}

export default App;
