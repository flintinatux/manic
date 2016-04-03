module.exports = {
  name:  'Render',
  phase: 'render',
  deps:  ['Position', 'Render'],

  update(id, [p, r], { dom }) {
    var el = dom.get(id),
        l  = p.x - r.w/2,
        t  = p.y - r.h/2;

    el.classList.add(...r.classNames);

    Object.assign(el.style, {
      height: r.h + '%',
      width:  r.w + '%',
      left:   l + '%',
      top:    t + '%'
    });
  }
};
