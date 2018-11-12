import React, { Component } from 'react';
import HexTile from './HexTile';
import movement from '../movement';

class GameBoard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tileCount: 57,
      id: 0,
      groundTiles: ['https://i.imgur.com/FmZU5Wp.png'],
      selectedMonster: 0,
      fromTile: 0,
      toTile: 0,
      gameStarted: false,
      team1Roster: this.props.team1Roster,
      team2Roster: this.props.team2Roster,
    }
  }

  startPositions = [
    [1, 11, 20, 30, 39, 49],
    [10, 19, 29, 38, 48, 57]
  ]

  selectMonster = (selectedMonster, fromTile) => {
    this.setState({ selectedMonster, fromTile })
  }

  findMonsterInTeams = monsterId => {
    const team1Monster = this.state.team1Roster.find( monster => {
      return monster.id === monsterId
    })

    const team2Monster = this.state.team2Roster.find( monster => {
      return monster.id === monsterId
    })

    if (team1Monster) {
      return team1Monster
    } else if (team2Monster) {
      return team2Monster
    }
  }

  moveMonster = toTile => {
    const newMonster = this.findMonsterInTeams(this.state.selectedMonster)
    newMonster.tile = toTile

    let team = []
    let stateName = ''
    if (newMonster.team === 1) {
      team = this.state.team1Roster
      stateName = 'team1Roster'
    } else {
      team = this.state.team2Roster
      stateName = 'team2Roster'
    }

    team = team.map( monster => {
      if (monster.id === newMonster.id) {
        return newMonster
      } else {
        return monster
      }
    })

    let newState = {}
    newState[stateName] = team
    
    this.setState( newState , () => {
      this.setState({ fromTile: 0, selectedMonster: 0})
    })
  }

  monsterOnTile = tileId => {
    if (!this.state.team1Roster) { return 0 }

    const team1Monster = this.state.team1Roster.find( monster => {
      return monster.tile === tileId
    })

    const team2Monster = this.state.team2Roster.find( monster => {
      return monster.tile === tileId
    })

    if (team1Monster) {
      return team1Monster
    } else if (team2Monster) {
      return team2Monster
    }

    return 0
  }

  renderBoard = () => {
    const hexes = []
    for (let i = 1; i < this.state.tileCount + 1; i++) {
      const monsterHere = this.monsterOnTile(i)
      hexes.push(
        <HexTile
          key={i}
          id={i}
          image={this.state.groundTiles[0]}
          monsterId={ this.props.monsters && monsterHere ? monsterHere.id : null }
          direction={ monsterHere && monsterHere.team === 1 ? 'right' : 'left' }
          selectMonster={this.selectMonster}
          selectedMonster={this.state.selectedMonster}
          findMonster={this.props.findMonster}
          moveMonster={this.moveMonster}
        />
      )
    }
    return hexes
  }

  startGame() {
    const monstersWithPositions1 = []
    for (let i = 0; i < this.state.team1Roster.length; i++) {
      const monster = this.state.team1Roster[i]
      monster.tile = this.startPositions[0][i]
      monster.team = 1
      monstersWithPositions1.push(monster)
    }

    const monstersWithPositions2 = []
    for (let i = 0; i < this.state.team2Roster.length; i++) {
      const monster = this.state.team2Roster[i]
      monster.tile = this.startPositions[1][i]
      monster.team = 2
      monstersWithPositions2.push(monster)
    }

    this.setState({ 
      gameStarted: true,
      team1Roster: monstersWithPositions1,
      team2Roster: monstersWithPositions2,
    })
  }

  render() {
    if (this.state.team1Roster && !this.state.gameStarted) {
      this.startGame()
    }

    return (
      <div className="board">
        <ul id="hexGrid">
            {this.renderBoard()}
        </ul>
      </div>
    )
  }
}

export default GameBoard;
