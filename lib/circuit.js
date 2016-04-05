var Component = require('./component');

function Circuit() {
  this.counter = 0;
  this.components = {};

  this.TRUE = this.wire();
  this.TRUE.state = true;

  this.FALSE = this.wire();
  this.FALSE.state = false;

  this.CLOCK = this.wire();
}

Circuit.prototype.wire = function() {
  var component = new Component(this.counter++, 'wire');

  this.components[component.id] = component;

  return component;
};

Circuit.prototype.wires = function(num) {
  var bundle = [];
  for(var i = 0; i < num; i++) {
    bundle.push(this.wire());
  }
  return bundle;
};

Circuit.prototype.gate = function(type, input1, input2, output1) {
  var component = new Component(this.counter++, type);

  component.addInput(input1);
  component.addInput(input2);
  component.addOutput(output1);

  input1.addOutput(component);
  input2.addOutput(component);
  output1.addInput(component);

  this.components[component.id] = component;

  this.touch(component);
  this.touch(output1);

  return component;
};

Circuit.prototype.gates = function(type, input1, input2, output1) {
  if(input1 instanceof Array) {
    var l = input1.length;
    if(l !== input2.length || l !== output1.length) {
      throw new Error('size mismatch');
    }
    for(var i = 0; i < l; i++) {
      this.gate(type, input1[i], input2[i], output1[i]);
    }
  } else {
    this.gate(type, input1, input2, output1);
  }
};

Circuit.prototype.nand = function(input1, input2, output1) {
  return this.gates('nand', input1, input2, output1);
};

Circuit.prototype.propogate = function(component) {
  var descendants = component.output;

  while(descendants.length > 0) {
    var affected = [];
    for(var i = 0; i < descendants.length; i++) {
      var descendant = descendants[i];
      var state = descendant.state;
      this.touch(descendant);
      if(descendant.state !== state) {
        append(affected, descendant.output);
      }
    }
    descendants = affected;
    this.CLOCK.state = false;
  }
};

Circuit.prototype.touch = function(component) {
  if(component.type === 'wire') {
    component.state = component.input[0].state
  }

  if(component.type === 'nand') {
    var t1 = component.input[0].state;
    var t2 = t1;
    if(component.input.length > 1) {
      t2 = component.input[1].state;
    }
    component.state = !(t1 && t2);
  }
};

Circuit.prototype.on = function(component) {
  component.state = true;
  this.propogate(component);
};

Circuit.prototype.off = function(component) {
  component.state = false;
  this.propogate(component);
};

Circuit.prototype.state = function(component) {
  return component.state;
};

Circuit.prototype.clocks = function(l) {
  var bundle = [];
  for(var i = 0; i < l; i++) {
    bundle.push(this.CLOCK);
  }
  return bundle;
};

Circuit.prototype.tick = function() {
  this.on(this.CLOCK);
};

function append(array1, array2) {
  for(var i = 0; i < array2.length; i++) {
    if(array1.indexOf(array2[i]) === -1) {
      array1.push(array2[i]);
    }
  }
}

module.exports = Circuit;
