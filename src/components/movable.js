const move = require('../util/move');

function Movable(entity, opts) {
  return move.bind(null, entity);
}

module.exports = Movable;
