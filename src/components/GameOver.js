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

  console.log(props.wonBy)

  return (
    <div className="game-over-container">
      {props.wonBy === 1 ? <img src="https://i.imgur.com/JFCqJur.png" alt="" className="winner"/> : <img src="https://i.imgur.com/CkSl5Kq.png" alt="" className="winner" />}
      <div>
        <div className="cardHeader">
        </div>
        <div className="card">
          {monsterItems()}
          <br />
          <h3>Click your team return to team selection!</h3>
        </div>
      </div>
    </div>
  )
}

export default GameOver
