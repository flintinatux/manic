const Components = require('./lib/components');
const Dom        = require('./lib/dom');
const Entity     = require('./lib/entity');
const Inputs     = require('./lib/inputs');
const { invoke } = require('./util/list')
const Loop       = require('./lib/loop');
const Types      = require('./lib/types');

function Manic(parent, ratio) {
  var comps    = Components(),
      dom      = Dom(parent, ratio),
      entities = [],
      inputs   = Inputs(),
      loop     = Loop(),
      types    = Types();

  var entityCtx = { comps, types };
  var renderCtx = { dom };
  var updateCtx = { entities, inputs };

  loop.on('render', render);
  loop.on('swap',   swap);
  loop.on('update', update);
  loop.start();

  var manic = {
    entity(def) {
      entities.push(Entity(def, entityCtx));
    },

    component: comps.set,

    stage(stage) {
      loop.stop();
      requestAnimationFrame(function() {
        dom.clear();
        entities.length = 0;
        loop.start();
        stage.forEach(manic.entity);
      });
    },

    start:    loop.start,
    stop:     loop.stop,

    teardown() {
      loop.teardown();
      dom.teardown();
      inputs.teardown();
    },

    types:    types.load
  };

  function render() {
    invoke(entities, 'render', renderCtx);
  }

  function swap() {
    invoke(entities, 'swap');
  }

  function update() {
    invoke(entities, 'update', updateCtx);
  }

  return manic;
}

module.exports = Manic;
