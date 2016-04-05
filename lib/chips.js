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

function alu() {

}

function cpu() {

}

module.exports = {
  pc: pc,
  alu: alu,
  cpu: cpu
};