function or(c, in1, in2, out1) {
  var a = c.wire();
  var b = c.wire();

  c.nand(in1, in1, a);
  c.nand(in2, in2, b);
  c.nand(a, b, out1);
}

function nor(c, in1, in2, out1) {
  var a = c.wire();

  or(c, in1, in2, a);
  c.nand(a, a, out1);
}

module.exports = {
  or: or,
  nor: nor
};
