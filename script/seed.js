'use strict'

const db = require('../server/db')
const {User, Card} = require('../server/db/models')

const suits = ['Club', 'Diamond', 'Heart', 'Spade', 'Star']
const values = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const deck = []
for (let i = 0; i < suits.length; i++) {
  for (let j = 0; j < values.length; j++) {
    let card = {value: values[j], suit: suits[i]}
    deck.push(card)
  }
}

const times = x => f => {
  if (x > 0) {
    f()
    times(x - 1)(f)
  }
}

times(6)(() =>
  deck.push({
    value: 'Joker',
    suit: null
  })
)

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  await Promise.all(
    deck.map(card => {
      return Card.create(card)
    })
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
