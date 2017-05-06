import React from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'

import Graph from './components/Graph'

const BACKGROUND_COLOR = '#ff0000'
const HEIGHT = 200
const PADDING_HORIZONTAL = 20

const fakeData = [
  { letter: 'a', frequency: 2 },
  { letter: 'b', frequency: 4 },
  { letter: 'c', frequency: 1 },
  { letter: 'd', frequency: 6 },
  { letter: 'e', frequency: 3 },
]
const xAccessor = d => d.letter
const yAccessor = d => d.frequency

const { height, width } = Dimensions.get('screen')

const App = () => (
  <View style={styles.container}>
    <Graph
      width={width - PADDING_HORIZONTAL * 2}
      height={HEIGHT}
      bgColor={BACKGROUND_COLOR}
      data={fakeData}
      xAccessor={xAccessor}
      yAccessor={yAccessor}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
