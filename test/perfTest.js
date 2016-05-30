/// <reference path="../typings/index.d.ts"/>
"use strict";
var assert = require('assert');
var component_1 = require('../lib/component');
var gates_1 = require('../lib/gates');
describe('performs', function () {
    it('with 50K OR gates', function () {
        var w1 = new component_1.Wire();
        var w2 = w1;
        var w3;
        for (var i = 0; i < 50000; i++) {
            w3 = new component_1.Wire();
            gates_1.or(w2, w2, w3);
            w2 = w3;
        }
        w1.on();
        assert.equal(w3.state, true);
        w1.off();
        assert.equal(w3.state, false);
    });
});
