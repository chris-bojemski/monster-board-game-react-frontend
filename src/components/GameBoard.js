import React, { Component } from 'react';
import HexTile from './HexTile';

class GameBoard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tileCount: 57,
      id: 0,
      groundTiles: ['https://i.imgur.com/FmZU5Wp.png'],
    }
  }

  renderBoard = () => {
    const hexes = []
    for (let i = 1; i < this.state.tileCount + 1; i++) {
      hexes.push(
        <HexTile 
          key={i} 
          id={i} 
          image={this.state.groundTiles[0]} 
          monsters={this.props.monsters}
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
