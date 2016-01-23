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
});
