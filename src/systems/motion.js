module.exports = {
  name:  'Motion',
  phase: 'motion',
  deps:  ['Position', 'Motion'],

  update(id, [p, m], ctx) {
    var friction = 0;

    if (m.amax && m.vmax) friction = -(m.amax / m.vmax);

    if (m.ax || friction) m.vx = m.vx * (1 + friction) + m.ax;
    if (m.ay || friction) m.vy = m.vy * (1 + friction) + m.ay;

    p.x += m.vx;
    p.y += m.vy;
  }
};
