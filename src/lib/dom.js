function Dom(parent) {
  parent.style.margin = parent.style.padding = 0;

  var root = document.createElement('div');
  root.className = 'root';
  root.style.position = 'relative';
  parent.appendChild(root);

  var grid = document.createElement('div');
  grid.className = 'grid';
  grid.style.paddingTop = '100%';
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
      el.style.position = 'absolute';
      root.appendChild(el);
      dom.set(entity, el);
      return el;
    }
  });

  return dom;
}

module.exports = Dom;
