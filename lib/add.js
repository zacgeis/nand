"use strict";
var circuit_1 = require('./circuit');
var gates_1 = require('../lib/gates');
var bridge_1 = require('../lib/bridge');
function add(a, b) {
    var c = new circuit_1.Circuit();
    var in1 = c.wires(8);
    var in2 = c.wires(8);
    var carry = c.wire();
    var sum = c.wires(8);
    gates_1.adder(c, in1, in2, carry, sum);
    bridge_1.binToWires(c, bridge_1.numToBin(a), in1);
    bridge_1.binToWires(c, bridge_1.numToBin(b), in2);
    return bridge_1.wiresToNum(c, sum);
}
exports.add = add;
