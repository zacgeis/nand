/// <reference path="../typings/index.d.ts"/>
"use strict";
var assert = require('assert');
var component_1 = require('../lib/component');
function twoInOneOut(table, callback) {
    table.forEach(function (statement) {
        it(statement.join(' '), function () {
            var wire1 = new component_1.Wire();
            var wire2 = new component_1.Wire();
            var wire3 = new component_1.Wire();
            callback(wire1, wire2, wire3);
            statement[0] ? wire1.on() : wire1.off();
            statement[1] ? wire2.on() : wire2.off();
            assert.equal(wire3.state, statement[2]);
        });
    });
    // it('works with bundles', () => {
    //   let circuit = new Circuit();
    //   let wire1 = circuit.wire(table.length);
    //   let wire2 = circuit.wire(table.length);
    //   let wire3 = circuit.wire(table.length);
    //   callback(circuit, wire1, wire2, wire3);
    //   table.forEach((statement, i) => {
    //     statement[0] ? wire1[i].on() : wire1[i].off();
    //     statement[1] ? wire2[i].on() : wire2[i].off();
    //   });
    //   table.forEach((statement, i) => {
    //     assert.equal(wire3[i].state, statement[2]);
    //   });
    // });
}
exports.twoInOneOut = twoInOneOut;
function oneInOneOut(table, callback) {
    table.forEach(function (statement) {
        it(statement.join(' '), function () {
            var wire1 = new component_1.Wire();
            var wire2 = new component_1.Wire();
            callback(wire1, wire2);
            statement[0] ? wire1.on() : wire1.off();
            assert.equal(wire2.state, statement[1]);
        });
    });
    // it('works with bundles', () => {
    //   let circuit = new Circuit();
    //   let wire1 = circuit.wire(table.length);
    //   let wire2 = circuit.wire(table.length);
    //   callback(circuit, wire1, wire2);
    //   table.forEach((statement, i) => {
    //     statement[0] ? wire1[i].on() : wire1[i].off();
    //   });
    //   table.forEach((statement, i) => {
    //     assert.equal(wire2[i].state, statement[1]);
    //   });
    // });
}
exports.oneInOneOut = oneInOneOut;
function twoInTwoOut(table, callback) {
    table.forEach(function (statement) {
        it(statement.join(' '), function () {
            var wire1 = new component_1.Wire();
            var wire2 = new component_1.Wire();
            var wire3 = new component_1.Wire();
            var wire4 = new component_1.Wire();
            callback(wire1, wire2, wire3, wire4);
            statement[0] ? wire1.on() : wire1.off();
            statement[1] ? wire2.on() : wire2.off();
            assert.equal(wire3.state, statement[2]);
            assert.equal(wire4.state, statement[3]);
        });
    });
}
exports.twoInTwoOut = twoInTwoOut;
function threeInTwoOut(table, callback) {
    table.forEach(function (statement) {
        it(statement.join(' '), function () {
            var wire1 = new component_1.Wire();
            var wire2 = new component_1.Wire();
            var wire3 = new component_1.Wire();
            var wire4 = new component_1.Wire();
            var wire5 = new component_1.Wire();
            callback(wire1, wire2, wire3, wire4, wire5);
            statement[0] ? wire1.on() : wire1.off();
            statement[1] ? wire2.on() : wire2.off();
            statement[2] ? wire3.on() : wire3.off();
            assert.equal(wire4.state, statement[3]);
            assert.equal(wire5.state, statement[4]);
        });
    });
}
exports.threeInTwoOut = threeInTwoOut;
