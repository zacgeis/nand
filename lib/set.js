function Set(init) {
  this.array = [];
  this.append(init);
}
Set.prototype = {
  append: function(array) {
    for(var i = 0; i < array.length; i++) {
      this.add(array[i]);
    }
  },
  add: function(value) {
    if(this.array.indexOf(value) == -1) {
      this.array.push(value);
    }
  }
};

module.exports = Set;
