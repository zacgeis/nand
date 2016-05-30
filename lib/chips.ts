import { fanWireToMatchSize, matchWireSize } from './bridge';
import { inc, mux, dflipflop, adder } from './gates';

export function pc(c, in1, load, inc1, reset, out1) {
  var overflow = c.wire();

  var falsebundle = fanWireToMatchSize(c.FALSE, out1);

  var w1 = matchWireSize(c, out1);
  var w2 = matchWireSize(c, out1);
  var w3 = matchWireSize(c, out1);
  var w4 = matchWireSize(c, out1);
  var noop = matchWireSize(c, out1);

  inc(c, out1, overflow, w1)
  mux(c, [out1, w1], inc1, w2);
  mux(c, [w2, falsebundle], reset, w3);
  mux(c, [w3, in1], load, w4);

  dflipflop(c, w4, out1, noop);
}

export function alu(cir, in1, in2, op, out1) {
  var noop = matchWireSize(cir, out1);

  var add = matchWireSize(cir, out1);
  var carry = cir.wire();

  adder(cir, in1, in2, carry, add);

  mux(cir, [noop, add], op, out1);
}

export function cpu() {

}
