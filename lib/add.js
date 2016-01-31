var Circuit = require('./circuit');

var compose = require('../lib/compose');

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

function add(a, b) {
  var c = new Circuit();

  var in1 = c.wires(8);
  var in2 = c.wires(8);
  var carry = c.wire();
  var sum = c.wires(8);

  compose.adder(c, in1, in2, carry, sum);

  binToWires(c, numToBin(a), in1);
  binToWires(c, numToBin(b), in2);

  return wiresToNum(c, sum);
}

module.exports = add;
