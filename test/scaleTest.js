var assert = require('assert');
var helper = require('./helper');

var Circuit = require('../lib/circuit');
var gates = require('../lib/gates');

describe('scale', function() {
  it('works with 100K chained slow ORs', function() {
    var c = new Circuit();
    var w1 = c.wire();
    var w2 = w1
    var w3;

    for(var i = 0; i < 100000; i++) {
      w3 = c.wire();
      gates.or(c, w2, w2, w3);
      w2 = w3;
    }

    c.on(w1);
    assert.equal(c.state(w3), true);

    c.off(w1);
    assert.equal(c.state(w3), false);
  });
});
