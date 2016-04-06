const inRange = require('lodash/inRange');

var opposite = {
  'top':    'bottom',
  'bottom': 'top',
  'left':   'right',
  'right':  'left'
};

function t(e) { return e.y - e.h/2 }
function b(e) { return e.y + e.h/2 }
function l(e) { return e.x - e.w/2 }
function r(e) { return e.x + e.w/2 }

module.exports = {
  name:  'Collision',
  phase: 'collision',

  updateAll({ comps, entities }) {
    for (var i = 0; i < entities.length - 1; i++) {
      var A = entities[i];
      if (!comps('Collision', A)) continue;

      for (var j = i + 1; j < entities.length; j++) {
        var B = entities[j];
        if (!comps('Collision', B)) continue;

        var ca, cb,
            side = collide(A, B);

        if (side) {
          ca = comps('Contacts', A) || comps.add('Contacts', A);
          cb = comps('Contacts', B) || comps.add('Contacts', B);
          ca[B] = side;
          cb[A] = opposite[side];
          continue;
        }

        if (ca = comps('Contacts', A)) {
          delete ca[B];
          Object.keys(ca).length || comps.remove('Contacts', A);
        }

        if (cb = comps('Contacts', B)) {
          delete cb[A];
          Object.keys(cb).length || comps.remove('Contacts', B);
        }
      }
    }

    function collide(A, B) {
      A = compose(A);
      B = compose(B);

      var Li = inRange(l(A), l(B), r(B));
      var Ri = inRange(l(B), l(A), r(A));
      var Ti = inRange(t(A), t(B), b(B));
      var Bi = inRange(t(B), t(A), b(A));

      var Lo = r(B) - l(A);
      var Ro = r(A) - l(B);
      var To = b(B) - t(A);
      var Bo = b(A) - t(B);

      switch (true) {
        case (Ti && Li):
          return Lo > To ? 'top' : 'left';
        case (Ti && Ri):
          return Ro > To ? 'top' : 'right';
        case (Bi && Li):
          return Lo > Bo ? 'bottom' : 'left';
        case (Bi && Ri):
          return Ro > Bo ? 'bottom' : 'right';
        default:
          return null;
      }
    }

    function compose(e) {
      return Object.assign({}, comps('Collision', e), comps('Position', e));
    }
  }
};
