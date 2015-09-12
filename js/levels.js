var Levels = function() {
  var _ = this;
  // Possible colors for bg levels
  _.bgc = rnde(['#3c4763', '#543c63', '#633c47', '#3c633e', '#63523c']);
  // Levels definition
  // m: map
  // s: messages of the character
  // z: sensors
  _.l = {
    1: {
      "m": [
        ".......................................................................",
        "",
        "",
        "",
        "",
        "",
        "...................................................####................",
        "..................................######...##......####................",
        "........................################...###############....#########",
        "...@....................################...###############....#########",
        "########################################...############################",
        "########################################...############################",
        "########################################...############################",
        "########################################...############################",
        "########################################...############################",
      ],
      "s": [
        {
          t: ["Hi there!"],
          d: 1400
        },
        {
          t: ["Things here work", "slighly different"],
          d: 2200
        },
        {
          t: ["Still ARROWS to move", "and UP to jump"],
          d: 2300,
          w: 2000
        },
        {
          t: ["But your purpose..."],
          d: 2200,
          w: 2600
        },
        {
          t: ["Your purpose is to die"],
          d: 4000
        }
      ],
      e:[],
      l: 100,
      t: 60000
    },
    2: {
      "m": [
        "##############################################################################",
        "###..........................................................................#",
        "###..........................................................................#",
        "###............E.................................................F...........#",
        "###....##..###################....................E..............##..........#",
        "###........###################...................#####.......................#",
        "###...............############...............................#...............#",
        "#####...............##########...............................................#",
        "#####...............############...........R...............................E.#",
        "#######.............############........................####...............###",
        "#######.F...........############...E....................####...........F...###",
        "#########....###....#########################################....#############",
        "#########...........##########################################################",
        "###########.......############################################################",
        "###########.......############################################################",
        "................##############################################################",
        "..@.............##############################################################",
        "##############################################################################",
      ],
      "s": [
        {
          t:["Death is not", "always so easy"],
          d: 2500
        }
      ],
      "e": [
        {
          x: 13,
          y: 10,
          w: 3,
          h: 1,
          t: ["But there is fire"],
          d: 2000
        },
        {
          x: 11,
          y: 2,
          w: 3,
          h: 3,
          t: ["Also electricity"],
          d: 2000
        }
      ],
      l: 100,
      t: 60000
    },
    3: {
      "m": [
        ".............................................####",
        ".............................................####",
        ".............................................####",
        ".............................................####",
        ".............................................####",
        ".............................................####",
        ".......E.....F.....F...................F.....####",
        ".......#.....#.....#...........###====###....####",
        "...............................##########....####",
        "........................#..................######",
        "................................................#",
        "................................................#",
        "...............r..............r...........##....#",
        "..@.......................................##....#",
        "########SSSSS#######SSSSS##########SSSSS#########",
        "#################################################",
      ],
      "s": [
        {
          t: ["Let's sharpen the edges"],
          d: 2400
        }
      ],
      e:[],
      l: 100,
      t: 60000
    },
    4: {
      "m": [
        "..............................................##",
        "..............................................##",
        "..............................................##",
        "..............................................##",
        "..............................................##",
        "....F....===....@....===....F.................##",
        "..######.....#######.....######....####...#...##",
        "..######.....#######.....######....####.......##",
        "..######.......###.......######..............###",
        "...............###..........................####",
        ".............T.###.T................T.......####",
        "..............................................##",
        "....R...................R................##...##",
        ".E.............................E.........##.F.##",
        "####.....######SSS######.....######SSSS#########",
        "################################################",
      ],
      "s": [
        {
          t: ["Kaboom!"],
          d: 2400
        }
      ],
      e:[],
      l: 130,
      t: 90000
    },
    5: {
      "m": [
        "#########################################################################..............",
        "#########################################################################",
        "#########################################################################",
        "#########################################################################",
        "#########################################################################",
        "#########################################################################",
        "#########################################################################",
        "#########################################################################",
        "#########################################################################",
        "#########################################################################",
        "",
        ".........................................................................R.............",
        "............................................r........r.....r....r......................",
        ".@.F.====.SSSSSSS..F.====.SSSSSSF====.SSSSF.....SSSS.....E.....E....SSS.E..............",
        "##############################################################################........,",
      ],
      "s": [
        {
          t: ["Butchery"],
          d: 2400
        }
      ],
      e:[],
      l: 300
    },
  };
};
