const every = require('lodash/every');
const union = require('lodash/union');

const builtIns = require('../systems');
const order = require('../config').phases;

function Systems(entities, comps) {
  var phases = {};

  var systems = {
    define(system) {
      var { phase } = system;
      (phase in phases) || (phases[phase] = []);
      phases[phase].push(system);
    },

    render(ctx) {
      runAll('render', ctx);
    },

    update(ctx) {
      for (var phase of order) runAll(phase, ctx);
    }
  };

  builtIns.forEach(systems.define);

  function run({ deps, update }, ctx) {
    deps = comps.fetch(deps);
    var id = entities.length();
    while (id--) if (every(deps[id])) update(id, deps[id], ctx);
  }

  function runAll(phase, ctx) {
    phase = phases[phase];
    if (!phase) return;
    var i = phase.length;
    while (i--) run(phase[i], ctx);
  }

  return systems;
}

module.exports = Systems;
