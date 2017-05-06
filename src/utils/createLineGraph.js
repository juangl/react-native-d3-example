import { scaleLinear, scalePoint } from 'd3-scale'
import { line, area } from 'd3-shape'
import { extent } from 'd3-array'

const createScaleX = (data, xAccessor, width) =>
  scalePoint()
    .domain(data.map(mData => xAccessor(mData)))
    .rangeRound([0, width])

const createScaleY = (data, yAccesor, height) => {
  const extendY = extent(data, yAccesor)
  return scaleLinear().domain(extendY).rangeRound([height, 0])
}

const createAreaGraph = ({ data, xAccessor, yAccessor, width, height }) => {
  const scaleX = createScaleX(data, xAccessor, width)
  const scaleY = createScaleY(data, yAccessor, height)

  const lineShape = area()
    .x(d => scaleX(xAccessor(d)))
    .y(d => scaleY(yAccessor(d)))
    .y1(height)

  return {
    data,
    scale: {
      x: scaleX,
      y: scaleY,
    },
    path: lineShape(data),
    ticks: data.map(datum => {
      const xValue = xAccessor(datum)
      const yValue = yAccessor(datum)

      return {
        x: scaleX(xValue),
        y: scaleY(yValue),
        datum,
      }
    }),
  }
}

export default createAreaGraph
