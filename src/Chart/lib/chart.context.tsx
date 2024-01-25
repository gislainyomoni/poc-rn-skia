import { SkFont, useFont } from '@shopify/react-native-skia'
import { ScaleLinear, scaleLinear } from 'd3-scale'
import { ReactElement, createContext, useContext } from 'react'
import { Dimensions } from 'react-native'

import { getTicks, xDomainHeight } from './chart.lib'

export type IChartContext = {
  width: number
  height: number
  domain: number[]
  scaleY: ScaleLinear<number, number, never>
  px: number
  py: number
  font: SkFont
  boldFont: SkFont
  yDomainWidth: number
  ticks: { value: number; name: string }[]
}

export interface IChartProvider
  extends Pick<IChartContext, 'height' | 'domain'>,
    Partial<Pick<IChartContext, 'px' | 'py' | 'width'>> {
  formatTick?: (tick: number) => string
  children: ReactElement
}

const ChartContext = createContext<IChartContext | undefined>(undefined)

export const ChartProvider = ({
  children,
  domain,
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
    .domain(domain)
    .range([height - py - xDomainHeight, py])
    .nice()

  const ticks = getTicks(scaleY, height, formatTick)
  const yDomainWidth = Math.max(...ticks.map(({ name }) => font.getTextWidth(name.toString())))

  return (
    <ChartContext.Provider
      value={{
        height,
        width,
        font,
        boldFont,
        domain,
        scaleY,
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
