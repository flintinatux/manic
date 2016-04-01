const collide    = require('./lib/collide');
const Components = require('./lib/components');
const Dom        = require('./lib/dom');
const Entity     = require('./lib/entity');
const Inputs     = require('./lib/inputs');
const Loop       = require('./lib/loop');
const move       = require('./util/move');
const Types      = require('./lib/types');

const { invoke, removeDead } = require('./util/list');

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
  loop.on('update', update);
  loop.start();

  var manic = {
    component: comps.set,
    start:     loop.start,
    stop:      loop.stop,
    types:     types.load,

    entity(def) {
      entities.push(Entity(def, entityCtx));
    },

    stage(stage) {
      loop.stop();
      requestAnimationFrame(function() {
        dom.clear();
        entities.length = 0;
        loop.start();
        stage.forEach(manic.entity);
      });
    },

    teardown() {
      loop.teardown();
      dom.teardown();
      inputs.teardown();
    }
  };

  function render() {
    invoke(entities, 'render', renderCtx);
  }

  function update() {
    invoke(entities, 'update', updateCtx);
    invoke(entities, 'swap');
    removeDead(entities).forEach(dom.delete);
  }

  return manic;
}

Object.assign(Manic, { collide, move });

module.exports = Manic;
