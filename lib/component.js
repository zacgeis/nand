function Component(id, type) {
  this.id = id;
  this.type = type;
  this.input = [];
  this.output = [];
  this.state = false;
}

Component.prototype.addInput = function(component) {
  this.input.push(component);
};

Component.prototype.addOutput = function(component) {
  this.output.push(component);
};

module.exports = Component;
