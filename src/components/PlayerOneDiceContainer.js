import React from 'react';
import ReactDice from 'react-dice-complete';

class PlayerOneDiceContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      dices: [{id: 1, value: 0, type: "Turn"}, {id: 2, value: 0, type: "Attack"}, {id: 3, value: 0, type: "Move"}],
      resultType: "",
      resultValue: 0,
    }

    this.updateState()
  }

  updateState = () => {
    this.state.dices.map( dice => {
      if (dice.type === this.state.resultType) {
        this.setState({
          value: this.state.resultValue
        })
      }
    })
  }

  renderDice = () => {
    return this.state.dices.map( dice => {
      return (
        <div className={dice.type} onClick={this.saveRoll}>
          {dice.type}
          <ReactDice
            key={dice.type}
            type={dice.type}
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
      <div className="playerOneDiceTray">
        <h3>Player 1</h3>
        <br />
        {this.renderDice()}
      </div>
    )
  }

  rollAll() {
    this.reactDice.rollAll()
  }

  rollDoneCallback = (num) => {
    this.setState({
      resultValue: num
    })
  }

  saveRoll = (event) => {
    this.setState({
      resultType: event.target.parentElement.parentElement.parentElement.parentElement.parentElement.className
    })
  }

}

export default PlayerOneDiceContainer;
