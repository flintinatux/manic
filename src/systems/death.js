module.exports = {
  name:  'Death',
  phase: 'death',
  deps:  ['Death'],

  update(id, [d], { entities }) {
    entities.remove(id);
  }
}
