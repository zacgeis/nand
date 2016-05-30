/// <reference path="../typings/index.d.ts"/>

import assert = require ('assert');

import { Circuit } from '../lib/circuit';
import { oneInOneOut, twoInTwoOut, threeInTwoOut, twoInOneOut } from './helper';
import { nand, or, nor, not, and, xor, halfadder, fulladder, srlatch, adder, inc, srflipflop, dflipflop, mux } from '../lib/gates';

describe('gates', () => {
  describe('nand', () => {
    twoInOneOut([
      [0,0,1],
      [0,1,1],
      [1,0,1],
      [1,1,0]
    ], (c, input1, input2, output1) => {
      nand(c, input1, input2, output1);
    });
  });
  describe('or', () => {
    twoInOneOut([
      [0,0,0],
      [0,1,1],
      [1,0,1],
      [1,1,1]
    ], (c, input1, input2, output1) => {
      or(c, input1, input2, output1);
    });
  });
  describe('nor', () => {
    twoInOneOut([
      [0,0,1],
      [0,1,0],
      [1,0,0],
      [1,1,0]
    ], (c, input1, input2, output1) => {
      nor(c, input1, input2, output1);
    });
  });
  describe('not', () => {
    oneInOneOut([
      [0,1],
      [1,0],
    ], (c, input1, output1) => {
      not(c, input1, output1);
    });
  });
  describe('and', () => {
    twoInOneOut([
      [0,0,0],
      [0,1,0],
      [1,0,0],
      [1,1,1]
    ], (c, input1, input2, output1) => {
      and(c, input1, input2, output1);
    });
  });
  describe('xor', () => {
    twoInOneOut([
      [0,0,0],
      [0,1,1],
      [1,0,1],
      [1,1,0]
    ], (c, input1, input2, output1) => {
      xor(c, input1, input2, output1);
    });
  });
  describe('halfadder', () => {
    twoInTwoOut([
      [0,0,0,0],
      [1,0,0,1],
      [0,1,0,1],
      [1,1,1,0]
    ], (c, input1, input2, carry, sum) => {
      halfadder(c, input1, input2, carry, sum);
    });
  });
  describe('fulladder', () => {
    threeInTwoOut([
      [0,0,0,0,0],
      [0,0,1,0,1],
      [0,1,0,0,1],
      [0,1,1,1,0],
      [1,0,0,0,1],
      [1,0,1,1,0],
      [1,1,0,1,0],
      [1,1,1,1,1]
    ], (c, input1, input2, input3, carry, sum) => {
      fulladder(c, input1, input2, input3, carry, sum);
    });
  });
  describe('srlatch', () => {
    it('keeps state', () => {
      var c = new Circuit();

      var w1 = c.wire();
      var w2 = c.wire();
      var w3 = c.wire();
      var w4 = c.wire();

      srlatch(c, w1, w2, w3, w4);

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
  describe('adder', () => {
    it('1 + 1 = 2', () => {
      var c = new Circuit();

      var in1 = c.wires(8);
      var in2 = c.wires(8);
      var carry = c.wire();
      var sum = c.wires(8);

      adder(c, in1, in2, carry, sum);

      c.on(in1[0]);
      c.on(in2[0]);

      assert.equal(c.state(sum[0]), false);
      assert.equal(c.state(sum[1]), true);
    });
    it('overflows correctly', () => {
      var c = new Circuit();

      var in1 = c.wires(8);
      var in2 = c.wires(8);
      var carry = c.wire();
      var sum = c.wires(8);

      adder(c, in1, in2, carry, sum);

      c.on(in1[7]);
      c.on(in2[7]);

      assert.equal(c.state(sum[7]), false);
      assert.equal(c.state(carry), true);
    });
  });
  describe('inc', () => {
    it('increments 1 to 2', () => {
      var c = new Circuit();

      var in1 = c.wires(8);
      var carry = c.wire();
      var sum = c.wires(8);

      inc(c, in1, carry, sum);

      c.on(in1[0]);

      assert.equal(c.state(sum[0]), false);
      assert.equal(c.state(sum[1]), true);
    });
    it('overflows correctly', () => {
      var c = new Circuit();

      var in1 = c.wires(4);
      var carry = c.wire();
      var sum = c.wires(4);

      inc(c, in1, carry, sum);

      c.on(in1[0]);
      c.on(in1[1]);
      c.on(in1[2]);
      c.on(in1[3]);

      assert.equal(c.state(sum[3]), false);
      assert.equal(c.state(carry), true);
    });
  });
  describe('srflipflop', () => {
    it('stores bits', () => {
      var c = new Circuit();

      var s = c.wires(8);
      var r = c.wires(8);
      var q = c.wires(8);
      var qp = c.wires(8);

      srflipflop(c, s, r, q, qp);

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
  describe('dflipflop', () => {
    it('stores bits', () => {
      var c = new Circuit();

      var d = c.wires(8);
      var q = c.wires(8);
      var qp = c.wires(8);

      dflipflop(c, d, q, qp);

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
  describe('mux', () => {
    it('1 1 1 selects the 8th', () => {
      var c = new Circuit();

      var in1 = c.wires(8);
      var sel = c.wires(3);
      var out1 = c.wire();

      mux(c, in1, sel, out1);

      c.on(in1[7]);

      c.on(sel[0]);
      c.on(sel[1]);
      c.on(sel[2]);

      assert.equal(c.state(out1), true);

      c.off(in1[7]);

      assert.equal(c.state(out1), false);
    });
    it('0 0 1 selects the 2nd', () => {
      var c = new Circuit();

      var in1 = c.wires(8);
      var sel = c.wires(3);
      var out1 = c.wire();

      mux(c, in1, sel, out1);

      c.on(in1[1]);

      c.on(sel[0]);

      assert.equal(c.state(out1), true);

      c.off(in1[1]);

      assert.equal(c.state(out1), false);
    });
    it('works when given an array of bundles', () => {
      var c = new Circuit();

      var in1 = c.wires(2);
      var in2 = c.wires(2);
      var ins = [in1, in2];
      var sel = c.wire();
      var out1 = c.wires(2);

      mux(c, ins, sel, out1);

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
