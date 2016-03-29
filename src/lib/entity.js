const get = require('lodash/get');
const set = require('lodash/set');
const template = require('lodash/template');

const { each } = require('../util/list')

function Entity({ state, type }, { comps, types }) {
  var proto    = types.get(type),
      current  = Object.assign({}, proto.defaults, state),
      next     = Object.assign({}, proto.defaults, state),
      computed = {},
      renders  = [],
      updates  = [];

  function entity(key, val) {
    if (key in computed)   return computed[key](current);
    if (val === undefined) return get(current, key);
    set(next, key, val);
    return val;
  }

  Object.assign(entity, {
    current,
    next,
    types: proto.types,

    kill() {
      entity('dead', true);
    },

    render(ctx) {
      each(renders, ctx);
    },

    reset() {
      Object.assign(next, proto.defaults, state);
    },

    swap() {
      Object.assign(current, next);
    },

    update(ctx) {
      each(updates, ctx);
    }
  });

  for (var key in proto.computed) {
    computed[key] = template('${' + proto.computed[key] + '}');
  }

  for (var name in proto.components) {
    var opts = proto.components[name];
    var comp = comps.get(name)(entity, opts);
    /Render/.test(name) ? renders.push(comp) : updates.push(comp);
  }

  return entity;
}

module.exports = Entity;
