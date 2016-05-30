/// <reference path="../typings/index.d.ts"/>
"use strict";
var assert = require('assert');
var component_1 = require('../lib/component');
var helper_1 = require('./helper');
describe('Circuit', function () {
    describe('wire', function () {
        it('starts in an off state', function () {
            var wire = new component_1.Wire();
            assert.equal(wire.state, false);
        });
        it('can be turned on', function () {
            var wire = new component_1.Wire();
            wire.on();
            assert.equal(wire.state, true);
        });
    });
    describe('nand', function () {
        helper_1.twoInOneOut([
            [0, 0, 1],
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 0]
        ], function (input1, input2, output1) {
            var nand = new component_1.Nand();
            nand.connect(input1, input2, output1);
        });
    });
});
