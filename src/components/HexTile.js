import React from 'react';

const HexTile = (props) => {

  return (
    <React.Fragment>
      <li className="hex">
        <div className="hexIn">
          <a className="hexLink" href="#">
            <img src={props.image} alt="" />
            <h1>Placeholder</h1>
            <p>Placeholder</p>
          </a>
        </div>
      </li>
    </React.Fragment>
  )

}

export default HexTile;
