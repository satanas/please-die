// Constants to define the value (v), time of effect (t), unique damage (d) and damage per second (ds) of traps
$.BL = {v: 1, t: 1200, d: 0.8, ds: 0.3}; // Bleeding
$.BU = {v: 2, t: 3000, d: 15, ds: 6}; // Burning
$.EL = {v: 4, t: 4800, d: 3, ds: 5}; // Electrocuting
$.PO = {v: 8, t: 3000, d: 2.5}; // Poisoning/Radiation
$.SH = {v: 16, t: 600, ds: 10}; // Shock
// Rainbow
$.RB = {
  v: 32,
  t: 5000,
  c: ['red', 'orange', 'yellow', 'limegreen', 'blue', 'blueviolet'],
  bg: "#ff9bd3"
};

$.WA = {v: 256}; // Water
$.TN = {v: 512, t: 0, d: 30}; // TNT
$.POT = 2000;

$.FD = 110; // Frame duration for animations (aprox 9 FPS)
