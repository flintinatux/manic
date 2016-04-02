const merge = require('lodash/merge');
const zip   = require('lodash/zip');

const builtIns = require('../data/components');

function Components() {
  var defs  = merge({}, builtIns);
  var store = {};

  var comps = {
    add(name, id, state) {
      comps.get(name)[id] = Object.assign({}, defs[name], state);
    },

    clear() {
      for (var name in store) store[name].length = 0;
    },

    define(newDefs) {
      merge(defs, newDefs);
    },

    fetch(names) {
      return zip(...names.map(comps.get));
    },

    get(name) {
      if (name in store) return store[name];
      var list = [];
      store[name] = list;
      return list;
    },

    remove(name, id) {
      comps.get(name)[id] = undefined;
    }
  };

  return comps;
}

module.exports = Components;
