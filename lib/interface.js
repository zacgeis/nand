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

function numToReversedPaddedBitsArray(num, length) {
  var bits = num.toString(2).split('').reverse();

  for(var i = length - bits.length; i > 0; i--) {
    bits.push('0');
  }

  return bits;
}

module.exports = {
  numToBin: numToBin,
  binToWires: binToWires,
  wiresToNum: wiresToNum,
  numToReversedPaddedBitsArray: numToReversedPaddedBitsArray
};
