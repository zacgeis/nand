"use strict";
var Clock = (function () {
    function Clock(circuit, interval) {
        this.circuit = null;
        this.interval = null;
        this.paused = true;
        this.state = false;
        this.circuit = circuit;
        this.interval = interval;
    }
    Clock.prototype.start = function () {
        this.paused = false;
        setTimeout(this.tick.bind(this), this.interval);
    };
    Clock.prototype.stop = function () {
        this.paused = true;
    };
    Clock.prototype.tick = function () {
        if (!this.paused) {
            this.circuit.tick();
            setTimeout(this.tick.bind(this), this.interval);
        }
    };
    return Clock;
}());
exports.Clock = Clock;
