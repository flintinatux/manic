function Entities(comps) {
  var defs = {},
      next = 0;

  var entities = {
    clear() {
      next = 0;
    },

    create({ type, state }) {
      var id = next++;
      var def = defs[type];
      for (var name in def) {
        comps.add(name, id, Object.assign({}, def[name], state[name]));
      }
    },

    define(newDefs) {
      defs = newDefs;
    },

    length() {
      return next;
    }
  };

  return entities;
}

module.exports = Entities;
