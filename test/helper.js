var assert = require('assert');

var Circuit = require('../lib/circuit');

function basicLogicGate(table, callback) {
  table.forEach(function(statement) {
    it('outputs ' + statement[2] + ' when given ' + statement[0] + ' and ' + statement[1], function() {
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

module.exports = {
  basicLogicGate: basicLogicGate
};
