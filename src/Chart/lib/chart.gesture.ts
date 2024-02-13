import { Gesture } from 'react-native-gesture-handler'
import { useSharedValue } from 'react-native-reanimated'

import { useChart } from './chart.context'

const bound = (value: number, min: number, max: number) => {
  'worklet'
  return Math.min(Math.max(value, min), max)
}

export const useChartGesture = () => {
  const { scrollX, rangeX } = useChart()
  const [minX, maxX] = rangeX
  const startX = useSharedValue(0)
  const gesture = Gesture.Pan()
    .activateAfterLongPress(200)
    .onStart(({ x }) => {
      // haptics
      startX.value = bound(x, minX, maxX)
      scrollX.value = startX.value
    })
    .onUpdate(({ translationX }) => {
      const toValue = translationX + startX.value
      scrollX.value = bound(toValue, minX, maxX)
    })
    .onEnd(() => {
      // haptics
    })
  return gesture
}
