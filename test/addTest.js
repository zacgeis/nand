var assert = require('assert');
var helper = require('./helper');

var add = require('../lib/add');

describe('add', function() {
  it('17 + 22 = 39', function() {
    assert.equal(add(22, 17), 39);
  });
});
