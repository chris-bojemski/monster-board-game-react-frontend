import React, { Fragment } from 'react'

class ViewButtons extends React.Component {
  render() {
    return (
      <Fragment>
        <button 
          onClick={() => this.props.changePanel('teamSelect')}
        >
          Team Selection
        </button>
        <button 
          onClick={() => this.props.changePanel('gameInstance')}
        >
          Game Instance
        </button>
      </Fragment>
    )
  }
}

export default ViewButtons