const EventEmitter = require('eventemitter3')

function Loop() {
  const loop = Object.create(new EventEmitter)

  var id,
      last = performance.now(),
      running = false

  Object.assign(loop, {
    start() {
      running = true
      last = performance.now()
      id = requestAnimationFrame(loop.tick)
      loop.emit('started', last)
    },

    stop() {
      running = false
      cancelAnimationFrame(id)
      loop.emit('stopped', last)
    },

    teardown() {
      loop.stop()
      loop.removeAllListeners()
    },

    tick(next) {
      next || (next = performance.now())
      const dt = next - last
      loop.emit('update', dt)
      loop.emit('draw', dt)
      last = next
      id = running && requestAnimationFrame(loop.tick)
    }
  })

  return loop
}

module.exports = Loop
