const template = require('lodash/template');

function Entity({ state, type }) {
  var proto   = types[type],
      current = Object.assign({}, proto.properties, state),
      next    = Object.assign({}, proto.properties, state),
      entity  = Object.create(proto);

  Object.assign(entity, {
    current,
    next,
    type,

    reset() {
      Object.assign(next, state);
    },

    swap() {
      Object.assign(current, next);
    }
  });

  for (let property in proto.properties) {
    Object.defineProperty(entity, property, { get, set });
    function get()    { return current[property];    }
    function set(val) { return next[property] = val; }
  }

  for (let property in proto.computed) {
    let expression = template('${' + proto.computed[property] + '}');
    let descriptor = { get() { return expression(this) } };
    Object.defineProperty(entity,  property, descriptor);
    Object.defineProperty(current, property, descriptor);
    Object.defineProperty(next,    property, descriptor);
  }

  return entity;
}

module.exports = Entity;
