import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import GameBoard from './gameBoard'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <Routes /> */}
      <GameBoard />
    </div>
  )
}

export default App
