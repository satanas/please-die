var Scene = function() {
  // Time-related variables and methods
  this.t = {
    s: 0, // Start time
    e: 0 // Elapsed time
  };
};

Scene.prototype.loop = function() {
  var _ = this;
  console.log(_.name);
  // Calculate elapsed time
  _.t.e = (_.t.s !== 0) ? new Date() - _.t.s : 0;
  // Update scene
  _.u();
  // Set start time
  _.t.s = new Date();
  raf(_.loop.bind(_));
};
