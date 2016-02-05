var Set = require('./set');

function Circuit() {
  this.counter = 0;
  this.components = {};

  this.TRUE = this.wire();
  this.TRUE.state = true;

  this.FALSE = this.wire();
  this.FALSE.state = false;
}
Circuit.prototype = {
  wire: function() {
    var component = {
      type: 'wire',
      id: this.counter++,
      input: new Set([]),
      output: new Set([]),
      state: false
    };

    this.components[component.id] = component;

    return component;
  },
  wires: function(num) {
    var bundle= [];
    for(var i = 0; i < num; i++) {
      bundle.push(this.wire());
    }
    return bundle;
  },
  _singleGate: function(type, input1, input2, output1) {
    var component = {
      type: type,
      id: this.counter++,
      input: new Set([input1.id, input2.id]),
      output: new Set([output1.id]),
      state: false
    };

    input1.output.add(component.id);
    input2.output.add(component.id);
    output1.input.add(component.id);

    this.components[component.id] = component;

    this.touch(component);
    this.touch(output1);

    return component;
  },
  gate: function(type, input1, input2, output1) {
    if(input1 instanceof Array) {
      var l = input1.length;
      if(l !== input2.length || l !== output1.length) {
        throw new Error('size mismatch');
      }
      for(var i = 0; i < l; i++) {
        this._singleGate(type, input1[i], input2[i], output1[i]);
      }
    } else {
      this._singleGate(type, input1, input2, output1);
    }
  },
  nand: function(input1, input2, output1) {
    return this.gate('nand', input1, input2, output1);
  },
  propogate: function(component) {
    var descendants = component.output;

    while(descendants.array.length > 0) {
      var affected = new Set([]);
      for(var i = 0; i < descendants.array.length; i++) {
        var descendant = this.components[descendants.array[i]];
        var state = descendant.state;
        this.touch(descendant);
        if(descendant.state !== state) {
          affected.append(descendant.output.array);
        }
      }
      descendants = affected;
    }
  },
  touch: function(component) {
    if(component.type === 'wire') {
      component.state = this.components[component.input.array[0]].state;
    }

    if(component.type === 'nand') {
      var t1 = this.components[component.input.array[0]].state;
      var t2 = t1;
      if(component.input.array.length > 1) {
        t2 = this.components[component.input.array[1]].state;
      }
      component.state = !(t1 && t2);
    }
  },
  on: function(component) {
    component.state = true;
    this.propogate(component);
  },
  off: function(component) {
    component.state = false;
    this.propogate(component);
  },
  state: function(component) {
    return component.state;
  },
  log: function() {
    for(var i = 0; i < this.counter; i++) {
      var comp = this.components[i];
      console.log(
        comp.id +
        ': ' + comp.type +
        ' (' + comp.input.array.join(' ') +
        ' -> ' + comp.output.array.join(' ') +
        ')'
      );
    }
  }
};

module.exports = Circuit;
