import { Skia, Path } from '@shopify/react-native-skia'
import { memo, useMemo } from 'react'

import { IChartLineProps } from './ChartLine.props'
import { useChart } from '../../lib/chart.context'

export const ChartLine = memo<IChartLineProps>(({ data }) => {
  const { scaleY, scaleX } = useChart()

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

  return <Path path={path} color="#1450B9" strokeWidth={2} style="stroke" />
})
