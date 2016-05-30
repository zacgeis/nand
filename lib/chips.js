"use strict";
var bridge_1 = require('./bridge');
var gates_1 = require('./gates');
function pc(c, in1, load, inc1, reset, out1) {
    var overflow = c.wire();
    var falsebundle = bridge_1.fanWireToMatchSize(c.FALSE, out1);
    var w1 = bridge_1.matchWireSize(c, out1);
    var w2 = bridge_1.matchWireSize(c, out1);
    var w3 = bridge_1.matchWireSize(c, out1);
    var w4 = bridge_1.matchWireSize(c, out1);
    var noop = bridge_1.matchWireSize(c, out1);
    gates_1.inc(c, out1, overflow, w1);
    gates_1.mux(c, [out1, w1], inc1, w2);
    gates_1.mux(c, [w2, falsebundle], reset, w3);
    gates_1.mux(c, [w3, in1], load, w4);
    gates_1.dflipflop(c, w4, out1, noop);
}
exports.pc = pc;
function alu(cir, in1, in2, op, out1) {
    var noop = bridge_1.matchWireSize(cir, out1);
    var add = bridge_1.matchWireSize(cir, out1);
    var carry = cir.wire();
    gates_1.adder(cir, in1, in2, carry, add);
    gates_1.mux(cir, [noop, add], op, out1);
}
exports.alu = alu;
function cpu() {
}
exports.cpu = cpu;
