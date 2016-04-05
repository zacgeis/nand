function Component(id, type) {
  this.id = id;
  this.type = type;
  this.input = [];
  this.output = [];
  this.state = false;
}

Component.prototype.addInput = function(component) {
  add(this.input, component);
};

Component.prototype.addOutput = function(component) {
  add(this.output, component);
};

function add(array, item) {
  if(array.indexOf(item) === -1) {
    array.push(item);
  }
}

module.exports = Component;
