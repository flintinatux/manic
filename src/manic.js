const Components = require('./lib/components');
const Dom        = require('./lib/dom');
const Entities   = require('./lib/entities');
const Inputs     = require('./lib/inputs');
const Loop       = require('./lib/loop');
const Systems    = require('./lib/systems');

function Manic(parent, ratio) {
  var comps     = Components(),
      dom       = Dom(parent, ratio),
      entities  = Entities(comps, dom),
      inputs    = Inputs(),
      loop      = Loop(),
      systems   = Systems(comps);

  loop.on('render', render);
  loop.on('update', update);

  var manic = {
    comps, dom, entities, inputs, loop, systems,

    scene(scene) {
      requestAnimationFrame(function() {
        dom.clear();
        comps.clear();
        entities.clear();
        scene.forEach(entities.create);
      });
    },

    teardown() {
      loop.teardown();
      comps.clear();
      entities.clear();
      dom.teardown();
      inputs.teardown();
    }
  };

  function render() {
    systems.render(manic);
  }

  function update() {
    systems.update(manic);
  }

  return manic;
}

module.exports = Manic;
