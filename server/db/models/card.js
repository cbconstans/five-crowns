const Sequelize = require('sequelize')
const db = require('../db')

const Card = db.define('card', {
  suit: {
    type: Sequelize.ENUM,
    values: ['Club', 'Diamond', 'Heart', 'Spade', 'Star']
  },
  value: {
    type: Sequelize.ENUM,
    values: ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'Joker']
  },
  isWild: {
    // each round, flip the number of cards to true (and revert at end of round)
    type: Sequelize.VIRTUAL,
    get() {
      if (this.value === 'Joker') return true
      else
        // else if (this.value === round-2) return true;
        return false
    }
  }
  // inPlay: {
  //   type: Sequelize.BOOLEAN,
  //   defaultValue: false
  // }
})

module.exports = Card
