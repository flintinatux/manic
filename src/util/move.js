function move(entity) {
  var { current, next, amax, vmax } = entity;
  var friction = 0;

  if (amax && vmax) friction = -(amax / vmax);

  if (next.ax || friction) next.vx = current.vx * (1 + friction) + next.ax;
  if (next.ay || friction) next.vy = current.vy * (1 + friction) + next.ay;

  next.x += next.vx;
  next.y += next.vy;
}

module.exports = move;
