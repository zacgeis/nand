function Clock(circuit, interval) {
  this.circuit = circuit;
  this.interval = interval;
  this.paused = true;
  this.state = false;
}

Clock.prototype.start = function() {
  this.paused = false;
  setTimeout(this.tick.bind(this), this.interval);
};

Clock.prototype.stop = function() {
  this.paused = true;
};

Clock.prototype.tick = function() {
  if(!this.paused) {
    this.circuit.tick();
    setTimeout(this.tick.bind(this), this.interval);
  }
};

module.exports = Clock;
