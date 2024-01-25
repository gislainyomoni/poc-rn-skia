import { Text, Group, RoundedRect } from '@shopify/react-native-skia'
import { scaleBand } from 'd3-scale'
import { memo } from 'react'

import { IChartBarsProps } from './ChartBars.props'
import { useChart } from '../../lib/chart.context'
import { gridSpace } from '../../lib/chart.lib'

export const ChartBars = memo<IChartBarsProps>(({ data, formatLabel }) => {
  const { yDomainWidth, width, px, font, boldFont, scaleY, height } = useChart()
  const band = scaleBand()
    .domain(data.map((value, index) => index.toString()))
    .range([px + yDomainWidth + gridSpace, width - px])
    .padding(0.3)

  return (
    <Group>
      {data.map(({ value, name }, index) => {
        const start = Math.min(scaleY(0), scaleY(value))
        const end = Math.max(scaleY(0), scaleY(value))
        const middle = band(index.toString())! + band.bandwidth() / 2
        const textValue = formatLabel ? formatLabel(value) : value.toString()
        const textX = middle - boldFont.getTextWidth(textValue) / 2
        const labelX = middle - font.getTextWidth(name) / 2
        return (
          <Group key={index.toString()}>
            <Text font={boldFont} text={textValue} y={start - 10} x={textX} color="#1450B9" />
            <RoundedRect
              x={band(index.toString())}
              y={start}
              width={band.bandwidth()}
              height={end - start}
              r={6}
              color="#1450B9"
            />
            <Text font={font} text={name} y={height} x={labelX} color="#868383" />
          </Group>
        )
      })}
    </Group>
  )
})
