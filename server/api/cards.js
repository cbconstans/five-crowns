const router = require('express').Router()
const {Card} = require('../db/models')
module.exports = router

// GET route for all cards
// /api/cards
router.get('/', async (req, res, next) => {
  try {
    const cards = await Card.findAll()
    res.json(cards)
  } catch (err) {
    next(err)
  }
})

// GET route for a single card
// /api/cards/:id
// is this route for a single card needed? should it be Card.findOne()?
router.get('/:id', async (req, res, next) => {
  try {
    const card = await Card.findByPk(req.params.id)
    res.json(card)
  } catch (err) {
    next(err)
  }
})

// PUT route to toggle if a card is wild
// /api/cards/:id/wild
// is security needed to prevent players from accessing this?
router.put('/:id/wild', async (req, res, next) => {
  try {
    const card = await Card.findByPk(req.params.id)
    await card.update({isWild: !card.isWild})
    res.status(200).end()
  } catch (err) {
    next(err)
  }
})
