import React from 'react';
import ReactDice from 'react-dice-complete';

class PlayerTwoDiceContainer extends React.Component {

  constructor() {
    super()

    this.state = {
      dices: [{id: 4, value: 0, type: "Turn"}, {id: 5, value: 0, type: "Attack"}, {id: 6, value: 0, type: "Move"}],
      resultType: "",
      resultValue: 0,
    }
  }

  renderDice = () => {
    return this.state.dices.map( dice => {
      return (
        <div className={dice.type} onClick={this.saveRoll}>
          {dice.type}
          <ReactDice
            key={dice.type}
            id={dice.id}
            value={dice.value}
            numDice={1}
            rollDone={this.rollDoneCallback}
            ref={dice => this.reactDice = dice}
            faceColor="rgb(153,0,0)"
            dotColor="rgb(251,251,251)"
            outline="true"
            outlineColor="rgb(102,0,0)"
            dieSize="75"
          />
        </div>
      )
    })
  }

  showGamePhase = () => {
    // console.log(this.props.gameTurn)
    let gamePhase = this.props.gameTurn
    if (gamePhase === "rollTurn") {
      return "Roll for Turn Order!"
    } else if (gamePhase === "rollMove") {
      return "Roll for Movement!"
    } else if (gamePhase === "rollAttack") {
      return "Roll for Attack!"
    } else if (gamePhase === "move") {
      return "Move a Pokemon!"
    } else if (gamePhase === "attack") {
      return "Attack a Pokemon!"
    }
  }

  render() {
    // console.log(this.state)
    return (
      <div className="playerTwoDiceTray">
        <h3 className="diceHeader">Player 2</h3>
        <br />
        <div className="gamePhase">{this.showGamePhase()}</div>
        <br />
        <ReactDice
          key="playerTwoDiceTray"
          numDice={1}
          rollDone={this.rollDoneCallback}
          faceColor="rgb(153,0,0)"
          dotColor="rgb(251,251,251)"
          outline="true"
          outlineColor="rgb(102,0,0)"
          dieSize="75"
        />
      </div>
    )
  }

  rollAll() {
    this.reactDice.rollAll()
  }

  rollDoneCallback = (num) => {
    this.props.diceValueMultiplexer(2, num)
  }

  saveRoll = (event) => {
    this.setState({
      resultType: event.target.parentElement.parentElement.parentElement.parentElement.parentElement.className
    })
  }

}

export default PlayerTwoDiceContainer;
