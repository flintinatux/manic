const move = require('../util/move');

function Motion(entity, opts) {
  return move.bind(null, entity);
}

module.exports = Motion;
