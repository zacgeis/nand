/// <reference path="../typings/index.d.ts"/>
"use strict";
var assert = require('assert');
var circuit_1 = require('../lib/circuit');
var bridge_1 = require('../lib/bridge');
var chips_1 = require('../lib/chips');
describe('chips', function () {
    describe('pc', function () {
        it('keeps count', function () {
            var cir = new circuit_1.Circuit();
            var in1 = cir.wires(8);
            var out1 = cir.wires(8);
            var load = cir.wire();
            var inc = cir.wire();
            var reset = cir.wire();
            chips_1.pc(cir, in1, load, inc, reset, out1);
            cir.tick();
            cir.on(inc);
            for (var i = 0; i < 6; i++) {
                cir.tick();
            }
            var num = bridge_1.wiresToNum(cir, out1);
            assert.equal(num, 6);
        });
    });
    describe("alu", function () {
        it("noop", function () {
            var cir = new circuit_1.Circuit();
            var in1 = cir.wires(8);
            var in2 = cir.wires(8);
            var op = cir.wires(3);
            var out1 = cir.wires(8);
            chips_1.alu(cir, in1, in2, op, out1);
            bridge_1.stateArrayToWires(cir, op, [0, 0, 0]);
            bridge_1.stateArrayToWires(cir, in1, [0, 0, 0, 0, 0, 0, 0, 1]);
            bridge_1.stateArrayToWires(cir, in2, [0, 0, 0, 0, 0, 0, 0, 1]);
            assert.deepEqual([0, 0, 0, 0, 0, 0, 0, 0], bridge_1.wiresToStateArray(cir, out1));
        });
        it("add", function () {
            var cir = new circuit_1.Circuit();
            var in1 = cir.wires(8);
            var in2 = cir.wires(8);
            var op = cir.wires(3);
            var out1 = cir.wires(8);
            chips_1.alu(cir, in1, in2, op, out1);
            bridge_1.stateArrayToWires(cir, op, [0, 0, 1]);
            bridge_1.stateArrayToWires(cir, in1, [0, 0, 0, 0, 0, 0, 0, 1]);
            bridge_1.stateArrayToWires(cir, in2, [0, 0, 0, 0, 0, 0, 0, 1]);
            assert.deepEqual([0, 0, 0, 0, 0, 0, 1, 0], bridge_1.wiresToStateArray(cir, out1));
        });
        it("negate", function () {
        });
        it("and", function () {
        });
        it("or", function () {
        });
    });
    describe("cpu", function () {
        it("", function () {
        });
    });
});
