import React, { Component } from 'react';
import HexTile from './HexTile';
import possibleTiles from '../movement';

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
    if (selectedMonster === 0) {
      return 
    }

    const monster = this.findMonsterInTeams(selectedMonster)
    if (monster.team === this.props.currentTurn) {
      this.setState({ selectedMonster, fromTile }, () => {
        // this.highlightBoard()
      })
    }
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

  findPossibleMoves = (monster, originTile) => {
    const oneTile = possibleTiles[originTile - 1][originTile][0][1]
    const twoTiles = possibleTiles[originTile - 1][originTile][1][2]
    const threeTiles = possibleTiles[originTile - 1][originTile][2][3]
    
    if (monster.evo_level === 1) {
      // always moves 3 blocks, irrespective of die roll.
      return oneTile.concat(twoTiles).concat(threeTiles)
    }

    const roll = this.props.currentTurn === 1 && this.props.p1Roll ? this.props.p1Roll : this.props.currentTurn === 2 ? this.props.p2Roll : null

    if (monster.evo_level === 2 && roll > 3) {
      return oneTile.concat(twoTiles).concat(threeTiles)
    } else if (monster.evo_level === 2 && roll < 4) {
      return oneTile.concat(twoTiles)
    }

    if ((monster.evo_level === 3 || monster.evo_level === 6) && roll > 3) {
      return oneTile.concat(twoTiles)
    } else if ((monster.evo_level === 3 || monster.evo_level === 6) && roll < 4) {
      return oneTile
    }
  }

  decideClickAction = (tileId, monsterId) => {
    // If there's a selected monster already, and I click on 
    // another monster on my team, switch the selection to
    // the new one I clicked on.
    
    // If there's a selected monster already, attack the one I clicked on.
    // Code not written yet.

    // If there's no selected monster, select it.
    if (!this.state.selectedMonster) {
      this.selectMonster(monsterId ? monsterId : 0, tileId)
    }

    // If there's a monster selected and I clicked on a tile that doesn't
    //    have a monster, move it to that tile.
    if (this.state.selectedMonster && !monsterId) {
      this.moveMonster(tileId)
    }
  }

  withinMoveRange = toTile => {
    const fromTile = this.state.fromTile
    const monster = this.findMonsterInTeams(this.state.selectedMonster)
    const possibleTiles = this.findPossibleMoves(monster, fromTile)
    return possibleTiles.includes(toTile)
  }

  moveMonster = toTile => {
    if (this.props.stage !== 'move' || !this.withinMoveRange(toTile)) {
      return
    }

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

    this.props.advanceStage()
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
          hover={this.props.hover}
          unhover={this.props.unhover}
          decideClickAction={this.decideClickAction}
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

    this.props.setInitialStage()
  }

  withinOneTile = (originTile, targetTile) => {
    const adjacentTiles = possibleTiles[originTile - 1][originTile][0][1]
    return adjacentTiles.includes(targetTile) ? targetTile : 0
  }

  getAllSurroundingEnemies = teamId => {
    let team, opposing = []

    if (teamId === 1) {
      team = this.state.team1Roster 
      opposing = this.state.team2Roster
    } else {
      team = this.state.team2Roster 
      opposing = this.state.team1Roster
    }

    let enemyTiles = []
    team.forEach( monster => {
      opposing.forEach( enemy => {
        if (this.withinOneTile(monster.tile, enemy.tile)) { enemyTiles.push(enemy) }
      })
    })

    enemyTiles = enemyTiles.filter( tileId => {
      return tileId !== 0
    })

    return enemyTiles
  }

  attackOptionsExist = () => {
    const player = this.state.currentTurn === 1 ? 1 : this.state.currentTurn === 2 ? 2 : null
    const enemyTiles = this.getAllSurroundingEnemies(player)
    if (enemyTiles.length > 0) {
      return true 
    }
    return false
  }

  render() {
    if (this.state.team1Roster && !this.state.gameStarted) {
      this.startGame()
    }

    if (this.props.stage === 'attack' && !this.attackOptionsExist()) {
      this.props.advanceStage()
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
