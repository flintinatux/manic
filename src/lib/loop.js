const EventEmitter = require('eventemitter2');

function Loop() {
  var id, last,
      lag  = 0.0;
      loop = Object.create(new EventEmitter);

  Object.assign(loop, {
    start() {
      last = performance.now();
      id = requestAnimationFrame(tick);
      loop.emit('started', { time: last });
    },

    stop() {
      cancelAnimationFrame(id);
      loop.emit('stopped', { time: performance.now() });
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
    id = requestAnimationFrame(tick);
  }

  return loop;
}

module.exports = Loop;
