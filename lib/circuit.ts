import { Component } from './component';

export class Circuit {
  private counter = 0;
  private components = {};
  private TRUE = null;
  private FALSE = null;
  private CLOCK = null;

  constructor() {
    this.TRUE = this.wire();
    this.TRUE.state = true;

    this.FALSE = this.wire();
    this.FALSE.state = false;

    this.CLOCK = this.wire();
  }

  public wire() {
    let component = new Component(this.counter++, 'wire');

    this.components[component.id] = component;

    return component;
  }

  public wires(num) {
    let bundle = [];
    for(let i = 0; i < num; i++) {
      bundle.push(this.wire());
    }
    return bundle;
  }

  public gate(type, input1, input2, output1) {
    let component = new Component(this.counter++, type);

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
  }

  public gates(type, input1, input2, output1) {
    if(input1 instanceof Array) {
      let l = input1.length;
      if(l !== input2.length || l !== output1.length) {
        throw new Error('size mismatch');
      }
      for(let i = 0; i < l; i++) {
        this.gate(type, input1[i], input2[i], output1[i]);
      }
    } else {
      this.gate(type, input1, input2, output1);
    }
  }

  public nand(input1, input2, output1) {
    return this.gates('nand', input1, input2, output1);
  }

  public propogate(component) {
    let descendants = component.output;

    while(descendants.length > 0) {
      let affected = [];
      for(let i = 0; i < descendants.length; i++) {
        let descendant = descendants[i];
        let state = descendant.state;
        this.touch(descendant);
        if(descendant.state !== state) {
          this._append(affected, descendant.output);
        }
      }
      descendants = affected;
      this.CLOCK.state = false;
    }
  }

  public touch(component) {
    if(component.type === 'wire') {
      component.state = component.input[0].state
    }

    if(component.type === 'nand') {
      let t1 = component.input[0].state;
      let t2 = t1;
      if(component.input.length > 1) {
        t2 = component.input[1].state;
      }
      component.state = !(t1 && t2);
    }
  }

  public on(component) {
    component.state = true;
    this.propogate(component);
  }

  public off(component) {
    component.state = false;
    this.propogate(component);
  }

  public state(component) {
    return component.state;
  }

  public clocks(l) {
    let bundle = [];
    for(let i = 0; i < l; i++) {
      bundle.push(this.CLOCK);
    }
    return bundle;
  }

  public tick() {
    this.on(this.CLOCK);
  }

  private _append(array1, array2) {
    for(let i = 0; i < array2.length; i++) {
      if(array1.indexOf(array2[i]) === -1) {
        array1.push(array2[i]);
      }
    }
  }
}
