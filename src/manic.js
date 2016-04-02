const Components = require('./lib/components');
const Dom        = require('./lib/dom');
const Entities   = require('./lib/entities');
const Loop       = require('./lib/loop');
const Systems    = require('./lib/systems');

function Manic(parent, ratio) {
  var comps     = Components(),
      dom       = Dom(parent, ratio),
      entities  = Entities(comps),
      loop      = Loop(),
      systems   = Systems(entities, comps),
      templates = {};

  var renderCtx = { dom };
  var updateCtx = { comps, entities };

  loop.on('render', render);
  loop.on('update', update);
  loop.start();

  var manic = {
    components: comps.define,
    entity:     entities.create,
    start:      loop.start,
    stop:       loop.stop,
    system:     systems.define,
    templates:  entities.define,

    stage(stage) {
      loop.stop();
      requestAnimationFrame(function() {
        dom.clear();
        comps.clear();
        entities.clear();
        loop.start();
        stage.forEach(entities.create);
      });
    },

    teardown() {
      loop.teardown();
      comps.clear();
      entities.clear();
      dom.teardown();
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
