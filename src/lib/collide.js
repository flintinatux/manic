const inRange = require('lodash/inRange');

function collide(A, entities, collided) {
  var i = entities.length;
  while (i--) {
    var B = entities[i];
    if (A === B) continue; // || !B.collider

    var Li = inRange(A('cl'), B('cl'), B('cr'));
    var Ri = inRange(B('cl'), A('cl'), A('cr'));
    var Ti = inRange(A('ct'), B('ct'), B('cb'));
    var Bi = inRange(B('ct'), A('ct'), A('cb'));

    var Lo = B('cr') - A('cl');
    var Ro = A('cr') - B('cl');
    var To = B('cb') - A('ct');
    var Bo = A('cb') - B('ct');

    var side = (function() {
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
    })();

    if (side) collided(B, side);
  }
}

module.exports = collide;
