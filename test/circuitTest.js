var assert = require('assert');
var helper = require('./helper');

var Circuit = require('../lib/circuit');

describe('Circuit', function() {
  var c;

  beforeEach(function() {
    c = new Circuit();
  });

  describe('wire', function () {
    it('starts in an off state', function () {
      var w = c.wire();

      assert.equal(c.state(w), false);
    });
    it('can be turned on', function () {
      var w = c.wire();

      c.on(w);
      assert.equal(c.state(w), true);
    });
  });

  describe('nand', function () {
    helper.twoInOneOut([
      [0,0,1],
      [0,1,1],
      [1,0,1],
      [1,1,0]
    ], function(c, input1, input2, output1) {
      c.nand(input1, input2, output1);
    });
  });
});
