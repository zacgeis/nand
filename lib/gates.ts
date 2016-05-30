// TODO: make plural versions

import { Wire, Nand } from './component';
import { matchWireSize, matchClockSize, numToReversedPaddedBitsArray, fanWireToMatchSize} from './bridge';

export function nand(in1: Wire, in2: Wire, out1: Wire): void {
  new Nand(in1, in2, out1);
}

export function or(in1: Wire, in2: Wire, out1: Wire): void {
  let a = new Wire();
  let b = new Wire();

  nand(in1, in1, a);
  nand(in2, in2, b);
  nand(a, b, out1);
}

export function nor(in1: Wire, in2: Wire, out1: Wire): void {
  let a = new Wire();

  or(in1, in2, a);
  nand(a, a, out1);
}

export function not(in1: Wire, out1: Wire): void {
  nand(in1, in1, out1);
}

export function and(in1: Wire, in2: Wire, out1: Wire): void {
  let a = new Wire();

  nand(in1, in2, a);
  not(a, out1);
}

export function xor(in1: Wire, in2: Wire, out1: Wire): void {
  let a = new Wire();
  let b = new Wire();
  let w = new Wire();

  nand(in1, in2, a);
  nand(in1, a, b);
  nand(in2, a, w);
  nand(b, w, out1);
}

export function srlatch(s: Wire, r: Wire, q: Wire, qp: Wire): void {
  nor(s, qp, q);
  nor(r, q, qp);
}

export function halfadder(in1: Wire, in2: Wire, carry: Wire, sum: Wire): void {
  xor(in1, in2, sum);
  and(in1, in2, carry);
}

export function fulladder(in1: Wire, in2: Wire, in3: Wire, carry: Wire, sum: Wire): void {
  let w1 = new Wire();
  let w2 = new Wire();
  let w3 = new Wire();

  halfadder(in1, in2, w2, w1);
  halfadder(w1, in3, w3, sum);
  or(w2, w3, carry);
}

export function adder(in1: Array<Wire>, in2: Array<Wire>, carry: Wire, sum: Array<Wire>): void {
  let hcarry = new Wire();
  halfadder(in1[0], in2[0], hcarry, sum[0]);

  for(let i = 1; i < in1.length - 1; i++) {
    let tcarry = new Wire();
    fulladder(in1[i], in2[i], hcarry, tcarry, sum[i]);
    hcarry = tcarry;
  }

  fulladder(in1[in1.length - 1], in2[in2.length - 1], hcarry, carry, sum[sum.length -1]);
}

export function inc(in1: Array<Wire>, carry: Wire, sum: Array<Wire>): void {
  let in2 = Wire.bundle(in1.length);
  in2[0].on();

  adder(in1, in2, carry, sum);
}

// export function srflipflop(clock: Clock, s: Wire, r: Wire, q: Wire, qp: Wire): void {
//   let a = new Wire();
//   let b = new Wire();
//
//   and(clock, s, a);
//   and(clock, r, b);
//
//   srlatch(a, b, q, qp);
// }
//
// export function dflipflop(clock: Clock, d: Wire, q: Wire, qp: Wire): void {
//   let s = new Wire();
//
//   not(d, s);
//
//   srflipflop(clock, s, d, q, qp);
// }

// export function mux(ins, sel, out1): void {
//   // if(in1.length !== Math.pow(2, sel.length)) {
//   //   throw new Error('mux requires input size to equal 2 to the power of select size');
//   // }
//
//   if(!(sel instanceof Array)) {
//     sel = [sel];
//   }
//
//   let orIn = matchWireSize(out1);
//   let orOut = matchWireSize(out1);
//
//   for(let x = 0; x < ins.length; x++) {
//     let bits = numToReversedPaddedBitsArray(x, sel.length);
//     let andIn = ins[x];
//     let andOut = matchWireSize(out1);
//
//     for(let i = bits.length - 1; i >= 0; i--) {
//       let selbundle = fanWireToMatchSize(sel[i], out1);
//       let nsel = matchWireSize(out1);
//
//       not(selbundle, nsel);
//
//       if(bits[i] === '1') {
//         and(andIn, selbundle, andOut);
//       } else {
//         and(andIn, nsel, andOut);
//       }
//
//       andIn = andOut;
//       andOut = matchWireSize(out1);
//     }
//
//     or(orIn, andIn, orOut);
//     orIn = orOut;
//
//     if(x === ins.length - 2) {
//       orOut = out1;
//     } else {
//       orOut = matchWireSize(out1);
//     }
//   }
// }
