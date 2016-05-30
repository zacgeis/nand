/// <reference path="../typings/index.d.ts"/>

import assert = require ('assert');

import { add } from '../lib/add';

describe('add', () => {
  it('17 + 22 = 39', () => {
    assert.equal(add(22, 17), 39);
  });
});
