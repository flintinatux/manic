const builtIns  = require('../systems');
const { every } = require('../util/list');
const order     = require('../config').phases;

function Systems(entities, comps) {
  var phases = { render: [] };
  for (var phase of order) phases[phase] = [];

  var systems = {
    define(system) {
      phases[system.phase].push(system);
    },

    render(ctx) {
      runAll('render', ctx);
    },

    update(ctx) {
      for (var i = 0; i < order.length; i++) runAll(order[i], ctx);
    }
  };

  builtIns.forEach(systems.define);

  function run({ deps, update, updateAll }, ctx) {
    if (typeof updateAll === 'function') return updateAll(ctx);
    var id, i = entities.length;
    function getState(dep) { return comps(dep, id) }
    while (i--) {
      id = entities[i];
      state = deps.map(getState);
      every(state) && update(id, state, ctx);
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
