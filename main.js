function Wire() {
  this._state = false;
  this._out = null;
}
Wire.prototype = {
  state: function() {
    return this._state;
  },
  changeState: function(newState) {
    this._state = newState
    if(this._out !== null) {
      this._out.changeState(this._state);
    }
  },
  on: function() {
    this.changeState(true);
  },
  off: function() {
    this.changeState(false);
  },
  output: function(wire) {
    this._out = wire;
  }
};
function wire() {
  return new Wire();
}
function Nand(in1, in2, out1) {
  this._in1 = in1;
  this._in2 = in2;
  this._out1 = out1;

  this._in1.output(this);
  this._in2.output(this);

  this.changeState();
}
Nand.prototype = {
  changeState: function() {
    var a = this._in1.state();
    var b = this._in2.state();
    this._out1.changeState(!(a && b));
  },
};
function nand(in1, in2, out1) {
  return new Nand(in1, in2, out1);
}

// --

function or(in1, in2, out1) {
  var e = wire();
  var f = wire();

  nand(in1, in1, e);
  nand(in2, in2, f);
  nand(e, f, out1);
}

function main() {
  var a = wire();
  var b = wire();
  var c = wire();

  var original = a;

  var gateCount = 1000;
  for(var i = 0; i < gateCount; i++) {
    or(a, b, c);
    a = c;
    b = wire();
    c = wire();
  }

  original.on();
  console.log(a.state());
}

main();
