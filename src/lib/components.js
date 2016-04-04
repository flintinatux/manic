const merge = require('lodash/merge');

const builtIns = require('../data/components');

function Components() {
  var defs  = merge({}, builtIns);
  var store = {};

  function comps(name, id) {
    if (!store[name]) store[name] = {};
    return id ? store[name][id] : store[name];
  }

  Object.assign(comps, {
    add(name, id, state) {
      return comps(name)[id] = Object.assign({}, defs[name], state);
    },

    clear() {
      for (var name in store) store[name].length = 0;
    },

    define(newDefs) {
      merge(defs, newDefs);
    },

    remove(name, id) {
      delete comps(name)[id];
    },

    removeAll(id) {
      for (var name in store) comps.remove(name, id);
    }
  });

  return comps;
}

module.exports = Components;
