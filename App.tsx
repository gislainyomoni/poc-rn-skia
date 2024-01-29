import { StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { Chart } from './src/Chart'

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Chart.Container
          height={400}
          domainY={[-18, 22]}
          domainX={[100, 300]}
          formatTick={(tick) => `${tick}°C`}
        >
          {/* <Chart.Bars
            data={[
              { value: 17, name: 'Janvier' },
              { value: -11, name: 'Février' },
              { value: 22, name: 'Mars' },
              { value: -18, name: 'Avril' },
              { value: 10, name: 'Mai' },
            ]}
            formatLabel={(value) => `${value > 0 ? '+' : ''}${value}°C`}
          /> */}
          {/* <Chart.Line
            data={[
              { y: 17, x: 100 },
              { y: -11, x: 150 },
              { y: 22, x: 200 },
              { y: -18, x: 270 },
              { y: 10, x: 300 },
            ]}
          /> */}
          <Chart.Area
            data={[
              { y1: 17, y2: 20, x: 100 },
              { y1: -11, y2: 5, x: 150 },
              { y1: 5, y2: 10, x: 200 },
              { y1: -18, y2: 0, x: 270 },
              { y1: 10, y2: 20, x: 300 },
            ]}
          />
        </Chart.Container>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3ED',
    justifyContent: 'center',
  },
})
