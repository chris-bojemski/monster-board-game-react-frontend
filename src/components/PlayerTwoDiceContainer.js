import React from 'react';
import ReactDice from 'react-dice-complete';

class PlayerTwoDiceContainer extends React.Component {

  constructor() {
    super()

    this.state = {
      dices: [{id: 1, value: 0, type: "Turn"}, {id: 2, value: 0, type: "Attack"}, {id: 3, value: 0, type: "Move"}]
    }
  }

  renderDice = () => {
    return this.state.dices.map( dice => {
      return (
        <div>
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
    return (
      <div className="playerTwoDiceTray">
        <h3>Player 2</h3>
        <br />
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
