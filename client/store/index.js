import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './user'
import playersReducer from './players'
import singlePlayerReducer from './singlePlayer'
import cardReducer from './cards'

const reducer = combineReducers({
  user: userReducer,
  allPlayers: playersReducer,
  singlePlayer: singlePlayerReducer,
  deck: cardReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
