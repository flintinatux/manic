function Dom(parent, ratio=1) {
  Object.assign(parent.style, {
    margin:   0,
    overflow: 'hidden',
    padding:  0
  });

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

  var dom = new Map;
  var get = dom.get.bind(dom);
  var clear = dom.clear.bind(dom);
  var destroy = dom.delete.bind(dom);

  Object.assign(dom, {
    clear() {
      for (var el of dom) el.remove();
      clear();
    },

    delete(entity) {
      get(entity).remove();
      destroy(entity);
    },

    get(entity) {
      if (dom.has(entity)) return get(entity);
      var el = document.createElement('div');
      Object.assign(el.style, { position: 'absolute' });
      root.appendChild(el);
      dom.set(entity, el);
      return el;
    },

    teardown() {
      window.removeEventListener('resize', resize);
      dom.clear();
      grid.remove();
      root.remove();
    }
  });

  function resize() {
    parent.style.height = `${parent.clientWidth * ratio}px`;
  }

  return dom;
}

module.exports = Dom;
