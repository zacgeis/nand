// TODO: change type to kind.
// TODO: Make wire a subclass of component
// TODO: move to use let
// TODO: move to use binary literal
"use strict";
var Component = (function () {
    function Component(id, type) {
        this.id = null;
        this.type = null;
        this.input = [];
        this.output = [];
        this.state = false;
        this.id = id;
        this.type = type;
    }
    Component.prototype.addInput = function (component) {
        this._add(this.input, component);
    };
    Component.prototype.addOutput = function (component) {
        this._add(this.output, component);
    };
    Component.prototype._add = function (array, item) {
        if (array.indexOf(item) === -1) {
            array.push(item);
        }
    };
    return Component;
}());
exports.Component = Component;
