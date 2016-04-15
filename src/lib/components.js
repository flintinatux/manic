const EventEmitter = require('eventemitter3');
const merge        = require('lodash/merge');
const partialRight = require('lodash/partialRight');

const builtIns = require('../data/components');

function Components() {
  var defs   = merge({}, builtIns),
      events = new EventEmitter,
      store  = {};

  function comps(name, id) {
    if (!store[name]) store[name] = {};
    return id ? store[name][id] : store[name];
  }

  for (var method of ['emit', 'off', 'on']) {
    comps[method] = events[method].bind(events);
  }

  Object.assign(comps, {
    add(name, id, state) {
      var comp = comps(name)[id] = Object.assign({}, defs[name], state);
      comps.emit('changed', id);
      return comp;
    },

    clear() {
      for (var name in store) store[name].length = 0;
    },

    define(newDefs) {
      merge(defs, newDefs);
    },

    forEntity(id) {
      return (name) => comps(name, id);
    },

    remove(name, id) {
      delete comps(name)[id];
      comps.emit('changed', id);
    },

    removeAll(id) {
      for (var name in store) delete comps(name)[id];
      comps.emit('changed', id);
    }
  });

  return comps;
}

module.exports = Components;
