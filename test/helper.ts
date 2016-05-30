/// <reference path="../typings/index.d.ts"/>

import assert = require ('assert');

import { Circuit } from '../lib/circuit';

export function twoInOneOut(table, callback) {
  table.forEach((statement) => {
    it(statement.join(' '), () => {
      let c = new Circuit();
      let w1 = c.wire();
      let w2 = c.wire();
      let w3 = c.wire();

      callback(c, w1, w2, w3);

      statement[0] ? c.on(w1) : c.off(w1);
      statement[1] ? c.on(w2) : c.off(w2);

      assert.equal(c.state(w3), statement[2]);
    });
  });
  it('works with bundles', () => {
    let c = new Circuit();

    let w1 = c.wires(table.length);
    let w2 = c.wires(table.length);
    let w3 = c.wires(table.length);

    callback(c, w1, w2, w3);

    table.forEach((statement, i) => {
      statement[0] ? c.on(w1[i]) : c.off(w1[i]);
      statement[1] ? c.on(w2[i]) : c.off(w2[i]);
    });

    table.forEach((statement, i) => {
      assert.equal(c.state(w3[i]), statement[2]);
    });
  });
}

export function oneInOneOut(table, callback) {
  table.forEach((statement) => {
    it(statement.join(' '), () => {
      let c = new Circuit();
      let w1 = c.wire();
      let w2 = c.wire();

      callback(c, w1, w2);

      statement[0] ? c.on(w1) : c.off(w1);

      assert.equal(c.state(w2), statement[1]);
    });
  });
  it('works with bundles', () => {
    let c = new Circuit();

    let w1 = c.wires(table.length);
    let w2 = c.wires(table.length);

    callback(c, w1, w2);

    table.forEach((statement, i) => {
      statement[0] ? c.on(w1[i]) : c.off(w1[i]);
    });

    table.forEach((statement, i) => {
      assert.equal(c.state(w2[i]), statement[1]);
    });
  });
}

export function twoInTwoOut(table, callback) {
  table.forEach((statement) => {
    it(statement.join(' '), () => {
      let c = new Circuit();
      let w1 = c.wire();
      let w2 = c.wire();
      let w3 = c.wire();
      let w4 = c.wire();

      callback(c, w1, w2, w3, w4);

      statement[0] ? c.on(w1) : c.off(w1);
      statement[1] ? c.on(w2) : c.off(w2);

      assert.equal(c.state(w3), statement[2]);
      assert.equal(c.state(w4), statement[3]);
    });
  });
}

export function threeInTwoOut(table, callback) {
  table.forEach((statement) => {
    it(statement.join(' '), () => {
      let c = new Circuit();
      let w1 = c.wire();
      let w2 = c.wire();
      let w3 = c.wire();
      let w4 = c.wire();
      let w5 = c.wire();

      callback(c, w1, w2, w3, w4, w5);

      statement[0] ? c.on(w1) : c.off(w1);
      statement[1] ? c.on(w2) : c.off(w2);
      statement[2] ? c.on(w3) : c.off(w3);

      assert.equal(c.state(w4), statement[3]);
      assert.equal(c.state(w5), statement[4]);
    });
  });
}
