import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PLAYERS = 'GET_PLAYERS'
const ADD_PLAYER = 'ADD_PLAYER'
const REMOVE_PLAYER = 'REMOVE_PLAYER'
const TOGGLE_HOST = 'TOGGLE_HOST'
const END_GAME = 'END_GAME'

/**
 * INITIAL STATE
 */
const defaultPlayers = []

/**
 * ACTION CREATORS
 */
const getPlayers = players => ({type: GET_PLAYERS, players})
const addPlayer = player => ({type: ADD_PLAYER, player})
const removePlayer = id => ({type: REMOVE_PLAYER, id})
const toggleHost = id => ({type: TOGGLE_HOST, id})
const endGame = () => ({type: END_GAME})

/**
 * THUNK CREATORS
 */
export const getPlayersThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/players')
    dispatch(getPlayers(data))
  } catch (err) {
    console.error(err)
  }
}

export const addPlayerThunk = player => async dispatch => {
  try {
    const {data} = await axios.post('/api/players', player)
    dispatch(addPlayer(data))
  } catch (err) {
    console.error(err)
  }
}

export const removePlayerThunk = playerId => async dispatch => {
  try {
    await axios.delete(`/api/players/${playerId}`)
    dispatch(removePlayer(playerId))
  } catch (error) {
    console.error(error)
  }
}

export const toggleHostThunk = id => async dispatch => {
  try {
    await axios.put(`/api/players/${id}/host`)
    dispatch(toggleHost(id))
  } catch (err) {
    console.error(err)
  }
}

export const endGameThunk = () => async dispatch => {
  try {
    await axios.delete('/api/players')
    dispatch(endGame())
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function playerReducer(state = defaultPlayers, action) {
  switch (action.type) {
    case GET_PLAYERS:
      return action.players
    case ADD_PLAYER:
      return [...state, action.player]
    case REMOVE_PLAYER:
      return state.filter(player => player.id !== action.id)
    case TOGGLE_HOST:
      // need to return state with the specific card's wild status toggled
      const player = state.filter(player => player.id === action.id)
      player.isHost = !player.isHost
      return [...state, player]
    case END_GAME:
      return defaultPlayers
    default:
      return state
  }
}
