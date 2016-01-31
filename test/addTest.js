var assert = require('assert');
var helper = require('./helper');

var compose = require('../lib/compose');
var Circuit = require('../lib/circuit');

var add = require('../lib/add');

describe('adder', function () {
  it('1 + 1 = 2', function() {
    var c = new Circuit();

    var in1 = c.wires(8);
    var in2 = c.wires(8);
    var carry = c.wire();
    var sum = c.wires(8);

    compose.adder(c, in1, in2, carry, sum);

    c.on(in1[0]);
    c.on(in2[0]);

    assert.equal(c.state(sum[0]), false);
    assert.equal(c.state(sum[1]), true);
  });
  it('overflows correctly', function() {
    var c = new Circuit();

    var in1 = c.wires(8);
    var in2 = c.wires(8);
    var carry = c.wire();
    var sum = c.wires(8);

    compose.adder(c, in1, in2, carry, sum);

    c.on(in1[7]);
    c.on(in2[7]);

    assert.equal(c.state(sum[7]), false);
    assert.equal(c.state(carry), true);
  });
});
describe('add', function() {
  it('17 + 22 = 39', function() {
    assert.equal(add(22, 17), 39);
  });
});
