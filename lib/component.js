"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Component = (function () {
    function Component() {
        this.input = [];
        this.output = [];
        this.state = false;
    }
    Component.prototype.addInput = function (component) {
        this._add(this.input, component);
    };
    Component.prototype.addOutput = function (component) {
        this._add(this.output, component);
    };
    Component.prototype.propogate = function () {
        var descendants = this.output;
        while (descendants.length > 0) {
            var affected = [];
            for (var i = 0; i < descendants.length; i++) {
                var descendant = descendants[i];
                var state = descendant.state;
                descendant.touch();
                if (descendant.state !== state) {
                    this._append(affected, descendant.output);
                }
            }
            descendants = affected;
            this.propogateHook();
        }
    };
    Component.prototype.on = function () {
        this.state = true;
        this.propogate();
    };
    Component.prototype.off = function () {
        this.state = false;
        this.propogate();
    };
    Component.prototype.propogateHook = function () { };
    Component.prototype._add = function (array, item) {
        if (array.indexOf(item) === -1) {
            array.push(item);
        }
    };
    Component.prototype._append = function (array1, array2) {
        for (var i = 0; i < array2.length; i++) {
            if (array1.indexOf(array2[i]) === -1) {
                array1.push(array2[i]);
            }
        }
    };
    return Component;
}());
exports.Component = Component;
var Wire = (function (_super) {
    __extends(Wire, _super);
    function Wire() {
        _super.call(this);
    }
    Wire.prototype.touch = function () {
        this.state = this.input[0].state;
    };
    Wire.bundle = function (size) {
        var wires = [];
        for (var i = 0; i < size; i++) {
            wires.push(new Wire());
        }
        return wires;
    };
    return Wire;
}(Component));
exports.Wire = Wire;
var Clock = (function (_super) {
    __extends(Clock, _super);
    function Clock() {
        _super.call(this);
    }
    Clock.prototype.touch = function () {
        this.state = true;
    };
    Clock.prototype.propogateHook = function () {
        this.state = false;
    };
    return Clock;
}(Component));
exports.Clock = Clock;
var Nand = (function (_super) {
    __extends(Nand, _super);
    function Nand(input1, input2, output1) {
        _super.call(this);
        this.addInput(input1);
        this.addInput(input2);
        this.addOutput(output1);
        input1.addOutput(this);
        input2.addOutput(this);
        output1.addInput(this);
        this.touch();
        output1.touch();
    }
    Nand.prototype.touch = function () {
        var t1 = this.input[0].state;
        var t2 = t1;
        if (this.input.length > 1) {
            t2 = this.input[1].state;
        }
        this.state = !(t1 && t2);
    };
    return Nand;
}(Component));
exports.Nand = Nand;
