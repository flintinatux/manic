const EventEmitter = require('eventemitter3');

const config = require('../config').loop;

function Loop() {
  var id, last,
      lag  = 0.0;
      loop = Object.create(new EventEmitter),
      running = false;

  Object.assign(loop, {
    start() {
      running = true;
      last = performance.now();
      id = requestAnimationFrame(tick);
      loop.emit('started', { time: last });
    },

    stop() {
      running = false;
      cancelAnimationFrame(id);
      loop.emit('stopped', { time: performance.now() });
    },

    teardown() {
      loop.stop();
      loop.removeAllListeners();
    }
  });

  function tick(next) {
    lag += next - last;
    last = next;

    if (lag > config.maxLag) lag = config.maxLag;

    while (lag > config.step) {
      loop.emit('update');
      lag -= config.step;
    }

    loop.emit('render');
    id = running && requestAnimationFrame(tick);
  }

  return loop;
}

module.exports = Loop;
