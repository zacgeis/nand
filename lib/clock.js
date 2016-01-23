function Clock(circuit, interval) {
  this.circuit = circuit;
  this.interval = interval;
  this.paused = true;
  this.state = false;
  this.wires = [];
}
Clock.prototype = {
  wire: function() {
    var w = this.circuit.wire();
    this.wires.push(w);
    return w;
  },
  start: function() {
    this.paused = false;
    setTimeout(this.tick.bind(this), this.interval);
  },
  stop: function() {
    this.paused = true;
  },
  tick: function() {
    if(!this.paused) {
      this.state = !this.state;
      for(var i = 0; i < this.wires.length; i++) {
        if(this.state) {
          this.circuit.on(this.wires[i]);
        } else {
          this.circuit.off(this.wires[i]);
        }
      }
      setTimeout(this.tick.bind(this), this.interval);
    }
  }
};

module.exports = Clock;
