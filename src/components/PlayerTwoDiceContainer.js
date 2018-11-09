import React from 'react';
import ReactDice from 'react-dice-complete';

class PlayerTwoDiceContainer extends React.Component {

  constructor() {
    super()

    this.state = {
      dices: [{id: 1, value: 0}, {id: 2, value: 0}, {id: 3, value: 0}]
    }
  }

  renderDice = () => {
    return this.state.dices.map( dice => {
      return (
        <ReactDice
          key={dice.id}
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
      )
    })
  }

  render() {
    return (
      <div className="playerTwoDiceTray">
        {this.renderDice()}
      </div>
    )
  }

  rollAll() {
    this.reactDice.rollAll()
  }

  rollDoneCallback(num) {
    console.log(`You rolled a ${num}`)
  }

}

export default PlayerTwoDiceContainer;
