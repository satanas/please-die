// Sound Manager
// This sound manager is a wrapper done to work along with https://github.com/mneubrand/jsfxr.
// All sounds should be in the format used by jsfxr
var Sounds = function() {
  var _ = this;
  // Sounds array
  _.s = {};

  // Add sound
  // i: sound id
  // x: sound array
  _.a = function(i, x) {
    var p = new Audio();
    p.src = jsfxr(x);
    _.s[i] = p;
  };

  // Play
  _.p = function(i) {
    _.s[i].play();
  };
};

//Clear all sounds
