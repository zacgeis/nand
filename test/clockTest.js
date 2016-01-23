var assert = require('assert');
var helper = require('./helper');

var Circuit = require('../lib/circuit');
var Clock = require('../lib/clock');

describe('Clock', function() {
  var circuit;

  beforeEach(function() {
    circuit = new Circuit();
  });

  it('works', function(done) {
    var clock = new Clock(circuit, 20);
    var w1 = circuit.wire();
    var w2 = clock.wire();
    var w3 = circuit.wire();

    circuit.nand(w1, w2, w3);
    circuit.on(w1);

    clock.start();

    var t1 = setTimeout(function() {
      assert.equal(circuit.state(w3), false);
    }, 30);

    var t2 = setTimeout(function() {
      assert.equal(circuit.state(w3), true);
      clearTimeout(t1);
      clearTimeout(t2);
      clock.stop();
      done();
    }, 50);
  });
});
