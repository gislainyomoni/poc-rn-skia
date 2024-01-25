import { StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { Chart } from './src/Chart'

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Chart.Container height={400} domain={[-18, 22]} formatTick={(tick) => `${tick}°C`}>
          <Chart.Bars
            data={[
              { value: 17, name: 'Janvier' },
              { value: -11, name: 'Février' },
              { value: 22, name: 'Mars' },
              { value: -18, name: 'Avril' },
            ]}
            formatLabel={(value) => `${value > 0 ? '+' : ''}${value}°C`}
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
