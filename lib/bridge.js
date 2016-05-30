"use strict";
function numToBin(a) {
    return a.toString(2);
}
exports.numToBin = numToBin;
function binToWires(c, a, w) {
    a.split('').reverse().forEach(function (v, i) {
        v === '1' ? c.on(w[i]) : c.off(w[i]);
    });
}
exports.binToWires = binToWires;
function wiresToNum(cir, wires) {
    var bin = wires.map(function (wire) {
        return cir.state(wire) ? 1 : 0;
    }).reverse().join('');
    return parseInt(bin, 2);
}
exports.wiresToNum = wiresToNum;
function numToReversedPaddedBitsArray(num, length) {
    var bits = num.toString(2).split('').reverse();
    for (var i = length - bits.length; i > 0; i--) {
        bits.push('0');
    }
    return bits;
}
exports.numToReversedPaddedBitsArray = numToReversedPaddedBitsArray;
function matchWireSize(c, a) {
    if (a instanceof Array) {
        return c.wires(a.length);
    }
    return c.wire();
}
exports.matchWireSize = matchWireSize;
function matchClockSize(c, a) {
    if (a instanceof Array) {
        return c.clocks(a.length);
    }
    return c.clock();
}
exports.matchClockSize = matchClockSize;
function fanWireToMatchSize(w, a) {
    var bundle = [];
    if (a instanceof Array) {
        for (var i = 0; i < a.length; i++) {
            bundle.push(w);
        }
        return bundle;
    }
    return w;
}
exports.fanWireToMatchSize = fanWireToMatchSize;
function wiresToStateArray(cir, wires) {
    return wires.reverse().map(function (wire) {
        return cir.state(wire) ? 1 : 0;
    });
}
exports.wiresToStateArray = wiresToStateArray;
function stateArrayToWires(cir, wires, state) {
    wires.reverse().map(function (wire, index) {
        state[index] ? cir.on(wire) : cir.off(wire);
    });
}
exports.stateArrayToWires = stateArrayToWires;
