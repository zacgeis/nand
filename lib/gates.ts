import { matchWireSize, matchClockSize, numToReversedPaddedBitsArray, fanWireToMatchSize} from './bridge';

export function nand(c, in1, in2, out1) {
  c.nand(in1, in2, out1);
}

export function or(c, in1, in2, out1) {
  let a = matchWireSize(c, in1);
  let b = matchWireSize(c, in1);

  nand(c, in1, in1, a);
  nand(c, in2, in2, b);
  nand(c, a, b, out1);
}

export function nor(c, in1, in2, out1) {
  let a = matchWireSize(c, in1);

  or(c, in1, in2, a);
  nand(c, a, a, out1);
}

export function not(c, in1, out1) {
  nand(c, in1, in1, out1);
}

export function and(c, in1, in2, out1) {
  let a = matchWireSize(c, in1);

  nand(c, in1, in2, a);
  not(c, a, out1);
}

export function xor(c, in1, in2, out1) {
  let a = matchWireSize(c, in1);
  let b = matchWireSize(c, in1);
  let w = matchWireSize(c, in1);

  nand(c, in1, in2, a);
  nand(c, in1, a, b);
  nand(c, in2, a, w);
  nand(c, b, w, out1);
}

export function srlatch(c, s, r, q, qp) {
  nor(c, s, qp, q);
  nor(c, r, q, qp);
}

export function halfadder(c, in1, in2, carry, sum) {
  xor(c, in1, in2, sum);
  and(c, in1, in2, carry);
}

export function fulladder(c, in1, in2, in3, carry, sum) {
  let w1 = matchWireSize(c, in1);
  let w2 = matchWireSize(c, in1);
  let w3 = matchWireSize(c, in1);

  halfadder(c, in1, in2, w2, w1);
  halfadder(c, w1, in3, w3, sum);
  or(c, w2, w3, carry);
}

export function adder(c, in1, in2, carry, sum) {
  let hcarry = c.wire();
  halfadder(c, in1[0], in2[0], hcarry, sum[0]);

  for(let i = 1; i < in1.length - 1; i++) {
    let tcarry = c.wire();
    fulladder(c, in1[i], in2[i], hcarry, tcarry, sum[i]);
    hcarry = tcarry;
  }

  fulladder(c, in1[in1.length - 1], in2[in2.length - 1], hcarry, carry, sum[sum.length -1]);
}

export function inc(c, in1, carry, sum) {
  let in2 = matchWireSize(c, in1);
  c.on(in2[0]);

  adder(c, in1, in2, carry, sum);
}

export function srflipflop(c, s, r, q, qp) {
  let a = matchWireSize(c, s);
  let b = matchWireSize(c, s);
  let clock = matchClockSize(c, s);

  and(c, clock, s, a);
  and(c, clock, r, b);

  srlatch(c, a, b, q, qp);
}

export function dflipflop(c, d, q, qp) {
  let s = matchWireSize(c, d);
  not(c, d, s);

  srflipflop(c, s, d, q, qp);
}


export function mux(c, ins, sel, out1) {
  // if(in1.length !== Math.pow(2, sel.length)) {
  //   throw new Error('mux requires input size to equal 2 to the power of select size');
  // }

  if(!(sel instanceof Array)) {
    sel = [sel];
  }

  let orIn = matchWireSize(c, out1);
  let orOut = matchWireSize(c, out1);

  for(let x = 0; x < ins.length; x++) {
    let bits = numToReversedPaddedBitsArray(x, sel.length);
    let andIn = ins[x];
    let andOut = matchWireSize(c, out1);

    for(let i = bits.length - 1; i >= 0; i--) {
      let selbundle = fanWireToMatchSize(sel[i], out1);
      let nsel = matchWireSize(c, out1);

      not(c, selbundle, nsel);

      if(bits[i] === '1') {
        and(c, andIn, selbundle, andOut);
      } else {
        and(c, andIn, nsel, andOut);
      }

      andIn = andOut;
      andOut = matchWireSize(c, out1);
    }

    or(c, orIn, andIn, orOut);
    orIn = orOut;

    if(x === ins.length - 2) {
      orOut = out1;
    } else {
      orOut = matchWireSize(c, out1);
    }
  }
}
