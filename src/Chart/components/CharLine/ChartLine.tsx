import { Skia, Path, Group, Circle } from '@shopify/react-native-skia'
import { memo, useMemo } from 'react'
import { useDerivedValue } from 'react-native-reanimated'

import { IChartLineProps } from './ChartLine.props'
import { useChart } from '../../lib/chart.context'

export const ChartLine = memo<IChartLineProps>(({ data }) => {
  const { scaleY, scaleX, scrollX, invertX, domainX } = useChart()

  const path = useMemo(() => {
    const result = Skia.Path.Make()
    let hasInitialized = false
    for (const { x, y } of data) {
      if (!hasInitialized) {
        result.moveTo(scaleX(x), scaleY(y))
        hasInitialized = true
        continue
      }
      result.lineTo(scaleX(x), scaleY(y))
    }
    return result
  }, [data, scaleX, scaleY])

  const [minX, maxX] = domainX
  const progress = useDerivedValue(
    () => 1 - (invertX(scrollX.value) - maxX) / (minX - maxX),
    [scrollX, invertX, maxX, minX]
  )

  return (
    <Group strokeWidth={2} style="stroke">
      <Path path={path} color="#1450B9" start={0} end={progress} />
      <Path path={path} color="#1450B920" start={progress} end={1} />
      <Circle r={10} cx={scrollX} cy={100} color="green" style="fill" />
    </Group>
  )
})
