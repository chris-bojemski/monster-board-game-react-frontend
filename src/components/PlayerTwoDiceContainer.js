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

  render() {
    // console.log(this.state)
    return (
      <div className="playerTwoDiceTray">
        <h2 className="diceHeader">Player 2</h2>
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
