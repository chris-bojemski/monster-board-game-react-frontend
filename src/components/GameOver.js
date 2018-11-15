import React from 'react'

const GameOver = props => {

  const monsterItems = () => {
    return props.team.map( monster => {
      return (
        <div className="teamCard" key={monster.name}>
          <img src={monster.sprite_front} alt="" />
        </div>
      )
    })
  }

  return (
    <div className="game-over-container">
      <h1>PLAYER {props.wonBy} WINS</h1>
      <div>
          <div className="cardHeader">
          </div>
          <div className="card">
            {monsterItems()}
            <br />
          </div>
        </div>
    </div>
  )
}

export default GameOver