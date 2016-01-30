function Set(init) {
  this.array = [];
  this.appendArray(init);
}
Set.prototype = {
  appendSet: function(set) {
    this.appendArray(set.array);
  },
  appendArray: function(array) {
    for(var i = 0; i < array.length; i++) {
      this.add(array[i]);
    }
  },
  add: function(value) {
    if(this.array.indexOf(value) == -1) {
      this.array.push(value);
    }
  },
  get: function(i) {
    return this.array[i];
  },
  length: function() {
    return this.array.length;
  }
};

module.exports = Set;
