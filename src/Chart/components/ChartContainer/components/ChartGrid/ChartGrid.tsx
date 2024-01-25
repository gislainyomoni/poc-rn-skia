import { Line, Text, vec, Group } from '@shopify/react-native-skia'
import { memo } from 'react'

import { useChart } from '../../../../lib/chart.context'
import { gridSpace } from '../../../../lib/chart.lib'

export const ChartGrid = memo(() => {
  const { scaleY, px, width, yDomainWidth, font, ticks } = useChart()
  return (
    <Group>
      {ticks.map(({ value, name }) => {
        return (
          <Group key={name}>
            <Text
              font={font}
              x={px + yDomainWidth - font.getTextWidth(name)}
              y={scaleY(value) + 3}
              text={name}
              color="#868383"
            />
            <Line
              p1={vec(px + yDomainWidth + gridSpace, scaleY(value))}
              p2={vec(width - px, scaleY(value))}
              color="#F0E5DC"
              strokeWidth={2}
            />
          </Group>
        )
      })}
    </Group>
  )
})
