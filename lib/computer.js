var interface = require('./interface');
var gates = require('./gates');

function pc(c, in1, load, inc, reset, out1) {
  var overflow = c.wire();

  var falsebundle = interface.fanWireToMatchSize(c.FALSE, out1);

  var w1 = interface.matchWireSize(c, out1);
  var w2 = interface.matchWireSize(c, out1);
  var w3 = interface.matchWireSize(c, out1);
  var w4 = interface.matchWireSize(c, out1);
  var noop = interface.matchWireSize(c, out1);

  gates.inc(c, out1, overflow, w1)
  gates.mux(c, [out1, w1], inc, w2);
  gates.mux(c, [w2, falsebundle], reset, w3);
  gates.mux(c, [w3, in1], load, w4);

  gates.dflipflop(c, w4, out1, noop);
}

module.exports = {
  pc: pc
};
