import React from 'react';

const HexTile = (props) => {

  return (
    <React.Fragment>
      <li className="hex">
        <div className="hexIn">
          <a className="hexLink" href="#">
            <img 
              className="tile-background"
              src={props.image} 
              alt="" 
            />
            <h1>Placeholder</h1>
            {props.monsters
              ? 
              <img 
                className="sprite"
                src={props.monsters[0].sprite_front} 
                alt={props.monsters[0].name} 
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
