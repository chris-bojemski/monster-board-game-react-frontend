import React, { Component } from 'react';
import HexTile from './HexTile';

class GameBoard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tileCount: 57,
      id: 0,
      groundTiles: ['https://i.imgur.com/FmZU5Wp.png'],
      selectedMonster: 0,
      fromTile: 0,
      toTile: 1
    }
  }

  selectMonster = (selectedMonster, fromTile) => {
    console.log(`monster ${selectedMonster} from tile ${fromTile}`)
    this.setState({ selectedMonster, fromTile })
  }

  moveMonster = toTile => {
    this.setState({ toTile })
  }

  renderBoard = () => {
    const hexes = []
    for (let i = 1; i < this.state.tileCount + 1; i++) {
      hexes.push(
        <HexTile 
          key={i} 
          id={i} 
          image={this.state.groundTiles[0]} 
          monsterId={ i === this.state.toTile && this.props.monsters ? this.props.monsters[0].id : null }
          selectMonster={this.selectMonster}
          selectedMonster={this.state.selectedMonster}
          findMonster={this.props.findMonster}
          moveMonster={this.moveMonster}
        />
      )
    }
    return hexes
  }

  render() {
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
