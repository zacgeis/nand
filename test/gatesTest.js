var assert = require('assert');
var helper = require('./helper');

var Circuit = require('../lib/circuit');
var gates = require('../lib/gates');

describe('gates', function() {
  describe('nand', function () {
    helper.twoInOneOut([
      [0,0,1],
      [0,1,1],
      [1,0,1],
      [1,1,0]
    ], function(c, input1, input2, output1) {
      gates.nand(c, input1, input2, output1);
    });
  });
  describe('or', function () {
    helper.twoInOneOut([
      [0,0,0],
      [0,1,1],
      [1,0,1],
      [1,1,1]
    ], function(c, input1, input2, output1) {
      gates.or(c, input1, input2, output1);
    });
  });
  describe('nor', function () {
    helper.twoInOneOut([
      [0,0,1],
      [0,1,0],
      [1,0,0],
      [1,1,0]
    ], function(c, input1, input2, output1) {
      gates.nor(c, input1, input2, output1);
    });
  });
  describe('not', function() {
    helper.oneInOneOut([
      [0,1],
      [1,0],
    ], function(c, input1, output1) {
      gates.not(c, input1, output1);
    });
  });
  describe('and', function () {
    helper.twoInOneOut([
      [0,0,0],
      [0,1,0],
      [1,0,0],
      [1,1,1]
    ], function(c, input1, input2, output1) {
      gates.and(c, input1, input2, output1);
    });
  });
  describe('xor', function () {
    helper.twoInOneOut([
      [0,0,0],
      [0,1,1],
      [1,0,1],
      [1,1,0]
    ], function(c, input1, input2, output1) {
      gates.xor(c, input1, input2, output1);
    });
  });
  describe('halfadder', function () {
    helper.twoInTwoOut([
      [0,0,0,0],
      [1,0,0,1],
      [0,1,0,1],
      [1,1,1,0]
    ], function(c, input1, input2, carry, sum) {
      gates.halfadder(c, input1, input2, carry, sum);
    });
  });
  describe('fulladder', function () {
    helper.threeInTwoOut([
      [0,0,0,0,0],
      [0,0,1,0,1],
      [0,1,0,0,1],
      [0,1,1,1,0],
      [1,0,0,0,1],
      [1,0,1,1,0],
      [1,1,0,1,0],
      [1,1,1,1,1]
    ], function(c, input1, input2, input3, carry, sum) {
      gates.fulladder(c, input1, input2, input3, carry, sum);
    });
  });
  describe('srlatch', function() {
    it('keeps state', function() {
      var c = new Circuit();

      var w1 = c.wire();
      var w2 = c.wire();
      var w3 = c.wire();
      var w4 = c.wire();

      gates.srlatch(c, w1, w2, w3, w4);

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
    it('1 + 1 = 2', function() {
      var c = new Circuit();

      var in1 = c.wires(8);
      var in2 = c.wires(8);
      var carry = c.wire();
      var sum = c.wires(8);

      gates.adder(c, in1, in2, carry, sum);

      c.on(in1[0]);
      c.on(in2[0]);

      assert.equal(c.state(sum[0]), false);
      assert.equal(c.state(sum[1]), true);
    });
    it('overflows correctly', function() {
      var c = new Circuit();

      var in1 = c.wires(8);
      var in2 = c.wires(8);
      var carry = c.wire();
      var sum = c.wires(8);

      gates.adder(c, in1, in2, carry, sum);

      c.on(in1[7]);
      c.on(in2[7]);

      assert.equal(c.state(sum[7]), false);
      assert.equal(c.state(carry), true);
    });
  });
});
