"use strict";
var Timer = (function () {
    function Timer(circuit, interval) {
        this.circuit = null;
        this.interval = null;
        this.paused = true;
        this.state = false;
        this.circuit = circuit;
        this.interval = interval;
    }
    Timer.prototype.start = function () {
        this.paused = false;
        setTimeout(this.tick.bind(this), this.interval);
    };
    Timer.prototype.stop = function () {
        this.paused = true;
    };
    Timer.prototype.tick = function () {
        if (!this.paused) {
            this.circuit.tick();
            setTimeout(this.tick.bind(this), this.interval);
        }
    };
    return Timer;
}());
exports.Timer = Timer;
