var assert = require('assert');

var Circuit = require('../lib/circuit');

function twoInOneOut(table, callback) {
  table.forEach(function(statement) {
    it(statement.join(' '), function() {
      var c = new Circuit();
      var w1 = c.wire();
      var w2 = c.wire();
      var w3 = c.wire();

      callback(c, w1, w2, w3);

      statement[0] ? c.on(w1) : c.off(w1);
      statement[1] ? c.on(w2) : c.off(w2);

      assert.equal(c.state(w3), statement[2]);
    });
  });
}

function oneInOneOut(table, callback) {
  table.forEach(function(statement) {
    it(statement.join(' '), function() {
      var c = new Circuit();
      var w1 = c.wire();
      var w2 = c.wire();

      callback(c, w1, w2);

      statement[0] ? c.on(w1) : c.off(w1);

      assert.equal(c.state(w2), statement[1]);
    });
  });
}

function twoInTwoOut(table, callback) {
  table.forEach(function(statement) {
    it(statement.join(' '), function() {
      var c = new Circuit();
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

function threeInTwoOut(table, callback) {
  table.forEach(function(statement) {
    it(statement.join(' '), function() {
      var c = new Circuit();
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

module.exports = {
  oneInOneOut: oneInOneOut,
  twoInOneOut: twoInOneOut,
  twoInTwoOut: twoInTwoOut,
  threeInTwoOut: threeInTwoOut
};
