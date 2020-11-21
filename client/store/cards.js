import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_DECK = 'GET_DECK'
const GET_CARD = 'GET_CARD'
const REMOVE_CARD = 'REMOVE_CARD'
const TOGGLE_WILD = 'TOGGLE_WILD'
const END_GAME = 'END_GAME'

/**
 * INITIAL STATE
 */
const defaultDeck = []

/**
 * ACTION CREATORS
 */
const getDeck = deck => ({type: GET_DECK, deck})
export const getCard = card => ({type: GET_CARD, card})
export const removeCard = id => ({type: REMOVE_CARD, id})
const toggleWild = id => ({type: TOGGLE_WILD, id})
const endGame = () => ({type: END_GAME})

/**
 * THUNK CREATORS
 */
export const getDeckThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cards')
    dispatch(getDeck(data))
  } catch (err) {
    console.error(err)
  }
}

export const toggleWildThunk = id => async dispatch => {
  try {
    await axios.put(`/api/cards/${id}/wild`)
    dispatch(toggleWild(id))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function cardReducer(state = defaultDeck, action) {
  switch (action.type) {
    case GET_DECK:
      return action.deck
    case GET_CARD:
      return action.card
    case REMOVE_CARD:
      return state.filter(card => card.id !== action.id)
    case TOGGLE_WILD:
      // need to return state with the specific card's wild status toggled
      const wildCard = state.filter(card => card.id === action.id)
      wildCard.isWild = !wildCard.isWild
      return [...state, wildCard]
    case END_GAME:
      return defaultDeck
    default:
      return state
  }
}
