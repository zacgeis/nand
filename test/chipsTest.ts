/// <reference path="../typings/index.d.ts"/>

import assert = require ('assert');

import { Circuit } from '../lib/circuit';
import { stateArrayToWires, wiresToNum, wiresToStateArray } from '../lib/bridge';
import { pc, alu } from '../lib/chips';

describe('chips', () => {
  describe('pc', () => {
    it('keeps count', () => {
      let cir = new Circuit();

      let in1 = cir.wires(8);
      let out1 = cir.wires(8);

      let load = cir.wire();
      let inc = cir.wire();
      let reset = cir.wire();

      pc(cir, in1, load, inc, reset, out1);

      cir.tick();

      cir.on(inc);

      for(let i = 0; i < 6; i++) {
        cir.tick();
      }

      let num = wiresToNum(cir, out1);
      assert.equal(num, 6);
    });
  });
  describe("alu", () => {
    it("noop", () => {
      let cir = new Circuit();

      let in1 = cir.wires(8);
      let in2 = cir.wires(8);

      let op = cir.wires(3);

      let out1 = cir.wires(8);

      alu(cir, in1, in2, op, out1);

      stateArrayToWires(cir, op, [0, 0, 0]);
      stateArrayToWires(cir, in1, [0, 0, 0, 0, 0, 0, 0, 1]);
      stateArrayToWires(cir, in2, [0, 0, 0, 0, 0, 0, 0, 1]);

      assert.deepEqual([0, 0, 0, 0, 0, 0, 0, 0], wiresToStateArray(cir, out1));
    });
    it("add", () => {
      let cir = new Circuit();

      let in1 = cir.wires(8);
      let in2 = cir.wires(8);
      let op = cir.wires(3);
      let out1 = cir.wires(8);

      alu(cir, in1, in2, op, out1);

      stateArrayToWires(cir, op, [0, 0, 1]);
      stateArrayToWires(cir, in1, [0, 0, 0, 0, 0, 0, 0, 1]);
      stateArrayToWires(cir, in2, [0, 0, 0, 0, 0, 0, 0, 1]);

      assert.deepEqual([0, 0, 0, 0, 0, 0, 1, 0], wiresToStateArray(cir, out1));
    });
    it("negate", () => {

    });
    it("and", () => {

    });
    it("or", () => {

    });
  });
  describe("cpu", () => {
    it("", () => {

    });
  });
});
