var assert = require('assert');
var helper = require('./helper');

var Circuit = require('../lib/circuit');
var gates = require('../lib/gates');

describe('gates', function() {
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
