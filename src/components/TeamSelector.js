import React, { Fragment } from 'react' 

class TeamSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      team1: null,
      team2: null,
    }
  }

  makeTeamLists = () => {
    return this.props.teams.map( team => {
      const monsters = this.props.findTeamMonsters(team.id)
      const listItems = monsters.map(monster => {
        return (
          <li>
            {monster.name}
          </li>
        )
      })

      return (
        <div>
          <h3>{team.name}</h3>
          <ul>
            {listItems}
          </ul>
          <button onClick={() => this.selectTeam(team.id)}>Select</button>
        </div>
      )
    })
  }

  selectTeam = (teamId) => {
    if (this.state.team1 === null) {
      this.setState({ team1: teamId })
    } else if (this.state.team2 === null) {
      this.setState({ team2: teamId }, () => {
        this.props.changePanel('gameInstance')
      })
    }
  }
  
  render() {
    let header = ''
    if (this.state.team1 === null) {
      header = "Player 1"
    } else { 
      header = "Player 2" 
    }
    return (
      <Fragment>
        <h2>{header}, pick a team</h2>
        <div className="team-selector">
          {this.makeTeamLists()}
        </div>
      </Fragment>
    )
  }
}

export default TeamSelector 