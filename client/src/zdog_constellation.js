import { stars, catalog } from '@visnup/yale-bright-star-catalog'
import { nominative } from '@mbostock/star-map'

d3 = require('d3-color@2', 'd3-interpolate', 'd3-scale@3', 'd3-scale-chromatic@2')
Zdog = require('zdog@1')
{
    let element = DOM.canvas(width, width)
    element.style.backgroundColor = '#081f2b'
  
    let illo = new Zdog.Illustration({
      element,
      dragRotate: true,
      scale: { z: -1 },
      rotate: { z: -Math.PI / 2 },
    })
  
    for (const {xno, x, y, z, radius} of dots)
      new Zdog.Ellipse({
        addTo: illo,
        translate: {x, y, z},
        stroke: radius,
        color: catalog[xno-1].constellation === highlight ? 'white' : color(catalog[xno-1].bv),
      })

    
    dots = stars
    .map(d => ({ ...d, ...toRectangular(d), radius: radius(d.mag) }))
    .filter(d => d.radius > 0 && Math.sign(d.z) == hemisphere)

    toRectangular = ({ sra0: a, sdec0: d }) => {
        const r = width / 2.1
        return {
          x: r * Math.cos(d) * Math.cos(a),
          y: r * Math.cos(d) * Math.sin(a),
          z: r * Math.sin(d),
        }
      }
    
    radius = d3.scaleLinear([6, -1], [0, 8])

    color = d3.scaleSequential()
    .domain([1.4, -0.3])
    .interpolator(d3.interpolateLab(d3.hsl('hsl(0, 20%, 60%)'), d3.hsl('hsl(240, 20%, 60%)')))
    

    while (true) {
      illo.updateRenderGraph()
      // illo.rotate.z += 2 * Math.PI / 24 / 60 / 2 // 30s
      yield element
    }
  }

  