export var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key].substring(0, 3)] = rv[x[key].substring(0, 3)] || []).push(x);
      return rv;
    }, {});
  };

export default groupBy;