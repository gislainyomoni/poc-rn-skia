import { Skia, Path, Group, Circle, Mask, Rect } from '@shopify/react-native-skia'
import { memo, useMemo } from 'react'
import { useDerivedValue } from 'react-native-reanimated'

import { IChartLineProps } from './ChartLine.props'
import { useChart } from '../../lib/chart.context'

export const ChartLine = memo<IChartLineProps>(({ data }) => {
  const { scaleY, scaleX, scrollX, rangeX, rangeY, invertX } = useChart()

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

  const [maxY, minY] = rangeY
  const [minX, maxX] = rangeX
  const activeWidth = useDerivedValue(() => scrollX.value - minX)
  const inactiveX = useDerivedValue(() => Math.max(scrollX.value, minX))
  const inactiveWidth = useDerivedValue(() => maxX - inactiveX.value)

  const cursorY = useDerivedValue(() => {
    const x = invertX(scrollX.value)
    let p1 = { x: data[0].x, y: data[0].y }
    let p2 = { x: p1.x, y: p1.y }
    for (let i = 1; i < data.length; i++) {
      p2 = data[i]
      if (x > p1.x && x <= p2.x) {
        const { x: x1, y: y1 } = p1
        const { x: x2, y: y2 } = p2
        // console.log('points', p1, p2)
        const y = y1 + ((x - x1) / (x2 - x1)) * (y2 - y1)
        // console.log('y', y)
        return scaleY(y)
      }
      p1 = data[i]
    }
    return scaleY(data[0].y)
  })

  return (
    <Group>
      <Mask mask={<Path path={path} strokeWidth={2} style="stroke" />}>
        <Group>
          <Rect x={minX} y={minY} width={activeWidth} height={maxY - minY} color="#1450B9" />
          <Rect
            x={inactiveX}
            y={minY}
            width={inactiveWidth}
            height={maxY - minY}
            color="#1450B980"
          />
        </Group>
      </Mask>
      {data.map(({ x, y }, index) => (
        <Circle key={index} r={4} cx={scaleX(x)} cy={scaleY(y)} color="black" style="fill" />
      ))}
      <Circle r={10} cx={scrollX} cy={cursorY} color="green" style="fill" />
    </Group>
  )
})
