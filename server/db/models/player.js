const Sequelize = require('sequelize')
const db = require('../db')

const Player = db.define('player', {
  name: {
    type: Sequelize.STRING
  },
  socketId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isHost: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Player
