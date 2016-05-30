/// <reference path="../typings/index.d.ts"/>
"use strict";
var assert = require('assert');
var component_1 = require('../lib/component');
var helper_1 = require('./helper');
var gates_1 = require('../lib/gates');
describe('gates', function () {
    describe('nand', function () {
        helper_1.twoInOneOut([
            [0, 0, 1],
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 0]
        ], function (input1, input2, output1) {
            gates_1.nand(input1, input2, output1);
        });
    });
    describe('or', function () {
        helper_1.twoInOneOut([
            [0, 0, 0],
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 1]
        ], function (input1, input2, output1) {
            gates_1.or(input1, input2, output1);
        });
    });
    describe('nor', function () {
        helper_1.twoInOneOut([
            [0, 0, 1],
            [0, 1, 0],
            [1, 0, 0],
            [1, 1, 0]
        ], function (input1, input2, output1) {
            gates_1.nor(input1, input2, output1);
        });
    });
    describe('not', function () {
        helper_1.oneInOneOut([
            [0, 1],
            [1, 0],
        ], function (input1, output1) {
            gates_1.not(input1, output1);
        });
    });
    describe('and', function () {
        helper_1.twoInOneOut([
            [0, 0, 0],
            [0, 1, 0],
            [1, 0, 0],
            [1, 1, 1]
        ], function (input1, input2, output1) {
            gates_1.and(input1, input2, output1);
        });
    });
    describe('xor', function () {
        helper_1.twoInOneOut([
            [0, 0, 0],
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 0]
        ], function (input1, input2, output1) {
            gates_1.xor(input1, input2, output1);
        });
    });
    describe('halfadder', function () {
        helper_1.twoInTwoOut([
            [0, 0, 0, 0],
            [1, 0, 0, 1],
            [0, 1, 0, 1],
            [1, 1, 1, 0]
        ], function (input1, input2, carry, sum) {
            gates_1.halfadder(input1, input2, carry, sum);
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
        ], function (input1, input2, input3, carry, sum) {
            gates_1.fulladder(input1, input2, input3, carry, sum);
        });
    });
    describe('srlatch', function () {
        it('keeps state', function () {
            var w1 = new component_1.Wire();
            var w2 = new component_1.Wire();
            var w3 = new component_1.Wire();
            var w4 = new component_1.Wire();
            gates_1.srlatch(w1, w2, w3, w4);
            w1.on();
            w2.off();
            assert.equal(w3.state, false);
            assert.equal(w4.state, true);
            w1.off();
            w2.on();
            assert.equal(w3.state, true);
            assert.equal(w4.state, false);
        });
    });
    describe('adder', function () {
        it('1 + 1 = 2', function () {
            var in1 = component_1.Wire.bundle(8);
            var in2 = component_1.Wire.bundle(8);
            var carry = new component_1.Wire();
            var sum = component_1.Wire.bundle(8);
            gates_1.adder(in1, in2, carry, sum);
            in1[0].on();
            in2[0].on();
            assert.equal(sum[0].state, false);
            assert.equal(sum[1].state, true);
        });
        it('overflows correctly', function () {
            var in1 = component_1.Wire.bundle(8);
            var in2 = component_1.Wire.bundle(8);
            var carry = new component_1.Wire();
            var sum = component_1.Wire.bundle(8);
            gates_1.adder(in1, in2, carry, sum);
            in1[7].on();
            in2[7].on();
            assert.equal(sum[7].state, false);
            assert.equal(carry.state, true);
        });
    });
    describe('inc', function () {
        it('increments 1 to 2', function () {
            var in1 = component_1.Wire.bundle(8);
            var carry = new component_1.Wire();
            var sum = component_1.Wire.bundle(8);
            gates_1.inc(in1, carry, sum);
            in1[0].on();
            assert.equal(sum[0].state, false);
            assert.equal(sum[1].state, true);
        });
        it('overflows correctly', function () {
            var in1 = component_1.Wire.bundle(4);
            var carry = new component_1.Wire();
            var sum = component_1.Wire.bundle(4);
            gates_1.inc(in1, carry, sum);
            in1[0].on();
            in1[1].on();
            in1[2].on();
            in1[3].on();
            assert.equal(sum[3].state, false);
            assert.equal(carry.state, true);
        });
    });
    // describe('srflipflop', () => {
    //   it('stores bits', () => {
    //     let s = c.wires(8);
    //     let r = c.wires(8);
    //     let q = c.wires(8);
    //     let qp = c.wires(8);
    //     srflipflop(s, r, q, qp);
    //     c.on(s[0]);
    //     c.tick();
    //     c.off(s[0]);
    //     assert.equal(c.state(q[0]), false);
    //     assert.equal(c.state(qp[0]), true);
    //     c.on(r[0]);
    //     c.tick();
    //     c.off(r[0]);
    //     assert.equal(c.state(q[0]), true);
    //     assert.equal(c.state(qp[0]), false);
    //   });
    // });
    // describe('dflipflop', () => {
    //   it('stores bits', () => {
    //     let d = c.wires(8);
    //     let q = c.wires(8);
    //     let qp = c.wires(8);
    //     dflipflop(d, q, qp);
    //     c.on(d[0]);
    //     c.tick();
    //     c.off(d[0]);
    //     assert.equal(c.state(q[0]), true);
    //     assert.equal(c.state(qp[0]), false);
    //     c.tick();
    //     assert.equal(c.state(q[0]), false);
    //     assert.equal(c.state(qp[0]), true);
    //   });
    // });
    // describe('mux', () => {
    //   it('1 1 1 selects the 8th', () => {
    //     let in1 = c.wires(8);
    //     let sel = c.wires(3);
    //     let out1 = new Wire();
    //     mux(in1, sel, out1);
    //     c.on(in1[7]);
    //     c.on(sel[0]);
    //     c.on(sel[1]);
    //     c.on(sel[2]);
    //     assert.equal(c.state(out1), true);
    //     c.off(in1[7]);
    //     assert.equal(c.state(out1), false);
    //   });
    //   it('0 0 1 selects the 2nd', () => {
    //     let in1 = c.wires(8);
    //     let sel = c.wires(3);
    //     let out1 = new Wire();
    //     mux(in1, sel, out1);
    //     c.on(in1[1]);
    //     c.on(sel[0]);
    //     assert.equal(c.state(out1), true);
    //     c.off(in1[1]);
    //     assert.equal(c.state(out1), false);
    //   });
    //   it('works when given an array of bundles', () => {
    //     let in1 = c.wires(2);
    //     let in2 = c.wires(2);
    //     let ins = [in1, in2];
    //     let sel = new Wire();
    //     let out1 = c.wires(2);
    //     mux(ins, sel, out1);
    //     c.on(in1[0]);
    //     c.on(in1[1]);
    //     c.on(sel);
    //     assert.equal(c.state(out1[0]), false);
    //     assert.equal(c.state(out1[1]), false);
    //     c.off(sel);
    //     assert.equal(c.state(out1[0]), true);
    //     assert.equal(c.state(out1[1]), true);
    //   });
    // });
});
