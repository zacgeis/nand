/// <reference path="../typings/index.d.ts"/>

import assert = require ('assert');

import { Wire } from '../lib/component';
import { or } from '../lib/gates';

describe('performs', () => {
  it('with 50K OR gates', () => {
    let w1 = new Wire();
    let w2 = w1;
    let w3;

    for(let i = 0; i < 50000; i++) {
      w3 = new Wire();
      or(w2, w2, w3);
      w2 = w3;
    }

    w1.on();
    assert.equal(w3.state, true);

    w1.off();
    assert.equal(w3.state, false);
  });
});
