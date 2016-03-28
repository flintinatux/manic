const BaseEntity = require('./base-entity');

function Types() {
  var parsed = {};

  var types = {
    get(name) {
      return parsed[name] || BaseEntity;
    },

    load(defs) {
      parsed = {};
      Object.keys(defs).forEach(parseType);

      function parseType(name) {
        if (!parsed[name]) {
          var type = defs[name];
          var parent = type.parent ? parseType(type.parent) : BaseEntity;
          parsed[name] = Object.assign({}, parent, type);
        }
        return parsed[name];
      }
    }
  };

  return types;
}

module.exports = Types;
