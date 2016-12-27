const composeB = require('crocks/combinators/composeB')
const keycode  = require('keycode')

function Inputs() {
  const keys = {}

  const add = key =>
    keys[key] = true

  const del = key =>
    delete keys[key]

  const keydown = composeB(add, keycode)
  const keyup   = composeB(del, keycode)

  const pressed = key =>
    key.toLowerCase() in keys

  const teardown = () => {
    global.removeEventListener('keydown', keydown)
    global.removeEventListener('keyup',   keyup)
  }

  global.addEventListener('keydown', keydown)
  global.addEventListener('keyup',   keyup)

  return { pressed, teardown }
}

module.exports = Inputs
