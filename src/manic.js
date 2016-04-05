const Components = require('./lib/components');
const Dom        = require('./lib/dom');
const Entities   = require('./lib/entities');
const Inputs     = require('./lib/inputs');
const Loop       = require('./lib/loop');
const Systems    = require('./lib/systems');

function Manic(parent, ratio) {
  var comps     = Components(),
      dom       = Dom(parent, ratio),
      entities  = Entities(comps),
      inputs    = Inputs(),
      loop      = Loop(),
      systems   = Systems(entities, comps);

  var renderCtx = { dom };
  var updateCtx = { comps, entities, inputs, loop };

  loop.on('render', render);
  loop.on('update', update);

  var manic = {
    components: comps.define,
    entity:     entities.create,
    start:      loop.start,
    stop:       loop.stop,
    system:     systems.define,
    templates:  entities.define,

    scene(scene) {
      requestAnimationFrame(function() {
        dom.clear();
        comps.clear();
        entities.clear();
        scene.forEach(entities.create);
        loop.tick(performance.now());
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
    systems.render(renderCtx);
  }

  function update() {
    systems.update(updateCtx);
  }

  return manic;
}

module.exports = Manic;
