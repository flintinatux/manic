const keycode = require('keycode');

function Inputs() {
  var keys = new Set,
    has = keys.has.bind(keys);

  Object.assign(keys, {
    has(key) {
      return has(key.toLowerCase());
    }
  });

  window.addEventListener('keydown', keydown);
  window.addEventListener('keyup', keyup);

  function keydown(event) {
    keys.add(keycode(event));
  }

  function keyup(event) {
    keys.delete(keycode(event));
  }

  return {
    keys,

    teardown() {
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('keyup', keyup);
    }
  };
}

module.exports = Inputs;
