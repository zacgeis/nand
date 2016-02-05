var Circuit = require('./circuit');

var compose = require('../lib/compose');

function add(a, b) {
  var c = new Circuit();

  var in1 = c.wires(8);
  var in2 = c.wires(8);
  var carry = c.wire();
  var sum = c.wires(8);

  compose.adder(c, in1, in2, carry, sum);

  compose.binToWires(c, compose.numToBin(a), in1);
  compose.binToWires(c, compose.numToBin(b), in2);

  return compose.wiresToNum(c, sum);
}

module.exports = add;
