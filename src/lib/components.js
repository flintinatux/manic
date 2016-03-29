const bindAll = require('lodash/bindAll');

const builtIns = [
  require('../components/motion'),
  require('../components/render')
];

function Components() {
  var comps = new Map;
  bindAll(comps, 'get', 'set');
  for (var comp of builtIns) comps.set(comp.name, comp);
  return comps;
}

module.exports = Components;
