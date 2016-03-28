exports.each = function(list, ...args) {
  var i = list.length;
  while (i--) list[i].apply(null, args);
}

exports.invoke = function(list, method, ...args) {
  var i = list.length;
  while (i--) {
    var single = list[i];
    single[method].apply(single, args);
  }
}
