import { Skia, Path } from '@shopify/react-native-skia'
import { memo, useMemo } from 'react'

import { IChartAreaProps } from './ChartArea.props'
import { useChart } from '../../lib/chart.context'

export const ChartArea = memo<IChartAreaProps>(({ data }) => {
  const { scaleY, scaleX } = useChart()

  const path = useMemo(() => {
    const length = data.length
    const top = Skia.Path.Make()
    const bottom = Skia.Path.Make()
    let hasInitialized = false
    for (const [index, { x, y1, y2 }] of data.entries()) {
      const scaledX = scaleX(x)
      const scaledY1 = scaleY(y1)
      const scaledY2 = scaleY(y2)
      if (!hasInitialized) {
        top.moveTo(scaledX, scaledY2)
        top.lineTo(scaledX, scaledY1)
        bottom.moveTo(scaledX, scaledY2)
        hasInitialized = true
        continue
      }
      top.lineTo(scaledX, scaledY1)
      bottom.lineTo(scaledX, scaledY2)
      if (index === length - 1) top.lineTo(scaledX, scaledY2)
    }
    top.addPath(bottom)
    return top
  }, [data, scaleX, scaleY])

  return <Path path={path} color="#1450B9" strokeWidth={1} style="fill" />
})
