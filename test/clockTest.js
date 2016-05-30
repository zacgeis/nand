/// <reference path="../typings/index.d.ts"/>
"use strict";
var assert = require('assert');
var circuit_1 = require('../lib/circuit');
var clock_1 = require('../lib/clock');
var gates_1 = require('../lib/gates');
describe('Clock', function () {
    var circuit;
    beforeEach(function () {
        circuit = new circuit_1.Circuit();
    });
    it('works', function (done) {
        var clock = new clock_1.Clock(circuit, 20);
        var s = circuit.wires(8);
        var r = circuit.wires(8);
        var q = circuit.wires(8);
        var qp = circuit.wires(8);
        gates_1.srflipflop(circuit, s, r, q, qp);
        clock.start();
        var t1 = setTimeout(function () {
            circuit.on(s[0]);
            assert.equal(circuit.state(q[0]), true);
            assert.equal(circuit.state(qp[0]), false);
        }, 30);
        var t2 = setTimeout(function () {
            assert.equal(circuit.state(q[0]), false);
            assert.equal(circuit.state(qp[0]), true);
            clock.stop();
            done();
        }, 50);
    });
});
