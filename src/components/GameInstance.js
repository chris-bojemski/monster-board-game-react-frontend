import React from 'react'
import GameBoard from './GameBoard';
import PlayerOneDiceContainer from './PlayerOneDiceContainer';
import PlayerTwoDiceContainer from './PlayerTwoDiceContainer';

class GameInstance extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locked: 0,
      hovered: 0,
      currentTurn: 0,
      stage: 'unstarted',
      p1Turn: 0,
      p1Move: 0,
      p1Attack: 0,
      p2Turn: 0,
      p2Move: 0,
      p2Attack: 0,
    }
  }

  stageProg = {
    unstarted: 'checkGameState',
    checkGameState: 'rollTurn',
    rollTurn: 'rollMove',
    lock: 'rollMove',
    rollMove: 'rollAttack',
    rollAttack: 'move',
    move: 'attack',
    attack: 'checkGameState'
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

  renderHoverCard = (monsterId) => {
    this.setState({ hovered: monsterId })
  }

  unrenderHoverCard = () => {
    this.setState({ hovered: 0 })
  }

  getBannerText = () => {
    return this.state.hovered ? this.state.hovered : null
  }

  setInitialStage = () => {
    this.setState({ stage: 'checkGameState' })
  }

  advanceStage = () => {
    const stage = this.stageProg[this.state.stage]
    this.setState({ stage })
  }

  checkGameStage = () => {
    if (this.state.stage === 'checkGameState') {
      this.advanceStage()
    }

    if (this.state.stage === 'rollTurn') {
      // check if both players have rolled 
      if (this.state.p1Turn && this.state.p2Turn) {
        let currentTurn = 0
        if (this.state.p1Turn > this.state.p2Turn) {
          currentTurn = 1
        } else if (this.state.p1Turn < this.state.p2Turn) {
          currentTurn = 2
        } else if (this.state.p1Turn === this.state.p2Turn) {
          // if you rolled the same, reroll
          this.setState({ p1Turn: 0, p2Turn: 0 })
          return
        }

        this.setState({ currentTurn })
        this.advanceStage()
      }
    }

    if (this.state.stage === 'rollAttack') {
      
    }
  }

  diceValueMultiplexer = (playerId, diceValue) => {
    console.log(`The value ${diceValue} was submitted by Player ${playerId} during the ${this.state.stage} stage.`)
    if (this.state.stage === 'rollTurn') {
      if (playerId === 1) {
        this.setState({ p1Turn: diceValue })
      } else if (playerId === 2) {
        this.setState({ p2Turn: diceValue })
      }
    } else if (this.state.stage === 'rollMove') {
      if (playerId === 1 && this.state.currentTurn === 1) {
        this.setState({ p1Move: diceValue }, () => {
          this.advanceStage()
        })
      } else if (playerId === 2 && this.state.currentTurn === 2) {
        this.setState({ p2Move: diceValue }, () => {
          this.advanceStage()
        })
      }
    } else if (this.state.stage === 'rollAttack') {
      if (playerId === 1 && this.state.currentTurn === 1) {
        this.setState({ p1Attack: diceValue }, () => {
          this.advanceStage()
        })
      } else if (playerId === 2 && this.state.currentTurn === 2) {
        this.setState({ p2Attack: diceValue }, () => {
          this.advanceStage()
        })
      }
    }
  }
  
  render() {
    const stage = this.checkGameStage()

    return (
      <div className="App">
        <div className="playArea">
          <PlayerOneDiceContainer 
            diceValueMultiplexer={this.diceValueMultiplexer}
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
              hover={this.renderHoverCard}
              unhover={this.unrenderHoverCard}
              setInitialStage={this.setInitialStage}
              stage={this.state.stage}
              advanceStage={this.advanceStage}
            />
          </div>
          <PlayerTwoDiceContainer 
            diceValueMultiplexer={this.diceValueMultiplexer}
          />
        </div>
        <br />
        <div className="hoverCard">
          {this.getBannerText()}
        </div>
      </div>
    )
  }
}


export default GameInstance
