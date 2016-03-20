var assert = require('assert');
var helper = require('./helper');
var bridge = require('../lib/bridge');

var Circuit = require('../lib/circuit');
var computer = require('../lib/computer');

describe('computer', function() {
  describe('pc', function() {
    it('keeps count', function() {
      var c = new Circuit();

      var in1 = c.wires(8);
      var out1 = c.wires(8);

      var load = c.wire();
      var inc = c.wire();
      var reset = c.wire();

      computer.pc(c, in1, load, inc, reset, out1);

      c.tick();

      c.on(inc);

      c.tick();
      c.tick();
      c.tick();
      c.tick();
      c.tick();
      c.tick();

      var num = bridge.wiresToNum(c, out1);
      assert.equal(num, 6);
    });
  });
});
