const EventEmitter = require('eventemitter3');

const config = require('../config').loop;

function Loop() {
  var id,
      lag  = 0.0,
      last = performance.now(),
      loop = Object.create(new EventEmitter),
      running = false;

  Object.assign(loop, {
    start() {
      running = true;
      last = performance.now();
      id = requestAnimationFrame(loop.tick);
      loop.emit('started', { time: last });
    },

    step: config.step,

    stop() {
      running = false;
      cancelAnimationFrame(id);
      loop.emit('stopped', { time: performance.now() });
    },

    teardown() {
      loop.stop();
      loop.removeAllListeners();
    },

    tick(next) {
      next || (next = performance.now());
      lag += next - last;
      last = next;

      if (lag > config.maxLag) lag = config.maxLag;

      while (lag > config.step) {
        loop.emit('update');
        lag -= config.step;
      }

      loop.emit('render');
      id = running && requestAnimationFrame(loop.tick);
    }
  });

  return loop;
}

module.exports = Loop;
