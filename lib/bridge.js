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

function matchWireSize(c, a) {
  if(a instanceof Array) {
    return c.wires(a.length);
  }
  return c.wire();
}

function matchClockSize(c, a) {
  if(a instanceof Array) {
    return c.clocks(a.length);
  }
  return c.clock();
}

function fanWireToMatchSize(w, a) {
  var bundle = [];

  if(a instanceof Array) {
    for(var i = 0; i < a.length; i++) {
      bundle.push(w);
    }

    return bundle;
  }

  return w;
}

module.exports = {
  numToBin: numToBin,
  binToWires: binToWires,
  wiresToNum: wiresToNum,
  numToReversedPaddedBitsArray: numToReversedPaddedBitsArray,
  matchWireSize: matchWireSize,
  matchClockSize: matchClockSize,
  fanWireToMatchSize: fanWireToMatchSize
};