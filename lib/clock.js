function Clock(circuit, interval) {
  this.circuit = circuit;
  this.interval = interval;
  this.paused = true;
  this.state = false;
}

Clock.prototype = {
  start: function() {
    this.paused = false;
    setTimeout(this.tick.bind(this), this.interval);
  },
  stop: function() {
    this.paused = true;
  },
  tick: function() {
    if(!this.paused) {
      this.circuit.tick();
      setTimeout(this.tick.bind(this), this.interval);
    }
  }
};

module.exports = Clock;
