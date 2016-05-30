"use strict";
var component_1 = require('./component');
function nand(in1, in2, out1) {
    new component_1.Nand(in1, in2, out1);
}
exports.nand = nand;
function or(in1, in2, out1) {
    var a = new component_1.Wire();
    var b = new component_1.Wire();
    nand(in1, in1, a);
    nand(in2, in2, b);
    nand(a, b, out1);
}
exports.or = or;
function nor(in1, in2, out1) {
    var a = new component_1.Wire();
    or(in1, in2, a);
    nand(a, a, out1);
}
exports.nor = nor;
function not(in1, out1) {
    nand(in1, in1, out1);
}
exports.not = not;
function and(in1, in2, out1) {
    var a = new component_1.Wire();
    nand(in1, in2, a);
    not(a, out1);
}
exports.and = and;
function xor(in1, in2, out1) {
    var a = new component_1.Wire();
    var b = new component_1.Wire();
    var w = new component_1.Wire();
    nand(in1, in2, a);
    nand(in1, a, b);
    nand(in2, a, w);
    nand(b, w, out1);
}
exports.xor = xor;
function srlatch(s, r, q, qp) {
    nor(s, qp, q);
    nor(r, q, qp);
}
exports.srlatch = srlatch;
function halfadder(in1, in2, carry, sum) {
    xor(in1, in2, sum);
    and(in1, in2, carry);
}
exports.halfadder = halfadder;
function fulladder(in1, in2, in3, carry, sum) {
    var w1 = new component_1.Wire();
    var w2 = new component_1.Wire();
    var w3 = new component_1.Wire();
    halfadder(in1, in2, w2, w1);
    halfadder(w1, in3, w3, sum);
    or(w2, w3, carry);
}
exports.fulladder = fulladder;
function adder(in1, in2, carry, sum) {
    var hcarry = new component_1.Wire();
    halfadder(in1[0], in2[0], hcarry, sum[0]);
    for (var i = 1; i < in1.length - 1; i++) {
        var tcarry = new component_1.Wire();
        fulladder(in1[i], in2[i], hcarry, tcarry, sum[i]);
        hcarry = tcarry;
    }
    fulladder(in1[in1.length - 1], in2[in2.length - 1], hcarry, carry, sum[sum.length - 1]);
}
exports.adder = adder;
function inc(in1, carry, sum) {
    var in2 = component_1.Wire.bundle(in1.length);
    in2[0].on();
    adder(in1, in2, carry, sum);
}
exports.inc = inc;
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
