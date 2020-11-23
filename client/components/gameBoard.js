import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class GameBoard extends Component {
  render() {
    return (
      <div>
        <h3>DOES THIS RENDER?</h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    player: state.singlePlayer
  }
}

export default connect(mapState)(GameBoard)

/**
 * PROP TYPES
 */
