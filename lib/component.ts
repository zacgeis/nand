// TODO: Add type annotations
// TODO: change type to kind.
// TODO: Make wire a subclass of component
// TODO: move to use binary literal

export class Component {
  public id: number = null;
  private type: string = null;
  private input: Array<Component> = [];
  private output: Array<Component> = [];
  private state: boolean = false;

  constructor(id: number, type: string) {
    this.id = id;
    this.type = type;
  }

  public addInput(component: Component): void {
    this._add(this.input, component);
  }

  public addOutput(component: Component): void {
    this._add(this.output, component);
  }

  private _add(array: Array<any>, item: any): void {
    if(array.indexOf(item) === -1) {
      array.push(item);
    }
  }
}
