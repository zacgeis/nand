/// <reference path="../typings/index.d.ts"/>

import assert = require ('assert');

import { Wire } from '../lib/component';

export function twoInOneOut(table, callback) {
  table.forEach((statement) => {
    it(statement.join(' '), () => {
      let wire1 = new Wire();
      let wire2 = new Wire();
      let wire3 = new Wire();

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

export function oneInOneOut(table, callback) {
  table.forEach((statement) => {
    it(statement.join(' '), () => {
      let wire1 = new Wire();
      let wire2 = new Wire();

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

export function twoInTwoOut(table, callback) {
  table.forEach((statement) => {
    it(statement.join(' '), () => {
      let wire1 = new Wire();
      let wire2 = new Wire();
      let wire3 = new Wire();
      let wire4 = new Wire();

      callback(wire1, wire2, wire3, wire4);

      statement[0] ? wire1.on() : wire1.off();
      statement[1] ? wire2.on() : wire2.off();

      assert.equal(wire3.state, statement[2]);
      assert.equal(wire4.state, statement[3]);
    });
  });
}

export function threeInTwoOut(table, callback) {
  table.forEach((statement) => {
    it(statement.join(' '), () => {
      let wire1 = new Wire();
      let wire2 = new Wire();
      let wire3 = new Wire();
      let wire4 = new Wire();
      let wire5 = new Wire();

      callback(wire1, wire2, wire3, wire4, wire5);

      statement[0] ? wire1.on() : wire1.off();
      statement[1] ? wire2.on() : wire2.off();
      statement[2] ? wire3.on() : wire3.off();

      assert.equal(wire4.state, statement[3]);
      assert.equal(wire5.state, statement[4]);
    });
  });
}
