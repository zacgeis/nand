/// <reference path="../typings/index.d.ts"/>

import assert = require ('assert');

import { Wire, Nand } from '../lib/component';
import { twoInOneOut } from './helper';

describe('Circuit', () => {
  describe('wire', () => {
    it('starts in an off state', () => {
      let wire = new Wire();

      assert.equal(wire.state, false);
    });
    it('can be turned on', () => {
      let wire = new Wire();

      wire.on();
      assert.equal(wire.state, true);
    });
  });

  describe('nand', () => {
    twoInOneOut([
      [0,0,1],
      [0,1,1],
      [1,0,1],
      [1,1,0]
    ], (input1, input2, output1) => {
      let nand = new Nand();
      nand.connect(input1, input2, output1);
    });
  });
});
