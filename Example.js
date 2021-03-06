import React, { Component } from 'react'
import { View, Dimensions, TouchableWithoutFeedback } from 'react-native'
import Svg, { G, Line, Path, Rect, Text } from 'react-native-svg'

// d3 lib
import { scaleBand, scaleLinear } from 'd3-scale'
import { max, ticks } from 'd3-array'
import { line } from 'd3-shape'
import { path } from 'd3-path'

const colors = {
  black: 'black',
  blue: 'steelblue',
  brown: 'brown',
}

// create the barchart (http://bl.ocks.org/mbostock/3885304)
const data = [
  { frequency: 2, letter: 'a' },
  { frequency: 5, letter: 'b' },
  { frequency: 4, letter: 'c' },
  { frequency: 1, letter: 'd' },
  { frequency: 2, letter: 'e' },
  { frequency: 3, letter: 'f' },
]

class App extends Component {
  render() {
    return (
      <View>
        <BarChart />
      </View>
    )
  }
}

class BarChart extends Component {
  state = {
    barColor: data.map(() => colors.blue),
  }

  toggleHighlight(i) {
    this.setState({
      barColor: [
        ...this.state.barColor.slice(0, i),
        this.state.barColor[i] === colors.blue ? colors.brown : colors.blue,
        ...this.state.barColor.slice(i + 1),
      ],
    })
  }

  render() {
    const screen = Dimensions.get('window')
    const margin = { top: 50, right: 25, bottom: 200, left: 25 }
    const width = screen.width - margin.left - margin.right
    const height = screen.height - margin.top - margin.bottom
    const x = scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(data.map(d => d.letter))
    const maxFrequency = max(data, d => d.frequency)
    const y = scaleLinear().rangeRound([height, 0]).domain([0, maxFrequency])

    const firstLetterX = x(data[0].letter)
    const secondLetterX = x(data[1].letter)
    const lastLetterX = x(data[data.length - 1].letter)
    const labelDx = (secondLetterX - firstLetterX) / 2

    const bottomAxis = [firstLetterX - labelDx, lastLetterX + labelDx]
    const bottomAxisD = line().x(d => d + labelDx).y(() => 0)(bottomAxis)

    const leftAxis = ticks(0, maxFrequency, 5)
    const leftAxisD = line()
      .x(() => bottomAxis[0] + labelDx)
      .y(d => y(d) - height)(leftAxis)

    const notch = 5
    const labelDistance = 9

    const svg = (
      <Svg width={screen.width} height={screen.height}>
        <G translate={margin.left + ',' + margin.top}>
          <G translate={'0,' + height}>
            <G>
              <Path stroke={colors.black} d={bottomAxisD} />
              {data.map((d, i) => (
                <G key={i + 1} translate={x(d.letter) + labelDx + ',0'}>
                  <Line stroke={colors.black} y2={notch} />
                  <Text fill={colors.black} y={labelDistance}>{d.letter}</Text>
                </G>
              ))}
            </G>
            <G>
              <Path stroke={colors.black} d={leftAxisD} />
              {leftAxis.map((d, i) => (
                <G key={i + 1} translate={'0,' + (y(d) - height)}>
                  <Line stroke={colors.black} x1={notch} x2={labelDistance} />
                  <Text fill={colors.black} x={-labelDistance} y={-notch}>
                    {d}
                  </Text>
                </G>
              ))}
            </G>
            {data.map((d, i) => (
              <TouchableWithoutFeedback
                key={i}
                onPress={() => this.toggleHighlight(i)}
              >
                <Rect
                  x={x(d.letter)}
                  y={y(d.frequency) - height}
                  width={x.bandwidth()}
                  height={height - y(d.frequency)}
                  fill={this.state.barColor[i]}
                />
              </TouchableWithoutFeedback>
            ))}
          </G>
        </G>
      </Svg>
    )

    return svg
  }
}

export default App
