const classnames = require('classnames');

function Render(entity, opts) {
  return function render({ dom }) {
    var el = dom.get(entity);
    el.className    = classnames('Entity', entity.types);
    el.style.height = entity('h') + '%';
    el.style.width  = entity('w') + '%';
    el.style.left   = entity('l') + '%';
    el.style.top    = entity('t') + '%';
  }
}

module.exports = Render;
