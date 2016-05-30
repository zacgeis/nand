/// <reference path="../typings/index.d.ts"/>

import assert = require ('assert');

import { Circuit } from '../lib/circuit';
import { or } from '../lib/gates';

describe('performs', () => {
  it('with 50K OR gates', () => {
    var c = new Circuit();
    var w1 = c.wire();
    var w2 = w1
    var w3;

    for(var i = 0; i < 50000; i++) {
      w3 = c.wire();
      or(c, w2, w2, w3);
      w2 = w3;
    }

    c.on(w1);
    assert.equal(c.state(w3), true);

    c.off(w1);
    assert.equal(c.state(w3), false);
  });
});
