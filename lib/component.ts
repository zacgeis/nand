export abstract class Component {
  public input: Array<Component> = [];
  public output: Array<Component> = [];
  public state: boolean = false;

  public constructor() {}

  public addInput(component: Component): void {
    this._add(this.input, component);
  }

  public addOutput(component: Component): void {
    this._add(this.output, component);
  }

  public propogate(): void {
    let descendants = this.output;

    while(descendants.length > 0) {
      let affected = [];
      for(let i = 0; i < descendants.length; i++) {
        let descendant = descendants[i];
        let state = descendant.state;
        descendant.touch();
        if(descendant.state !== state) {
          this._append(affected, descendant.output);
        }
      }
      descendants = affected;
      this.propogateHook();
    }
  }

  public on(): void {
    this.state = true;
    this.propogate();
  }

  public off(): void {
    this.state = false;
    this.propogate();
  }

  public abstract touch(): void;

  protected propogateHook(): void {}

  private _add(array: Array<any>, item: any): void {
    if(array.indexOf(item) === -1) {
      array.push(item);
    }
  }

  private _append(array1: Array<any>, array2: Array<any>): void {
    for(let i = 0; i < array2.length; i++) {
      if(array1.indexOf(array2[i]) === -1) {
        array1.push(array2[i]);
      }
    }
  }
}

export class Wire extends Component {
  public constructor() {
    super();
  }

  public touch(): void {
    this.state = this.input[0].state;
  }

  public static bundle(size: number): Array<Wire> {
    let wires = [];
    for(let i = 0; i < size; i++) {
      wires.push(new Wire());
    }
    return wires;
  }
}

export class Clock extends Component {
  public constructor() {
    super();
  }

  public touch(): void {
    this.state = true;
  }

  protected propogateHook(): void {
    this.state = false;
  }
}

export class Nand extends Component {
  public constructor(input1, input2, output1) {
    super();

    this.addInput(input1);
    this.addInput(input2);
    this.addOutput(output1);

    input1.addOutput(this);
    input2.addOutput(this);
    output1.addInput(this);

    this.touch();
    output1.touch();
  }

  public touch(): void {
    let t1 = this.input[0].state;
    let t2 = t1;
    if(this.input.length > 1) {
      t2 = this.input[1].state;
    }
    this.state = !(t1 && t2);
  }
}

