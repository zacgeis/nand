/// <reference path="../typings/index.d.ts"/>
"use strict";
var assert = require('assert');
var circuit_1 = require('../lib/circuit');
var gates_1 = require('../lib/gates');
describe('performs', function () {
    it('with 50K OR gates', function () {
        var c = new circuit_1.Circuit();
        var w1 = c.wire();
        var w2 = w1;
        var w3;
        for (var i = 0; i < 50000; i++) {
            w3 = c.wire();
            gates_1.or(c, w2, w2, w3);
            w2 = w3;
        }
        c.on(w1);
        assert.equal(c.state(w3), true);
        c.off(w1);
        assert.equal(c.state(w3), false);
    });
});
