var interface = require('./interface');

function _matchWireSize(c, a) {
  if(a instanceof Array) {
    return c.wires(a.length);
  }
  return c.wire();
}

function _matchClockSize(c, a) {
  if(a instanceof Array) {
    return c.clocks(a.length);
  }
  return c.clock();
}

function nand(c, in1, in2, out1) {
  c.nand(in1, in2, out1);
}

function or(c, in1, in2, out1) {
  var a = _matchWireSize(c, in1);
  var b = _matchWireSize(c, in1);

  nand(c, in1, in1, a);
  nand(c, in2, in2, b);
  nand(c, a, b, out1);
}

function nor(c, in1, in2, out1) {
  var a = _matchWireSize(c, in1);

  or(c, in1, in2, a);
  nand(c, a, a, out1);
}

function not(c, in1, out1) {
  nand(c, in1, in1, out1);
}

function and(c, in1, in2, out1) {
  var a = _matchWireSize(c, in1);

  nand(c, in1, in2, a);
  not(c, a, out1);
}

function xor(c, in1, in2, out1) {
  var a = _matchWireSize(c, in1);
  var b = _matchWireSize(c, in1);
  var w = _matchWireSize(c, in1);

  nand(c, in1, in2, a);
  nand(c, in1, a, b);
  nand(c, in2, a, w);
  nand(c, b, w, out1);
}

function srlatch(c, s, r, q, qp) {
  nor(c, s, qp, q);
  nor(c, r, q, qp);
}

function halfadder(c, in1, in2, carry, sum) {
  xor(c, in1, in2, sum);
  and(c, in1, in2, carry);
}

function fulladder(c, in1, in2, in3, carry, sum) {
  var w1 = _matchWireSize(c, in1);
  var w2 = _matchWireSize(c, in1);
  var w3 = _matchWireSize(c, in1);

  halfadder(c, in1, in2, w2, w1);
  halfadder(c, w1, in3, w3, sum);
  or(c, w2, w3, carry);
}

function adder(c, in1, in2, carry, sum) {
  var hcarry = c.wire();
  halfadder(c, in1[0], in2[0], hcarry, sum[0]);

  for(var i = 1; i < in1.length - 1; i++) {
    var tcarry = c.wire();
    fulladder(c, in1[i], in2[i], hcarry, tcarry, sum[i]);
    hcarry = tcarry;
  }

  fulladder(c, in1[in1.length - 1], in2[in2.length - 1], hcarry, carry, sum[sum.length -1]);
}

function srflipflop(c, s, r, q, qp) {
  var a = _matchWireSize(c, s);
  var b = _matchWireSize(c, s);
  var clock = _matchClockSize(c, s);

  and(c, clock, s, a);
  and(c, clock, r, b);

  srlatch(c, a, b, q, qp);
}

function mux(c, in1, sel, out1) {
  if(in1.length !== Math.pow(2, sel.length)) {
    throw new Error('mux requires input size to equal 2 to the power of select size');
  }

  var orIn = c.wire();
  var orOut = c.wire();

  for(var x = 0; x < in1.length; x++) {
    var bits = interface.numToReversedPaddedBitsArray(x, sel.length);
    var andIn = in1[x];
    var andOut = c.wire();

    for(var i = bits.length - 1; i >= 0; i--) {
      var nsel = c.wire();

      not(c, sel[i], nsel);

      if(bits[i] === '1') {
        and(c, andIn, sel[i], andOut);
      } else {
        and(c, andIn, nsel, andOut);
      }

      andIn = andOut;
      andOut = c.wire();
    }

    or(c, orIn, andIn, orOut);
    orIn = orOut;

    if(x === in1.length - 2) {
      orOut = out1;
    } else {
      orOut = c.wire();
    }
  }
}

module.exports = {
  nand: nand,
  and: and,
  xor: xor,
  not: not,
  or: or,
  nor: nor,
  srlatch: srlatch,
  halfadder: halfadder,
  fulladder: fulladder,
  adder: adder,
  srflipflop: srflipflop,
  mux: mux
};
