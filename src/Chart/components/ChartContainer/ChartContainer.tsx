import { Canvas } from '@shopify/react-native-skia'
import { FiberProvider, useContextBridge } from 'its-fine'
import { memo } from 'react'
import { GestureDetector } from 'react-native-gesture-handler'

import { IChartContainerProps, IChartContainerContentProps } from './ChartContainer.props'
import { ChartGrid } from './components'
import { ChartProvider, useChart } from '../../lib/chart.context'
import { useChartGesture } from '../../lib/chart.gesture'

const ChartContainerContent = memo<IChartContainerContentProps>(({ children }) => {
  const { height, width } = useChart()
  const ContextBridge = useContextBridge()
  const gesture = useChartGesture()
  return (
    <GestureDetector gesture={gesture}>
      <Canvas style={{ height, width }}>
        <ContextBridge>
          <ChartGrid />
          {children}
        </ContextBridge>
      </Canvas>
    </GestureDetector>
  )
})

export const ChartContainer = memo<IChartContainerProps>(
  ({ height, width, domainY, domainX, px, py, children, formatTick }) => {
    return (
      <FiberProvider>
        <ChartProvider
          height={height}
          width={width}
          domainY={domainY}
          domainX={domainX}
          px={px}
          py={py}
          formatTick={formatTick}
        >
          <ChartContainerContent>{children}</ChartContainerContent>
        </ChartProvider>
      </FiberProvider>
    )
  }
)
