import React from 'react'

class TeamSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      team1: null,
      team2: null,
    }
  }

  makeTeamLists = () => {
    if (!this.props.monsters || !this.props.teams) { return null }

    return this.props.teams.map( team => {
      const monsters = this.props.findTeamMonsters(team.id)
      const listItems = monsters.map( monster => {
        return (
          <img src={monster.sprite_front} alt="" />
        )
      })

      return (
        <div>
          <div className="cardHeader">
            <h3>{team.name}</h3>
          </div>
          <div className="card">
            {listItems}
            <br />
            <div className="teamSelectButton">
              <button className="selectButton" onClick={() => this.props.selectTeam(team.id)}>Select</button>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    let header = ''
    if (this.props.team1 === null) {
      header = "Player 1"
    } else {
      header = "Player 2"
    }
    return (
      <div>
        <div className="selectScreenHeader">
          <h2>{header}, Select Your Team!</h2>
        </div>
        <div className="content">
          {this.makeTeamLists()}
        </div>
      </div>
    )
  }
}

export default TeamSelector
