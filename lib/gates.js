function nand(c, in1, in2, out1) {
  c.nand(in1, in2, out1);
}

function or(c, in1, in2, out1) {
  var a = c.wire();
  var b = c.wire();

  nand(c, in1, in1, a);
  nand(c, in2, in2, b);
  nand(c, a, b, out1);
}

function nor(c, in1, in2, out1) {
  var a = c.wire();

  or(c, in1, in2, a);
  nand(c, a, a, out1);
}

function not(c, in1, out1) {
  nand(c, in1, in1, out1);
}

function and(c, in1, in2, out1) {
  var a = c.wire();
  nand(c, in1, in2, a);
  not(c, a, out1);
}

function xor(c, in1, in2, out1) {
  var a = c.wire();
  var b = c.wire();
  var w = c.wire();

  nand(c, in1, in2, a);
  nand(c, in1, a, b);
  nand(c, in2, a, w);
  nand(c, b, w, out1);
}

function srlatch(c, s, r, q, qp) {
  nor(c, s, qp, q);
  nor(c, r, q, qp);
}

module.exports = {
  nand: nand,
  and: and,
  xor: xor,
  not: not,
  or: or,
  nor: nor,
  srlatch: srlatch
};
