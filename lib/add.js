var Circuit = require('./circuit');

var gates = require('../lib/gates');
var interface = require('../lib/interface');

function add(a, b) {
  var c = new Circuit();

  var in1 = c.wires(8);
  var in2 = c.wires(8);
  var carry = c.wire();
  var sum = c.wires(8);

  gates.adder(c, in1, in2, carry, sum);

  interface.binToWires(c, interface.numToBin(a), in1);
  interface.binToWires(c, interface.numToBin(b), in2);

  return interface.wiresToNum(c, sum);
}

module.exports = add;
