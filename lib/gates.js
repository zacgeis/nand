"use strict";
var bridge_1 = require('./bridge');
function nand(c, in1, in2, out1) {
    c.nand(in1, in2, out1);
}
exports.nand = nand;
function or(c, in1, in2, out1) {
    var a = bridge_1.matchWireSize(c, in1);
    var b = bridge_1.matchWireSize(c, in1);
    nand(c, in1, in1, a);
    nand(c, in2, in2, b);
    nand(c, a, b, out1);
}
exports.or = or;
function nor(c, in1, in2, out1) {
    var a = bridge_1.matchWireSize(c, in1);
    or(c, in1, in2, a);
    nand(c, a, a, out1);
}
exports.nor = nor;
function not(c, in1, out1) {
    nand(c, in1, in1, out1);
}
exports.not = not;
function and(c, in1, in2, out1) {
    var a = bridge_1.matchWireSize(c, in1);
    nand(c, in1, in2, a);
    not(c, a, out1);
}
exports.and = and;
function xor(c, in1, in2, out1) {
    var a = bridge_1.matchWireSize(c, in1);
    var b = bridge_1.matchWireSize(c, in1);
    var w = bridge_1.matchWireSize(c, in1);
    nand(c, in1, in2, a);
    nand(c, in1, a, b);
    nand(c, in2, a, w);
    nand(c, b, w, out1);
}
exports.xor = xor;
function srlatch(c, s, r, q, qp) {
    nor(c, s, qp, q);
    nor(c, r, q, qp);
}
exports.srlatch = srlatch;
function halfadder(c, in1, in2, carry, sum) {
    xor(c, in1, in2, sum);
    and(c, in1, in2, carry);
}
exports.halfadder = halfadder;
function fulladder(c, in1, in2, in3, carry, sum) {
    var w1 = bridge_1.matchWireSize(c, in1);
    var w2 = bridge_1.matchWireSize(c, in1);
    var w3 = bridge_1.matchWireSize(c, in1);
    halfadder(c, in1, in2, w2, w1);
    halfadder(c, w1, in3, w3, sum);
    or(c, w2, w3, carry);
}
exports.fulladder = fulladder;
function adder(c, in1, in2, carry, sum) {
    var hcarry = c.wire();
    halfadder(c, in1[0], in2[0], hcarry, sum[0]);
    for (var i = 1; i < in1.length - 1; i++) {
        var tcarry = c.wire();
        fulladder(c, in1[i], in2[i], hcarry, tcarry, sum[i]);
        hcarry = tcarry;
    }
    fulladder(c, in1[in1.length - 1], in2[in2.length - 1], hcarry, carry, sum[sum.length - 1]);
}
exports.adder = adder;
function inc(c, in1, carry, sum) {
    var in2 = bridge_1.matchWireSize(c, in1);
    c.on(in2[0]);
    adder(c, in1, in2, carry, sum);
}
exports.inc = inc;
function srflipflop(c, s, r, q, qp) {
    var a = bridge_1.matchWireSize(c, s);
    var b = bridge_1.matchWireSize(c, s);
    var clock = bridge_1.matchClockSize(c, s);
    and(c, clock, s, a);
    and(c, clock, r, b);
    srlatch(c, a, b, q, qp);
}
exports.srflipflop = srflipflop;
function dflipflop(c, d, q, qp) {
    var s = bridge_1.matchWireSize(c, d);
    not(c, d, s);
    srflipflop(c, s, d, q, qp);
}
exports.dflipflop = dflipflop;
function mux(c, ins, sel, out1) {
    // if(in1.length !== Math.pow(2, sel.length)) {
    //   throw new Error('mux requires input size to equal 2 to the power of select size');
    // }
    if (!(sel instanceof Array)) {
        sel = [sel];
    }
    var orIn = bridge_1.matchWireSize(c, out1);
    var orOut = bridge_1.matchWireSize(c, out1);
    for (var x = 0; x < ins.length; x++) {
        var bits = bridge_1.numToReversedPaddedBitsArray(x, sel.length);
        var andIn = ins[x];
        var andOut = bridge_1.matchWireSize(c, out1);
        for (var i = bits.length - 1; i >= 0; i--) {
            var selbundle = bridge_1.fanWireToMatchSize(sel[i], out1);
            var nsel = bridge_1.matchWireSize(c, out1);
            not(c, selbundle, nsel);
            if (bits[i] === '1') {
                and(c, andIn, selbundle, andOut);
            }
            else {
                and(c, andIn, nsel, andOut);
            }
            andIn = andOut;
            andOut = bridge_1.matchWireSize(c, out1);
        }
        or(c, orIn, andIn, orOut);
        orIn = orOut;
        if (x === ins.length - 2) {
            orOut = out1;
        }
        else {
            orOut = bridge_1.matchWireSize(c, out1);
        }
    }
}
exports.mux = mux;
