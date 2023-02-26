// let canvas = document.getElementById('canvas');
// var csv = require('jquery-csv');
// canvas.width = window.innerWidth * 0.8;
// canvas.height = window.innerHeight * 0.8;

// zdog-demo.js


// var TAU, animate, illo, isSpinning, k, n, planet, planets, ref;

let TAU = Zdog.TAU;
  
// isSpinning = true;

function coordinates(ra, dec) {
    var cosRA = Math.cos(ra * Math.PI / 180.0);
    var sinRA = Math.sin(ra * Math.PI / 180.0);
    var cosDec = Math.cos(dec * Math.PI / 180.0);
    var sinDec = Math.sin(dec * Math.PI / 180.0);
    var rad = 500.0;
    x = rad * cosRA * cosDec;
    y = rad * cosRA * sinDec;
    z = rad * sinRA;
    return [x, y, z];
}

let illo = new Zdog.Illustration({
  element: ".zdog-canvas",
  dragRotate: true,
  rotate: {
    y: TAU / 16,
    x: -TAU / 16
  },
//   resize: "fullscreen",
  onDragStart: function() {
    isSpinning = false;
  },
  zoom: 15,
  onResize: function() {
    var zoom;
    zoom = innerWidth / 400;
    this.zoom = zoom < 10 && 10 || zoom;
  }
});

let stars = [[0.02662528,-77.06529438],[-3.02747891,125.31328320802],[18.40287397,-34.3843146],[14.66094188,-60.83947139]]
// [[1,,0.02662528,-77.06529438,67.7048070412999,4.78,0.62690246,K],[2,,0.03039927,-3.02747891,125.31328320802,5.13,-0.35998553,B],[3,,0.03266433,-6.01397169,127.226463104326,4.37,-1.1528872,M],[4,,0.03886504,-29.72044805,156.25,5.04,-0.92910016,B],[5,,0.06232565,-17.33597002,69.8812019566736,4.55,0.32819816,B],[6,,0.07503398,-10.50949443,492.610837438424,4.99,-3.4725199,K]]

planets = {
    sun: {
      diameter: 8,
      color: "#eb710b",
      orbitDiameter: 0
    },
    mercury: {
      diameter: 1,
      color: "#ada8a5",
      orbitDiameter: 12,
      orbitPeriod: 88,
      orbitTilt: -TAU * .019,
      orbitNode: -TAU * .314,
      satelliteOf: "sun"
    },
    venus: {
      diameter: 1.5,
      color: "#c18f17",
      orbitDiameter: 16,
      orbitPeriod: 225,
      orbitTilt: -TAU * .009,
      orbitNode: -TAU * .213,
      satelliteOf: "sun"
    },
    earth: {
      diameter: 2,
      color: "#4f4cb0",
      orbitDiameter: 21,
      orbitPeriod: 365,
      satelliteOf: "sun"
    },
    mars: {
      diameter: 1.25,
      color: "#bc420e",
      orbitDiameter: 26,
      orbitPeriod: 687,
      orbitTilt: -TAU * .005,
      orbitNode: -TAU * .138,
      satelliteOf: "sun"
    },
    jupiter: {
      diameter: 4,
      color: "#ddbca6",
      orbitDiameter: 40,
      orbitPeriod: 4333,
      orbitTilt: -TAU * .004,
      orbitNode: -TAU * .279,
      satelliteOf: "sun"
    },
    saturn: {
      diameter: 3,
      color: "#dcba7a",
      orbitDiameter: 56,
      orbitPeriod: 10759,
      orbitTilt: -TAU * .007,
      orbitNode: -TAU * .316,
      satelliteOf: "sun"
    },
    uranus: {
      diameter: 2.75,
      color: "#8fc7ea",
      orbitDiameter: 72,
      orbitPeriod: 30689,
      orbitTilt: -TAU * .002,
      orbitNode: -TAU * .206,
      satelliteOf: "sun"
    },
    neptune: {
      diameter: 2.5,
      color: "#3d52b5",
      orbitDiameter: 88,
      orbitPeriod: 60182,
      orbitTilt: -TAU * .005,
      orbitNode: -TAU * .366,
      satelliteOf: "sun"
    },
    pluto: {
      diameter: .5,
      color: "#92816d",
      orbitDiameter: 106,
      orbitPeriod: 90560,
      orbitTilt: -TAU * .048,
      orbitNode: -TAU * .306,
      orbitTranslateZ: -5,
      satelliteOf: "sun"
    },
    moon: {
      diameter: .5,
      color: "#d6d6d6",
      orbitDiameter: 3,
      orbitPeriod: 27,
      orbitTilt: -TAU * .065,
      orbitNode: -TAU * .347,
      satelliteOf: "earth"
    },
    io: {
      diameter: .5,
      color: "#eae565",
      orbitDiameter: 5,
      orbitPeriod: 1,
      orbitTilt: 0,
      satelliteOf: "jupiter"
    },
    europa: {
      diameter: .5,
      color: "#9c7e5c",
      orbitDiameter: 6.5,
      orbitPeriod: 4,
      orbitTilt: -TAU * .001,
      satelliteOf: "jupiter"
    },
    ganymede: {
      diameter: .75,
      color: "#a1907e",
      orbitDiameter: 8,
      orbitPeriod: 7,
      orbitTilt: -TAU * .001,
      satelliteOf: "jupiter"
    },
    callisto: {
      diameter: .5,
      color: "#4a4e4f",
      orbitDiameter: 10,
      orbitPeriod: 17,
      orbitTilt: -TAU * .01,
      satelliteOf: "jupiter"
    }
  };

  for (k in planets) {
    planet = planets[k];
    planet.anchor = new Zdog.Anchor({
      addTo: ((ref = planets[planet.satelliteOf]) != null ? ref.planet : void 0) || illo,
      translate: {
        z: planet.orbitTranslateZ
      },
      rotate: {
        y: planet.orbitNode,
        z: planet.orbitTilt
      }
    });
    planet.orbitAnchor = new Zdog.Anchor({
      addTo: planet.anchor
    });
    if (planet.orbitDiameter) {
      planet.orbit = new Zdog.Ellipse({
        addTo: planet.orbitAnchor,
        diameter: planet.orbitDiameter,
        quarters: 1,
        rotate: {
          x: TAU / 4
        },
        stroke: .1,
        color: "#fff4"
      });
      planet.orbit.copy().rotate.z = TAU * .25;
      planet.orbit.copy().rotate.z = TAU * .5;
      planet.orbit.copy().rotate.z = TAU * .75;
    }
    planet.planet = new Zdog.Shape({
      addTo: planet.orbitAnchor,
      translate: {
        x: planet.orbitDiameter / 2
      },
      stroke: planet.diameter,
      color: planet.color
    });
  }

// create illo
// let illo = new Zdog.Illustration({
//     // set canvas with selector
//     element: '.zdog-canvas',
//     dragRotate: true,
// });
for (star in stars) {
    var [x, y, z] = coordinates(star[0], star[1]);
    // if (x < 125 || y < 125 || z < 125 ) {
    //     x = x*25;
    //     z = z*25;
    //     y = y*25;
    // }
    // add star
    new Zdog.Shape({
        addTo: illo,
        translate: {x: x, y: y, z: z},
        diameter: 10,
        stroke: 2,
        color: '#ffffff',
    });

}

n = 0;

function animate() {
    for (k in planets) {
        planet = planets[k];
        planet.orbitAnchor.rotate.y -= TAU / planet.orbitPeriod / 5;
        if (planet.satelliteOf && planet.satelliteOf !== "sun") {
          planet.anchor.rotate.y += TAU / planets[planet.satelliteOf].orbitPeriod / 365;
        }
    }
    // rotate illo each frame
    // illo.rotate.y += 0.03;
    illo.updateRenderGraph();
    // n++;
    // animate next frame
    requestAnimationFrame( animate );
}
// start animation
animate();
