function Circuit() {
  this.counter = 0;
  this.components = {};

  this.TRUE = this.wire();
  this.TRUE.state = true;

  this.FALSE = this.wire();
  this.FALSE.state = false;

  this.CLOCK = this.wire();
}

Circuit.prototype = {
  wire: function() {
    var component = {
      type: 'wire',
      id: this.counter++,
      input: [],
      output: [],
      state: false
    };

    this.components[component.id] = component;

    return component;
  },
  gate: function(type, input1, input2, output1) {
    var component = {
      type: type,
      id: this.counter++,
      input: [input1.id, input2.id],
      output: [output1.id],
      state: false
    };

    add(input1.output, component.id);
    add(input2.output, component.id);
    add(output1.input, component.id);

    this.components[component.id] = component;

    this.touch(component);
    this.touch(output1);

    return component;
  },
  wires: function(num) {
    var bundle= [];
    for(var i = 0; i < num; i++) {
      bundle.push(this.wire());
    }
    return bundle;
  },
  gates: function(type, input1, input2, output1) {
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
  },
  nand: function(input1, input2, output1) {
    return this.gates('nand', input1, input2, output1);
  },
  propogate: function(component) {
    var descendants = component.output;

    while(descendants.length > 0) {
      var affected = [];
      for(var i = 0; i < descendants.length; i++) {
        var descendant = this.components[descendants[i]];
        var state = descendant.state;
        this.touch(descendant);
        if(descendant.state !== state) {
          append(affected, descendant.output);
        }
      }
      descendants = affected;
    }
  },
  touch: function(component) {
    if(component.type === 'wire') {
      component.state = this.components[component.input[0]].state;
    }

    if(component.type === 'nand') {
      var t1 = this.components[component.input[0]].state;
      var t2 = t1;
      if(component.input.length > 1) {
        t2 = this.components[component.input[1]].state;
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
  clock: function() {
    return this.CLOCK;
  },
  clocks: function(l) {
    var bundle = [];
    for(var i = 0; i < l; i++) {
      bundle.push(this.CLOCK);
    }
    return bundle;
  },
  tick: function() {
    this.on(this.CLOCK);
    this.off(this.CLOCK);
  },
  log: function() {
    for(var i = 0; i < this.counter; i++) {
      var comp = this.components[i];
      console.log(
        comp.id +
        ': ' + comp.type +
        ' (' + comp.input.join(' ') +
        ' -> ' + comp.output.join(' ') +
        ')'
      );
    }
  }
};

function append(array1, array2) {
  for(var i = 0; i < array2.length; i++) {
    add(array1, array2[i]);
  }
}

function add(array1, item) {
  if(array1.indexOf(item === -1)) {
    array1.push(item);
  }
}

module.exports = Circuit;
