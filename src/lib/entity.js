const template = require('lodash/template');

const { each } = require('../util/list')

function Entity({ state, type }, { comps, types }) {
  var proto   = types.get(type),
      current = Object.assign({}, proto.properties, state),
      next    = Object.assign({}, proto.properties, state),
      entity  = Object.create(proto),
      renders = [],
      updates = [];

  Object.assign(entity, {
    current,
    next,
    type,

    kill() {
      entity.dead = true;
    },

    render(ctx) {
      each(renders, ctx);
    },

    reset() {
      Object.assign(next, state);
    },

    swap() {
      Object.assign(current, next);
    },

    update(ctx) {
      each(updates, ctx);
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

  for (var name in proto.components) {
    var opts = proto.components[name];
    var comp = comps.get(name)(entity, opts);
    /Render/.test(name) ? renders.push(comp) : updates.push(comp);
  }

  return entity;
}

module.exports = Entity;
