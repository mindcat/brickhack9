
let canvas = document.getElementById('canvas');
// canvas.width = window.innerWidth * 0.8;
// canvas.height = window.innerHeight * 0.8;

// zdog-demo.js


// var TAU, animate, illo, isSpinning, k, n, planet, planets, ref;

let TAU = Zdog.TAU;
  
// isSpinning = true;

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

// add circle
new Zdog.Ellipse({
    addTo: illo,
    diameter: 8,
    stroke: 2,
    color: '#636',
});

n = 0;

function animate() {
    for (k in planets) {
        planet = planets[k];
        planet.orbitAnchor.rotate.y -= TAU / planet.orbitPeriod / 5;
        if (planet.satelliteOf && planet.satelliteOf !== "sun") {
          planet.anchor.rotate.y += TAU / planets[planet.satelliteOf].orbitPeriod / 5;
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
