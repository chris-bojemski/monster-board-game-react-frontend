import React from 'react'

const GameOver = props => {

  // const monsterItems = () => {
  //   return props.team.map( monster => {
  //     return (
  //       <div className="teamCard" key={monster.name}>
  //         <img src={monster.sprite_front} alt="" />
  //       </div>
  //     )
  //   })
  // }

  return (
    <div className="game-over-container">
      {props.wonBy === 1 ? <img src="https://i.imgur.com/JFCqJur.png" alt="" className="winner"/> : <img src="https://i.imgur.com/CkSl5Kq.png" alt="" className="winner" />}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="startNewGame" onClick={props.selectTeam}>
        <h1>Click to play again!</h1>
      </div>
    </div>
  )
}

export default GameOver
