"use strict";
var gates_1 = require('../lib/gates');
var bridge_1 = require('../lib/bridge');
function add(a, b) {
    var in1 = Wire.bundle(8);
    var in2 = Wire.bundle(8);
    var carry = new Wire();
    var sum = Wire.bundle(8);
    gates_1.adder(c, in1, in2, carry, sum);
    bridge_1.binToWires(c, bridge_1.numToBin(a), in1);
    bridge_1.binToWires(c, bridge_1.numToBin(b), in2);
    return bridge_1.wiresToNum(c, sum);
}
exports.add = add;
