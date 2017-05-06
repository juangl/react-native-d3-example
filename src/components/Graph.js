import React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { G, Path, Rect } from 'react-native-svg'

import createLineGraph from '../utils/createLineGraph'

const PADDING = 20
const FULL_PADDING_SIZE = PADDING * 2
const STROKE_COLOR = '#ffffff'
const FILL_COLOR = '#000'
const TICK_SIZE = 7

const Graph = ({ width, height, bgColor, data, xAccessor, yAccessor }) => {
  const graphWidth = width - FULL_PADDING_SIZE
  const graphHeight = height - FULL_PADDING_SIZE

  const lineGraph = createLineGraph({
    data,
    xAccessor,
    yAccessor,
    width: graphWidth,
    height: graphHeight,
  })

  return (
    <View
      style={[styles.container, { backgroundColor: bgColor, width, height }]}
    >
      <Svg width={width} height={height}>
        <G x={PADDING} y={PADDING}>
          <G>
            <Path d={lineGraph.path} fill={FILL_COLOR} fillOpacity="0.3" />
          </G>
          <G>
            {lineGraph.ticks.map((tick, index) => (
              <Rect
                key={index}
                x={tick.x - TICK_SIZE / 2}
                y={tick.y - TICK_SIZE / 2}
                width={TICK_SIZE}
                height={TICK_SIZE}
                fill="white"
              />
            ))}
          </G>
        </G>
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default Graph
