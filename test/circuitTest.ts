/// <reference path="../typings/index.d.ts"/>

import assert = require ('assert');

import { Circuit } from '../lib/circuit';
import { twoInOneOut } from './helper';

describe('Circuit', () => {
  let c;

  beforeEach(() => {
    c = new Circuit();
  });

  describe('wire', function () {
    it('starts in an off state', function () {
      let w = c.wire();

      assert.equal(c.state(w), false);
    });
    it('can be turned on', function () {
      let w = c.wire();

      c.on(w);
      assert.equal(c.state(w), true);
    });
  });

  describe('nand', function () {
    twoInOneOut([
      [0,0,1],
      [0,1,1],
      [1,0,1],
      [1,1,0]
    ], function(c, input1, input2, output1) {
      c.nand(input1, input2, output1);
    });
    it('works with bundles', () => {
      let in1 = c.wires(2);
      let in2 = c.wires(2);
      let out1 = c.wires(2);

      c.nand(in1, in2, out1);

      c.on(in1[0]);
      c.on(in1[1]);
      c.on(in2[1]);
      assert.equal(c.state(out1[0]), true);
      assert.equal(c.state(out1[1]), false);
    });
  });
});

// TODO clean up functions
