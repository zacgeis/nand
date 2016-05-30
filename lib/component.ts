export class Component {
  public id = null;
  private type = null;
  private input = [];
  private output = [];
  private state = false;

  constructor(id, type) {
    this.id = id;
    this.type = type;
  }

  public addInput(component) {
    this._add(this.input, component);
  }

  public addOutput(component) {
    this._add(this.output, component);
  }

  private _add(array, item) {
    if(array.indexOf(item) === -1) {
      array.push(item);
    }
  }
}
