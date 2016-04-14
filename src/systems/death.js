module.exports = {
  name:  'Death',
  phase: 'death',
  deps:  ['Death'],

  update(id, [d], { comps, entities }) {
    var contacts = comps('Contacts', id);

    if (contacts) for (var other in contacts) {
      delete comps('Contacts', other)[id];
    }

    entities.remove(id);
  }
}
