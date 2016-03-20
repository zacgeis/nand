var Circuit = require('./circuit');

var gates = require('../lib/gates');
var bridge = require('../lib/bridge');

function add(a, b) {
  var c = new Circuit();

  var in1 = c.wires(8);
  var in2 = c.wires(8);
  var carry = c.wire();
  var sum = c.wires(8);

  gates.adder(c, in1, in2, carry, sum);

  bridge.binToWires(c, bridge.numToBin(a), in1);
  bridge.binToWires(c, bridge.numToBin(b), in2);

  return bridge.wiresToNum(c, sum);
}

module.exports = add;
