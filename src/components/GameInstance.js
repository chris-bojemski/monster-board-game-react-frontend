import React from 'react'
import GameBoard from './GameBoard';
import PlayerOneDiceContainer from './PlayerOneDiceContainer';
import PlayerTwoDiceContainer from './PlayerTwoDiceContainer';

class GameInstance extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      locked: 0,
    }
  }

  // 1. start game
  // 1a. check if game is over
  // 2. roll turn dice to decide who goes first
  // 3. lock other player’s controls
  // 4. roll other dice
  // 5. select monster to move
  // 6. (perform checks, then) move monster to specified tile/attack other monster at panel
  // 7. unlock other player’s controls

  // stage: check game -> roll turns -> action select -> action checks -< back to select/perform action -> turn end
  
  render() {
    return (
      <div className="App">
        <div className="playArea">
          <PlayerOneDiceContainer 
          />
          <div className="gameContainer">
            <GameBoard 
              monsters={this.props.monsters} 
              attacks={this.props.attacks} 
              findMonster={this.props.findMonster}
              team1={this.props.team1}
              team2={this.props.team2}
              team1Roster={this.props.team1Roster}
              team2Roster={this.props.team2Roster}
              findTeamMonsters={this.props.findTeamMonsters}
            />
          </div>
          <PlayerTwoDiceContainer 
          />
        </div>
      </div>
    )
  }
}


export default GameInstance