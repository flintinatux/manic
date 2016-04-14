module.exports = {
  name:  'Render',
  phase: 'render',
  deps:  ['Position', 'Render', 'Size'],

  update(id, [p, r, s], { dom }) {
    var el = dom.get(id),
        l  = p.x - s.w/2,
        t  = p.y - s.h/2;

    el.classList.add(r.className);

    Object.assign(el.style, {
      height: s.h + '%',
      width:  s.w + '%',
      left:   l + '%',
      top:    t + '%'
    });
  }
};
