var assert = require('assert');
var helper = require('./helper');

var Circuit = require('../lib/circuit');
var gates = require('../lib/gates');

describe('gates', function() {
  describe('nand', function () {
    helper.basicLogicGate([
      [0,0,1],
      [0,1,1],
      [1,0,1],
      [1,1,0]
    ], function(c, input1, input2, output1) {
      gates.nand(c, input1, input2, output1);
    });
  });
  describe('or', function () {
    helper.basicLogicGate([
      [0,0,0],
      [0,1,1],
      [1,0,1],
      [1,1,1]
    ], function(c, input1, input2, output1) {
      gates.or(c, input1, input2, output1);
    });
  });
  describe('nor', function () {
    helper.basicLogicGate([
      [0,0,1],
      [0,1,0],
      [1,0,0],
      [1,1,0]
    ], function(c, input1, input2, output1) {
      gates.nor(c, input1, input2, output1);
    });
  });
  describe('not', function() {
    it('defaults 1', function() {
      var c = new Circuit();

      var w1 = c.wire();
      var w2 = c.wire();

      gates.not(c, w1, w2);

      assert.equal(c.state(w2), true);
    });
    it('outputs 0 when given 1', function() {
      var c = new Circuit();

      var w1 = c.wire();
      var w2 = c.wire();

      gates.not(c, w1, w2);

      c.on(w1);
      assert.equal(c.state(w2), false);
    });
    it('outputs 1 when given 0', function() {
      var c = new Circuit();

      var w1 = c.wire();
      var w2 = c.wire();

      gates.not(c, w1, w2);

      c.off(w1);
      assert.equal(c.state(w2), true);
    });
  });
  describe('and', function () {
    helper.basicLogicGate([
      [0,0,0],
      [0,1,0],
      [1,0,0],
      [1,1,1]
    ], function(c, input1, input2, output1) {
      gates.and(c, input1, input2, output1);
    });
  });
  describe('xor', function () {
    helper.basicLogicGate([
      [0,0,0],
      [0,1,1],
      [1,0,1],
      [1,1,0]
    ], function(c, input1, input2, output1) {
      gates.xor(c, input1, input2, output1);
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
});
