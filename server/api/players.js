const router = require('express').Router()
const db = require('../db/db')
const {Player} = require('../db/models')
module.exports = router

// GET route for all players
// /api/players
router.get('/', async (req, res, next) => {
  try {
    const players = await Player.findAll()
    res.json(players)
  } catch (err) {
    next(err)
  }
})

// GET route for a single player
// /api/players/:id
router.get('/:id', async (req, res, next) => {
  try {
    const player = await Player.findByPk(req.params.id)
    res.json(player)
  } catch (err) {
    next(err)
  }
})

// POST route for adding a player
// /api/players
router.post('/', async (req, res, next) => {
  try {
    const player = await Player.create(req.body)
    res.json(player)
  } catch (err) {
    next(err)
  }
})

// DELETE route to delete all players
// /api/players
router.delete('/', async (req, res, next) => {
  try {
    await db.Player.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

// DELETE route to delete a player
// /api/players/:id
router.delete('/:id', async (req, res, next) => {
  try {
    if (isNaN(req.params.id)) return res.sendStatus(400)
    const player = await Player.findByPk(+req.params.id)
    if (!player) return res.sendStatus(404)
    player.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

// PUT route to toggle if a player is a host
// /api/players/:id/host
router.put('/:id/host', async (req, res, next) => {
  try {
    const user = await Player.findByPk(+req.params.id)
    await user.update({isHost: !user.isHost})
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
