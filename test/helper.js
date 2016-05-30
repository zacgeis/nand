/// <reference path="../typings/index.d.ts"/>
"use strict";
var assert = require('assert');
var circuit_1 = require('../lib/circuit');
function twoInOneOut(table, callback) {
    table.forEach(function (statement) {
        it(statement.join(' '), function () {
            var c = new circuit_1.Circuit();
            var w1 = c.wire();
            var w2 = c.wire();
            var w3 = c.wire();
            callback(c, w1, w2, w3);
            statement[0] ? c.on(w1) : c.off(w1);
            statement[1] ? c.on(w2) : c.off(w2);
            assert.equal(c.state(w3), statement[2]);
        });
    });
    it('works with bundles', function () {
        var c = new circuit_1.Circuit();
        var w1 = c.wires(table.length);
        var w2 = c.wires(table.length);
        var w3 = c.wires(table.length);
        callback(c, w1, w2, w3);
        table.forEach(function (statement, i) {
            statement[0] ? c.on(w1[i]) : c.off(w1[i]);
            statement[1] ? c.on(w2[i]) : c.off(w2[i]);
        });
        table.forEach(function (statement, i) {
            assert.equal(c.state(w3[i]), statement[2]);
        });
    });
}
exports.twoInOneOut = twoInOneOut;
function oneInOneOut(table, callback) {
    table.forEach(function (statement) {
        it(statement.join(' '), function () {
            var c = new circuit_1.Circuit();
            var w1 = c.wire();
            var w2 = c.wire();
            callback(c, w1, w2);
            statement[0] ? c.on(w1) : c.off(w1);
            assert.equal(c.state(w2), statement[1]);
        });
    });
    it('works with bundles', function () {
        var c = new circuit_1.Circuit();
        var w1 = c.wires(table.length);
        var w2 = c.wires(table.length);
        callback(c, w1, w2);
        table.forEach(function (statement, i) {
            statement[0] ? c.on(w1[i]) : c.off(w1[i]);
        });
        table.forEach(function (statement, i) {
            assert.equal(c.state(w2[i]), statement[1]);
        });
    });
}
exports.oneInOneOut = oneInOneOut;
function twoInTwoOut(table, callback) {
    table.forEach(function (statement) {
        it(statement.join(' '), function () {
            var c = new circuit_1.Circuit();
            var w1 = c.wire();
            var w2 = c.wire();
            var w3 = c.wire();
            var w4 = c.wire();
            callback(c, w1, w2, w3, w4);
            statement[0] ? c.on(w1) : c.off(w1);
            statement[1] ? c.on(w2) : c.off(w2);
            assert.equal(c.state(w3), statement[2]);
            assert.equal(c.state(w4), statement[3]);
        });
    });
}
exports.twoInTwoOut = twoInTwoOut;
function threeInTwoOut(table, callback) {
    table.forEach(function (statement) {
        it(statement.join(' '), function () {
            var c = new circuit_1.Circuit();
            var w1 = c.wire();
            var w2 = c.wire();
            var w3 = c.wire();
            var w4 = c.wire();
            var w5 = c.wire();
            callback(c, w1, w2, w3, w4, w5);
            statement[0] ? c.on(w1) : c.off(w1);
            statement[1] ? c.on(w2) : c.off(w2);
            statement[2] ? c.on(w3) : c.off(w3);
            assert.equal(c.state(w4), statement[3]);
            assert.equal(c.state(w5), statement[4]);
        });
    });
}
exports.threeInTwoOut = threeInTwoOut;
