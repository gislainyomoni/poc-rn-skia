import { SkFont, useFont } from '@shopify/react-native-skia'
import { ScaleLinear, scaleLinear as d3ScaleLinear } from 'd3-scale'
import { ReactElement, createContext, useCallback, useContext, useMemo } from 'react'
import { Dimensions } from 'react-native'
import { SharedValue, useSharedValue } from 'react-native-reanimated'

import { getTicks, gridSpace, invertScaleLinear, scaleLinear, xDomainHeight } from './chart.lib'

export type IChartContext = {
  width: number
  height: number
  domainY: [number, number]
  scaleY: ScaleLinear<number, number, never>
  rangeX: [number, number]
  domainX: [number, number]
  scaleX: (x: number) => number
  invertX: (x: number) => number
  px: number
  py: number
  font: SkFont
  boldFont: SkFont
  yDomainWidth: number
  ticks: { value: number; name: string }[]
  scrollX: SharedValue<number>
}

export interface IChartProvider
  extends Pick<IChartContext, 'height' | 'domainY' | 'domainX'>,
    Partial<Pick<IChartContext, 'px' | 'py' | 'width'>> {
  formatTick?: (tick: number) => string
  children: ReactElement
}

const ChartContext = createContext<IChartContext | undefined>(undefined)

export const ChartProvider = ({
  children,
  domainY,
  domainX,
  height,
  px = 20,
  py = 10,
  width = Dimensions.get('window').width,
  formatTick,
}: IChartProvider) => {
  const font = useFont(require('./HKGrotesk-Regular.otf'), 10)
  const boldFont = useFont(require('./HKGrotesk-Bold.otf'), 12)

  const scaleY = d3ScaleLinear()
    .domain(domainY)
    .range([height - py - xDomainHeight, py])
    .nice()

  const ticks = getTicks(scaleY, height, formatTick)
  const yDomainWidth = Math.max(
    ...ticks.map(({ name }) => font?.getTextWidth(name.toString()) ?? 0)
  )

  const rangeX: [number, number] = useMemo(
    () => [px + yDomainWidth + gridSpace, width - px],
    [px, width, yDomainWidth]
  )
  const scaleX = useCallback(
    (x: number) => {
      'worklet'
      return scaleLinear(x, domainX, rangeX)
    },
    [domainX, rangeX]
  )
  const invertX = useCallback(
    (x: number) => {
      'worklet'
      return invertScaleLinear(x, domainX, rangeX)
    },
    [domainX, rangeX]
  )

  const scrollX = useSharedValue(rangeX[1])

  if (!font || !boldFont) return null
  return (
    <ChartContext.Provider
      value={{
        height,
        width,
        font,
        boldFont,
        domainY,
        scaleY,
        rangeX,
        domainX,
        scaleX,
        invertX,
        ticks,
        px,
        py,
        yDomainWidth,
        scrollX,
      }}
    >
      {children}
    </ChartContext.Provider>
  )
}

export const useChart = () => {
  const context = useContext(ChartContext)
  if (!context) throw new Error('useChart must be used within a ChartContext.Provider')
  return context
}
