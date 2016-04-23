var bridge = require('./bridge');
var gates = require('./gates');

function pc(c, in1, load, inc, reset, out1) {
  var overflow = c.wire();

  var falsebundle = bridge.fanWireToMatchSize(c.FALSE, out1);

  var w1 = bridge.matchWireSize(c, out1);
  var w2 = bridge.matchWireSize(c, out1);
  var w3 = bridge.matchWireSize(c, out1);
  var w4 = bridge.matchWireSize(c, out1);
  var noop = bridge.matchWireSize(c, out1);

  gates.inc(c, out1, overflow, w1)
  gates.mux(c, [out1, w1], inc, w2);
  gates.mux(c, [w2, falsebundle], reset, w3);
  gates.mux(c, [w3, in1], load, w4);

  gates.dflipflop(c, w4, out1, noop);
}

function alu(cir, in1, in2, op, out1) {
  var noop = bridge.matchWireSize(cir, out1);

  var add = bridge.matchWireSize(cir, out1);
  var carry = cir.wire();

  gates.adder(cir, in1, in2, carry, add);

  gates.mux(cir, [noop, add], op, out1);
}

function cpu() {

}

module.exports = {
  pc: pc,
  alu: alu,
  cpu: cpu
};
