export class Clock {
  private circuit = null;
  private interval = null;
  private paused = true;
  private state = false;

  constructor(circuit, interval) {
    this.circuit = circuit;
    this.interval = interval;
  }

  public start() {
    this.paused = false;
    setTimeout(this.tick.bind(this), this.interval);
  }

  public stop() {
    this.paused = true;
  }

  public tick() {
    if(!this.paused) {
      this.circuit.tick();
      setTimeout(this.tick.bind(this), this.interval);
    }
  }
}
