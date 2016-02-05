var gates = require('./gates');

function nand(c, in1, in2, out1) {
  for(var i = 0; i < in1.length; i++) {
    gates.nand(c, in1[i], in2[i], out1[i]);
  }
}

function or(c, in1, in2, out1) {
  for(var i = 0; i < in1.length; i++) {
    gates.or(c, in1[i], in2[i], out1[i]);
  }
}

function nor(c, in1, in2, out1) {
  for(var i = 0; i < in1.length; i++) {
    gates.nor(c, in1[i], in2[i], out1[i]);
  }
}

function not(c, in1, out1) {
  for(var i = 0; i < in1.length; i++) {
    gates.not(c, in1[i], out1[i]);
  }
}

function and(c, in1, in2, out1) {
  for(var i = 0; i < in1.length; i++) {
    gates.and(c, in1[i], in2[i], out1[i]);
  }
}

function xor(c, in1, in2, out1) {
  for(var i = 0; i < in1.length; i++) {
    gates.xor(c, in1[i], in2[i], out1[i]);
  }
}

function adder(c, in1, in2, carry, sum) {
  var hcarry = c.wire();
  gates.halfadder(c, in1[0], in2[0], hcarry, sum[0]);

  for(var i = 1; i < in1.length - 1; i++) {
    var tcarry = c.wire();
    gates.fulladder(c, in1[i], in2[i], hcarry, tcarry, sum[i]);
    hcarry = tcarry;
  }

  gates.fulladder(c, in1[in1.length - 1], in2[in2.length - 1], hcarry, carry, sum[sum.length -1]);
}

function numToBin(a) {
  return a.toString(2);
}

function binToWires(c, a, w) {
  a.split('').reverse().forEach(function(v, i) {
    v === '1' ? c.on(w[i]) : c.off(w[i]);
  });
}

function wiresToNum(c, w) {
  var bin = w.map(function(v, i) {
    return c.state(v) ? 1 : 0;
  }).reverse().join('');

  return parseInt(bin, 2);
}

module.exports = {
  nand: nand,
  and: and,
  xor: xor,
  not: not,
  or: or,
  nor: nor,
  adder: adder,
  numToBin: numToBin,
  binToWires: binToWires,
  wiresToNum: wiresToNum
};
