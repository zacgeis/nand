/// <reference path="../typings/index.d.ts"/>

import assert = require ('assert');

import { Circuit } from '../lib/circuit';
import { Clock } from '../lib/clock';
import { srflipflop } from '../lib/gates';

describe('Clock', () => {
  var circuit;

  beforeEach(() => {
    circuit = new Circuit();
  });

  it('works', function(done) {
    var clock = new Clock(circuit, 20);

    var s = circuit.wires(8);
    var r = circuit.wires(8);
    var q = circuit.wires(8);
    var qp = circuit.wires(8);

    srflipflop(circuit, s, r, q, qp);

    clock.start();

    var t1 = setTimeout(() => {
      circuit.on(s[0]);
      assert.equal(circuit.state(q[0]), true);
      assert.equal(circuit.state(qp[0]), false);
    }, 30);

    var t2 = setTimeout(() => {
      assert.equal(circuit.state(q[0]), false);
      assert.equal(circuit.state(qp[0]), true);
      clock.stop();
      done();
    }, 50);
  });
});
