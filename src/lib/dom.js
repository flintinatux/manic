function Dom(parent, ratio=1) {
  Object.assign(parent.style, { overflow: 'hidden' });

  window.addEventListener('resize', resize);
  resize();

  var root = document.createElement('div');
  root.className = 'root';
  Object.assign(root.style, { position: 'relative' });
  parent.appendChild(root);

  var grid = document.createElement('div');
  grid.className = 'grid';
  Object.assign(grid.style, { paddingTop: '100%' });
  root.appendChild(grid);

  var sprites = {};

  var dom = {
    clear() {
      for (var id in sprites) sprites[id].remove();
      sprites = {};
    },

    delete(entity) {
      var el = sprites[entity];
      if (!el) return;
      el.remove();
      delete sprites[entity];
    },

    get(entity) {
      if (sprites[entity]) return sprites[entity];
      var el = document.createElement('div');
      Object.assign(el.style, { position: 'absolute' });
      root.appendChild(el);
      sprites[entity] = el;
      return el;
    },

    teardown() {
      window.removeEventListener('resize', resize);
      dom.clear();
      grid.remove();
      root.remove();
    }
  };

  function resize() {
    parent.style.height = `${parent.clientWidth * ratio}px`;
  }

  return dom;
}

module.exports = Dom;
