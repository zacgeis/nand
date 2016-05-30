/// <reference path="../typings/index.d.ts"/>

import assert = require ('assert');

import { Circuit } from '../lib/circuit';
import { Clock } from '../lib/clock';
import { srflipflop } from '../lib/gates';

describe('Clock', () => {
  let circuit;

  beforeEach(() => {
    circuit = new Circuit();
  });

  it('works', function(done) {
    let clock = new Clock(circuit, 20);

    let s = circuit.wires(8);
    let r = circuit.wires(8);
    let q = circuit.wires(8);
    let qp = circuit.wires(8);

    srflipflop(circuit, s, r, q, qp);

    clock.start();

    let t1 = setTimeout(() => {
      circuit.on(s[0]);
      assert.equal(circuit.state(q[0]), true);
      assert.equal(circuit.state(qp[0]), false);
    }, 30);

    let t2 = setTimeout(() => {
      assert.equal(circuit.state(q[0]), false);
      assert.equal(circuit.state(qp[0]), true);
      clock.stop();
      done();
    }, 50);
  });
});
