const idgen = require('idgen');

function Entities(comps) {
  var defs = {},
      list = [];

  Object.assign(list, {
    clear() {
      list.length = 0;
    },

    create({ type, state }) {
      var id = idgen(6),
          def = defs[type],
          names = Object.keys(def).concat(Object.keys(state));
      list.push(id);
      for (var name of names) {
        comps.add(name, id, Object.assign({}, def[name], state[name]));
      }
    },

    define(newDefs) {
      defs = newDefs;
    },

    remove(id) {
      list.splice(list.indexOf(id), 1);
    }
  });

  return list;
}

module.exports = Entities;
