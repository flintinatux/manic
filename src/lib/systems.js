const builtIns  = require('../systems');
const order     = require('../config').phases;

function Systems(comps) {
  var list   = [],
      phases = { render: [] };

  for (var phase of order) phases[phase] = [];

  var systems = {
    define(system) {
      list.push(system);
      phases[system.phase].push(system);
      system.entities = [];
    },

    render(ctx) {
      runAll('render', ctx);
    },

    update(ctx) {
      for (var i = 0; i < order.length; i++) runAll(order[i], ctx);
    }
  };

  builtIns.forEach(systems.define);
  comps.on('changed', index);

  function index(id) {
    for (var i = list.length - 1; i; i--) {
      var { deps, entities } = list[i];
      if (!deps) continue;
      if (deps.every(comps.forEntity(id))) {
        if (entities.indexOf(id) === -1) entities.push(id);
      } else {
        var j = entities.indexOf(id);
        if (j > -1) entities.splice(j, 1);
      }
    }
  }

  function run({ deps, entities, update, updateAll }, ctx) {
    if (typeof updateAll === 'function') return updateAll(ctx);
    var id, i = entities.length;
    function getState(dep) { return comps(dep, id) }
    while (i--) {
      id = entities[i];
      state = deps.map(getState);
      update(id, state, ctx);
    }
  }

  function runAll(phase, ctx) {
    phase = phases[phase];
    var i = phase.length;
    while (i--) run(phase[i], ctx);
  }

  return systems;
}

module.exports = Systems;
