var BGM = function() {
  this.api = new API();
};

BGM.prototype = {
  search: function(term) {
    this.api.startBuffer(term);
  },

  play: function() {
  },
  pause: function() {
  },
  resume: function() {
  },
  stop: function() {
  },
  next: function() {
  },
  prev: function() {
  }
};
