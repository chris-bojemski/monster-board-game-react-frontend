import React from 'react'
import GameBoard from './GameBoard';
import PlayerOneDiceContainer from './PlayerOneDiceContainer';
import PlayerTwoDiceContainer from './PlayerTwoDiceContainer';

const GameInstance = props => (
  <div className="App">
    <div className="playArea">
      <PlayerOneDiceContainer />
      <div className="gameContainer">
        <GameBoard 
          monsters={props.monsters} 
          attacks={props.attacks} 
          findMonster={props.findMonster}
          team1={props.team1}
          team2={props.team2}
          findTeamMonsters={props.findTeamMonsters}
        />
      </div>
      <PlayerTwoDiceContainer />
    </div>
  </div>
)

export default GameInstance