/// <reference path="../typings/index.d.ts"/>
"use strict";
var assert = require('assert');
var circuit_1 = require('../lib/circuit');
var helper_1 = require('./helper');
var gates_1 = require('../lib/gates');
describe('gates', function () {
    describe('nand', function () {
        helper_1.twoInOneOut([
            [0, 0, 1],
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 0]
        ], function (c, input1, input2, output1) {
            gates_1.nand(c, input1, input2, output1);
        });
    });
    describe('or', function () {
        helper_1.twoInOneOut([
            [0, 0, 0],
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 1]
        ], function (c, input1, input2, output1) {
            gates_1.or(c, input1, input2, output1);
        });
    });
    describe('nor', function () {
        helper_1.twoInOneOut([
            [0, 0, 1],
            [0, 1, 0],
            [1, 0, 0],
            [1, 1, 0]
        ], function (c, input1, input2, output1) {
            gates_1.nor(c, input1, input2, output1);
        });
    });
    describe('not', function () {
        helper_1.oneInOneOut([
            [0, 1],
            [1, 0],
        ], function (c, input1, output1) {
            gates_1.not(c, input1, output1);
        });
    });
    describe('and', function () {
        helper_1.twoInOneOut([
            [0, 0, 0],
            [0, 1, 0],
            [1, 0, 0],
            [1, 1, 1]
        ], function (c, input1, input2, output1) {
            gates_1.and(c, input1, input2, output1);
        });
    });
    describe('xor', function () {
        helper_1.twoInOneOut([
            [0, 0, 0],
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 0]
        ], function (c, input1, input2, output1) {
            gates_1.xor(c, input1, input2, output1);
        });
    });
    describe('halfadder', function () {
        helper_1.twoInTwoOut([
            [0, 0, 0, 0],
            [1, 0, 0, 1],
            [0, 1, 0, 1],
            [1, 1, 1, 0]
        ], function (c, input1, input2, carry, sum) {
            gates_1.halfadder(c, input1, input2, carry, sum);
        });
    });
    describe('fulladder', function () {
        helper_1.threeInTwoOut([
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 1],
            [0, 1, 0, 0, 1],
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [1, 0, 1, 1, 0],
            [1, 1, 0, 1, 0],
            [1, 1, 1, 1, 1]
        ], function (c, input1, input2, input3, carry, sum) {
            gates_1.fulladder(c, input1, input2, input3, carry, sum);
        });
    });
    describe('srlatch', function () {
        it('keeps state', function () {
            var c = new circuit_1.Circuit();
            var w1 = c.wire();
            var w2 = c.wire();
            var w3 = c.wire();
            var w4 = c.wire();
            gates_1.srlatch(c, w1, w2, w3, w4);
            c.on(w1);
            c.off(w2);
            assert.equal(c.state(w3), false);
            assert.equal(c.state(w4), true);
            c.off(w1);
            c.on(w2);
            assert.equal(c.state(w3), true);
            assert.equal(c.state(w4), false);
        });
    });
    describe('adder', function () {
        it('1 + 1 = 2', function () {
            var c = new circuit_1.Circuit();
            var in1 = c.wires(8);
            var in2 = c.wires(8);
            var carry = c.wire();
            var sum = c.wires(8);
            gates_1.adder(c, in1, in2, carry, sum);
            c.on(in1[0]);
            c.on(in2[0]);
            assert.equal(c.state(sum[0]), false);
            assert.equal(c.state(sum[1]), true);
        });
        it('overflows correctly', function () {
            var c = new circuit_1.Circuit();
            var in1 = c.wires(8);
            var in2 = c.wires(8);
            var carry = c.wire();
            var sum = c.wires(8);
            gates_1.adder(c, in1, in2, carry, sum);
            c.on(in1[7]);
            c.on(in2[7]);
            assert.equal(c.state(sum[7]), false);
            assert.equal(c.state(carry), true);
        });
    });
    describe('inc', function () {
        it('increments 1 to 2', function () {
            var c = new circuit_1.Circuit();
            var in1 = c.wires(8);
            var carry = c.wire();
            var sum = c.wires(8);
            gates_1.inc(c, in1, carry, sum);
            c.on(in1[0]);
            assert.equal(c.state(sum[0]), false);
            assert.equal(c.state(sum[1]), true);
        });
        it('overflows correctly', function () {
            var c = new circuit_1.Circuit();
            var in1 = c.wires(4);
            var carry = c.wire();
            var sum = c.wires(4);
            gates_1.inc(c, in1, carry, sum);
            c.on(in1[0]);
            c.on(in1[1]);
            c.on(in1[2]);
            c.on(in1[3]);
            assert.equal(c.state(sum[3]), false);
            assert.equal(c.state(carry), true);
        });
    });
    describe('srflipflop', function () {
        it('stores bits', function () {
            var c = new circuit_1.Circuit();
            var s = c.wires(8);
            var r = c.wires(8);
            var q = c.wires(8);
            var qp = c.wires(8);
            gates_1.srflipflop(c, s, r, q, qp);
            c.on(s[0]);
            c.tick();
            c.off(s[0]);
            assert.equal(c.state(q[0]), false);
            assert.equal(c.state(qp[0]), true);
            c.on(r[0]);
            c.tick();
            c.off(r[0]);
            assert.equal(c.state(q[0]), true);
            assert.equal(c.state(qp[0]), false);
        });
    });
    describe('dflipflop', function () {
        it('stores bits', function () {
            var c = new circuit_1.Circuit();
            var d = c.wires(8);
            var q = c.wires(8);
            var qp = c.wires(8);
            gates_1.dflipflop(c, d, q, qp);
            c.on(d[0]);
            c.tick();
            c.off(d[0]);
            assert.equal(c.state(q[0]), true);
            assert.equal(c.state(qp[0]), false);
            c.tick();
            assert.equal(c.state(q[0]), false);
            assert.equal(c.state(qp[0]), true);
        });
    });
    describe('mux', function () {
        it('1 1 1 selects the 8th', function () {
            var c = new circuit_1.Circuit();
            var in1 = c.wires(8);
            var sel = c.wires(3);
            var out1 = c.wire();
            gates_1.mux(c, in1, sel, out1);
            c.on(in1[7]);
            c.on(sel[0]);
            c.on(sel[1]);
            c.on(sel[2]);
            assert.equal(c.state(out1), true);
            c.off(in1[7]);
            assert.equal(c.state(out1), false);
        });
        it('0 0 1 selects the 2nd', function () {
            var c = new circuit_1.Circuit();
            var in1 = c.wires(8);
            var sel = c.wires(3);
            var out1 = c.wire();
            gates_1.mux(c, in1, sel, out1);
            c.on(in1[1]);
            c.on(sel[0]);
            assert.equal(c.state(out1), true);
            c.off(in1[1]);
            assert.equal(c.state(out1), false);
        });
        it('works when given an array of bundles', function () {
            var c = new circuit_1.Circuit();
            var in1 = c.wires(2);
            var in2 = c.wires(2);
            var ins = [in1, in2];
            var sel = c.wire();
            var out1 = c.wires(2);
            gates_1.mux(c, ins, sel, out1);
            c.on(in1[0]);
            c.on(in1[1]);
            c.on(sel);
            assert.equal(c.state(out1[0]), false);
            assert.equal(c.state(out1[1]), false);
            c.off(sel);
            assert.equal(c.state(out1[0]), true);
            assert.equal(c.state(out1[1]), true);
        });
    });
});
