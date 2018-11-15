import React from 'react';
import ReactDice from 'react-dice-complete';

const PlayerTwoDiceContainer = (props) => {
  const rollDoneCallback = num => {
    props.diceValueMultiplexer(2, num)
  }

  return (
    <div className="playerTwoDiceTray">
      <h2 className="diceHeader">Player 2</h2>
      <br />
      <ReactDice
        key="playerTwoDiceTray"
        numDice={1}
        rollDone={rollDoneCallback}
        faceColor="rgb(153,0,0)"
        dotColor="rgb(251,251,251)"
        outline="true"
        outlineColor="rgb(102,0,0)"
        dieSize="75"
      />
      <h3>Move:<br />{props.currentTurn.move ? props.currentTurn.move : '-'}<br /><br /></h3>
      <h3>Attack:<br />{props.currentTurn.attack ? props.currentTurn.attack : '-'}<br /><br /></h3>
    </div>
  )
}

export default PlayerTwoDiceContainer;
