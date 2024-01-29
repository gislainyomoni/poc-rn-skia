import { Canvas } from '@shopify/react-native-skia'
import { FiberProvider, useContextBridge } from 'its-fine'
import { memo } from 'react'

import { IChartContainerProps, IChartContainerContentProps } from './ChartContainer.props'
import { ChartGrid } from './components'
import { ChartProvider, useChart } from '../../lib/chart.context'

const ChartContainerContent = memo<IChartContainerContentProps>(({ children }) => {
  const { height, width } = useChart()
  const ContextBridge = useContextBridge()
  return (
    <Canvas style={{ height, width }}>
      <ContextBridge>
        <ChartGrid />
        {children}
      </ContextBridge>
    </Canvas>
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
