const bindAll = require('lodash/bindAll');

const builtIns = {
  Motion: require('../components/motion'),
  Render: require('../components/render')
};

function Components() {
  var comps = new Map;
  bindAll(comps, 'get', 'set');
  for (var name in builtIns) comps.set(name, builtIns[name]);
  return comps;
}

module.exports = Components;
