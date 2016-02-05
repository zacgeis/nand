function numToBin(a) {
  return a.toString(2);
}

function binToWires(c, a, w) {
  a.split('').reverse().forEach(function(v, i) {
    v === '1' ? c.on(w[i]) : c.off(w[i]);
  });
}

function wiresToNum(c, w) {
  var bin = w.map(function(v, i) {
    return c.state(v) ? 1 : 0;
  }).reverse().join('');

  return parseInt(bin, 2);
}

module.exports = {
  numToBin: numToBin,
  binToWires: binToWires,
  wiresToNum: wiresToNum
};
