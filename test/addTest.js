/// <reference path="../typings/index.d.ts"/>
"use strict";
var assert = require('assert');
var add_1 = require('../lib/add');
describe('add', function () {
    it('17 + 22 = 39', function () {
        assert.equal(add_1.add(22, 17), 39);
    });
});
