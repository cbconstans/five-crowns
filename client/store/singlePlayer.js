import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_PLAYER = 'SET_PLAYER'
// add card to hand
// play card
// go out
const END_GAME = 'END_GAME'

/**
 * INITIAL STATE
 */
const defaultPlayer = {}

/**
 * ACTION CREATORS
 */
const setPlayer = player => ({type: SET_PLAYER, player})
export const endGame = () => ({type: END_GAME})

/**
 * THUNK CREATORS
 */
export const setPlayerThunk = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/players/${id}`)
    dispatch(setPlayer(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function singlePlayerReducer(state = defaultPlayer, action) {
  switch (action.type) {
    case SET_PLAYER:
      return action.player
    case END_GAME:
      return defaultPlayer
    default:
      return state
  }
}
