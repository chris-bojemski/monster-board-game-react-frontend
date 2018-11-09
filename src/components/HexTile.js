import React from 'react';

const HexTile = (props) => {

  const decideClickAction = () => {
    // If there's a selected monster already, attack the one I clicked on.
    // Code not written yet.

    // If there's no selected monster, select it. 
    if (!props.selectedMonster) {
      props.selectMonster(props.monsterId ? props.monsterId : 0, props.id)
    }

    // If there's a monster selected and I clicked on a tile that doesn't 
    //    have a monster, move it to that tile.
    if (props.selectedMonster && !props.monsterId) {
      props.moveMonster(props.id)
    }
  }

  return (
    <React.Fragment>
      <li 
        className="hex"
        onClick={decideClickAction}
      >
        <div className="hexIn">
          <a className="hexLink" href="#">
            <img 
              className="tile-background"
              src={props.image} 
              alt="" 
            />
            <h1>Placeholder</h1>
            {props.monsterId
              ? 
            <img 
              className="sprite"
              src={props.findMonster(props.monsterId).sprite_front} 
              alt={props.findMonster(props.monsterId).name} 
            />
              :
            null}
            <p>Placeholder</p>
          </a>
        </div>
      </li>
    </React.Fragment>
  )

}

export default HexTile;
