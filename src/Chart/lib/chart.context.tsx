import { SkFont, useFont } from '@shopify/react-native-skia'
import { ScaleLinear, scaleLinear } from 'd3-scale'
import { ReactElement, createContext, useContext } from 'react'
import { Dimensions } from 'react-native'

import { getTicks, gridSpace, xDomainHeight } from './chart.lib'

export type IChartContext = {
  width: number
  height: number
  domainY: number[]
  scaleY: ScaleLinear<number, number, never>
  domainX: number[]
  scaleX: ScaleLinear<number, number, never>
  px: number
  py: number
  font: SkFont
  boldFont: SkFont
  yDomainWidth: number
  ticks: { value: number; name: string }[]
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
  if (!font || !boldFont) return null

  const scaleY = scaleLinear()
    .domain(domainY)
    .range([height - py - xDomainHeight, py])
    .nice()

  const ticks = getTicks(scaleY, height, formatTick)
  const yDomainWidth = Math.max(...ticks.map(({ name }) => font.getTextWidth(name.toString())))

  const scaleX = scaleLinear()
    .domain(domainX)
    .range([px + yDomainWidth + gridSpace, width - px])
    .nice()

  return (
    <ChartContext.Provider
      value={{
        height,
        width,
        font,
        boldFont,
        domainY,
        scaleY,
        domainX,
        scaleX,
        ticks,
        px,
        py,
        yDomainWidth,
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
